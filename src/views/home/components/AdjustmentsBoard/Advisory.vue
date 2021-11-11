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
          @change="updateMinimunFee"
        />
        <label class="fs-7 text-muted form-check-label">{{
          request.firmMinimumFee
            ? "Yes, I normally charge a minimum fee of "
            : "No firm-wide minimum fees"
        }}</label>
      </div>
      <template v-if="request.firmMinimumFee">
        <div class="row g-0 align-items-center">
          <div class="col-5">
            <div class="input-group input-group-solid ms-4">
              <span class="input-group-text">$</span>
              <input
                type="text"
                class="form-control text-start"
                v-model="request.minimumFeeAmount"
                @input="maximumFeeValidation"
                @blur="convertMinimunFeeDollar"
              />
            </div>
          </div>
          <div class="col-5 text-dark fw-bold ms-6">annual minimum</div>
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
          @change="updateMaximunFee"
        />
        <label class="fs-7 text-muted form-check-label">{{
          request.firmMaximumFee
            ? "Yes, I normally cap fees at a maximum of "
            : "No firm-wide maximum fees"
        }}</label>
      </div>
      <template v-if="request.firmMaximumFee">
        <div class="row g-0 align-items-center">
          <div class="col-5">
            <div
              class="input-group input-group-solid ms-4"
              :class="{
                'border border-danger': maximumFeeError,
              }"
              :title="
                maximumFeeError
                  ? 'Maximum Fee should be greater than Minimum fee'
                  : ''
              "
            >
              <span class="input-group-text">$</span>
              <input
                type="text"
                class="form-control text-start"
                v-model="request.maximumFeeAmount"
                @input="maximumFeeValidation"
                @blur="convertMaximumFeeDollar"
              />
            </div>
          </div>
          <div class="col-5 text-dark fw-bold ms-6">annual maximum</div>
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
          @change="updateAdjustForFlows"
        />
        <label class="fs-7 text-muted form-check-label">{{
          request.adjustForFlows
            ? "Yes, billing is adjusted for flows"
            : "No, Ignore deposits and withdrawals"
        }}</label>
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
              @change="updateFlowThresholdValue"
            />
          </div>
        </div>
      </template>

      <template v-if="request.flowThresholdType == 'PERCENT'">
        <div class="d-flex fs-7 mt-10">
          <div class="fw-bolder">
            Please enter the % of AUM to use as your threshold
          </div>
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
        <label class="fs-7 text-muted form-check-label">{{
          request.dollarRoundingFlag
            ? "Yes, I do want to round fees"
            : " No, I charge exact amount"
        }}</label>
      </div>
    </div>

    <div class="d-flex justify-content-between mt-10 mb-5">
      <button class="btn btn-secondary" @click="prev">Back</button>
      <button
        class="btn btn-primary me-10"
        :class="{
          'btn-secondary':
            !formValidation || !minimumFee || !maximumFee || !validation,
          'btn-primary':
            formValidation && minimumFee && maximumFee && validation,
        }"
        :disabled="!formValidation || !minimumFee || !maximumFee || !validation"
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
import { ListItem, FlowThresholdType, aumFeeTypes, aumDetails } from "@/model";

import SingleCheckBox from "@/components/controls/SingleCheckBox.vue";

@Options({
  components: {
    SingleCheckBox,
  },
})
export default class Advisory extends Vue {
  @Inject("firmService") service: IFirmService;
  @Prop() response: aumFeeTypes;

  public request: aumDetails = new aumDetails();
  public flowThresholdType: Array<ListItem> = [];
  public store = useStore();

  public maximumFeeError: boolean = false;

