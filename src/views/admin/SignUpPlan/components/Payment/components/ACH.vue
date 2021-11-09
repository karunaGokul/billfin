<template>
  <div class="fw-bolder fs-3 me-4 text-center">
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
          <div class="position-relative mb-6">
            <label for="Country" class="form-label fw-bolder"> Country </label>
            <select
              class="form-select form-select-solid"
              v-model="v$.request.country.$model"
              @change="getState(v$.request.country.$model.iso2)"
            >
              <option v-for="(item, i) in country" :key="i" :value="item">
                {{ item.name }}
              </option>
            </select>

            <div
              class="invalid-feedback position-absolute m-0"
              v-if="v$.request.country.$dirty && v$.request.country.$invalid"
            >
              Country is required
            </div>
          </div>
        </div>
        <div class="col-6">
          <div class="position-relative mb-8">
            <label for="Country" class="form-label fw-bolder">
              Billing State
            </label>
            <select
              class="form-select form-select-solid"
              v-model="v$.request.billingState.$model"
              @change="
                getCity(
                  request.country.iso2,
                  v$.request.billingState.$model.iso2
                )
              "
            >
              <option v-for="(item, i) in state" :key="i" :value="item">
                {{ item.name }}
              </option>
            </select>

            <div
              class="invalid-feedback position-absolute m-0"
              v-if="
                v$.request.billingState.$dirty &&
                v$.request.billingState.$invalid
              "
            >
              Billing State is required
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-6">
          <div class="position-relative mb-8">
            <label for="Country" class="form-label fw-bolder">
              Billing City
            </label>
            <select
              class="form-select form-select-solid"
              v-model="v$.request.billingCity.$model"
            >
              <option v-for="(item, i) in city" :key="i" :value="item">
                {{ item.name }}
              </option>
            </select>

            <div
              class="invalid-feedback position-absolute m-0"
              v-if="
                v$.request.billingCity.$dirty && v$.request.billingCity.$invalid
              "
            >
              Billing City is required
            </div>
          </div>
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
      <div class="mt-6 d-flex align-items-center justify-content-between">
        <button type="button" class="btn btn-secondary" @click="back">
          Back
        </button>
        <button type="submit" class="btn btn-primary">Continue</button>
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
import { Inject } from "vue-property-decorator";

import useVuelidate from "@vuelidate/core";
import { required, numeric } from "@vuelidate/validators";

import TextInput from "@/components/controls/TextInput.vue";
import Information from "@/components/Models/Information.vue";

import { achRequestModel, stateModel, cityModel } from "@/model";
import { IAddressService } from "@/service";

import { useStore } from "vuex";

declare let ChargeOver: any;

@Options({
  components: {
    TextInput,
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
  @Inject("addressService") service: IAddressService;

  public request: achRequestModel = new achRequestModel();
  public store = useStore();

  public state: Array<stateModel> = [];
  public city: Array<cityModel> = [];

  public accountError: string = null;
  public isAccountValid: boolean = false;
  public showInformationError: boolean = false;

  public v$: any = setup(() => this.validate());

  public validate() {
    return useVuelidate();
  } 

  mounted() {
    this.request.country = { id: 233, name: "United States", iso2: "US" };
    this.getState("US");
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
        company: this.store.getters.selectedFirmName,
        bill_addr1: this.request.billingAddress,
        bill_city: this.request.billingCity.name,
        bill_state: this.request.billingState.name,
        bill_postcode: this.request.postalCode,
        bill_country: this.request.country.name,
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

  public getState(selectedCountry: string) {
    this.service.getState(selectedCountry).then((response) => {
      this.state = response;
      this.state.sort((a, b) => a.name.localeCompare(b.name));
      this.request.billingState = this.state[0];
      this.getCity(selectedCountry, this.state[0].iso2);
    });
  }

  public getCity(selectedCountry: string, selectedState: string) {
    this.service.getCity(selectedCountry, selectedState).then((response) => {
      this.city = response;
      this.request.billingCity = this.city[0];
    });
  }

  get country() {
    return this.store.getters.getCountry;
  }
}
</script>