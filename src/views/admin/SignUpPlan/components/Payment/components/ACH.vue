<template>
  <div class="fw-bolder fs-3 text-light-black me-4 text-center">
    Easily make payments with your bank account
  </div>
  <div class="w-50 mx-auto m-4 mt-10">
    <form @submit.prevent="payNow">
      <div class="mt-6">
        <TextInput
          label="Bank Account Number"
          :controls="v$.request.accountNo"
          inputType="text"
          formFieldType="inputBlock"
          :validation="['required', 'numeric']"
          @updateInput="validateAch"
        />
      </div>
      <div class="mt-6 position-relative">
        <TextInput
          label="Bank Routing Number"
          :controls="v$.request.routingNo"
          inputType="text"
          formFieldType="inputBlock"
          :validation="['required', 'numeric']"
          @updateInput="validateAch"
        />
        <div
          class="invalid-feedback position-absolute m-0"
          style="bottom: -19px"
          v-if="!isAccountValid && !v$.request.$invalid"
        >
          {{ accountError }}
        </div>
      </div>
      <div class="mt-6">
        <TextInput
          label="Account Holder"
          :controls="v$.request.accountHolder"
          inputType="text"
          formFieldType="inputBlock"
          :validation="['required']"
          @updateInput="validateAch"
        />
      </div>
      <div class="mt-6">
        <TextInput
          label="Account Holder Billing Address"
          :controls="v$.request.billingAddress"
          inputType="text"
          formFieldType="inputBlock"
          :validation="['required']"
        />
      </div>
      <div class="row">
        <div class="col-6">
          <TextInput
            label="Country"
            :controls="v$.request.country"
            inputType="text"
            formFieldType="inputBlock"
            :validation="['required']"
            :readonly="true"
          />
        </div>
        <div class="col-6">
          <SelectBox
            label="State"
            :data="state"
            :controls="v$.request.billingState"
            formFieldType="inputBlock"
            :validation="['required']"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-6">
          <TextInput
            label="City"
            :controls="v$.request.billingCity"
            inputType="text"
            formFieldType="inputBlock"
            :validation="['required']"
          />
        </div>
        <div class="col-6">
          <TextInput
            label="Postal Code"
            :controls="v$.request.postalCode"
            inputType="text"
            formFieldType="inputBlock"
            :validation="['required', 'numeric']"
          />
        </div>
      </div>
      <div class="mt-6 d-flex align-items-center justify-content-center">
        <button type="button" class="btn btn-light me-5" @click="back">
          Back
        </button>
        <button type="submit" class="btn btn-primary ms-5">Continue</button>
      </div>
    </form>
    <Information
      status="FAILED"
      message="ACH information is not valid"
      @closeInformationModel="closeModel"
      v-if="showInformationError"
    />
  </div>
</template>
<script lang="ts">
import { Vue, Options, setup } from "vue-class-component";

import useVuelidate from "@vuelidate/core";
import { required, numeric } from "@vuelidate/validators";

import TextInput from "@/components/controls/TextInput.vue";
import SelectBox from "@/components/controls/SelectBox.vue";
import Information from "@/components/Models/Information.vue";

import { achRequestModel } from "@/model";

import { useStore } from "vuex";

declare let ChargeOver: any;

@Options({
  components: {
    TextInput,
    SelectBox,
    Information,
  },
  validations: {
    request: {
      accountNo: { required, numeric },
      routingNo: { required, numeric },
      accountHolder: { required },
      billingAddress: { required },
      billingCity: { required },
      billingState: { required },
      postalCode: { required, numeric },
      country: { required },
    },
  },
})
export default class ACH extends Vue {
  public request: achRequestModel = new achRequestModel();
  public store = useStore();

  public accountError: string = null;
  public isAccountValid: boolean = false;
  public showInformationError: boolean = false;

  public v$: any = setup(() => this.validate());

  public validate() {
    return useVuelidate();
  }

  mounted() {
    this.request.country = "United States";
    this.request.billingState = this.state[0];
  }

  public back() {
    this.$emit("back");
  }

  public closeModel() {
    this.showInformationError = false;
  }

  validateAch() {
    this.showInformationError = false;
    if (
      !this.v$.request.accountNo.$invalid &&
      !this.v$.request.routingNo.$invalid
    ) {
      const request = {
        number: this.request.accountNo,
        routing: this.request.routingNo,
      };
      ChargeOver.ACH.validate(
        request,
        (code: number, message: any, response: any) => {
          console.log(code);
          if (code == 200) {
            this.isAccountValid = true;
          } else if (code == 400) {
            this.showInformationError = true;
            this.isAccountValid = false;
          }
        }
      );
    }
  }

  public payNow() {
    this.v$.$touch();
    if (!this.v$.$invalid && this.isAccountValid) {
      const payload = {
        company: this.firms.name,
        bill_addr1: this.request.billingAddress,
        bill_city: this.request.billingCity,
        bill_state: this.request.billingState,
        bill_postcode: this.request.postalCode,
        bill_country: this.request.country,
      };
      const ach = {
        number: this.request.accountNo,
        routing: this.request.routingNo,
        name: this.request.accountHolder,
      };
      this.store.dispatch("updateCustomer", payload);
      this.store.dispatch("updateACH", ach);
      this.$emit("pay");
    }
  }

  get state() {
    return this.store.getters.getState;
  }

  get firms() {
    return this.store.getters.firms;
  }
}
</script>