  created() {
    this.flowThresholdType = Object.entries(FlowThresholdType).map(
      ([key]) =>
        new ListItem(
          key,
          FlowThresholdType[key as keyof typeof FlowThresholdType]
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
    let request: aumDetails = new aumDetails();

    request = this.$vuehelper.clone(this.request);
    request.firmId = this.firms.firmId;
    request.feeTypeName = this.response.feeTypeName;
    request.onboardingFeeTypeId = this.response.id;
    request.aumFeeTypeFlag = this.response.aumFlag;

    request.minimumFeeAmount = this.$currencyToNumber(request.minimumFeeAmount);
    request.maximumFeeAmount = this.$currencyToNumber(request.maximumFeeAmount);

    if (request.flowThresholdType == "DOLLAR_AMOUNT")
      request.flowThresholdValue = this.$currencyToNumber(
        request.flowThresholdValue
      );
    else if (request.flowThresholdType == "PERCENT")
      request.flowThresholdValue = this.$currencyToNumber(
        request.flowThresholdValue
      );

    this.service
      ?.saveAdjustments(request)
      .then((response) => {
        if (response.status == "SUCCESS") this.$emit("next", response);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  private bindValues() {
    if (this.request.minimumFeeAmount) {
      this.request.firmMinimumFee = true;
      this.convertMinimunFeeDollar();
    }
    if (this.request.maximumFeeAmount) {
      this.request.firmMaximumFee = true;
      this.convertMaximumFeeDollar();
    }
    this.flowThresholdType.forEach((item: ListItem) => {
      if (item.value == this.request.flowThresholdType) item.selected = true;
      else item.selected = false;
    });
  }

  public updateMinimunFee() {
    if (!this.request.firmMinimumFee) this.request.minimumFeeAmount = null;
  }

  public updateMaximunFee() {
    if (!this.request.firmMaximumFee) this.request.maximumFeeAmount = null;
  }

  public updateAdjustForFlows() {
    if (!this.request.adjustForFlows) {
      this.request.flowThresholdType = null;
      this.request.flowThresholdValue = null;
    }
  }

  public updateFlowThresholdType(value: string) {
    this.request.flowThresholdType = value;
    this.request.flowThresholdValue = "";
  }

  public updateFlowThresholdValue() {
    if (this.request.flowThresholdType == "DOLLAR_AMOUNT")
      this.request.flowThresholdValue = this.updateCurrency(
        this.request.flowThresholdValue
      );
    else if (this.request.flowThresholdType == "PERCENT")
      this.request.flowThresholdValue = this.updatePercentage(
        this.request.flowThresholdValue
      );
  }

  public convertMinimunFeeDollar() {
    this.request.minimumFeeAmount = this.updateCurrency(
      this.request.minimumFeeAmount
    );
  }

  public convertMaximumFeeDollar() {
    this.request.maximumFeeAmount = this.updateCurrency(
      this.request.maximumFeeAmount
    );
  }

  private updateCurrency(value: any) {
    value = this.$currencyToNumber(value);
    const numberOfDigits: number = 2,
      minDigits: number = 2;

    if (!value) return ``;

    if (isNaN(parseFloat(value))) return value;

    value = parseFloat(value);

    if (value >= 0)
      value = `${value.toLocaleString("en-US", {
        minimumFractionDigits: minDigits,
        maximumFractionDigits: numberOfDigits,
      })}`;
    else
      value = `(${Math.abs(value).toLocaleString("en-US", {
        minimumFractionDigits: minDigits,
        maximumFractionDigits: numberOfDigits,
      })})`;

    return value;
  }

  private updatePercentage(value: any) {
    value = this.$currencyToNumber(value);
    const numberOfDigits: number = 2;
    if (!value && value != null) value = 0;
    if (!value) return "N/A";

    if (value >= 0)
      return `${value.toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: numberOfDigits,
      })}`;
    else
      return `(${Math.abs(value).toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: numberOfDigits,
      })})`;
  }

  public prev() {
    this.$emit("prev");
  }

  public maximumFeeValidation() {
    if (!this.validation) this.maximumFeeError = true;
    else this.maximumFeeError = false;
  }

  private isNumeric(value: any) {
    let validation = false;
    if (value) validation = /^(?=.*?[A-Za-z])/.test(value);

    return validation;
  }

  get firms() {
    return this.store.getters.firms;
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

  get validation() {
    let valid = false;
    const self = this.request;

    if (self.firmMinimumFee && self.firmMaximumFee) {
      if (
        this.$currencyToNumber(self.maximumFeeAmount) >=
        this.$currencyToNumber(self.minimumFeeAmount)
      )
        valid = true;
      else valid = false;
    } else valid = true;

    return valid;
  }
}
</script>