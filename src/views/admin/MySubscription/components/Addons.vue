<template>
  <div class="row g-0 pb-4 border-bottom border-light-gray">
    <div class="col-4">
      <div
        class="fw-bolder fs-4 mb-2"
        :class="{ 'text-gray-secondary': addons.endDate }"
      >
        {{ addons.addOnName }}
        <span class="badge fs-7 text-success ms-2 bg-success-alpha">{{
          addons.status == "NEW"
            ? "Current"
            : addons.status == "UPCOMING"
            ? "Upcoming"
            : addons.status == "CANCELLED"
            ? "Canceled"
            : ""
        }}</span>
      </div>
      <div
        class="fs-6 text-muted"
        :class="{ 'text-gray-secondary': addons.endDate }"
      >
        {{ description }}
      </div>
    </div>
    <div class="col-3">
      <div class="fw-bolder mb-2 fs-5">
        <template v-if="addons.cardType == 'Credit Card'">
          <img
            src="@/assets/mastercard.png"
            alt="Card Type"
            v-if="addons.cardNumber.split(' ')[0] == 'MasterCard'"
          />
          <img
            src="@/assets/visa.png"
            alt="Card Type"
            v-if="addons.cardNumber.split(' ')[0] == 'Visa'"
          />
          <img
            src="@/assets/amex.png"
            alt="Card Type"
            v-if="addons.cardNumber.split(' ')[0] == 'American'"
          />
          <img
            src="@/assets/discover.png"
            alt="Card Type"
            v-if="addons.cardNumber.split(' ')[0] == 'Discover'"
          />
          <span :class="{ 'text-gray-secondary': addons.endDate }">
            ****{{
              addons.cardNumber.split(" ")[0] == "American"
                ? addons.cardNumber.split(" ")[2]
                : addons.cardNumber.split(" ")[1]
            }}
          </span>
        </template>
        <template v-else>
          <span :class="{ 'text-gray-secondary': addons.endDate }">
            Checking {{ addons.cardNumber.split(" ")[1] }}
          </span>
        </template>
      </div>
      <div
        class="border border-dashed p-2 rounded fw-bolder fs-7"
        style="width: fit-content"
        :class="{
          'border-warning bg-warning-alpha text-warning':
            (addons.status == 'NEW' && addons.endDate == null) ||
            (addons.status == 'UPCOMING' && addons.endDate == null),
          'border-danger bg-dander-alpha text-danger':
            addons.status == 'CANCELLED' ||
            (addons.status == 'NEW' && addons.endDate != null),
        }"
      >
        {{ addOnStatus }}
      </div>
    </div>
    <div
      class="col-3 dropdown dropdown-primary"
      v-click-outside="clickOutSideTerm"
    >
      <div
        class="fw-bolder fs-4 mb-2 dropdown-toggle"
        @click="!addons.endDate && allowChangeAddonTerm ? toggleCommitmentTerm = true : ''"
      >
        {{ addons.term == "ANNUAL" ? "Annual" : "Monthly" }} Subscription
      </div>
      <div class="dropdown-menu" :class="{ show: toggleCommitmentTerm }">
        <ul class="m-2 p-0">
          <li
            class="dropdown-item p-4 fw-bold"
            :class="{ 'text-gray-secondary': addons.endDate }"
            @click="showCommitmentTermModel = true"
          >
            Switch to
            {{ addons.term == "ANNUAL" ? "Monthly" : "Annual" }}
            Commitment
          </li>
        </ul>
      </div>
      <div class="text-muted" :class="{ 'text-gray-secondary': addons.endDate }">
        {{ addons.startDate }} -
        {{
          addons.status == "CANCELLED" ||
          (addons.status == "NEW" && addons.endDate != null)
            ? addons.endDate
            : (addons.status == "UPCOMING" && addons.endDate == null) ||
              (addons.status == "NEW" && this.addons.endDate == null)
            ? addons.renewDate
            : ""
        }}
      </div>
    </div>
    <div class="col-2 d-flex align-items-center justify-content-end">
      <div class="fw-bolder fa-2x">
        <span class="fs-7">$</span>
        {{ $filters.currencyDisplayWithoutSymbol(addons.amount) }}
        <span class="fs-8 fw-light"
          >/{{ addons.term == "ANNUAL" ? "Yr" : "Mo" }}</span
        >
      </div>
      <div
        class="dropdown dropdown-primary ms-4"
        v-click-outside="clickOutSidePlan"
      >
        <i
          class="fas fa-ellipsis-v fs-1 ms-4 mt-2"
          style="cursor: pointer"
          @click="!addons.endDate ? togglePlan = true : ''"
        ></i>
        <ul
          class="dropdown-menu overflow-auto p-2"
          :class="{ show: togglePlan }"
          style="right: 0"
        >
          <li
            class="dropdown-item pt-2 pb-2"
            v-if="addons.addOnName == 'Admin User License'"
          >
            Add User
          </li>
          <li class="dropdown-item pt-2 pb-2">View Invoice</li>
          <li class="dropdown-item" @click="showCancelModel = true">
            Cancel Add-On
          </li>
        </ul>
      </div>
    </div>
  </div>
  <cancel-plan-addOn
    title="Cancel Add-On"
    :name="addons.addOnName"
    type="addons"
    @close="showCancelModel = false"
    @cancel="onCancel"
    v-if="showCancelModel"
  />
  <ChangePlanCommitmentTerm
    :planName="addons.planName"
    :currentTerm="addons.term == 'ANNUAL' ? 'Annual' : 'Monthly'"
    :startDate="addons.startDate"
    :endDate="!addons.endDate ? addons.renewDate : addons.endDate"
    :currentPlanAmount="addons.amount"
    :planId="addons.addOnId"
    @close="showCommitmentTermModel = false"
    v-if="showCommitmentTermModel"
  />
