<template>
  <div class="modal fade show d-block">
    <div class="modal-dialog modal-dialog-centered modal-md">
      <div class="modal-content">
        <div class="modal-header p-4 pt-6 pb-6">
          <h5 class="modal-title fs-4 fw-bolder">
            {{ custodian.custodianIdentifier }} {{ custodian.custodianName }}
          </h5>
          <button type="button" class="btn-close" @click="close">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="modal-body ms-8 me-8 mt-4 mb-4 p-4">
          <text-input
            formFieldType="inputBlock"
            label="Keys"
            :controls="v$.request.custodianKey"
            :validation="['required']"
          />

          <div class="d-flex align-items-center justify-content-between mt-4 mb-8">
            <label class="fw-bolder fs-6">Bill only settled trades</label>
            <div class="form-check form-switch">
              <input
                class="form-check-input"
                type="checkbox"
                v-model="v$.request.settledTradesFlag.$model"
              />
            </div>
          </div>

          <div class="d-flex align-items-center justify-content-between mt-4 mb-8">
            <label class="fw-bolder fs-6">Bill accrued interest</label>
            <div class="form-check form-switch">
              <input
                class="form-check-input"
                type="checkbox"
                v-model="v$.request.accruedInterestFlag.$model"
              />
            </div>
          </div>

          <text-input
            formFieldType="inputBlock"
            label="Account Display Format"
            :controls="v$.request.accountDisplayFormat"
            :validation="['required']"
          />
        </div>
        <div class="modal-footer justify-content-end border-0 p-4">
          <button type="button" class="btn btn-link text-gray" @click="close">
            Cancel
          </button>
          <button
            type="button"
            class="btn btn-primary ms-8"
            @click="addKeyConfig"
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

import { AddKeysRequestModel, CustodiansResponseModel } from "@/model";

import TextInput from "@/components/controls/TextInput.vue";

import { ICustodiansService } from "@/service";
import { useStore } from "vuex";

@Options({
  components: {
    TextInput,
  },
  validations: {
    request: {
      custodianKey: { required },
      settledTradesFlag: {},
      accruedInterestFlag: {},
      accountDisplayFormat: { required },
    },
  },
})
export default class Keys extends BaseComponent {
  @Inject("custodiansService") service: ICustodiansService;

  @Prop() custodian: CustodiansResponseModel;

  public v$: any = setup(() => this.validate());
  public request: AddKeysRequestModel = new AddKeysRequestModel();

  public store = useStore();

  public validate() {
    return useVuelidate();
  }

  created() {
    this.request.custodianKey = this.custodian.custodianKey;
    this.request.settledTradesFlag = this.custodian.settledTradesFlag;
    this.request.accruedInterestFlag = this.custodian.accruedInterestFlag;
    this.request.accountDisplayFormat = this.custodian.accountDisplayFormat;
    this.request.firmCustodianId = this.custodian.firmCustodianId;
  }

  public addKeyConfig() {
    this.v$.$touch();

    if (!this.v$.$invalid) {
      this.service
        .addKeys(this.request)
        .then((response) => {
          this.confirmation("", "New keys added successfully");
          this.$emit("keyAdded");
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
  }

  public close() {
    this.$emit("close");
  }
}
</script>