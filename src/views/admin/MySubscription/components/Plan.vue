<template>
  <div class="row g-0 border-bottom border-light-gray pb-4">
    <div class="col-4">
      <div
        class="fw-bolder fs-4 mb-2"
        :class="{ 'text-gray-secondary': plan.endDate && !plan.activeFlag }"
      >
        {{ plan.planName }}

        <span
          class="badge fs-7 ms-2"
          :class="{
            'bg-success-alpha text-success':
              plan.status == 'CURRENT' ||
              (plan.status == 'CANCELLED' && plan.activeFlag),
            'bg-warning-alpha text-warning': plan.status == 'UPCOMING',
            'bg-dander-alpha text-danger':
              plan.status == 'CANCELLED' && !plan.activeFlag,
          }"
          >{{
            plan.status == "CURRENT"
              ? "Current"
              : plan.status == "UPCOMING"
              ? "Upcoming"
              : plan.status == "CANCELLED" && !plan.activeFlag
              ? "Canceled"
              : "Current"
          }}</span
        >
      </div>
      <div
        class="fs-6 text-muted"
        :class="{ 'text-gray-secondary': plan.endDate && !plan.activeFlag }"
      >
        {{ description }}
      </div>
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

          <span :class="{ 'text-gray-secondary': plan.endDate  && !plan.activeFlag}">
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
          </span>
        </template>
        <template v-else>
          <span :class="{ 'text-gray-secondary': plan.endDate }">
            Checking {{ plan.cardNumber.split(" ")[1] }}
          </span>
        </template>
      </div>
      <div
        class="border border-dashed p-2 rounded fw-bolder fs-7"
        style="width: fit-content"
        :class="{
          'border-warning bg-warning-alpha text-warning':
            (plan.status == 'CURRENT' && plan.endDate == null) ||
            (plan.status == 'UPCOMING' && plan.endDate == null),
          'border-danger bg-dander-alpha text-danger':
            plan.status == 'CURRENT' && plan.endDate != null,
          'text-danger border-danger':
            plan.status == 'CANCELLED' && plan.activeFlag,
          'border-gray bg-gray-alpha text-gray-secondary':
            plan.status == 'CANCELLED' && !plan.activeFlag,
        }"
      >
        {{ planStatus }}
      </div>
    </div>
    <div
      class="col-3 dropdown dropdown-primary"
      v-click-outside="clickOutSideTerm"
    >
      <div
        class="fw-bolder fs-4 mb-2 dropdown-toggle"
        :class="{ 'text-gray-secondary': plan.endDate && !plan.activeFlag }"
        @click="!plan.endDate ? (toggleCommitmentTerm = true) : ''"
      >
        {{ plan.commitmentTerm == "ANNUAL" ? "Annual" : "Monthly" }}
        Subscription
      </div>
      <div class="dropdown-menu" :class="{ show: toggleCommitmentTerm }">
        <ul class="m-2 p-0">
          <li
            class="dropdown-item p-4 fw-bold"
            @click="showCommitmentTermModel = true"
          >
            Switch to
            {{ plan.commitmentTerm == "ANNUAL" ? "Monthly" : "Annual" }}
            Commitment
          </li>
        </ul>
      </div>
      <div
        :class="{
          'text-gray-secondary': plan.status == 'CANCELLED' && !plan.activeFlag,
          'text-danger': plan.status == 'CANCELLED' && plan.activeFlag,
          'text-muted': plan.status != 'CANCELLED' && !plan.endDate,
        }"
      >
        <div v-if="plan.status == 'CANCELLED'">
          {{ $datehelper.changeDateFormatWithSlash(plan.startDate) }} -
          {{ $datehelper.changeDateFormatWithSlash(plan.endDate) }}
        </div>

        <div
          v-if="
            plan.commitmentTerm == 'MONTHLY' &&
            plan.status == 'CURRENT' &&
            plan.activeFlag
          "
        >
          Subscribed since
          {{ $datehelper.changeDateFormatWithSlash(plan.startDate) }}
        </div>
        <div
          v-if="
            plan.commitmentTerm == 'MONTHLY' &&
            plan.status == 'UPCOMING' &&
            !plan.activeFlag
          "
        >
          Subscription starts
          {{ $datehelper.changeDateFormatWithSlash(plan.startDate) }}
        </div>

        <div v-if="plan.commitmentTerm == 'ANNUAL' && plan.endDate == null">
          {{ $datehelper.changeDateFormatWithSlash(plan.startDate) }} -
          {{ $datehelper.changeDateFormatWithSlash(plan.renewDate) }}
        </div>
        <div
          v-if="
            plan.status != 'CANCELLED' &&
            plan.commitmentTerm == 'ANNUAL' &&
            plan.endDate != null
          "
        >
          {{ $datehelper.changeDateFormatWithSlash(plan.startDate) }} -
          {{ $datehelper.changeDateFormatWithSlash(plan.endDate) }}
        </div>
      </div>
    </div>
    <div class="col-2 d-flex align-items-center justify-content-end">
      <div
        class="fw-bolder fa-2x"
        :class="{ 'text-gray-secondary': plan.endDate && !plan.activeFlag }"
      >
        <span class="fs-7">$</span>
        {{ $filters.currencyDisplayWithoutSymbol(plan.paymentAmount) }}
        <span class="fs-8 fw-light"
          >/{{ plan.commitmentTerm == "ANNUAL" ? "Yr" : "Mo" }}</span
        >
      </div>
      <div
        class="dropdown dropdown-primary ms-4"
        :class="{ 'text-gray-secondary': plan.endDate && !plan.activeFlag }"
        v-click-outside="clickOutSidePlan"
      >
        <i
          class="fas fa-ellipsis-v fs-1 ms-4 mt-2"
          style="cursor: pointer"
          @click="!plan.endDate && plan.activeFlag ? (togglePlan = true) : ''"
        ></i>
        <ul
          class="dropdown-menu overflow-auto p-2"
          :class="{ show: togglePlan }"
          style="right: 0"
        >
          <li class="dropdown-item pt-2 pb-2" @click="changePlan">
            Change Plan
          </li>
          <li class="dropdown-item pt-2 pb-2" @click="toggleCancelModel = true">
            Cancel Plan
          </li>
        </ul>
      </div>
    </div>
  </div>
  <cancel-plan-addOn
    title="Cancel Subscription"
    :product="product"
    :name="plan.planName"
    :endDate="plan.renewDate"
    :subscriptionPlanId="plan.subscriptionPlanId"
    type="plan"
    @close="toggleCancelModel = false"
    @cancelled="onCancelled"
    v-if="toggleCancelModel"
  />
  <renew-plan-addOn
    title="Plan"
    :name="plan.planName"
    type="plan"
    @close="toggleRenewModel = false"
    @cancel="onRenewModel"
    v-if="toggleRenewModel"
  />
  <change-plan-commitment-term
    :plan="plan"
    :addons="addons"
    :currentTerm="plan.commitmentTerm == 'ANNUAL' ? 'Annual' : 'Monthly'"
    @done="onUpdateTermChanged"
    @close="showCommitmentTermModel = false"
    v-if="showCommitmentTermModel"
  />
