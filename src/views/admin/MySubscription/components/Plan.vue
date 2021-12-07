<template>
  <div class="row g-0">
    <div class="col-4">
      <div class="fw-bolder fs-4 mb-2">
        {{ plan.planName }}
        <span class="badge text-success ms-2 bg-success-alpha">Active</span>
      </div>
      <div class="fs-6 text-muted">{{ description }}</div>
    </div>
    <div class="col-3">
      <div class="fw-bolder mb-2 fs-5">
        <template v-if="plan.cardType == 'Credit Card'">
          <img
            src="@/assets/mastercard.png"
            alt="Card Type"
            v-if="plan.cardNumber.split(' ')[0] == 'MasterCard'"
          />
          <img
            src="@/assets/visa.png"
            alt="Card Type"
            v-if="plan.cardNumber.split(' ')[0] == 'Visa'"
          />
          <img
            src="@/assets/amex.png"
            alt="Card Type"
            v-if="plan.cardNumber.split(' ')[0] == 'American'"
          />
          <img
            src="@/assets/discover.png"
            alt="Card Type"
            v-if="plan.cardNumber.split(' ')[0] == 'Discover'"
          />
          {{
            plan.cardNumber.split(" ")[0] == "American"
              ? "American Express"
              : plan.cardNumber.split(" ")[0]
          }}
          ****{{
            plan.cardNumber.split(" ")[0] == "American"
              ? plan.cardNumber.split(" ")[2]
              : plan.cardNumber.split(" ")[1]
          }}
        </template>
        <template v-else
          >Checking {{ plan.cardNumber.split(" ")[1] }}
        </template>
      </div>
      <div
        class="border border-dashed p-2 rounded fw-bolder"
        style="width: fit-content"
        :class="{
          'border-warning bg-warning-alpha text-warning': !planExpired,
          'border-danger bg-dander-alpha text-danger': planExpired,
        }"
      >
        {{ planExpired ? "Expries" : "Auto-renews" }} on
        <!-- {{ planExpired ? "Expries" : "Auto-renews" }} on {{ planEndDate }} -->
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
        {{ plan.term == "ANNUAL" ? "Annual" : "Monthly" }} Subscription
      </div>
      <div class="dropdown-menu" :class="{ show: toggleCommitmentTerm }">
        <ul class="m-2 p-0">
          <li class="dropdown-item p-4" @click="showCommitmentTermModel = true">
            Switch to
            {{ plan.term == "ANNUAL" ? "Monthly" : "Annual" }}
            Commitment
          </li>
        </ul>
      </div>
      <div class="text-muted">{{ plan.startDate }} - {{ plan.endDate }}</div>
    </div>
    <div class="col-2 d-flex align-items-center justify-content-end">
      <div class="fw-bolder fa-2x">
        <span class="fs-7">$</span>
        {{ $filters.currencyDisplayWithoutSymbol(plan.amount) }}
        <span class="fs-8 fw-light"
          >/{{ plan.term == "ANNUAL" ? "Yr" : "Mo" }}</span
        >
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
    :currentCommitmentTerm="plan.term"
    :newCommitmentTerm="plan.term == 'Annual' ? 'Monthly' : 'Annual'"
    @close="showCommitmentTermModel = false"
    v-if="showCommitmentTermModel"
  />
</template>
<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { Prop } from "vue-property-decorator";

import moment from "moment";

import CancelPlanAddOn from "./CancelPlanAddOn.vue";
import RenewPlanAddOn from "./RenewPlanAddOn.vue";
import ChangeCommitmentTerm from "./ChangeCommitmentTerm.vue";

import { subscriptionResponseModel } from "@/model";

@Options({
  components: {
    CancelPlanAddOn,
    RenewPlanAddOn,
    ChangeCommitmentTerm,
  },
})
export default class Plan extends Vue {
  @Prop() plan: subscriptionResponseModel;
  @Prop() planExpired: boolean;

  public togglePlan: boolean = false;
  public toggleCancelModel: boolean = false;
  public toggleRenewModel: boolean = false;

  public toggleCommitmentTerm: boolean = false;

  public showCommitmentTermModel: boolean = false;

  private planInfo = [
    {
      planName: "Launch",
      description: "Essentials for the starting to small RIA",
    },
    {
      planName: "Professional",
      description: "For small to medium-sized RIAs",
    },
    {
      planName: "Elite",
      description: "For medium to large-sized RIAs",
    },
    {
      planName: "Enterprise",
      description: "For large RIAs requiring custom license",
    },
  ];

  public clickOutSidePlan() {
    if (this.togglePlan) this.togglePlan = false;
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

  get description() {
    return this.planInfo.find((e: any) => e.planName == this.plan.planName)
      .description;
  }

  get planEndDate() {
    let endDate: string = "";
    let date = new Date(
      parseInt(this.plan.endDate.split("/")[2]),
      parseInt(this.plan.endDate.split("/")[1]) - 1,
      parseInt(this.plan.endDate.split("/")[0])
    );
    let month = date.toLocaleString("default", { month: "long" });

    endDate = `${this.plan.endDate.split("/")[0]} ${month.substring(0, 3)}, ${
      this.plan.endDate.split("/")[2]
    }`;
    return endDate;
  }
}
</script>