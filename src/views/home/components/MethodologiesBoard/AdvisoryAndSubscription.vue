<template>
  <div class="tab-content tab-content-lg__scroll mt-10">
    <div class="d-flex fs-7 mt-5">
      <div class="fw-bolder">
        What valuation methodologies do you use for AUM advisory billing?
      </div>
      <div class="text-muted ms-4">Check all that apply</div>
      <div class="ms-5">
        <i class="fa fa-question-circle fs-4 text-dark"></i>
      </div>
    </div>
    <div class="mt-6 ms-6">
      <multi-checkBox
        :data="valuationMethod"
        :value="request.valuationMethod"
        @update="updateValuationMethod"
      />
    </div>

    <div class="d-flex fs-7 mt-10">
      <div class="fw-bolder">
        What valuation methodology do you want default for new accounts?
      </div>
      <div class="ms-5">
        <i class="fa fa-question-circle fs-4 text-dark"></i>
      </div>
    </div>
    <div class="mt-6 ms-6">
      <single-checkBox
        :data="defaultValuationMethod"
        :value="request.defaultValuationMethod"
        @update="updateDefaultValuationMethod"
      />
    </div>

    <div class="d-flex fs-7 mt-10">
      <div class="fw-bolder">
        What valuation date do you use for initial billing of advance fees?
      </div>
      <div class="ms-5">
        <i class="fa fa-question-circle fs-4 text-dark"></i>
      </div>
    </div>
    <div class="mt-6 ms-6">
      <single-checkBox
        :data="['Period End', 'Billing Start Date']"
        :value="request.initialBillingValuationMethod"
        @update="updateInitialBillingValuationMethod"
      />
    </div>

    <div class="d-flex fs-7 mt-10">
      <div class="fw-bolder">
        How do you prorate your annualized rates for the billing period?
      </div>
      <div class="ms-5">
        <i class="fa fa-question-circle fs-4 text-dark"></i>
      </div>
    </div>
    <div class="mt-6 ms-6">
      <single-checkBox
        :data="[
          'Days in period divided by days in the year',
          'Divide by number of billing periods in the year',
        ]"
        :value="request.defaultProrationMethod"
        @update="updateDefaultProrationMethod"
      />
    </div>

    <div class="d-flex fs-7 mt-10">
      <div class="fw-bolder">
        How would you like to express your billing rates?
      </div>
      <div class="ms-5">
        <i class="fa fa-question-circle fs-4 text-dark"></i>
      </div>
    </div>
    <div class="mt-6 ms-6">
      <single-checkBox
        :data="['Basis Point', 'Percentages']"
        :value="request.expressRatesAs"
        @update="updateExpressRatesAs"
      />
    </div>

    <div class="d-flex justify-content-between mt-10">
      <button class="btn btn-secondary" @click="prev">Back</button>
      <button
        class="btn me-10"
        :class="{
          'btn-secondary': !formValidation,
          'btn-primary': formValidation,
        }"
        :disabled="!formValidation"
        @click="saveMethodologies"
      >
        Continue
      </button>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { Prop, Inject } from "vue-property-decorator";

import { useStore } from "vuex";

import { IFirmService } from "@/service";
import { firmRequestModel, methodologiesRequestModel } from "@/model";

import MultiCheckBox from "@/components/controls/MultiCheckBox.vue";
import SingleCheckBox from "@/components/controls/SingleCheckBox.vue";

@Options({
  components: {
    MultiCheckBox,
    SingleCheckBox,
  },
})
export default class AdvisoryAndSubscription extends Vue {
  @Inject("firmService") service: IFirmService | undefined;
  @Prop() billingType: string | any;
  @Prop() previousTab: string | any;
  @Prop() nextTab: string | any;

  public store = useStore();
  public request = new methodologiesRequestModel();

  public valuationMethod: Array<string> = [
    "Period End",
    "Average Daily Balance",
  ];
  public defaultValuationMethod: Array<string> = [
    "Period End",
    "Average Daily Balance",
    "Don't default",
  ];

  mounted() {
    this.getMethodologies();
  }

  private getMethodologies() {
    const request = new firmRequestModel();
    request.billingType = this.billingType;
    request.firmId = this.store.getters.selectedFirmId;

    this.service
      ?.getMethodologies(request)
      .then((response) => {
        this.request = response;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  public saveMethodologies() {
    this.request.firmId = this.store.getters.selectedFirmId;
    this.request.payorType = "Investor Client";
    this.request.billingType = this.billingType;
    this.request.feeTypeCode = "CF";

    this.service
      ?.saveMethodologies(this.request)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
    this.$emit("next", this.nextTab);
  }

  public updateValuationMethod(valuationMethod: string[]) {
    this.request.valuationMethod = valuationMethod;
    this.defaultValuationMethod = [];
    this.defaultValuationMethod = this.defaultValuationMethod.concat(
      this.request.valuationMethod
    );

    if (this.defaultValuationMethod.length > 0)
      this.defaultValuationMethod.push("Don't default");
    else
      this.defaultValuationMethod = [
        "Period End",
        "Average Daily Balance",
        "Don't default",
      ];

    this._sortOrder(this.defaultValuationMethod);
  }

  public updateDefaultValuationMethod(defaultValuationMethod: string) {
    this.request.defaultValuationMethod = defaultValuationMethod;
  }

  public updateInitialBillingValuationMethod(
    initialBillingValuationMethod: string
  ) {
    this.request.initialBillingValuationMethod = initialBillingValuationMethod;
  }

  public updateDefaultProrationMethod(defaultProrationMethod: string) {
    this.request.defaultProrationMethod = defaultProrationMethod;
  }

  public updateExpressRatesAs(expressRatesAs: string) {
    this.request.expressRatesAs = expressRatesAs;
  }

  public _sortOrder(defaultValuationMethod: Array<string>) {
    const sortOrder = ["Period End", "Average Daily Balance", "Don't default"];
    defaultValuationMethod.sort((a, b) => {
      return sortOrder.indexOf(a) - sortOrder.indexOf(b);
    });
  }

  public prev() {
    this.$emit("prev", this.previousTab);
  }

  get formValidation() {
    let valid = false;
    if (
      this.request.valuationMethod.length > 0 &&
      this.request.defaultValuationMethod &&
      this.request.initialBillingValuationMethod &&
      this.request.defaultProrationMethod &&
      this.request.expressRatesAs
    )
      valid = true;

    return valid;
  }
}
</script>