<template>
  <div class="tab-content pb-5 border-bottom">
    <div class="tab-group mt-10">
      <div class="tab-header position-relative">
        <div class="tab-header__title position-absolute fw-bolder fs-4">
          Adjustments
        </div>
        <ul class="tab-label-group justify-content-center border-bottom">
          <li
            v-for="(item, index) in billingTypes"
            :key="index"
            class="tab-label pb-4"
            :class="{ 'tab-active-border-bottom': adjustmentsTab == item }"
            @click="adjustmentsTab = item"
          >
            {{ item }}
          </li>
        </ul>
      </div>
      <div class="tab-content-group m-0">
        <div
          class="tab-content tab-content-lg__scroll"
          v-if="adjustmentsTab == 'AUM Advisory'"
        >
          <div class="d-flex fs-7 mt-10">
            <div class="fw-bolder">
              Do you charge a firm-wide standard minimum fee?
            </div>
            <div class="ms-5">
              <i class="fa fa-question-circle fs-4 text-dark"></i>
            </div>
          </div>
          <div class="d-flex align-items-center mt-6 ms-6">
            <div class="form-check form-check-solid form-switch">
              <input
                class="form-check-input"
                type="checkbox"
                v-model="request.firmWideStandardMinimumFee"
              />
              <label class="fs-7 text-muted form-check-label"
                >No firm-wide minimum fees</label
              >
            </div>
            <template v-if="request.firmWideStandardMinimumFee">
              <div class="input-group input-group-solid w-25 ms-4">
                <span class="input-group-text">$</span>
                <input
                  type="text"
                  class="form-control text-start"
                  v-model="request.firmWideMinimumFeeAmount"
                />
              </div>
              <div class="ms-4">annual minimum</div>
            </template>
          </div>

          <div class="d-flex fs-7 mt-10">
            <div class="fw-bolder">
              Do you limit fees to a firm-wide maximum fee?
            </div>
            <div class="ms-5">
              <i class="fa fa-question-circle fs-4 text-dark"></i>
            </div>
          </div>
          <div class="d-flex align-items-center mt-6 ms-6">
            <div class="form-check form-check-solid form-switch">
              <input
                class="form-check-input"
                type="checkbox"
                v-model="request.firmWideMaximumFee"
              />
              <label class="fs-7 text-muted form-check-label"
                >No firm-wide minimum fees</label
              >
            </div>
            <template v-if="request.firmWideMaximumFee">
              <div class="input-group input-group-solid w-25 ms-4">
                <span class="input-group-text">$</span>
                <input
                  type="text"
                  class="form-control text-start"
                  v-model="request.firmWideMaximumFeeAmount"
                />
              </div>
              <div class="ms-4">annual maximum</div>
            </template>
          </div>

          <div class="d-flex fs-7 mt-10">
            <div class="fw-bolder">
              Do you adjust billing for deposits and withdrawls?
            </div>
            <div class="ms-5">
              <i class="fa fa-question-circle fs-4 text-dark"></i>
            </div>
          </div>
          <div class="mt-6 ms-6">
            <div class="form-check form-check-solid form-switch">
              <input
                class="form-check-input"
                type="checkbox"
                v-model="request.depositsAndWithdrawls"
              />
              <label class="fs-7 text-muted form-check-label"
                >Yes, billing is adjusted for flows</label
              >
            </div>
          </div>

          <template v-if="request.depositsAndWithdrawls">
            <div class="d-flex fs-7 mt-10">
              <div class="fw-bolder">
                Indicate whether you apply a threshold to flows.
              </div>
              <div class="ms-5">
                <i class="fa fa-question-circle fs-4 text-dark"></i>
              </div>
            </div>
            <div class="mt-6 ms-6">
              <single-checkBox
                :data="thresholdFlows"
                @update="updateThresholdFlows"
              />
            </div>

            <template v-if="request.thresholdFlows == 'Dollar amount'">
              <div class="d-flex fs-7 mt-10">
                <div class="fw-bolder">
                  Please enter the dollar amount of your threshold.
                </div>
                <div class="ms-5">
                  <i class="fa fa-question-circle fs-4 text-dark"></i>
                </div>
              </div>
              <div class="mt-6 ms-6">
                <div class="input-group input-group-solid w-50">
                  <span class="input-group-text">$</span>
                  <input
                    type="text"
                    class="form-control text-start"
                    v-model="request.thresholdFlowsAmount"
                  />
                </div>
              </div>
            </template>

            <template v-if="request.thresholdFlows == '% of AUM'">
              <div class="d-flex fs-7 mt-10">
                <div class="fw-bolder">
                  PLease enter the % aum of your threshold.
                </div>
                <div class="ms-5">
                  <i class="fa fa-question-circle fs-4 text-dark"></i>
                </div>
              </div>
              <div class="mt-6 ms-6">
                <div class="input-group input-group-solid w-50">
                  <span class="input-group-text">%</span>
                  <input
                    type="text"
                    class="form-control text-start"
                    v-model="request.thresholdFlowsAum"
                  />
                </div>
              </div>
            </template>
          </template>

          <div class="d-flex fs-7 mt-10">
            <div class="fw-bolder ms-4">
              Do you round fees to avoid charging cents?
            </div>
            <div class="ms-5">
              <i class="fa fa-question-circle fs-4 text-dark"></i>
            </div>
          </div>
          <div class="mt-6 ms-6">
            <div class="form-check form-check-solid form-switch">
              <input
                class="form-check-input"
                type="checkbox"
                v-model="request.avoidChargingCents"
              />
              <label class="fs-7 text-muted form-check-label"
                >No, I charge exact amounts</label
              >
            </div>
          </div>

          <div class="d-flex justify-content-between mt-10">
            <button class="btn btn-secondary" @click="prev">Back</button>
            <button 
              class="btn btn-primary me-10" 
              :class="{
                'btn-secondary': !formValidation || !minimumFee || !maximumFee,
                'btn-primary': formValidation && minimumFee && maximumFees,
              }"
              :disabled="!formValidation || !minimumFee || !maximumFee"
              @click="next"
            >  
              Continue
            </button>
          </div>
        </div>
        <div class="tab-content" v-if="adjustmentsTab == 'One Time'">
          {{ adjustmentsTab }}
        </div>
        <div class="tab-content" v-if="adjustmentsTab == 'Subscription'">
          {{ adjustmentsTab }}
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Options, setup } from "vue-class-component";
import { Prop } from "vue-property-decorator";

