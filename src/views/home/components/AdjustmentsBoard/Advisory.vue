<template>
  <div class="tab-content tab-content-lg__scroll overflow-auto mt-4">
    <div class="d-flex fs-7 mt-10">
      <div class="fw-bolder">
        Do you charge a firm-wide standard minimum fee?
      </div>
      <div class="ms-5">
        <i class="fa fa-question-circle fs-4 text-dark"></i>
      </div>
    </div>
    <div class="d-flex align-items-center mt-6 ms-6">
      <div class="form-check form-check-solid form-switch mt-2 lh-lg">
        <input
          class="form-check-input"
          type="checkbox"
          v-model="request.firmMinimumFee"
        />
        <label class="fs-7 text-muted form-check-label">{{
          request.firmMinimumFee
            ? "Yes, I normally charge a minimum fee of "
            : "No firm-wide minimum fees"
        }}</label>
      </div>
      <template v-if="request.firmMinimumFee">
        <div class="row g-0 align-items-center">
          <div class="col-4">
            <div class="input-group input-group-solid ms-4">
              <span class="input-group-text">$</span>
              <input
                type="text"
                class="form-control text-start"
                v-model="request.minimumFeeAmount"
              />
            </div>
          </div>
          <div class="col-6 text-dark fw-bold ms-6">annual minimum</div>
        </div>
      </template>
    </div>

    <div class="d-flex fs-7 mt-10">
      <div class="fw-bolder">Do you limit fees to a firm-wide maximum fee?</div>
      <div class="ms-5">
        <i class="fa fa-question-circle fs-4 text-dark"></i>
      </div>
    </div>
    <div class="d-flex align-items-center mt-6 ms-6">
      <div class="form-check form-check-solid form-switch mt-2 lh-lg">
        <input
          class="form-check-input"
          type="checkbox"
          v-model="request.firmMaximumFee"
        />
        <label class="fs-7 text-muted form-check-label">{{
          request.firmMaximumFee
            ? "Yes, I normally cap fees at a maximum of "
            : "No firm-wide maximum fees"
        }}</label>
      </div>
      <template v-if="request.firmMaximumFee">
        <div class="row g-0 align-items-center">
          <div class="col-4">
            <div class="input-group input-group-solid ms-4">
              <span class="input-group-text">$</span>
              <input
                type="text"
                class="form-control text-start"
                v-model="request.maximumFeeAmount"
              />
            </div>
          </div>
          <div class="col-6 text-dark fw-bold ms-6">annual maximum</div>
        </div>
      </template>
    </div>

    <div class="d-flex fs-7 mt-10">
      <div class="fw-bolder">
        Do you adjust billing for deposits and withdrawals?
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
          >{{ request.adjustForFlows ? 'Yes, billing is adjusted for flows' : 'No, Ignore deposits and withdrawals'}}</label
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
          :data="flowThresholdType"
          @update="updateFlowThresholdType"
        />
      </div>

      <template v-if="request.flowThresholdType == 'DOLLAR_AMOUNT'">
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

      <template v-if="request.flowThresholdType == 'PERCENT'">
        <div class="d-flex fs-7 mt-10">
          <div class="fw-bolder">Please enter the % of AUM to use as your threshold</div>
          <div class="ms-5">
            <i class="fa fa-question-circle fs-4 text-dark"></i>
          </div>
        </div>
        <div class="mt-6 ms-6">
          <div class="input-group input-group-solid w-50">
            <input
              type="text"
              class="form-control text-start"
              v-model="request.flowThresholdValue"
            />
            <span class="input-group-text">%</span>
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

    <div class="d-flex justify-content-between mt-10 mb-5">
      <button class="btn btn-secondary" @click="prev">Back</button>
      <button
        class="btn btn-primary me-10"
        :class="{
          'btn-secondary': !formValidation || !minimumFee || !maximumFee,
          'btn-primary': formValidation && minimumFee && maximumFee,
        }"
        :disabled="!formValidation || !minimumFee || !maximumFee"
        @click="saveAdjustments"
      >
        Continue
      </button>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { Prop, Inject, Watch } from "vue-property-decorator";

import { useStore } from "vuex";

import { IFirmService } from "@/service";
import { ListItem, flowThresholdType, aumFeeTypes, aumDetails } from "@/model";

import SingleCheckBox from "@/components/controls/SingleCheckBox.vue";

@Options({
  components: {
    SingleCheckBox,
  },
})
export default class AdjustmentsBoard extends Vue {
  @Inject("firmService") service: IFirmService;
  @Prop() response: aumFeeTypes;

  public request: aumDetails = new aumDetails();
  public flowThresholdType: Array<ListItem> = [];
  public store = useStore();

  created() {
    this.flowThresholdType = Object.entries(flowThresholdType).map(
      ([key]) =>
        new ListItem(
          key,
          flowThresholdType[key as keyof typeof flowThresholdType]
        )
    );
  }

  mounted() {
    this.getAdjustments();
  }

  @Watch("response")
  getAdjustments() {
    if (this.response.aumDetails) this.request = this.response.aumDetails;
    else this.request = new aumDetails();

    this.bindValues();
  }

  public saveAdjustments() {
    this.request.firmId = this.store.getters.selectedFirmId;
    this.request.feeTypeName = this.response.feeTypeName;
    this.request.onboardingFeeTypeId = this.response.id;
    this.request.aumFeeTypeFlag = this.response.aumFlag;

    this.service
      ?.saveAdjustments(this.request)
      .then((response) => {
        if (response.status == "SUCCESS") this.$emit("next");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  public updateFlowThresholdType(value: string) {
    this.request.flowThresholdType = value;
  }

  private bindValues() {
    if (this.request.minimumFeeAmount) this.request.firmMinimumFee = true;
    if (this.request.maximumFeeAmount) this.request.firmMaximumFee = true;
    this.flowThresholdType.forEach((item: ListItem) => {
      if (item.value == this.request.flowThresholdType) item.selected = true;
      else item.selected = false;
    });
  }

  public prev() {
    this.$emit("prev");
  }

  get formValidation() {
    let valid = false;
    const self = this.request;

    if (self.adjustForFlows) {
      if (self.flowThresholdType != "NONE") {
        if (self.flowThresholdValue && !this.isNumeric(self.flowThresholdValue))
          valid = true;
        else valid = false;
      } else if (self.flowThresholdType == "NONE") valid = true;
      else valid = false;
    } else valid = true;

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