<template>
  <div class="tab-content mt-10">
    <template v-if="response.aumFlag">
      <div class="row pb-8 g-0">
        <div class="col-lg-9 fw-bolder">
          How frequently do you bill your {{ response.feeTypeName }}?
        </div>
        <div class="col-lg-3">
          {{ $filters.filterArray(billingFrequency).join(", ") }}
        </div>
      </div>

      <div class="row pb-8 g-0">
        <div class="col-lg-9 fw-bolder">
          For {{ response.feeTypeName }}, what frequency do you want to default
          for new accounts?
        </div>
        <div class="col-lg-3">
          {{ $filters.filterArray(defaultBillingFrequency).join(", ") }}
        </div>
      </div>

      <div class="row pb-8 g-0">
        <div class="col-lg-9 fw-bolder">
          Do you bill your {{ response.feeTypeName }} in advance or in arrears?
        </div>
        <div class="col-lg-3">
          {{ $filters.filterArray(billingMethod).join(", ") }}
        </div>
      </div>

      <div class="row pb-8 g-0">
        <div class="col-lg-9 fw-bolder">
          For {{ response.feeTypeName }}, what billing timing do you want to
          default for new accounts?
        </div>
        <div class="col-lg-3">
          {{ $filters.filterArray(defaultBillingMethod).join(", ") }}
        </div>
      </div>

      <template v-if="isQuarterlySelected">
        <div class="row pb-8 g-0">
          <div class="col-lg-9 fw-bolder">
            Do you bill your full-quarter {{ response.feeTypeName }} during
            off-cycle months?
          </div>
          <div class="col-lg-3">
            {{
              request.offsetCycleFlag
                ? "Yes, I bill quarterly on off-cycle months"
                : "No"
            }}
          </div>
        </div>
      </template>

      <template v-if="request.offsetCycleFlag">
        <div class="row pb-8 g-0">
          <div class="col-lg-9 fw-bolder">
            For {{ response.feeTypeName }}, what quarterly cycle do you want to
            default for new accounts?
          </div>
          <div class="col-lg-3">
            {{ $filters.filterArray(defaultOffsetCycle).join(", ") }}
          </div>
        </div>
      </template>
    </template>

    <template v-if="!response.aumFlag">
      <div class="row pb-8 g-0">
        <div class="col-lg-9 fw-bolder">
          How frequently do you bill your {{ response.feeTypeName }} subscriptions?
        </div>
        <div class="col-lg-3">
          {{ $filters.filterArray(billingFrequency).join(", ") }}
        </div>
      </div>
      <div class="row pb-8 g-0">
        <div class="col-lg-9 fw-bolder">
          What frequency do you want to default for new
          {{ response.feeTypeName }} subscriptions?
        </div>
        <div class="col-lg-3">
          {{ $filters.filterArray(defaultBillingFrequency).join(", ") }}
        </div>
      </div>

      <div class="row pb-8 g-0">
        <div class="col-lg-9 fw-bolder">
          Do you bill your {{ response.feeTypeName }} subscriptions in advance or in arrears?
        </div>
        <div class="col-lg-3">
          {{ $filters.filterArray(billingMethod).join(", ") }}
        </div>
      </div>

      <div class="row pb-8 g-0">
        <div class="col-lg-9 fw-bolder">
          What billing timing do you want to default for new {{ response.feeTypeName }} subscriptions?
        </div>
        <div class="col-lg-3">
          {{ $filters.filterArray(defaultBillingMethod).join(", ") }}
        </div>
      </div>
      <template v-if="isQuarterlySelected">
        <div class="row pb-8 g-0">
          <div class="col-lg-9 fw-bolder">
            Do you bill your full-quarter {{ response.feeTypeName }} subscriptions during off-cycle months?
          </div>
          <div class="col-lg-3">
            {{
              request.offsetCycleFlag
                ? "Yes, I bill quarterly on off-cycle months"
                : "No"
            }}
          </div>
        </div>
      </template>

      <template v-if="request.offsetCycleFlag">
        <div class="row pb-8 g-0">
          <div class="col-lg-9 fw-bolder">
            What quarterly cycle do you want to default for new {{ response.feeTypeName }} subscriptions?
          </div>
          <div class="col-lg-3">
            {{ $filters.filterArray(defaultOffsetCycle).join(", ") }}
          </div>
        </div>
      </template>
    </template>

  </div>
