<template>
  <div class="w-50 mx-auto m-4 p-4">
    <div class="d-flex align-items-center justify-content-lg-between">
      <div class="fw-bolder fs-3 text-light-black me-4 text-center">
        Enter a credit card details
      </div>
      <div>
        <img src="@/assets/mastercard.png" alt="Master Card" class="me-2" />
        <img src="@/assets/visa.png" alt="Visa Card" class="me-2" />
        <img src="@/assets/amex.png" alt="AMEX Card" class="me-2" />
        <img src="@/assets/discover.png" alt="Discover Card" class="me-2" />
      </div>
    </div>
    <form @submit.prevent="validateCard">
      <div class="mt-6 position-relative mb-8">
        <label class="form-label fw-bolder"> Card Number </label>
        <div class="input-group input-group-solid">
          <input
            type="text"
            v-model="v$.request.cardNumber.$model"
            class="form-control text-start"
            @input="validateCardNumber"
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
          v-if="
            !v$.request.cardNumber.required.$invalid &&
            v$.request.cardNumber.customNumeric.$invalid
          "
        >
          Please enter valid card number
        </div>
        <div
          class="invalid-feedback position-absolute m-0"
          v-if="
            !v$.request.cardNumber.required.$invalid &&
            !v$.request.cardNumber.customNumeric.$invalid &&
            v$.request.cardNumber.minLength.$invalid
          "
        >
          Minimum 15 or 16 characters
        </div>
        <div
          class="invalid-feedback position-absolute m-0"
          v-if="
            !v$.request.cardNumber.required.$invalid &&
            !v$.request.cardNumber.customNumeric.$invalid &&
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
              '09',
              '10',
              '11',
              '12',
            ]"
            :validation="['required']"
            formFieldType="inputBlock"
          />
        </div>
        <div class="col-4">
          <SelectBox
            label="Expiration Year"
            :controls="v$.request.expirationYear"
            :data="expirationYear"
            :validation="['required']"
            formFieldType="inputBlock"
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
            @updateEvent="v$.request.cvv.$model = v$.request.cvv.$model.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');"
          />
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
            @updateEvent="v$.request.postalCode.$model = v$.request.postalCode.$model.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');"
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
      message="Credit card information is not valid"
      @closeInformationModel="closeModel"
      v-if="showInformationError"
    />
  </div>
</template>
<script lang="ts">
import { Vue, Options, setup } from "vue-class-component";

import { useStore } from "vuex";

import useVuelidate from "@vuelidate/core";
import { required, numeric, minLength, maxLength } from "@vuelidate/validators";

import TextInput from "@/components/controls/TextInput.vue";
import SelectBox from "@/components/controls/SelectBox.vue";
import Information from "@/components/Models/Information.vue";

import { creditCardRequestModel } from "@/model";

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
        customNumeric: (value: any) => {
          let validation = false;
          if (value && value != "" && /^[0-9 -]+$/.test(value)) {
            validation = true;
          }
          return validation;
        },
        minLength: (value: any) => {
          let validation = false;
          if (value && value != "") {
            value = value.replaceAll(" ", "");
            value = value.replaceAll("-", "");
            if (value.length == 16 || value.length == 15) validation = true;
          }
          return validation;
        },
        maxLength: (value: any) => {
          let validation = false;
          if (value && value != "") {
            value = value.replaceAll(" ", "");
            value = value.replaceAll("-", "");
            if (value.length == 16 || value.length == 15) validation = true;
          }
          return validation;
        },
      },
      expirationMonth: {
        required,
      },
      expirationYear: {
        required,
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
  public request: creditCardRequestModel = new creditCardRequestModel();
  public store = useStore();
  public card: string = "";
  public showInformationError: boolean = false;

  public v$: any = setup(() => this.validate());

  public validate() {
    return useVuelidate();
  }

  created() {
    this.request.country = "United States";
    this.request.billingState = this.state[0];
  }

  public validateCardNumber() {
    this.card = "";
    this.request.cardNumber = this.request.cardNumber.replaceAll(" ", "");
    this.request.cardNumber = this.request.cardNumber.replaceAll("-", "");
    let visaRegex = new RegExp("^4[0-9]{0,15}$"),
      mastercardRegex = new RegExp("^5$|^5[1-5][0-9]{0,14}$"),
      amexRegex = new RegExp("^3$|^3[47][0-9]{0,13}$"),
      dicoverRegex = new RegExp(
        "^6$|^6[05]$|^601[1]?$|^65[0-9][0-9]?$|^6(?:011|5[0-9]{2})[0-9]{0,12}$"
      );
    if (this.request.cardNumber.match(visaRegex)) {
      this.card = "visa";
    } else if (this.request.cardNumber.match(mastercardRegex)) {
      this.card = "mast";
    } else if (this.request.cardNumber.match(amexRegex)) {
      this.card = "amex";
    } else if (this.request.cardNumber.match(dicoverRegex)) {
      this.card = "disc";
    }

    let value = this.request.cardNumber
      ? this.request.cardNumber.match(/.{1,4}/g).join("-")
      : "";
    this.request.cardNumber = value;
  }

  public validateCard() {
    this.v$.$touch();
    this.showInformationError = false;

    if (!this.v$.$invalid) {
      let request = {
        number: this.request.cardNumber,
        expdate_month: this.request.expirationMonth,
        expdate_year: this.request.expirationYear,
        name: this.request.cardHolderName,
        cvv: this.request.cvv,
        address: this.request.billingAddress,
        city: this.request.billingCity,
        state: this.request.billingState,
        postcode: this.request.postalCode,
        country: this.request.country,
      };
      ChargeOver.CreditCard.validate(
        request,
        (code: number, message: any, response: any) => {
          if (code == 200) {
            this.showInformationError = false;
            this.updateCardDetails();
          } else if (code == 400) {
            this.showInformationError = true;
          }
        }
      );
    }
  }
  private updateCardDetails() {
    let address = {
      company: this.firms.name,
      bill_addr1: this.request.billingAddress,
      bill_city: this.request.billingCity,
      bill_state: this.request.billingState,
      bill_postcode: this.request.postalCode,
      bill_country: this.request.country,
    };
    let cardDetails = {
      number: this.request.cardNumber,
      expdate_month: this.request.expirationMonth,
      expdate_year: this.request.expirationYear,
      name: this.request.cardHolderName,
      cvv: this.request.cvv,
      cardType: this.card,
    };
    this.store.dispatch("updateCreditCard", cardDetails);
    this.store.dispatch("updateAddress", address);
    this.$emit("pay");
  }

  public back() {
    this.$emit("back");
  }

  public closeModel() {
    this.showInformationError = false;
  }

  get state() {
    return this.store.getters.states;
  }

  get firms() {
    return this.store.getters.firms;
  }

  get expirationYear() {
    let currentYear = new Date().getFullYear(),
      data: any[] = [];
    for (let i = 0; i < 20; i++) {
      data.push(currentYear + i);
    }
    return data;
  }
}
</script>