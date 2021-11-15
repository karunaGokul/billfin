<template>
  <div class="row g-0">
    <div class="col-4">
      <div class="fw-bolder fs-4 mb-2">
        {{ plan.planName }}
        <span class="badge text-success ms-2" style="background-color: #e8fff3"
          >Active</span
        >
      </div>
      <div class="fs-6 text-muted">{{ plan.description }}</div>
    </div>
    <div class="col-3">
      <div class="fw-bolder mb-2 fs-5">
        <img
          src="@/assets/mastercard.png"
          alt="Card Type"
          v-if="plan.cardType == 'mast'"
        />
        <img
          src="@/assets/visa.png"
          alt="Card Type"
          v-if="plan.cardType == 'visa'"
        />
        <img
          src="@/assets/amex.png"
          alt="Card Type"
          v-if="plan.cardType == 'amex'"
        />
        <img
          src="@/assets/discover.png"
          alt="Card Type"
          v-if="plan.cardType == 'disc'"
        />
        {{ cardType }}
        ****{{ plan.cardNumber.substr(plan.cardNumber.length - 4) }}
      </div>
      <div
        class="
          border border-dashed border-warning
          p-2
          rounded
          text-warning
          fw-bolder
        "
        style="width: fit-content; background-color: #ffc70014"
      >
        Auto-renews on 31 Dec, 2021
      </div>
    </div>
    <div class="col-3">
      <div class="fw-bolder fs-4 mb-2">Annual Subscription</div>
      <div class="text-muted">{{ plan.startDate }} - {{ plan.endDate }}</div>
    </div>
    <div class="col-2 d-flex align-items-center justify-content-end">
      <div class="fw-bolder fa-2x">
        <span class="fs-7">$</span>
        {{ $filters.currencyDisplayWithoutSymbol(plan.termPlanAmount) }}
        <span class="fs-8 fw-light">/{{ plan.planType }}</span>
      </div>
      <div class="dropdown ms-4" v-click-outside="clickOutSidePlan">
        <i
          class="fas fa-ellipsis-v fs-1 ms-4 mt-2"
          style="cursor: pointer"
          @click="togglePlan = true"
        ></i>
        <ul
          class="dropdown-menu overflow-auto"
          :class="{ show: togglePlan }"
          style="right: 0"
        >
          <li class="dropdown-item pt-2 pb-2" @click="toggleCancelModel = true">
            Cancel Plan
          </li>
          <li class="dropdown-item pt-2 pb-2" @click="toggleRenewModel = true">
            Renew Plan
          </li>
          <li class="dropdown-item pt-2 pb-2">Invoice</li>
        </ul>
      </div>
    </div>
  </div>
  <CancelPlanAddOn
    title="Cancel Subscription"
    :name="plan.planName"
    type="plan"
    @close="toggleCancelModel = false"
    @cancel="onCancel"
    v-if="toggleCancelModel"
  />
  <RenewPlanAddOn
    title="Plan"
    :name="plan.planName"
    type="plan"
    @close="toggleRenewModel = false"
    @cancel="onRenewModel"
    v-if="toggleRenewModel"
  />
</template>
<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { Prop } from "vue-property-decorator";

import CancelPlanAddOn from "./CancelPlanAddOn.vue";
import RenewPlanAddOn from "./RenewPlanAddOn.vue";

import { manageSubscriptionPlanResponseModel } from "@/model";

@Options({
  components: {
    CancelPlanAddOn,
    RenewPlanAddOn,
  },
})
export default class Plan extends Vue {
  @Prop() plan: manageSubscriptionPlanResponseModel;

  public togglePlan: boolean = false;
  public toggleCancelModel: boolean = false;
  public toggleRenewModel: boolean = false;

  public clickOutSidePlan() {
    if (this.togglePlan) this.togglePlan = false;
  }

  public onCancel() {
    console.log("Plan cancelled");
    this.toggleCancelModel = false;
  }

  public onRenewModel() {
    this.toggleRenewModel = false;
  }

  get cardType() {
    let cardType: string = "";
    if (this.plan.cardType == "mast") cardType = "Mastercard";
    else if (this.plan.cardType == "visa") cardType = "Visa";
    else if (this.plan.cardType == "amex") cardType = "American Express";
    else cardType = "Discover";
    return cardType;
  }
}
</script>