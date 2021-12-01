<template>
  <div class="row g-0">
    <div class="col-4">
      <div class="fw-bolder fs-4 mb-2">
        {{ addons.addOnName }}
        <span class="badge text-success ms-2 bg-success-alpha">Active</span>
      </div>
      <div class="fs-6 text-muted">{{ addons.description }}</div>
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
          v-if="addons.cardType == 'mast'"
        />
        <img
          src="@/assets/visa.png"
          alt="Card Type"
          v-if="addons.cardType == 'visa'"
        />
        <img
          src="@/assets/amex.png"
          alt="Card Type"
          v-if="addons.cardType == 'amex'"
        />
        <img
          src="@/assets/discover.png"
          alt="Card Type"
          v-if="addons.cardType == 'disc'"
        />
        {{ $filters.creditCardType(addons.cardType) }}
        ****{{ addons.cardNumber.substr(addons.cardNumber.length - 4) }}
        <ChangePaymentInfo
          :selectedCardNumber="addons.cardNumber"
          :availableCards="addons.availableCards"
          v-if="toggleChangePayment"
        />
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
        {{
          addons.planStatus == "Renewed" ? "Auto-renews" : addons.planStatus
        }}
        on 31 Dec, 2021
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
        {{ addons.commitmentTerm }} Subscription
      </div>
      <div class="dropdown-menu" :class="{ show: toggleCommitmentTerm }">
        <ul class="m-2 p-0">
          <li class="dropdown-item p-4" @click="showCommitmentTermModel = true">
            Switch to
            {{ addons.commitmentTerm == "Annual" ? "Monthly" : "Annual" }}
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
        {{ $filters.currencyDisplayWithoutSymbol(addons.planAddOnamount) }}
        <span class="fs-8 fw-light">/{{ addons.planType }}</span>
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
    :currentCommitmentTerm="addons.commitmentTerm"
    :newCommitmentTerm="
      addons.commitmentTerm == 'Annual' ? 'Monthly' : 'Annual'
    "
    @close="showCommitmentTermModel = false"
    v-if="showCommitmentTermModel"
  />
</template>
<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { Prop } from "vue-property-decorator";

import CancelPlanAddOn from "./CancelPlanAddOn.vue";
import ChangePaymentInfo from "./ChangePaymentInfo.vue";
import ChangeCommitmentTerm from "./ChangeCommitmentTerm.vue";

import { manageSubscriptionResponseModel } from "@/model";

@Options({
  components: {
    CancelPlanAddOn,
    ChangePaymentInfo,
    ChangeCommitmentTerm,
  },
})
export default class Addons extends Vue {
  @Prop() addons: manageSubscriptionResponseModel;

  public togglePlan: boolean = false;
  public showCancelModel: boolean = false;
  public toggleChangePayment: boolean = false;
  public toggleCommitmentTerm: boolean = false;

  public showCommitmentTermModel: boolean = false;

  public onCancel() {
    this.showCancelModel = false;
  }

  public clickOutSidePlan() {
    this.togglePlan = false;
  }

  public clickOutSideTerm() {
    this.toggleCommitmentTerm = false;
  }

  public clickOutSideChangePayment() {
    this.toggleChangePayment = false;
  }
}
</script>