</template>
<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { Prop } from "vue-property-decorator";

import { useStore } from "vuex";

import moment from "moment";

import CancelPlanAddOn from "./CancelPlanAddOn.vue";
import RenewPlanAddOn from "./RenewPlanAddOn.vue";
import ChangePlanCommitmentTerm from "./ChangePlanCommitmentTerm.vue";

import { subscriptionResponseModel, addonsResponseModel } from "@/model";

@Options({
  components: {
    CancelPlanAddOn,
    RenewPlanAddOn,
    ChangePlanCommitmentTerm,
  },
})
export default class Plan extends Vue {
  @Prop() plan: subscriptionResponseModel;
  @Prop() product: string;
  @Prop() addons: Array<addonsResponseModel>;

  public store = useStore();

  public togglePlan: boolean = false;
  public toggleCancelModel: boolean = false;
  public toggleRenewModel: boolean = false;

  public toggleCommitmentTerm: boolean = false;

  public showCommitmentTermModel: boolean = false;

  public onCancelled() {
    this.toggleCancelModel = false;
    this.$emit("planAddOnCancelled");
  }

  public changePlan() {
    this.store.dispatch(
      "updatePaymentType",
      this.plan.cardType == "Credit Card" ? this.plan.cardType : "ACH"
    );

    let cardNumber = { number: this.plan.cardNumber };

    if (this.plan.cardType == "Credit Card")
      this.store.dispatch("updateCreditCard", cardNumber);
    else this.store.dispatch("updateACH", cardNumber);

    let payload = [];
    payload.push(this.product);
    this.store.dispatch("updateProducts", payload);

    let options = {
      product: this.product,
      plan: {},
      currentPlan: this.plan,
      commitmentTerm:
        this.plan.commitmentTerm == "ANNUAL" ? "Annual" : "Monthly",
    };
    this.store.dispatch("updatePlan", options);

    this.$router.push("./change-plan");
  }

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

  public onUpdateTermChanged() {
    this.showCommitmentTermModel = false;
    this.toggleCancelModel = false;
    this.$emit("termChanged");
  }

  get description() {
    return this.planList.find((e: any) => e.planName == this.plan.planName)
      .description;
  }

  get planList() {
    return this.store.getters.planList;
  }

  get planStatus() {
    let status: string = "";
    if (this.plan.status == "CANCELLED")
      status = `Canceled on ${this.$datehelper.changeMonthFormat(
        this.plan.cancelDate,
        3
      )}`;
    else if (this.plan.status == "UPCOMING" && this.plan.endDate == null)
      status = `Auto-renews on ${this.$datehelper.changeMonthFormat(
        this.plan.renewDate,
        3
      )}`;
    else if (this.plan.status == "CURRENT" && this.plan.endDate == null)
      status = `Auto-renews on ${this.$datehelper.changeMonthFormat(
        this.plan.renewDate,
        3
      )}`;
    else if (this.plan.status == "CURRENT" && this.plan.endDate != null)
      status = `Expires on ${this.$datehelper.changeMonthFormat(
        this.plan.endDate,
        3
      )}`;
    return status;
  }
}
</script>