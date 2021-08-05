<template>
  <div class="tab-content tab-content-sm__scroll border-bottom">
    <div class="w-75 mx-auto mt-10">
      <p class="fs-3 fw-bolder pb-3 mb-5 border-bottom">
        General Information
        <i class="fa fa-question-circle fs-4 text-dark ms-4"></i>
      </p>

      <form @submit.prevent="saveGeneral">
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
          :controls="v$.request.companyAddress1"
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
                v-model="request.billingTypes"
                value="AUM_ADVISORY"
              />
              AUM Advisory
            </div>
            <div class="form-check form-check-solid form-check-inline fs-7">
              <input
                class="form-check-input"
                type="checkbox"
                v-model="request.billingTypes"
                value="ONE_TIME"
              />
              One Time
            </div>
            <div class="form-check form-check-solid form-check-inline fs-7">
              <input
                class="form-check-input"
                type="checkbox"
                v-model="request.billingTypes"
                value="SUBSCRIPTION"
              />
              Subscription
            </div>
          </div>
        </div>
        <div class="d-flex align-items-center justify-content-end pb-5">
          <button
            type="submit"
            class="btn"
            :class="{
              'btn-secondary': v$.request.$invalid,
              'btn-primary': !v$.request.$invalid,
            }"
            :disabled="v$.request.$invalid"
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
import { Inject } from "vue-property-decorator";

import useVuelidate from "@vuelidate/core";
import { required, numeric, minLength, maxLength } from "@vuelidate/validators";

import { useStore } from "vuex";
import { IFirmService } from "@/service";

import TextInput from "@/components/controls/TextInput.vue";
import SelectBox from "@/components/controls/SelectBox.vue";

import { generalBoardRequestModel, generalBoardResponseModel, firmRequestModel } from "@/model";

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
      companyAddress1: { required },
      city: { required },
      state: { required },
      postalCode: { required, numeric },
      billingTypes: { required }
    },
  },
})
export default class FeeTypesBoard extends Vue {
  @Inject("firmService") service: IFirmService | undefined;

  public v$: any = setup(() => this.validate());
  public store = useStore();

  validate() {
    return useVuelidate();
  }

  public request = new generalBoardRequestModel();

  mounted() {
    this.request.state = "Massachusetts";
    this.getGeneralDetails();
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

  public getGeneralDetails() {
    const request = new firmRequestModel();
    request.firmId = this.store.getters.selectedFirmId;
    request.firmDomain = this.store.getters.selectedFirmDomain;
    request.firmName = this.store.getters.selectedFirmName;
    this.service
      ?.getGeneralDetails(request)
      .then((response) => {
        this.request = response;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  public saveGeneral() {
    this.v$.$touch();

    if (!this.v$.$invalid) {
      this.request.firmId = this.store.getters.selectedFirmId;
      this.service
        ?.saveGeneral(this.request)
        .then((response: generalBoardResponseModel) => {
          if(response.status == 'SUCCESS') {
            this.$emit("next");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
}
</script>