import useVuelidate from "@vuelidate/core";
import { required, numeric } from "@vuelidate/validators";

import { adjustmentsBoardModel } from "@/model";
import SingleCheckBox from "@/components/controls/SingleCheckBox.vue";

import { useStore } from "vuex";

@Options({
  components: {
    SingleCheckBox,
  },
  validations: {
    request: {
      firmWideMinimumFeeAmount: { required, numeric },
      firmWideMaximumFeeAmount: { required, numeric },
      thresholdFlowsAmount: { required, numeric },
      thresholdFlowsAum: { required, numeric }
    }
  }
})
export default class AdjustmentsBoard extends Vue {

  public adjustmentsTab: string = "";
  public request = new adjustmentsBoardModel();

  public thresholdFlows: Array<string> = ["Dollar amount", "% of AUM", "None"];

  public v$ = setup(() => this.validate());

  public store = useStore();
  public billingTypes: Array<string> | any = [];

  validate() {
    return useVuelidate();
  }

  created() {
    this.billingTypes = this.store.getters.billingTypes;
    this.adjustmentsTab = this.billingTypes[0];
  }

  public updateThresholdFlows(value: any) {
    this.request.thresholdFlows = value[0];
  }

  prev() {
    this.$emit("prev");
  }

  next() {
    console.log(this.v$);
    console.log(this.request);
    //this.$emit("next");

  }

  get formValidation() {
    let valid = false;
    const self = this.request;

    if(self.depositsAndWithdrawls) {
      if(self.thresholdFlows == "Dollar amount") {
        if(self.thresholdFlowsAmount) valid = true;
        else valid = false;
      } else if(self.thresholdFlows == "% of AUM") {
        if(self.thresholdFlowsAum) valid = true;
        else valid = false;
      } else if(self.thresholdFlows == "None") {
        valid = true;
      } else valid = false;
    } else valid = true;

    return valid;
  }

  get minimumFee() {
    let valid = false;
    const self = this.request;

    if(self.firmWideStandardMinimumFee) {
      if(self.firmWideMinimumFeeAmount != '' && !this.isNumeric(self.firmWideMinimumFeeAmount)) valid = true;
      else valid = false;
    } else valid = true;

    return valid;
  }

  get maximumFee() {
    let valid = false;
    const self = this.request;

    if(self.firmWideMaximumFee) {
      if(self.firmWideMaximumFeeAmount != '' && !this.isNumeric(self.firmWideMaximumFeeAmount)) valid = true;
      else valid = false;
    } else valid = true;

    return valid;
  }

  private isNumeric(value: any) {
    let validation = false;
    if (value && value != "") validation = /^(?=.*?[A-Za-z])/.test(value);

    return validation;
  }
}
</script>