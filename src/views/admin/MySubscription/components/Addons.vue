<template>
  <div class="row g-0 pb-4 border-bottom border-light-gray">
    <div class="col-4">
      <div
        class="fw-bolder fs-4 mb-2"
        :class="{ 'text-gray-secondary': addons.endDate && !addons.activeFlag }"
      >
        {{ addons.addOnName }}
        <span
          class="badge fs-7 ms-2"
          :class="{
            'bg-success-alpha text-success':
              addons.status != 'CANCELLED' ||
              (addons.status == 'CANCELLED' && addons.activeFlag),
            'bg-dander-alpha text-danger':
              addons.status == 'CANCELLED' && !addons.activeFlag,
          }"
          >{{
            addons.status == "CURRENT"
              ? "Current"
              : addons.status == "UPCOMING"
              ? "Upcoming"
              : addons.status == "CANCELLED" && !addons.activeFlag
              ? "Canceled"
              : "Current"
          }}</span
        >
      </div>
      <div
        class="fs-6 text-muted"
        :class="{ 'text-gray-secondary': addons.endDate && !addons.activeFlag }"
      >
        <div
          v-if="
            addons.addOnName != 'Admin User License' ||
            addons.addOnName != 'Multi-Connector Integrations'
          "
        >
          {{ description }}
        </div>
        <div v-else>
          <div v-if="addons.addOnName == 'Admin User License'">
            Number of users: {{ addons.quantity }}
          </div>
          <div v-if="addons.addOnName == 'Multi-Connector Integrations'">
            Number of connectors: {{ addons.quantity }}
          </div>
        </div>
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
          <span
            :class="{
              'text-gray-secondary': addons.endDate && !addons.activeFlag,
            }"
          >
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
            (addons.status == 'CURRENT' && addons.endDate == null) ||
            (addons.status == 'UPCOMING' && addons.endDate == null),
          'border-danger bg-dander-alpha text-danger':
            addons.status == 'CURRENT' && addons.endDate != null,
          'text-danger border-danger':
            addons.status == 'CANCELLED' && addons.activeFlag,
          'border-gray bg-gray-alpha text-gray-secondary':
            addons.status == 'CANCELLED' && !addons.activeFlag,
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
        :class="{ 'text-gray-secondary': addons.endDate && !addons.activeFlag }"
        @click="
          !addons.endDate && allowChangeAddonTerm
            ? (toggleCommitmentTerm = true)
            : ''
        "
      >
        {{ addons.commitmentTerm == "ANNUAL" ? "Annual" : "Monthly" }}
        Subscription
      </div>
      <div class="dropdown-menu" :class="{ show: toggleCommitmentTerm }">
        <ul class="m-2 p-0">
          <li
            class="dropdown-item p-4 fw-bold"
            :class="{
              'text-gray-secondary': addons.endDate && !addons.activeFlag,
            }"
            @click="showCommitmentTermModel = true"
          >
            Switch to
            {{ addons.commitmentTerm == "ANNUAL" ? "Monthly" : "Annual" }}
            Commitment
          </li>
        </ul>
      </div>
      <div
        :class="{
          'text-gray-secondary': addons.status == 'CANCELLED' && !addons.activeFlag,
          'text-danger': addons.status == 'CANCELLED' && addons.activeFlag,
          'text-muted': addons.status != 'CANCELLED' && !addons.endDate
        }"
      >
        {{ addons.startDate }} -
        {{
          addons.status == "CANCELLED" ||
          (addons.status == "CURRENT" && addons.endDate != null)
            ? addons.endDate
            : (addons.status == "UPCOMING" && addons.endDate == null) ||
              (addons.status == "CURRENT" && this.addons.endDate == null)
            ? addons.renewDate
            : ""
        }}
      </div>
    </div>
    <div class="col-2 d-flex align-items-center justify-content-end">
      <div
        class="fw-bolder fa-2x"
        :class="{ 'text-gray-secondary': addons.endDate && !addons.activeFlag }"
      >
        <span class="fs-7">$</span>
        {{ $filters.currencyDisplayWithoutSymbol(addons.paymentAmount) }}
        <span class="fs-8 fw-light"
          >/{{ addons.commitmentTerm == "ANNUAL" ? "Yr" : "Mo" }}</span
        >
      </div>
      <div
        class="dropdown dropdown-primary ms-4"
        :class="{ 'text-gray-secondary': addons.endDate && !addons.activeFlag }"
        v-click-outside="clickOutSidePlan"
      >
        <i
          class="fas fa-ellipsis-v fs-1 ms-4 mt-2"
          style="cursor: pointer"
          @click="!addons.endDate ? (togglePlan = true) : ''"
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
    :endDate="addons.renewDate"
    :quantity="addons.quantity"
    :subscriptionAddOnId="addons.subscriptionAddOnId"
    type="addons"
    @close="showCancelModel = false"
    @cancelled="onCancelled"
    v-if="showCancelModel"
  />
  <change-add-on-commitment-term
    :addons="addons"
    :currentTerm="addons.commitmentTerm == 'ANNUAL' ? 'Annual' : 'Monthly'"
    @done="onUpdateTermChanged"
    @close="showCommitmentTermModel = false"
    v-if="showCommitmentTermModel"
  />
</template>
<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { Prop } from "vue-property-decorator";

import { useStore } from "vuex";

import CancelPlanAddOn from "./CancelPlanAddOn.vue";
import ChangeAddOnCommitmentTerm from "./ChangeAddOnCommitmentTerm.vue";

import { addonsResponseModel } from "@/model";

@Options({
  components: {
    CancelPlanAddOn,
    ChangeAddOnCommitmentTerm,
  },
})
export default class Addons extends Vue {
  @Prop() addons: addonsResponseModel;
  @Prop() allowChangeAddonTerm: string;

  public store = useStore();

  public togglePlan: boolean = false;
  public showCancelModel: boolean = false;
  public toggleCommitmentTerm: boolean = false;

  public showCommitmentTermModel: boolean = false;

  public onCancelled() {
    this.showCancelModel = false;
    this.$emit("planAddOnCancelled");
  }

  public clickOutSidePlan() {
    this.togglePlan = false;
  }

  public clickOutSideTerm() {
    this.toggleCommitmentTerm = false;
  }

  public onUpdateTermChanged() {
    this.$router.push("/my-subscription");
  }

  get description() {
    return this.addOnsList.find(
      (e: any) => e.addOnName == this.addons.addOnName
    ).description;
  }

  get addOnStatus() {
    let status: string = "";
    if (this.addons.status == "CANCELLED")
      status = `Cancelled on ${this.addOnEndDate(this.addons.endDate)}`;
    else if (this.addons.status == "UPCOMING" && this.addons.endDate == null)
      status = `Auto-renews on ${this.addOnEndDate(this.addons.renewDate)}`;
    else if (this.addons.status == "CURRENT" && this.addons.endDate == null)
      status = `Auto-renews on ${this.addOnEndDate(this.addons.renewDate)}`;
    else if (this.addons.status == "CURRENT" && this.addons.endDate != null)
      status = `Expires on ${this.addOnEndDate(this.addons.endDate)}`;
    return status;
  }

  get addOnsList() {
    return this.store.getters.addOnsList;
  }

  private addOnEndDate(endDate: string) {
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