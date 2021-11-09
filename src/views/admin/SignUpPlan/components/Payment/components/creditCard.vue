<template>
  <div
    class="w-50 mx-auto m-4 p-4 overflow-auto"
    style="height: calc(100vh - 20vh - 200px)"
  >
    <div class="d-flex align-items-center justify-content-lg-between">
      <div class="fw-bolder fs-3 me-4 text-center">
        Enter a credit card details
      </div>
      <div>
        <img src="@/assets/mastercard.png" alt="Master Card" class="me-2" />
        <img src="@/assets/visa.png" alt="Visa Card" class="me-2" />
        <img src="@/assets/amex.png" alt="AMEX Card" class="me-2" />
        <img src="@/assets/discover.png" alt="Discover Card" class="me-2" />
      </div>
    </div>
    <form @submit.prevent="payNow">
      <div class="mt-6 position-relative mb-8">
        <label class="form-label fw-bolder"> Card Number </label>
        <div class="input-group input-group-solid">
          <input
            type="text"
            v-model="v$.request.cardNumber.$model"
            class="form-control text-start"
            minlength="15"
            maxlength="16"
            @input="validateCard"
          />
          <span class="input-group-text" v-if="card">
            <img
              src="@/assets/mastercard.png"
              alt="Card Type"
              v-if="card == 'mast'"
            />
            <img
              src="@/assets/visa.png"
              alt="Card Type"
              v-if="card == 'visa'"
            />
            <img
              src="@/assets/amex.png"
              alt="Card Type"
              v-if="card == 'amex'"
            />
            <img
              src="@/assets/discover.png"
              alt="Card Type"
              v-if="card == 'disc'"
            />
          </span>
        </div>
        <div
          class="invalid-feedback position-absolute m-0"
          v-if="
            v$.request.cardNumber.$dirty &&
            v$.request.cardNumber.required.$invalid
          "
        >
          Card Number is required
        </div>
        <div
          class="invalid-feedback position-absolute m-0"
          v-if="v$.request.cardNumber.numeric.$invalid"
        >
          Please enter valid card number
        </div>
        <div
          class="invalid-feedback position-absolute m-0"
          v-if="
            !v$.request.cardNumber.required.$invalid &&
            !v$.request.cardNumber.numeric.$invalid &&
            v$.request.cardNumber.minLength.$invalid
          "
        >
          Minimum 15 or 16 characters
        </div>
        <div
          class="invalid-feedback position-absolute m-0"
          v-if="
            !v$.request.cardNumber.required.$invalid &&
            !v$.request.cardNumber.numeric.$invalid &&
            !v$.request.cardNumber.minLength.$invalid &&
            v$.request.cardNumber.maxLength.$invalid
          "
        >
          Maximum 15 or 16 charaters
        </div>
      </div>
      <div class="row position-relative">
        <div class="col-4">
          <SelectBox
            label="Expiration Month"
            :controls="v$.request.expirationMonth"
            :data="[
              '01',
              '02',
              '03',
              '04',
              '05',
              '06',
              '07',
              '08',
              '03',
              '10',
              '11',
              '12',
            ]"
            :validation="['required']"
            formFieldType="inputBlock"
            @update="validateCard"
          />
        </div>
        <div class="col-4">
          <TextInput
            label="Expiration Year"
            :controls="v$.request.expirationYear"
            inputType="text"
            formFieldType="inputBlock"
            :validation="['required', 'numeric', 'minLength', 'maxLength']"
            @updateInput="validateCard"
          />
        </div>
        <div class="col-4">
          <TextInput
            label="CVV/CSC Code"
            :controls="v$.request.cvv"
            inputType="text"
            formFieldType="inputBlock"
            :validation="[
              'required',
              'numeric',
              'cvvMinLength',
              'cvvMaxLength',
            ]"
            @updateInput="validateCard"
          />
        </div>
        <div
          class="invalid-feedback position-absolute m-0 bottom-0"
          v-if="!isCardValid"
        >
          {{ cardMessage }}
        </div>
      </div>

      <div class="mt-6">
        <TextInput
          label="Name on Credit Card"
          :controls="v$.request.cardHolderName"
          inputType="text"
          formFieldType="inputBlock"
          :validation="['required']"
        />
      </div>
      <div class="mt-6">
        <TextInput
          label="Billing Address"
          :controls="v$.request.billingAddress"
          inputType="text"
          formFieldType="inputBlock"
          :validation="['required']"
        />
      </div>
      <div class="row">
        <div class="col-6">
          <div class="position-relative mb-8">
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
      message="Credit card information is not valid"
      @closeInformationModel="closeModel"
      v-if="showInformationError"
    />
  </div>
