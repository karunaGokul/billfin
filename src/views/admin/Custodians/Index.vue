<template>
  <div class="card p-4 mt-4 position-relative">
    <button
      class="btn btn-primary position-absolute translate-middle"
      type="button"
      style="top: -40px; right: -58px"
      @click="addCustodian('Add Custodian')"
    >
      Add Custodian
    </button>
    <div class="d-flex justify-content-between p-4">
      <div class="fs-4 fw-bolder">Custodians</div>
      <div>
        <div class="input-group input-group-solid">
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
    </div>
    <div class="card-body pt-0">
      <table
        class="
          table table-hover
          fs-6
          border-top-0
          border-start-0
          border-end-0
          border-bottom-2
          border-dashed
          border-light
        "
      >
        <thead>
          <tr>
            <th
              class="
                fw-bold
                text-gray-secondary
                border-bottom-2 border-dashed border-light
                p-6
              "
            >
              CUSTODIAN CODE
            </th>
            <th
              class="
                fw-bold
                text-gray-secondary
                border-bottom-2 border-dashed border-light
                p-6
              "
            >
              CUSTODIAN NAME
            </th>
            <th
              class="
                fw-bold
                text-gray-secondary
                border-bottom-2 border-dashed border-light
                p-6
              "
            >
              # OF ACCOUNTS
            </th>
            <th
              class="
                fw-bold
                text-gray-secondary
                border-bottom-2 border-dashed border-light
                p-6
              "
            >
              ENABLED
            </th>
            <th
              class="
                fw-bold
                text-gray-secondary
                border-bottom-2 border-dashed border-light
                p-6
              "
            ></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in response" :key="'user-table' + index">
            <td
              class="
                fw-bold
                text-dark-gray
                border-bottom-2 border-dashed border-light
                p-6
              "
            >
              {{ item.custodianIdentifier }}
            </td>
            <td
              class="
                fw-bold
                text-dark-gray
                border-bottom-2 border-dashed border-light
                p-6
              "
            >
              {{ item.custodianName }}
            </td>
            <td
              class="
                fw-bold
                text-dark-gray
                border-bottom-2 border-dashed border-light
                p-6
              "
            >
              {{ item.noOfAccountsLinked }}
            </td>
            <td
              class="
                fw-bold
                text-dark-gray
                border-bottom-2 border-dashed border-light
                p-6
              "
            >
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  :value="item.enabled"
                />
              </div>
            </td>
            <td class="border-bottom-2 border-dashed border-light p-6">
              <div class="d-flex justify-content-around align-items-center">
                <i
                  class="fa fa-solid fa-pen fs-4 edit-row"
                  @click="addCustodian('Edit Custodian', item)"
                ></i>
                <button
                  class="btn btn-sm btn-secondary p-2 rounded-circle edit-row"
                >
                  TC
                </button>
                <i class="fa fa-solid fa-key fs-4 edit-row"></i>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <add-custodian
        :modelType="modelType"
        :custodian="selectedCustodian"
        @close="showAddCustodianModel = false"
        @custodianAdded="updateCustodian"
        v-if="showAddCustodianModel"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { Inject } from "vue-property-decorator";

import { CustodiansResponseModel } from "@/model";

import { ICustodiansService } from "@/service";

import AddCustodian from "./components/AddCustodian.vue";

@Options({
  components: {
    AddCustodian,
  },
})
export default class Custodians extends Vue {
  @Inject("custodiansService") service: ICustodiansService;

  public response: Array<CustodiansResponseModel> = [];
  public dataResource: Array<CustodiansResponseModel> = [];

  public selectedCustodian: CustodiansResponseModel =
    new CustodiansResponseModel();
  public modelType: string = "Add Custodian";

  public showAddCustodianModel: boolean = false;

  created() {
    this.getCustodians();
  }

  public getCustodians() {
    this.service
      .getCustodians()
      .then((response) => {
        this.response = response;
        this.dataResource = response;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  public addCustodian(modelType: string, custodian?: CustodiansResponseModel) {
    this.modelType = modelType;
    if (custodian) this.selectedCustodian = custodian;
    this.showAddCustodianModel = true;
  }

  public updateCustodian() {
    this.showAddCustodianModel = false;
    this.getCustodians();
  }

  public applyFilter(searchValue: string) {
    this.response = this.dataResource.filter((item) => {
      console.log(item.custodianIdentifier.toLowerCase(), searchValue.toLowerCase());
      (item.custodianIdentifier &&
        item.custodianIdentifier.toLowerCase().includes(searchValue.toLowerCase())) ||
        (item.custodianName &&
          item.custodianName.toLowerCase().includes(searchValue.toLowerCase()));
    });
  }
}
</script> 