</template>
<script lang="ts">
import { Vue } from "vue-class-component";
import { Prop, Watch } from "vue-property-decorator";

import {
  BillingFrequency,
  defaultBillingFrequency,
  billingMethod,
  defaultBillingMethod,
  defaultOffsetCycle,
  aumFeeTypes,
  aumDetails,
  ListItem,
} from "@/model";

export default class FrequencyAdvisory extends Vue {
  @Prop() response: aumFeeTypes;

  public request: aumDetails = new aumDetails();

  public billingFrequency: Array<ListItem> = [];
  public defaultBillingFrequency: Array<ListItem> = [];
  public billingMethod: Array<ListItem> = [];
  public defaultBillingMethod: Array<ListItem> = [];
  public defaultOffsetCycle: Array<ListItem> = [];

  created() {
    this.billingFrequency = Object.entries(BillingFrequency).map(
      ([key]) =>
        new ListItem(
          key,
          BillingFrequency[key as keyof typeof BillingFrequency]
        )
    );
    this.defaultBillingFrequency = Object.entries(defaultBillingFrequency).map(
      ([key]) =>
        new ListItem(
          key,
          defaultBillingFrequency[key as keyof typeof defaultBillingFrequency]
        )
    );
    this.billingMethod = Object.entries(billingMethod).map(
      ([key]) =>
        new ListItem(key, billingMethod[key as keyof typeof billingMethod])
    );
    this.defaultBillingMethod = Object.entries(defaultBillingMethod).map(
      ([key]) =>
        new ListItem(
          key,
          defaultBillingMethod[key as keyof typeof defaultBillingMethod]
        )
    );
    this.defaultOffsetCycle = Object.entries(defaultOffsetCycle).map(
      ([key]) =>
        new ListItem(
          key,
          defaultOffsetCycle[key as keyof typeof defaultOffsetCycle]
        )
    );
  }

  mounted() {
    this.getFrequncyAndTiming();
  }

  @Watch("response")
  private getFrequncyAndTiming() {
    if (this.response.aumDetails) {
      this.request = this.response.aumDetails;
      this.bindValues(this.response.aumDetails);
    } else {
      this.request = new aumDetails();
      this.bindValues(this.request);
    }
  }

  private bindValues(response: aumDetails) {
    this.defaultBillingFrequency = [];

    this.billingFrequency.forEach((item) => {
      if (response.billingFrequency.includes(item.value)) {
        item.selected = true;
        this.defaultBillingFrequency.push(new ListItem(item.text, item.value));
      } else item.selected = false;
    });

    this.defaultBillingFrequency.push(new ListItem("Don't Default", "NONE"));

    this.defaultBillingFrequency.forEach((item) => {
      if (response.defaultBillingFrequency == item.value) item.selected = true;
    });

    this.defaultBillingMethod = [];

    this.billingMethod.forEach((item) => {
      if (response.billingMethod.includes(item.value)) {
        item.selected = true;
        this.defaultBillingMethod.push(new ListItem(item.text, item.value));
      } else item.selected = false;
    });

    this.defaultBillingMethod.push(new ListItem("Don't Default", "NONE"));

    this.defaultBillingMethod.forEach((item) => {
      if (response.defaultBillingMethod == item.value) item.selected = true;
    });

    if (!this.isQuarterlySelected) {
      this.request.offsetCycleFlag = false;
      this.request.defaultOffsetCycle = null;
    } else {
      this.request.offsetCycleFlag = response.offsetCycleFlag;
      this.defaultOffsetCycle.forEach((item) => {
        if (
          response.defaultOffsetCycle &&
          response.defaultOffsetCycle.includes(item.value)
        )
          item.selected = true;
      });
    }
  }

  public prev() {
    this.$emit("prev");
  }

  get isQuarterlySelected() {
    return this.request.billingFrequency.includes("QUARTERLY");
  }
}
</script>