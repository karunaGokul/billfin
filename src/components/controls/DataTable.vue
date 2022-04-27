<template>
  <div
    class="
      card-header
      d-flex
      align-items-center
      justify-content-between
      border-0
      ps-3
      pe-3
    "
  >
    <div class="card-title fw-bolder">
      {{ title }}
    </div>
    <div class="input-group input-group-solid bg-white w-25 p-1" v-if="search">
      <span class="input-group-text">
        <img src="@/assets/search.svg" alt="Search Icon" />
      </span>
      <input
        class="form-control"
        type="search"
        placeholder="Search"
        aria-label="Search"
        @input="applyFilter($event.target.value)"
      />
    </div>
  </div>
  <div class="card-body pt-0">
    <table :class="styles.tableClass">
      <thead>
        <tr>
          <th
            v-for="(header, i) in headers"
            :key="'data-table-header-' + i"
            :class="styles.theadClass"
          >
            {{ header.text }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in items" :key="index">
          <td
            v-for="(header, i) in headers"
            :key="'data-table-body-' + i"
            :class="[
              header.class,
              {
                'text-gray-secondary': item.status && item.status == 'INACTIVE',
                'text-dark-gray': item.status && item.status == 'ACTIVE',
                'bg-warning-opacity':
                  item.recordStatus &&
                  (item.recordStatus == 'new' || item.recordStatus == 'update'),
              },
            ]"
          >
            <slot :name="header.value" :item="item">
              {{ item[header.value] }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script lang="ts">
import { Vue } from "vue-class-component";
import { Prop, Watch } from "vue-property-decorator";
import { DataTableModel, HeadersModel, ItemsModel, StylesModel } from "@/model";
import BaseComponent from "../base/BaseComponent.vue";

export default class DataTable extends BaseComponent {
  @Prop() styles: StylesModel;
  @Prop() headers: Array<HeadersModel>;
  @Prop() items: Array<any>;
  @Prop() title: string;
  @Prop() defaultSearch: string;

  @Watch("items")
  update() {
    this.applyStatus();
  }

  public applyFilter(searchValue: string) {
    this.$emit("search", searchValue);
  }

  public applyStatus() {
    for (let i in this.items) {
      this.items[i].recordStatus = this.create(
        this.items[i].createdTime,
        this.items[i].updatedTime
      );
    }

    setTimeout(() => {
      this.removeStatus();
    }, 10000);
  }

  public removeStatus() {
    this.items.forEach((item) => {
      item.recordStatus = null;
    });
  }

  get search() {
    return this.defaultSearch == "true" ? true : false;
  }
}
</script>