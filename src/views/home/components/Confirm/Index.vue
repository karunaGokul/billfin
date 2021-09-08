<template>
  <div class="tab-content tab-content-sm__scroll overflow-auto border-bottom">
    <div class="p-8">
      <p class="fs-3 fw-bolder pb-3 mb-5 border-bottom">Confirm your setup</p>

      <p class="fs-3 fw-bolder pb-3 mb-5">General</p>

      <div class="row ps-4 pe-4 mt-5 pb-5">
        <div class="col-lg-8">
          <div class="fw-bolder">Company</div>
        </div>
        <div class="col-lg-4">
          {{ generalResponse.company }}
        </div>
      </div>

      <div class="row ps-4 pe-4 mt-5 pb-5">
        <div class="col-lg-8">
          <div class="fw-bolder">Company Phone</div>
        </div>
        <div class="col-lg-4">
          {{ generalResponse.companyPhone }}
        </div>
      </div>

      <div class="row ps-4 pe-4 mt-5 pb-5">
        <div class="col-lg-8">
          <div class="fw-bolder">Company Site</div>
        </div>
        <div class="col-lg-4">
          {{ generalResponse.companyDomain }}
        </div>
      </div>

      <div class="row ps-4 pe-4 mt-5 pb-5">
        <div class="col-lg-8">
          <div class="fw-bolder">Company Address</div>
        </div>
        <div class="col-lg-4">
          {{ generalResponse.companyAddress1 }}
        </div>
      </div>

      <div class="row ps-4 pe-4 mt-5 pb-5">
        <div class="col-lg-8">
          <div class="fw-bolder">City</div>
        </div>
        <div class="col-lg-4">
          {{ generalResponse.city }}
        </div>
      </div>

      <div class="row ps-4 pe-4 mt-5 pb-5">
        <div class="col-lg-8">
          <div class="fw-bolder">State</div>
        </div>
        <div class="col-lg-4">
          {{ generalResponse.state }}
        </div>
      </div>

      <div class="row ps-4 pe-4 mt-5 pb-5">
        <div class="col-lg-8">
          <div class="fw-bolder">Postal Code</div>
        </div>
        <div class="col-lg-4">
          {{ generalResponse.postalCode }}
        </div>
      </div>

      <fee-types-advisory />

      <p class="fs-3 fw-bolder pb-3 mb-5 pt-5 border-top">
        Frequency & Timing
      </p>

      <div
        v-for="(item, index) in frequencyRequest.aumFeeTypes"
        :key="index"
        class="ps-4 pe-4"
      >
        <p class="fw-bolder pb-3 mb-5 text-dark text-center border-bottom">
          {{ item.feeTypeName }}
        </p>

        <frequency-advisory :response="item" v-if="item" />
      </div>

      <p class="fs-3 fw-bolder pb-3 mb-5 pt-5 border-top">
        Methodologies
      </p>

      <div
        v-for="(item, index) in methodologiesRequest.aumFeeTypes"
        :key="index"
        class="ps-4 pe-4"
      >
        <p
          class="fw-bolder pb-3 mb-5 text-dark text-center border-bottom"
          v-if="item.aumFlag"
        >
          {{ item.feeTypeName }}
        </p>

        <methodologies-advisory :response="item" v-if="item && item.aumFlag" />
      </div>

      <p class="fs-3 fw-bolder pb-3 mb-5 pt-5 border-top">
        Adjustments
      </p>

      <div
        v-for="(item, index) in adjustmentsResponse.aumFeeTypes"
        :key="index"
        class="ps-4 pe-4"
      >
        <p class="fw-bolder pb-3 mb-5 text-dark text-center border-bottom" v-if="item.aumFlag">
          {{ item.feeTypeName }}
        </p>

        <adjustments-advisory :response="item" v-if="item && item.aumFlag" />
      </div>

      <div class="d-flex justify-content-between mt-10">
        <button class="btn btn-secondary" @click="back">Back</button>
        <button class="btn me-10 btn-primary" @click="confirm">Continue</button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { Inject } from "vue-property-decorator";

import { useStore } from "vuex";
import { IFirmService } from "@/service";
import {
  firmRequestModel,
  generalBoardRequestModel,
  frequencyRequestModel
} from "@/model";

import MultiCheckBox from "@/components/controls/MultiCheckBox.vue";
import SelectBox from "@/components/controls/SelectBox.vue";

import FeeTypesAdvisory from "./FeeTypesAdvisory.vue";
import FrequencyAdvisory from "./FrequencyAdvisory.vue";
import MethodologiesAdvisory from "./MethodologiesAdvisory.vue";
import AdjustmentsAdvisory from "./AdjustmentsAdvisory.vue";

@Options({
  components: {
    MultiCheckBox,
    SelectBox,
    FeeTypesAdvisory,
    FrequencyAdvisory,
    MethodologiesAdvisory,
    AdjustmentsAdvisory
  },
})
export default class ConfirmBoard extends Vue {
  @Inject("firmService") service: IFirmService;
  public store = useStore();
  public generalResponse = new generalBoardRequestModel();

  public frequencyRequest: frequencyRequestModel = new frequencyRequestModel();
  public methodologiesRequest: frequencyRequestModel = new frequencyRequestModel();
  public adjustmentsResponse: frequencyRequestModel = new frequencyRequestModel();

  mounted() {
    this.getGeneralDetails();
    this.getFrequncyAndTiming();
    this.getMethodologies();
    this.getAdjustments();
  }

  public getGeneralDetails() {
    const request = new firmRequestModel();
    request.firmId = this.store.getters.selectedFirmId;
    request.firmDomain = this.store.getters.selectedFirmDomain;
    request.firmName = this.store.getters.selectedFirmName;
    this.service
      ?.getGeneralDetails(request)
      .then((response) => {
        this.generalResponse = response;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  public back() {
    this.$emit("prev");
  }

  private getFrequncyAndTiming() {
    const request = new firmRequestModel();
    request.firmId = this.store.getters.selectedFirmId;
    this.service
      .getFrequencyAndTiming(request)
      .then((response) => {
        this.frequencyRequest = response;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  private getMethodologies() {
    const request = new firmRequestModel();
    request.firmId = this.store.getters.selectedFirmId;

    this.service
      ?.getMethodologies(request)
      .then((response) => {
        this.methodologiesRequest = response;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  private getAdjustments() {
    const request = new firmRequestModel();
    request.firmId = this.store.getters.selectedFirmId;

    this.service
      ?.getAdjustments(request)
      .then((response) => {
        this.adjustmentsResponse = response;
      })
      .catch((err) => {
        console.log(err);
      });
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
}
</script>