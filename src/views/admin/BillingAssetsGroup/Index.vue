<template>
  <div class="d-flex align-items-center justify-content-between">
    <bread-crumb />
    <button class="btn btn-primary me-4" type="button">Add Custom Group</button>
  </div>
  <div class="card p-4 mt-4 position-relative">
    <template v-for="(items, index) in response" :key="index">
      <data-table
        :headers="dataTable.headers"
        :items="items.groups"
        :styles="dataTable.styles"
        title="Default Group"
        @search="applyFilter"
        defaultSearch="false"
      >
        <template v-slot:action>
          <div class="form-check form-switch">
            <input
              class="form-check-input"
              type="checkbox"
              role="switch"
            />
          </div>
        </template>
        <template v-slot:fidelity="slotProps">
          <div
            class="ms-4"
            v-for="(fd, i) in slotProps.item.fidelity"
            :key="'fd-index-' + i"
          >
            {{ fd.type }}: {{ fd.value }}
          </div>
        </template>
        <template v-slot:schwab="slotProps">
          <div
            class="ms-4"
            v-for="(schwab, i) in slotProps.item.schwab"
            :key="'schwab-index-' + i"
          >
            {{ schwab.type }}: {{ schwab.value }}
          </div>
        </template>
        <template v-slot:td="slotProps">
          <div
            class="ms-4"
            v-for="(td, i) in slotProps.item.td"
            :key="'td-index-' + i"
          >
            {{ td.type }}: {{ td.value }}
          </div>
        </template>
      </data-table>
    </template>
  </div>
</template>
<script lang="ts">
import { Options } from "vue-class-component";
import { Inject } from "vue-property-decorator";

import BaseComponent from "@/components/base/BaseComponent.vue";
import BreadCrumb from "@/components/layout/BreadCrumb.vue";

import AppDelete from "@/components/layout/AppDelete.vue";

import DataTable from "@/components/controls/DataTable.vue";

import {
  DataTableModel,
  HeadersModel,
  BillingAssetGroupsResponseModel,
  AssetGroupResponseModel,
  FidelityTypeModel,
} from "@/model";

@Options({
  components: {
    AppDelete,
    DataTable,
    BreadCrumb,
  },
})
export default class BillingAssetsGroup extends BaseComponent {
  public dataTable: DataTableModel = new DataTableModel();
  public response: Array<BillingAssetGroupsResponseModel> = [];

  created() {
    this.getAssetsGroup();
  }

  mounted() {
    let headers: Array<HeadersModel> = [];
    headers.push({
      text: "",
      value: "action",
      class: "fw-bold border-bottom-1 border-dashed border-light p-6",
    });
    headers.push({
      text: "ASSET GROUP",
      value: "assetGroup",
      class: "fw-bold border-bottom-1 border-dashed border-light p-6",
    });
    headers.push({
      text: "FIDELITY",
      value: "fidelity",
      class: "fw-bold border-bottom-1 border-dashed border-light p-6",
    });
    headers.push({
      text: "SCHWAB",
      value: "schwab",
      class: "fw-bold border-bottom-1 border-dashed border-light p-6",
    });
    headers.push({
      text: "TD",
      value: "td",
      class: "fw-bold border-bottom-1 border-dashed border-light p-6",
    });
    this.dataTable.headers = headers;

    this.dataTable.styles.tableClass =
      "table table-hover fs-6 border-top-0 border-start-0 border-end-0 border-bottom-1 border-dashed border-light";
    this.dataTable.styles.theadClass =
      "fw-bold text-gray-secondary border-bottom-1 border-dashed border-light p-6";
    this.dataTable.styles.tbodyClass =
      "fw-bold border-bottom-1 border-dashed border-light p-6";
  }

  public getAssetsGroup() {
    let gp = new BillingAssetGroupsResponseModel();
    gp.groupType = "default";

    let group: AssetGroupResponseModel = new AssetGroupResponseModel();
    let fidelity: Array<FidelityTypeModel> = [],
      schwab: Array<FidelityTypeModel> = [],
      td: Array<FidelityTypeModel> = [];

    fidelity.push({
      type: "Income Type",
      value: "Accured",
    });

    schwab.push({
      type: "Product Type",
      value: "Annulty",
    });
    schwab.push({
      type: "Income Type",
      value: "Coupon",
    });

    td.push({
      type: "Product Type",
      value: "Annulty",
    });
    td.push({
      type: "Income Type",
      value: "Coupon",
    });

    group.assetGroup = "Accured Interest";
    group.fidelity = fidelity;
    group.schwab = schwab;
    group.td = td;

    gp.groups.push(group);

    this.response.push(gp);
    
    console.log(this.response);
  }

  applyFilter() {}
}
</script>