</template>
<script lang="ts">
import { Vue, Options, setup } from "vue-class-component";

import useVuelidate from "@vuelidate/core";
import { Inject } from "vue-property-decorator";

import { useStore } from "vuex";

import { required, numeric, minLength, maxLength } from "@vuelidate/validators";

import TextInput from "@/components/controls/TextInput.vue";
import SelectBox from "@/components/controls/SelectBox.vue";
import Information from "@/components/Models/Information.vue";

import { creditCardRequestModel, stateModel, cityModel } from "@/model";
import { IAddressService } from "@/service";

declare let ChargeOver: any;

@Options({
  components: {
    TextInput,
    SelectBox,
    Information,
  },
  validations: {
    request: {
      cardNumber: {
        required,
        numeric,
        minLength: (value: any) => {
          let validation = false;
          if (
            (value && value != "" && value.length == 15) ||
            value.length == 16
          )
            validation = true;
          return validation;
        },
        maxLength: (value: any) => {
          let validation = false;
          if (
            (value && value != "" && value.length == 15) ||
            value.length == 16
          )
            validation = true;
          return validation;
        },
      },
      expirationMonth: {
        required,
      },
      expirationYear: {
        required,
        numeric,
        minLength: minLength(4),
        maxLength: maxLength(4),
      },
      cvv: {
        required,
        numeric,
        cvvMinLength: (value: any) => {
          let validation = false;
          if ((value && value != "" && value.length == 3) || value.length == 4)
            validation = true;
          return validation;
        },
        cvvMaxLength: (value: any) => {
          let validation = false;
          if ((value && value != "" && value.length == 3) || value.length == 4)
            validation = true;
          return validation;
        },
      },
      cardHolderName: { required },
      billingAddress: { required },
      billingCity: { required },
      billingState: { required },
      postalCode: { required, numeric },
      country: { required },
    },
  },
})
export default class CreditCard extends Vue {
  @Inject("addressService") service: IAddressService;

  public request: creditCardRequestModel = new creditCardRequestModel();
  public store = useStore();

  public state: Array<stateModel> = [];
  public city: Array<cityModel> = [];

  public card: string = "";

  public cardMessage: string = null;
  public isCardValid: boolean = false;

  public v$: any = setup(() => this.validate());

  public showInformationError: boolean = false;

  public validate() {
    return useVuelidate();
  }

  mounted() {
    this.request.country = { id: 233, name: "United States", iso2: "US" };
    this.getState("US");
  }

  public validateCard() {
    this.showInformationError = false;
    if (
      !this.v$.request.cardNumber.$invalid &&
      !this.v$.request.expirationMonth.$invalid &&
      !this.v$.request.expirationYear.$invalid &&
      !this.v$.request.cvv.$invalid
    ) {
      const request = {
        number: this.request.cardNumber,
        expdate_month: this.request.expirationMonth,
        expdate_year: this.request.expirationYear,
        name: this.request.cardHolderName,
      };
      ChargeOver.CreditCard.validate(
        request,
        (code: number, message: any, response: any) => {
          console.log(code, message);
          if (code == 200) {
            this.isCardValid = true;
            this.showInformationError = false;
            this.cardNumberValidation();
          } else if (code == 400) {
            this.isCardValid = false;
            this.showInformationError = true;
          }
        }
      );
    }
  }

  public payNow() {
    this.v$.$touch();

    if (!this.v$.$invalid && this.isCardValid) {
      const payload = {
        company: this.store.getters.selectedFirmName,
        bill_addr1: this.request.billingAddress,
        bill_city: this.request.billingCity.name,
        bill_state: this.request.billingState.name,
        bill_postcode: this.request.postalCode,
        bill_country: this.request.country.name,
      };
      const cardDetails = {
        number: this.request.cardNumber,
        expdate_month: this.request.expirationMonth,
        expdate_year: this.request.expirationYear,
        name: this.request.cardHolderName,
        cvv: this.request.cvv,
        cardType: this.card
      };
      this.store.dispatch("updateCreditCard", cardDetails);
      this.store.dispatch("updateCustomer", payload);
      this.$emit("pay");
    }
  }

  public back() {
    this.$emit("back");
  }

  public closeModel() {
    this.showInformationError = false;
  }

  private cardNumberValidation() {
    this.card = "";
    const request = {
      number: this.request.cardNumber,
    };
    ChargeOver.CreditCard.type(
      request,
      (code: any, message: any, response: any) => {
        if (code == 200) this.card = response;
      }
    );
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