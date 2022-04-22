<template>
  <div class="modal fade show d-block">
    <div class="modal-dialog modal-dialog-centered modal-md">
      <div class="modal-content">
        <div class="modal-header p-4 pt-6 pb-6">
          <h5 class="modal-title fs-4 fw-bolder">{{ modelType }}</h5>
          <button type="button" class="btn-close" @click="close">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="modal-body ms-8 me-8 mt-4 p-4">
          <text-input
            formFieldType="inputBlock"
            label="Transaction Code"
            :controls="v$.request.externalTransactionValue"
            :validation="['required']"
            :readonly="modelType == 'Edit Transaction Code'"
          />
          <text-input
            formFieldType="inputBlock"
            label="Transaction Description"
            :controls="v$.request.transactionDescription"
            maxLength="1024"
            :validation="[]"
          />
          <select-box
            label="Treat As"
            :data="['Contribution', 'Withdrawal']"
            :controls="v$.request.transactionType"
            formFieldType="inputBlock"
            :validation="['required']"
          />
        </div>
        <div class="modal-footer justify-content-center border-0 p-0 pb-4">
          <button type="button" class="btn btn-link text-gray" @click="close">
            Cancel
          </button>
          <button
            type="button"
            class="btn btn-primary ms-8"
            @click="addTransactionCode"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Options, setup } from "vue-class-component";
import { Prop, Inject } from "vue-property-decorator";

import BaseComponent from "@/components/base/BaseComponent.vue";

import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";

import {
  AddTransactionCodeRequestModel,
  TransactionCodeResponseModel,
  treatAs,
} from "@/model";

import TextInput from "@/components/controls/TextInput.vue";
import SelectBox from "@/components/controls/SelectBox.vue";

import { ICustodiansService } from "@/service";

import { useStore } from "vuex";

@Options({
  components: {
    TextInput,
    SelectBox,
  },
  validations: {
    request: {
      transactionType: { required },
      transactionDescription: {},
      externalTransactionValue: { required },
    },
  },
})
export default class AddTransactionCode extends BaseComponent {
  @Inject("custodiansService") service: ICustodiansService;

  @Prop() modelType: string;
  @Prop() transaction: TransactionCodeResponseModel;

  public v$: any = setup(() => this.validate());
  public request: AddTransactionCodeRequestModel =
    new AddTransactionCodeRequestModel();

  public store = useStore();

  public validate() {
    return useVuelidate();
  }

  mounted() {
    if (this.modelType == "Edit Transaction Code") {
      this.request = this.$vuehelper.clone(this.transaction);
      let transactionType: any = this.transaction.transactionType;
      this.request.transactionType =
        Object.keys(treatAs)[Object.values(treatAs).indexOf(transactionType)];
    }
  }

  public addTransactionCode() {
    this.v$.$touch();

    if (!this.v$.$invalid) {
      this.request.firmCustodianId = +this.$route.query.firmCustodianId;
      this.request.transactionType =
        treatAs[this.request.transactionType as keyof typeof treatAs];
      this.service
        .addTransactionCode(this.request)
        .then((response) => {
          this.confirmation("", this.modelType == "Add Transaction Code" ? "Transaction added successfully" : "Transaction updated successfully");
          this.$emit("newTransaction");
        })
        .catch((err) => {
          if (err.response.status == 500)
            this.alert(
              "Oops, sorry!",
              "Something went wrong, Please contact administration"
            );
          else if (err.response.status == 400)
            this.alert("Oops, sorry!", err.response.data.message);
        });
    }
  }

  public close() {
    this.$emit("close");
  }
}
</script>