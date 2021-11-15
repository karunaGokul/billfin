<template>
  <div class="row g-0">
    <div class="col-4">
      <div class="fw-bolder fs-4 mb-2">
        {{ addons.addOnName }}
        <span class="badge text-success ms-2" style="background-color: #e8fff3"
          >Active</span
        >
      </div>
      <div class="fs-6 text-muted">{{ addons.description }}</div>
    </div>
    <div class="col-3">
      <div class="fw-bolder mb-2 fs-5">
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
        {{ cardType }}
        ****{{ addons.cardNumber.substr(addons.cardNumber.length - 4) }}
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
          <li class="dropdown-item" @click="showCancelModel = true">
            Cancel Add-On
          </li>
          <li class="dropdown-item pt-2 pb-2">Renew Add-On</li>
          <li class="dropdown-item pt-2 pb-2">Add User</li>
          <li class="dropdown-item pt-2 pb-2">Invoice</li>
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
</template>
<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { Prop } from "vue-property-decorator";

import CancelPlanAddOn from "./CancelPlanAddOn.vue";

import { manageSubscriptionAddonsResponseModel } from "@/model";

@Options({
  components: {
    CancelPlanAddOn,
  },
})
export default class Addons extends Vue {
  @Prop() addons: manageSubscriptionAddonsResponseModel;

  public togglePlan: boolean = false;
  public showCancelModel: boolean = false;

  public onCancel() {
    console.log("Plan cancelled");
    this.showCancelModel = false;
  }

  public clickOutSidePlan() {
    if (this.togglePlan) this.togglePlan = false;
  }

  get cardType() {
    let cardType: string = "";
    if (this.addons.cardType == "mast") cardType = "Mastercard";
    else if (this.addons.cardType == "visa") cardType = "Visa";
    else if (this.addons.cardType == "amex") cardType = "American Express";
    else cardType = "Discover";
    return cardType;
  }
}
</script>