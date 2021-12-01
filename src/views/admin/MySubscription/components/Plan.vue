<template>
  <div class="row g-0">
    <div class="col-4">
      <div class="fw-bolder fs-4 mb-2">
        {{ plan.planName }}
        <span class="badge text-success ms-2 bg-success-alpha">Active</span>
      </div>
      <div class="fs-6 text-muted">{{ plan.description }}</div>
    </div>
    <div
      class="col-3 dropdown dropdown-primary"
      v-click-outside="clickOutSideChangePayment"
    >
      <div
        class="dropdown-toggle fw-bolder mb-2 fs-5"
        @click="toggleChangePayment = true"
      >
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
        {{ $filters.creditCardType(plan.cardType) }}
        ****{{ plan.cardNumber.substr(plan.cardNumber.length - 4) }}
        <ChangePaymentInfo
          :selectedCardNumber="plan.cardNumber"
          :availableCards="plan.availableCards"
          v-if="toggleChangePayment"
        />
      </div>
      <div
        class="border border-dashed p-2 rounded fw-bolder"
        style="width: fit-content"
        :class="{
          'border-warning bg-warning-alpha text-warning':
            plan.planStatus == 'Renewed',
          'border-danger bg-dander-alpha text-danger':
            plan.planStatus == 'Canceled',
        }"
      >
        Auto-renews on 31 Dec, 2021
      </div>
    </div>
    <div
      class="col-3 dropdown dropdown-primary"
      v-click-outside="clickOutSideTerm"
    >
      <div
        class="fw-bolder fs-4 mb-2 dropdown-toggle"
        @click="toggleCommitmentTerm = true"
      >
        {{ plan.commitmentTerm }} Subscription
      </div>
      <div class="dropdown-menu" :class="{ show: toggleCommitmentTerm }">
        <ul class="m-2 p-0">
          <li class="dropdown-item p-4" @click="showCommitmentTermModel = true">
            Switch to
            {{ plan.commitmentTerm == "Annual" ? "Monthly" : "Annual" }}
            Commitment
          </li>
        </ul>
      </div>
      <div class="text-muted">{{ plan.startDate }} - {{ plan.endDate }}</div>
    </div>
    <div class="col-2 d-flex align-items-center justify-content-end">
      <div class="fw-bolder fa-2x">
        <span class="fs-7">$</span>
        {{ $filters.currencyDisplayWithoutSymbol(plan.termPlanAmount) }}
        <span class="fs-8 fw-light">/{{ plan.planType }}</span>
      </div>
      <div
        class="dropdown dropdown-primary ms-4"
        v-click-outside="clickOutSidePlan"
      >
        <i
          class="fas fa-ellipsis-v fs-1 ms-4 mt-2"
          style="cursor: pointer"
          @click="togglePlan = true"
        ></i>
        <ul
          class="dropdown-menu overflow-auto p-2"
          :class="{ show: togglePlan }"
          style="right: 0"
        >
          <li class="dropdown-item pt-2 pb-2" @click="toggleRenewModel = true">
            Change Plan
          </li>
          <li class="dropdown-item pt-2 pb-2">View Invoice</li>
          <li class="dropdown-item pt-2 pb-2" @click="toggleCancelModel = true">
            Cancel Plan
          </li>
        </ul>
      </div>
    </div>
  </div>
  <CancelPlanAddOn
    title="Cancel Subscription"
    :name="plan.planName"
    type="plan"
    @close="toggleCancelModel = false"
    @cancel="onCancelModel"
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
  <ChangeCommitmentTerm
    :plan="plan"
    :currentCommitmentTerm="plan.commitmentTerm"
    :newCommitmentTerm="plan.commitmentTerm == 'Annual' ? 'Monthly' : 'Annual'"
    @close="showCommitmentTermModel = false"
    v-if="showCommitmentTermModel"
  />
</template>
<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { Prop } from "vue-property-decorator";

import CancelPlanAddOn from "./CancelPlanAddOn.vue";
import RenewPlanAddOn from "./RenewPlanAddOn.vue";
import ChangePaymentInfo from "./ChangePaymentInfo.vue";
import ChangeCommitmentTerm from "./ChangeCommitmentTerm.vue";

import { subscriptionResponseModel } from "@/model";

@Options({
  components: {
    CancelPlanAddOn,
    RenewPlanAddOn,
    ChangePaymentInfo,
    ChangeCommitmentTerm,
  },
})
export default class Plan extends Vue {
  @Prop() plan: subscriptionResponseModel;

  public togglePlan: boolean = false;
  public toggleCancelModel: boolean = false;
  public toggleRenewModel: boolean = false;

  public toggleChangePayment: boolean = false;
  public toggleCommitmentTerm: boolean = false;

  public showCommitmentTermModel: boolean = false;

  public clickOutSidePlan() {
    if (this.togglePlan) this.togglePlan = false;
  }

  public clickOutSideChangePayment() {
    this.toggleChangePayment = false;
  }

  public clickOutSideTerm() {
    this.toggleCommitmentTerm = false;
  }

  public onCancelModel() {
    this.toggleCancelModel = false;
  }

  public onRenewModel() {
    this.toggleRenewModel = false;
  }
}
</script>