<template>
  <div class="d-flex align-items-center justify-content-between">
    <bread-crumb :additionalName="custodianName" />
    <div class="d-flex align-items-center justify-content-between">
      <button
        class="btn border border-primary text-primary me-2"
        type="button"
        @click="redirect"
      >
        Back
      </button>
      <button
        class="btn btn-primary"
        type="button"
        @click="addTransactionCode('Add Transaction Code')"
      >
        Add Transaction Code
      </button>
    </div>
  </div>

  <div class="card p-4 mt-4 position-relative">
    <div class="d-flex justify-content-between p-4">
      <div class="fs-4 fw-bolder">{{ custodianName }} - Transaction Code</div>
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
          border-top-0 border-start-0 border-end-0 border-dashed border-light
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
              TRANSACTION CODE
            </th>
            <th
              class="
                fw-bold
                text-gray-secondary
                border-bottom-2 border-dashed border-light
                p-6
              "
            >
              TREAT AS
            </th>
            <th
              class="
                fw-bold
                text-gray-secondary
                border-bottom-2 border-dashed border-light
                p-6
              "
            >
              DESCRIPTION
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
          <tr
            v-for="(item, index) in response"
            :key="'transaction-table' + index"
          >
            <td
              class="
                fw-bold
                text-dark-gray
                border-bottom-2 border-dashed border-light
                p-6
              "
            >
              {{ item.externalTransactionValue }}
            </td>
            <td
              class="
                fw-bold
                text-dark-gray
                border-bottom-2 border-dashed border-light
                p-6
              "
            >
              {{ item.transactionType }}
            </td>
            <td
              class="
                fw-bold
                text-dark-gray
                border-bottom-2 border-dashed border-light
                p-6
              "
            >
              {{ item.transactionDescription }}
            </td>
            <td class="border-bottom-2 border-dashed border-light p-6">
              <div class="d-flex justify-content-around align-items-center">
                <i
                  class="fa fa-solid fa-pen fs-4 edit-row fa-primary-hover"
                  @click="addTransactionCode('Edit Transaction Code', item)"
                ></i>
                <i
                  class="fa fa-solid fa-trash fs-4 edit-row fa-danger-hover"
                  @click="confirmationToDelete(item)"
                ></i>
              </div>
            </td>
          </tr>
          <tr key="transaction-no-data-row" v-if="!response.length">
            <td colspan="4" class="text-center">
              <p class="fs-4 fw-bold m-4">
                You currently do not have any transaction codes defined for
                {{ custodianCode }}
              </p>

              <button
                type="button"
                class="btn btn-primary mt-4 mb-4"
                @click="addTransactionCode('Add Transaction Code')"
              >
                Add Transaction Code
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <add-transaction-code
        :modelType="modelType"
        :transaction="selectedTransaction"
        @newTransaction="updateTransaction"
        @close="showTransactionModel = false"
        v-if="showTransactionModel"
      />
      <app-delete
        message="Are you sure you want to delete the transaction code?"
        @delete="deteleTransaction"
        @cancel="showDeleteModel = false"
        v-if="showDeleteModel"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { Options } from "vue-class-component";
import { Inject } from "vue-property-decorator";

import BaseComponent from "@/components/base/BaseComponent.vue";
import BreadCrumb from "@/components/layout/BreadCrumb.vue";
import AppDelete from "@/components/layout/AppDelete.vue";

import {
  DeleteTransactionCodeRequestModel,
  TransactionCodeResponseModel,
} from "@/model";
import { ICustodiansService } from "@/service";

import AddTransactionCode from "./AddTransactionCode.vue";

@Options({
  components: {
    AddTransactionCode,
    BreadCrumb,
    AppDelete,
  },
})
export default class TransactionCodes extends BaseComponent {
  @Inject("custodiansService") service: ICustodiansService;

  public response: Array<TransactionCodeResponseModel> = [];
  public dataResource: Array<TransactionCodeResponseModel> = [];
  public selectedTransaction: TransactionCodeResponseModel =
    new TransactionCodeResponseModel();

  public showTransactionModel: boolean = false;
  public showDeleteModel: boolean = false;
  public modelType: string = "Add Transaction Code";

  mounted() {
    this.getTransactionCode();
  }

  public getTransactionCode() {
    this.service
      .getTransactionCode(+this.firmCustodianId)
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

  public addTransactionCode(
    modelType: string,
    transaction: TransactionCodeResponseModel
  ) {
    this.modelType = modelType;
    if (transaction) this.selectedTransaction = transaction;
    this.showTransactionModel = true;
  }

  public confirmationToDelete(transaction: TransactionCodeResponseModel) {
    this.selectedTransaction = transaction;
    this.showDeleteModel = true;
  }

  public deteleTransaction() {
    let request: DeleteTransactionCodeRequestModel =
      new DeleteTransactionCodeRequestModel();
    request.transactionTypeId = this.selectedTransaction.transactionTypeId;
    this.service
      .deleteTransactionCode(request)
      .then((response) => {
        this.showDeleteModel = false;
        this.getTransactionCode();
        this.confirmation("", "Transaction has been deleted successfully");
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

  public updateTransaction() {
    this.showTransactionModel = false;
    this.getTransactionCode();
  }

  public redirect() {
    this.$router.go(-1);
  }

  public applyFilter(searchValue: string) {
    this.response = this.dataResource.filter(
      (item) =>
        (item.transactionDescription &&
          item.transactionDescription
            .toLowerCase()
            .includes(searchValue.toLowerCase())) ||
        (item.transactionType &&
          item.transactionType
            .toLowerCase()
            .includes(searchValue.toLowerCase())) ||
        (item.externalTransactionValue &&
          item.externalTransactionValue
            .toLowerCase()
            .includes(searchValue.toLowerCase()))
    );
  }

  get custodianCode() {
    return this.$route.params.custodianCode;
  }

  get firmCustodianId() {
    return this.$route.query.firmCustodianId;
  }

  get custodianName() {
    return this.$route.query.custodianName;
  }
}
</script>