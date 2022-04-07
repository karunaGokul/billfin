<template>
  <div class="d-flex align-items-center justify-content-between">
    <bread-crumb />
    <button
      class="btn btn-primary"
      type="button"
      @click="addCustodian('Add Custodian')"
    >
      Add Custodian
    </button>
  </div>
  <div class="card p-4 mt-4 position-relative">
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
              {{ item.noOfAccountsLinked ? item.noOfAccountsLinked : "-" }}
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
                  v-model="item.enabled"
                  disabled
                />
              </div>
            </td>
            <td
              class="border-bottom-2 border-dashed border-light p-6"
              style="width: 15%"
            >
              <div class="d-flex justify-content-around align-items-center">
                <span data-tooltip="Edit Custodian">
                  <i
                    class="fa fa-solid fa-pen fs-4 edit-row fa-primary-hover"
                    @click="addCustodian('Edit Custodian', item)"
                  ></i>
                </span>
                <button
                  class="
                    btn btn-sm btn-secondary btn-primary-hover
                    p-2
                    rounded-circle
                    edit-row
                  "
                  data-tooltip="Transaction Codes"
                  v-if="item.enabled"
                  @click="redirectTC(item)"
                >
                  TC
                </button>

                <span
                  :data-tooltip="
                    !item.custodianKey && !item.accountDisplayFormat
                      ? 'Keys'
                      : ''
                  "
                  class="card-container"
                >
                  <i
                    class="fa fa-solid fa-key fs-4 edit-row"
                    :class="{
                      'text-success':
                        item.custodianKey || item.accountDisplayFormat,
                    }"
                    v-if="item.enabled"
                    @click="addKeys(item)"
                  ></i>
                  <div
                    class="card shadow show-card position-absolute end-0 p-4"
                    v-if="item.custodianKey || item.accountDisplayFormat"
                    style="min-width: 230px; z-index: 999999"
                  >
                    <div class="fw-bolder mt-2">Keys</div>
                    <div class="text-gray mb-2">
                      {{ item.custodianKey ? item.custodianKey : "-" }}
                    </div>

                    <div class="fw-bolder mt-2">Bill only settled trades</div>
                    <div class="text-gray mb-2">
                      {{ item.settledTradesFlag ? "Yes" : "No" }}
                    </div>

                    <div class="fw-bolder mt-2">Bill accrued interest</div>
                    <div class="text-gray mb-2">
                      {{ item.accruedInterestFlag ? "Yes" : "No" }}
                    </div>

                    <div class="fw-bolder mt-2">Account Display Format</div>
                    <div class="text-gray mb-2">
                      {{
                        item.accountDisplayFormat
                          ? item.accountDisplayFormat
                          : "-"
                      }}
                    </div>
                  </div>
                </span>
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
      <keys
        :custodian="selectedCustodian"
        @keyAdded="updateKeys"
        @close="showKeysModel = false"
        v-if="showKeysModel"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { Options } from "vue-class-component";
import { Inject } from "vue-property-decorator";

import BaseComponent from "@/components/base/BaseComponent.vue";
import BreadCrumb from "@/components/layout/BreadCrumb.vue";

import { CustodiansResponseModel } from "@/model";

import { ICustodiansService } from "@/service";

import AddCustodian from "./components/AddCustodian.vue";
import Keys from "./components/Keys.vue";

@Options({
  components: {
    AddCustodian,
    Keys,
    BreadCrumb
  },
})
export default class Custodians extends BaseComponent {
  @Inject("custodiansService") service: ICustodiansService;

  public response: Array<CustodiansResponseModel> = [];
  public dataResource: Array<CustodiansResponseModel> = [];

  public selectedCustodian: CustodiansResponseModel =
    new CustodiansResponseModel();
  public modelType: string = "Add Custodian";

  public showAddCustodianModel: boolean = false;
  public showKeysModel: boolean = false;

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
        if (err.response.status == 500)
          this.alert(
            "Oops, sorry!",
            "Somthing went wrong, Please contact administration"
          );
        else if (err.response.status == 400)
          this.alert("Oops, sorry!", err.response.data.message);
      });
  }

  public addCustodian(modelType: string, custodian?: CustodiansResponseModel) {
    this.modelType = modelType;
    if (custodian) this.selectedCustodian = custodian;
    this.showAddCustodianModel = true;
  }

  public updateCustodian() {
    this.showAddCustodianModel = false;
    this.selectedCustodian = new CustodiansResponseModel();
    this.getCustodians();
  }

  public addKeys(custodian: CustodiansResponseModel) {
    this.showKeysModel = true;
    this.selectedCustodian = custodian;
  }

  public updateKeys() {
    this.showKeysModel = false;
    this.selectedCustodian = new CustodiansResponseModel();
    this.getCustodians();
  }

  public redirectTC(custodian: CustodiansResponseModel) {
    this.$router.push({
      path: `/custodians/${custodian.custodianIdentifier}`,
      query: { firmCustodianId: custodian.firmCustodianId, custodianName: custodian.custodianName, custodianCode: custodian.custodianIdentifier },
    });
  }

  public applyFilter(searchValue: string) {
    this.response = this.dataResource.filter(
      (item) =>
        (item.custodianName &&
          item.custodianName
            .toLowerCase()
            .includes(searchValue.toLowerCase())) ||
        (item.custodianIdentifier &&
          item.custodianIdentifier
            .toLowerCase()
            .includes(searchValue.toLowerCase()))
    );
  }
}
</script> 