</template>
<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { Prop } from "vue-property-decorator";

import CancelPlanAddOn from "./CancelPlanAddOn.vue";
import ChangePlanCommitmentTerm from "./ChangePlanCommitmentTerm.vue";

import { addonsResponseModel } from "@/model";

@Options({
  components: {
    CancelPlanAddOn,
    ChangePlanCommitmentTerm,
  },
})
export default class Addons extends Vue {
  @Prop() addons: addonsResponseModel;
  @Prop() allowChangeAddonTerm: string;

  public togglePlan: boolean = false;
  public showCancelModel: boolean = false;
  public toggleCommitmentTerm: boolean = false;

  public showCommitmentTermModel: boolean = false;

  public addonsList: any = [
    {
      addOnName: "Average Daily Balances",
      description: "Support ADB calculations and reporting",
    },
    {
      addOnName: "Flow Billing",
      description: "Adjust billing for intra-period flows",
    },
    {
      addOnName: "Admin User License",
      description: "Additional admin user access license",
    },
    {
      addOnName: "Multi-Fee Billing",
      description: "Multiple fee calculations per account",
    },
    {
      addOnName: "Revenue Sharing",
      description: "Flexible revenue sharing and fee splitting",
    },
    {
      addOnName: "Multi-Connector Integrations",
      description: "Integrate with multiple custody sources",
    },
    {
      addOnName: "Product Attribution",
      description: "Integrate with multiple custody sources",
    },
  ];

  public onCancel() {
    this.showCancelModel = false;
  }

  public clickOutSidePlan() {
    this.togglePlan = false;
  }

  public clickOutSideTerm() {
    this.toggleCommitmentTerm = false;
  }

  get description() {
    return this.addonsList.find(
      (e: any) => e.addOnName == this.addons.addOnName
    ).description;
  }

  get addOnStatus() {
    let status: string = "";
    if (this.addons.status == "CANCELLED")
      status = `Cancelled on ${this.addOnEndDate(this.addons.endDate)}`;
    else if (this.addons.status == "UPCOMING" && this.addons.endDate == null)
      status = `Auto-renews on ${this.addOnEndDate(this.addons.renewDate)}`;
    else if (this.addons.status == "NEW" && this.addons.endDate == null)
      status = `Auto-renews on ${this.addOnEndDate(this.addons.renewDate)}`;
    else if (this.addons.status == "NEW" && this.addons.endDate != null)
      status = `Expires on ${this.addOnEndDate(this.addons.endDate)}`;
    return status;
  }

  addOnEndDate(endDate: string) {
    let value: string = "";
    let date = new Date(
      parseInt(endDate.split("/")[2]),
      parseInt(endDate.split("/")[1]) - 1,
      parseInt(endDate.split("/")[0])
    );
    let month = date.toLocaleString("default", { month: "long" });

    value = `${endDate.split("/")[0]} ${month.substring(0, 3)}, ${
      endDate.split("/")[2]
    }`;
    return value;
  }
}
</script>