<template>
  <div class="row g-0">
    <div class="col-4">
      <div class="fw-bolder fs-4 mb-2">
        {{ addons.addOnName }}
        <span class="badge text-success ms-2 bg-success-alpha">Active</span>
      </div>
      <div class="fs-6 text-muted">{{ description }}</div>
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
          {{
            addons.cardNumber.split(" ")[0] == "American"
              ? "American Express"
              : addons.cardNumber.split(" ")[0]
          }}
          ****{{
            addons.cardNumber.split(" ")[0] == "American"
              ? addons.cardNumber.split(" ")[2]
              : addons.cardNumber.split(" ")[1]
          }}
        </template>
        <template v-else>Checking {{ addons.cardNumber }} </template>
      </div>
      <div
        class="border border-dashed p-2 rounded fw-bolder"
        style="width: fit-content"
        :class="{
          'border-warning bg-warning-alpha text-warning':
            addons.planStatus == 'Renewed',
          'border-danger bg-dander-alpha text-danger':
            addons.planStatus == 'Canceled',
        }"
      >
        {{ addons.planStatus == "Renewed" ? "Auto-renews" : addons.planStatus }}
        on

        <!-- {{
          addons.planStatus == "Renewed" ? "Auto-renews" : addons.planStatus
        }}
        on {{ addOnEndDate }} -->
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
        {{ addons.term == "ANNUAL" ? "Annual" : "Monthly" }} Subscription
      </div>
      <div class="dropdown-menu" :class="{ show: toggleCommitmentTerm }">
        <ul class="m-2 p-0">
          <li class="dropdown-item p-4" @click="showCommitmentTermModel = true">
            Switch to
            {{ addons.term == "ANNUAL" ? "Monthly" : "Annual" }}
            Commitment
          </li>
        </ul>
      </div>
      <div class="text-muted">
        {{ addons.startDate }} - {{ addons.endDate }}
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
          @click="togglePlan = true"
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
  <CancelPlanAddOn
    title="Cancel Add-On"
    :name="addons.addOnName"
    type="addons"
    @close="showCancelModel = false"
    @cancel="onCancel"
    v-if="showCancelModel"
  />
  <ChangeCommitmentTerm
    :plan="addons"
    :currentCommitmentTerm="addons.term"
    :newCommitmentTerm="addons.term == 'ANNUAL' ? 'Monthly' : 'Annual'"
    @close="showCommitmentTermModel = false"
    v-if="showCommitmentTermModel"
  />
</template>
<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { Prop } from "vue-property-decorator";

import CancelPlanAddOn from "./CancelPlanAddOn.vue";
import ChangeCommitmentTerm from "./ChangeCommitmentTerm.vue";

import { addonsResponseModel } from "@/model";

@Options({
  components: {
    CancelPlanAddOn,
    ChangeCommitmentTerm,
  },
})
export default class Addons extends Vue {
  @Prop() addons: addonsResponseModel;

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

  get addOnEndDate() {
    let endDate: string = "";
    let date = new Date(
      parseInt(this.addons.endDate.split("/")[2]),
      parseInt(this.addons.endDate.split("/")[1]) - 1,
      parseInt(this.addons.endDate.split("/")[0])
    );
    let month = date.toLocaleString("default", { month: "long" });

    endDate = `${this.addons.endDate.split("/")[0]} ${month.substring(0, 3)}, ${
      this.addons.endDate.split("/")[2]
    }`;
    return endDate;
  }
}
</script>