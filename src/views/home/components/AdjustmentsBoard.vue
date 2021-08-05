<template>
  <div class="tab-content pb-5 border-bottom">
    <div class="tab-group mt-10">
      <div class="tab-header position-relative">
        <div class="tab-header__title position-absolute fw-bolder fs-4">
          Adjustments
        </div>
        <ul class="tab-label-group justify-content-center border-bottom">
          <li
            v-for="(item, index) in billingTypes[0]"
            :key="index"
            class="tab-label pb-4"
            :class="{
              'tab-active-border-bottom': adjustmentsTab == item.value,
            }"
          >
            {{ item.value }}
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
                v-model="request.firmMinimumFee"
              />
              <label class="fs-7 text-muted form-check-label"
                >No firm-wide minimum fees</label
              >
            </div>
            <template v-if="request.firmMinimumFee">
              <div class="input-group input-group-solid w-25 ms-4">
                <span class="input-group-text">$</span>
                <input
                  type="text"
                  class="form-control text-start"
                  v-model="request.minimumFeeAmount"
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
                v-model="request.firmMaximumFee"
              />
              <label class="fs-7 text-muted form-check-label"
                >No firm-wide minimum fees</label
              >
            </div>
            <template v-if="request.firmMaximumFee">
              <div class="input-group input-group-solid w-25 ms-4">
                <span class="input-group-text">$</span>
                <input
                  type="text"
                  class="form-control text-start"
                  v-model="request.maximumFeeAmount"
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
                v-model="request.adjustForFlows"
              />
              <label class="fs-7 text-muted form-check-label"
                >Yes, billing is adjusted for flows</label
              >
            </div>
          </div>

          <template v-if="request.adjustForFlows">
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
                :data="feeScheduleRateType"
                @update="updatefeeScheduleRateType"
              />
            </div>

            <template v-if="request.feeScheduleRateType == 'DOLLAR_AMOUNT'">
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
                    v-model="request.flowThresholdValue"
                  />
                </div>
              </div>
            </template>

            <template v-if="request.feeScheduleRateType == 'PERCENTAGES'">
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
                    v-model="request.flowThresholdValue"
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
                v-model="request.dollarRoundingFlag"
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
                'btn-primary': formValidation && minimumFee && maximumFee,
              }"
              :disabled="!formValidation || !minimumFee || !maximumFee"
              @click="saveFrequncyAndTiming"
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
import { Inject } from "vue-property-decorator";

import { useStore } from "vuex";
import useVuelidate from "@vuelidate/core";
import { required, numeric } from "@vuelidate/validators";

import { IFirmService } from "@/service";
import {
  firmRequestModel,
  adjustmentsBoardRequestModel,
  ListItem,
  feeScheduleRateType,
  PayorType
} from "@/model";

import SingleCheckBox from "@/components/controls/SingleCheckBox.vue";

@Options({
  components: {
    SingleCheckBox,
  },
  validations: {
    request: {
      minimumFeeAmount: { required, numeric },
      maximumFeeAmount: { required, numeric },
      feeScheduleRateTypeAmount: { required, numeric },
      feeScheduleRateTypeAum: { required, numeric },
    },
  },
})
export default class AdjustmentsBoard extends Vue {
  @Inject("firmService") service: IFirmService;

  public adjustmentsTab: string = "";
  public request = new adjustmentsBoardRequestModel();

  public feeScheduleRateType: Array<ListItem> = [];

  public v$ = setup(() => this.validate());

  public store = useStore();
  public billingTypes: Array<string> | any = [];

  validate() {
    return useVuelidate();
  }

  created() {
    this.feeScheduleRateType = Object.entries(feeScheduleRateType).map(
      ([key]) =>
        new ListItem(
          key,
          feeScheduleRateType[key as keyof typeof feeScheduleRateType]
        )
    );

    this.billingTypes = this.store.getters.billingTypes;
    this.adjustmentsTab = this.billingTypes[0].value;
  }

  mounted() {
    this.getAdjustments();
  }

  private getAdjustments() {
    const request = new firmRequestModel();
    request.firmId = this.store.getters.selectedFirmId;
    this.service
      ?.getAdjustments(request)
      .then((response) => {
        this.request = response;
        this.bindValues(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  public saveFrequncyAndTiming() {
    this.request.payorType = PayorType.INVESTOR_CLIENT;
    this.request.billingType = "AUM_ADVISORY";
    this.request.firmId = this.store.getters.selectedFirmId;
    this.request.feeTypeCode = "CF";

    this.service
      ?.saveAdjustments(this.request)
      .then((response) => {
        //this.$emit("next", this.nextTab);
        
      })
      .catch((err) => {
        console.log(err);
      });
  }

  public updatefeeScheduleRateType(value: string) {
    this.request.feeScheduleRateType = value;
  }

  private bindValues(response: adjustmentsBoardRequestModel) {
    if(this.request.minimumFeeAmount) this.request.firmMinimumFee = true;
    if(this.request.maximumFeeAmount) this.request.firmMaximumFee = true;
  }

  public prev() {
    this.$emit("prev");
  }

  public next() {
    console.log(this.v$);
    console.log(this.request);
    //this.$emit("next");
  }

  get formValidation() {
    let valid = false;
    const self = this.request;

    if (self.adjustForFlows) {
      if (self.feeScheduleRateType) {
        if (self.flowThresholdValue && !this.isNumeric(self.flowThresholdValue))
          valid = true;
        else valid = false;
      } else if (self.feeScheduleRateType == "NONE") valid = true;
      else valid = false;
    } else valid = false;

    return valid;
  }

  get minimumFee() {
    let valid = false;
    const self = this.request;

    if (self.firmMinimumFee) {
      if (self.minimumFeeAmount && !this.isNumeric(self.minimumFeeAmount))
        valid = true;
      else valid = false;
    } else valid = true;

    return valid;
  }

  get maximumFee() {
    let valid = false;
    const self = this.request;

    if (self.firmMaximumFee) {
      if (self.maximumFeeAmount && !this.isNumeric(self.maximumFeeAmount))
        valid = true;
      else valid = false;
    } else valid = true;

    return valid;
  }

  private isNumeric(value: any) {
    let validation = false;
    if (value) validation = /^(?=.*?[A-Za-z])/.test(value);

    return validation;
  }
}
</script>