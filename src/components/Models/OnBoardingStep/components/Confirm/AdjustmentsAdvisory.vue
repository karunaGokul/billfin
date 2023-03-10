<template>
  <div class="tab-content mt-10">
    <div class="row pb-8 g-0">
      <div class="col-lg-9 fw-bolder">
        Do you charge a firm-wide standard minimum fee?
      </div>
      <div class="col-lg-3">
        {{
          request.firmMinimumFee
            ? "Yes, I normally charge a minimum fee of "
            : "No firm-wide minimum fees"
        }}

        <template v-if="request.minimumFeeAmount">{{ $filters.currencyDisplay(request.minimumFeeAmount) }}</template>
      </div>
    </div>

    <div class="row pb-8 g-0">
      <div class="col-lg-9 fw-bolder">
        Do you limit fees to a firm-wide maximum fee?
      </div>
      <div class="col-lg-3">
        {{
          request.firmMaximumFee
            ? "Yes, I normally cap fees at a maximum of "
            : "No firm-wide maximum fees"
        }}

        <template v-if="request.maximumFeeAmount">{{ $filters.currencyDisplay(request.maximumFeeAmount) }}</template>
      </div>
    </div>

    <div class="row pb-8 g-0">
      <div class="col-lg-9 fw-bolder">
        Do you adjust billing for deposits and withdrawls?
      </div>
      <div class="col-lg-3">
        {{
          request.adjustForFlows
            ? "Yes, billing is adjusted for flows"
            : "No, Ignore deposits and withdrawals"
        }}
      </div>
    </div>

    <template v-if="request.adjustForFlows">
      <div class="row pb-8 g-0">
        <div class="col-lg-9 fw-bolder">
          Indicate whether you apply a threshold to flows.
        </div>
        <div class="col-lg-3">
          <template v-if="request.flowThresholdType == 'DOLLAR_AMOUNT'">{{ $filters.currencyDisplay(request.flowThresholdValue) }}</template>
          <template v-else-if="request.flowThresholdType == 'PERCENT'">{{ $filters.percentDisplay(request.flowThresholdValue) }}</template>
          <template v-else>None</template>
        </div>
      </div>
    </template>

    <div class="row pb-8 g-0">
      <div class="col-lg-9 fw-bolder">
        Do you round fees to avoid charging cents?
      </div>
      <div class="col-lg-3">
        {{
          request.dollarRoundingFlag
            ? "Yes, I do want to round fees"
            : " No, I charge exact amount"
        }}
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue } from "vue-class-component";
import { Prop, Watch } from "vue-property-decorator";

import { ListItem, FlowThresholdType, aumFeeTypes, aumDetails } from "@/model";

export default class AdjustmentsAdvisory extends Vue {
  @Prop() response: aumFeeTypes;

  public request: aumDetails = new aumDetails();
  public flowThresholdType: Array<ListItem> = [];

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

  private bindValues() {
    if (this.request.minimumFeeAmount) this.request.firmMinimumFee = true;
    if (this.request.maximumFeeAmount) this.request.firmMaximumFee = true;
    this.flowThresholdType.forEach((item: ListItem) => {
      if (item.value == this.request.flowThresholdType) item.selected = true;
      else item.selected = false;
    });
  }
}
</script>