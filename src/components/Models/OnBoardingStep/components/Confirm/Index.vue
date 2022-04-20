<template>
  <div class="tab-content tab-content-sm__scroll overflow-auto border-bottom">
    <div class="p-8">
      <p class="fs-3 fw-bolder pb-3 mb-5 border-bottom">Confirm your setup</p>

      <p class="fs-3 text-center fw-bolder pb-4 mb-5 border-bottom">General</p>

      <div class="row g-0 ps-4 pe-4 mt-5 pb-5">
        <div class="col-lg-9">
          <div class="fw-bolder">Company</div>
        </div>
        <div class="col-lg-3">
          {{ generalResponse.company }}
        </div>
      </div>

      <div class="row g-0 ps-4 pe-4 mt-5 pb-5">
        <div class="col-lg-9">
          <div class="fw-bolder">Company Phone</div>
        </div>
        <div class="col-lg-3">
          {{ generalResponse.companyPhone }}
        </div>
      </div>

      <div class="row g-0 ps-4 pe-4 mt-5 pb-5">
        <div class="col-lg-9">
          <div class="fw-bolder">Company Site</div>
        </div>
        <div class="col-lg-3">
          {{ generalResponse.companyDomain }}
        </div>
      </div>

      <div class="row g-0 ps-4 pe-4 mt-5 pb-5">
        <div class="col-lg-9">
          <div class="fw-bolder">Company Address</div>
        </div>
        <div class="col-lg-3">
          {{ generalResponse.companyAddress1 }}
        </div>
      </div>

      <div class="row g-0 ps-4 pe-4 mt-5 pb-5">
        <div class="col-lg-9">
          <div class="fw-bolder">City</div>
        </div>
        <div class="col-lg-3">
          {{ generalResponse.city }}
        </div>
      </div>

      <div class="row g-0 ps-4 pe-4 mt-5 pb-5">
        <div class="col-lg-9">
          <div class="fw-bolder">State</div>
        </div>
        <div class="col-lg-3">
          {{ generalResponse.state }}
        </div>
      </div>

      <div class="row g-0 ps-4 pe-4 mt-5 pb-5">
        <div class="col-lg-9">
          <div class="fw-bolder">Postal Code</div>
        </div>
        <div class="col-lg-3">
          {{ generalResponse.postalCode }}
        </div>
      </div>

      <fee-types-advisory />

      <p class="fs-3 text-center fw-bolder pb-3 mb-5 pt-5 border-top">
        Frequency & Timing
      </p>

      <div
        v-for="(item, index) in frequencyRequest.aumFeeTypes"
        :key="index"
        class="ps-4 pe-4"
      >
        <p class="fw-bolder pb-3 mb-5 text-dark border-bottom">
          {{ item.feeTypeName }}
        </p>

        <frequency-advisory :response="item" v-if="item" />
      </div>

      <p
        class="fs-3 text-center fw-bolder pb-3 mb-5 pt-5 border-top"
        v-if="methodologiesRequest.aumFeeTypes.length > 0"
      >
        Methodologies
      </p>

      <div
        v-for="(item, index) in methodologiesRequest.aumFeeTypes"
        :key="index"
        class="ps-4 pe-4"
      >
        <p class="fw-bolder pb-5 mb-5 text-dark border-bottom">
          {{ item.feeTypeName }}
        </p>

        <methodologies-advisory :response="item" v-if="item && item.aumFlag" />
      </div>

      <p
        class="fs-3 text-center fw-bolder pb-3 mb-5 pt-5 border-top"
        v-if="adjustmentsResponse.aumFeeTypes.length > 0"
      >
        Adjustments
      </p>

      <div
        v-for="(item, index) in adjustmentsResponse.aumFeeTypes"
        :key="index"
        class="ps-4 pe-4"
      >
        <p
          class="fw-bolder pb-3 mb-5 text-dark border-bottom"
          v-if="item.aumFlag"
        >
          {{ item.feeTypeName }}
        </p>

        <adjustments-advisory :response="item" v-if="item && item.aumFlag" />
      </div>

      <div class="d-flex justify-content-between m-0">
        <button class="btn btn-secondary" @click="back">Back</button>
        <button class="btn btn-primary" @click="confirm">Finish</button>
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
  frequencyRequestModel,
} from "@/model";

import BaseComponent from "@/components/base/BaseComponent.vue";

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
    AdjustmentsAdvisory,
  },
})
export default class ConfirmBoard extends BaseComponent {
  @Inject("firmService") service: IFirmService;
  public store = useStore();
  public generalResponse = new generalBoardRequestModel();

  public frequencyRequest: frequencyRequestModel = new frequencyRequestModel();
  public methodologiesRequest: frequencyRequestModel =
    new frequencyRequestModel();
  public adjustmentsResponse: frequencyRequestModel =
    new frequencyRequestModel();

  mounted() {
    this.getGeneralDetails();
    this.getFrequncyAndTiming();
    this.getMethodologies();
    this.getAdjustments();
  }

  public getGeneralDetails() {
    this.service
      .getGeneralDetails()
      .then((response) => {
        this.generalResponse = response;
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

  public back() {
    this.$emit("prev");
  }

  private getFrequncyAndTiming() {
    const request = new firmRequestModel();
    this.service
      .getFrequencyAndTiming(request)
      .then((response) => {
        this.frequencyRequest = response;
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

  private getMethodologies() {
    this.service
      .getMethodologies()
      .then((response) => {
        response.aumFeeTypes.forEach((item) => {
          if (item.aumFlag) this.methodologiesRequest.aumFeeTypes.push(item);
        });
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

  private getAdjustments() {
    const request = new firmRequestModel();

    this.service
      ?.getAdjustments(request)
      .then((response) => {
        response.aumFeeTypes.forEach((item) => {
          if (item.aumFlag) this.adjustmentsResponse.aumFeeTypes.push(item);
        });
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

  public confirm() {
    const request = new firmRequestModel();
    this.service
      .saveConfirm(request)
      .then((response) => {
        this.$emit("close");
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

  get firms() {
    return this.store.getters.firms;
  }
}
</script>