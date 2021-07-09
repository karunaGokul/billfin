<template>
  <div class="tab-content tab-content-sm__scroll border-bottom">
    <div class="w-75 mx-auto mt-10">
      <p class="fs-3 fw-bolder pb-3 mb-5 border-bottom">
        General Information
        <i class="fa fa-question-circle fs-4 text-dark ms-4"></i>
      </p>

      <form @submit.prevent="updateGeneral">
        <TextInput
          label="Company"
          inputType="text"
          formFieldType="inputInline"
          :controls="v$.request.company"
          :validation="['required']"
          :readonly="false"
        />
        <TextInput
          label="Company Phone"
          inputType="text"
          formFieldType="inputInline"
          :controls="v$.request.companyPhone"
          :validation="['required']"
          :readonly="false"
        />
        <TextInput
          label="Company Domain"
          inputType="text"
          formFieldType="inputInline"
          :controls="v$.request.companyDomain"
          :validation="['required']"
          :readonly="true"
        />
        <TextInput
          label="Company Address"
          inputType="text"
          formFieldType="inputInline"
          :controls="v$.request.companyAddress"
          :validation="['required']"
          :readonly="false"
        />
        <TextInput
          label="City"
          inputType="text"
          formFieldType="inputInline"
          :controls="v$.request.city"
          :validation="['required']"
          :readonly="false"
        />
        <SelectBox
          label="State"
          :controls="v$.request.state"
          :data="states"
          :validation="['required']"
        />
        <TextInput
          label="Postal Code"
          inputType="text"
          formFieldType="inputInline"
          :controls="v$.request.postalCode"
          :validation="['required', 'numeric']"
          :readonly="false"
        />
        <div class="mb-5 row g-0 align-items-center">
          <div class="col-sm-4">
            <div class="col-form-label pb-0 fw-bolder">
              Which fees do you bill?
              <i class="fa fa-question-circle fs-4 text-dark ms-4"></i>
            </div>
            <div class="text-muted">Check all that apply</div>
          </div>

          <div class="col-sm-8">
            <div class="form-check form-check-solid form-check-inline fs-7">
              <input
                class="form-check-input"
                type="checkbox"
                v-model="request.feesBill"
                value="AUM Advisory"
              />
              AUM Advisory
            </div>
            <div class="form-check form-check-solid form-check-inline fs-7">
              <input
                class="form-check-input"
                type="checkbox"
                v-model="request.feesBill"
                value="One Time"
              />
              One Time
            </div>
            <div class="form-check form-check-solid form-check-inline fs-7">
              <input
                class="form-check-input"
                type="checkbox"
                v-model="request.feesBill"
                value="Subscription"
              />
              Subscription
            </div>
          </div>
        </div>
        <div class="d-flex align-items-center justify-content-end pb-5">
          <!--<button
            type="submit"
            class="btn"
            :class="{
              'btn-secondary': v$.$invalid,
              'btn-primary': !v$.$invalid,
            }"
            :disabled="v$.$invalid"
          >
            Continue
          </button>-->
          <button
            type="submit"
            class="btn btn-primary"
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Options, setup } from "vue-class-component";

import useVuelidate from "@vuelidate/core";
import { required, numeric, minLength, maxLength } from "@vuelidate/validators";

import TextInput from "@/components/controls/TextInput.vue";
import SelectBox from "@/components/controls/SelectBox.vue";

import { generalBoardRequestModel } from "@/model";

@Options({
  components: {
    TextInput,
    SelectBox,
  },
  validations: {
    request: {
      company: { required },
      companyPhone: { required },
      companyDomain: { required },
      companyAddress: { required },
      city: { required },
      state: { required },
      postalCode: { required, numeric },
      feesBill: { required },
    },
  },
})
export default class GeneralBoard extends Vue {
  public v$ = setup(() => this.validate());

  validate() {
    return useVuelidate();
  }

  public request = new generalBoardRequestModel();

  mounted() {
    this.request.state = "Massachusetts";
  }

  public states: Array<string> = [
    "Alabama",
    "Alaska",
    "American Samoa",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "District Of Columbia",
    "Federated States Of Micronesia",
    "Florida",
    "Georgia",
    "Guam",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Marshall Islands",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Northern Mariana Islands",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Palau",
    "Pennsylvania",
    "Puerto Rico",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virgin Islands",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming",
  ];

  public updateGeneral() {
    this.v$.$touch();
    this.$emit("controlTabs", this.request.feesBill);
    this.$emit("next");
    /*if (!this.v$.$invalid) {
      console.log(this.request);
      this.$emit("controlTabs", this.request.feesBill);
      this.$emit("next");
    }*/
  }
}
</script>