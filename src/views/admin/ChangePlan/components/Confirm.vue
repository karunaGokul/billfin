<template>
  <div class="card ms-6 me-6 mb-6 p-4">
    <div class="text-center">
      <img
        src="@/assets/subsrcipted.png"
        alt="Subscripe image"
        width="650"
        class="mt-4 mb-4"
      />
      <div class="text-primary fw-bold fa-3x">
        {{ $filters.currencyDisplay(dueAmount) }}
      </div>
      <div class="fw-bold fa-lg">AMOUNT DUE</div>
      <div class="fa-lg text-gray-secondary mt-6 mb-6">
        You’re all set! Your payment of
        <span class="text-gray">{{ $filters.currencyDisplay(totalFees) }}</span>
        is processing.
      </div>
      <div class="fa-lg text-gray-secondary mt-6 mb-6">
        You are also setup for Auto Pay, and your next payment date is
        <span class="text-gray">{{ nextPaymentDate }}.</span>
      </div>
      <div class="fa-lg mt-4 mb-6 fw-bold">Thank you!</div>
      <div>
        <router-link to="/dashboard" tag="button" class="btn btn-primary">
          Go to dashboard
        </router-link>
      </div>
      <div>
        <router-link
          to="/my-subscription"
          tag="a"
          class="btn btn-link text-gray-secondary"
        >
          Manage subscription
        </router-link>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue } from "vue-class-component";

import moment from "moment";
import { useStore } from "vuex";

export default class Confirm extends Vue {
  public store = useStore();
  public dueAmount: number = 0;
    
  get products() {
    return this.store.getters.products;
  }

  get showAumBilling() {
    return this.products.includes("AUM");
  }

  get showSubscription() {
    return this.products.includes("SUBSCRIPTION");
  }

  get aumBilling() {
    return this.store.getters.aumBilling;
  }

  get subscriptionBilling() {
    return this.store.getters.subscriptionBilling;
  }

  get totalFees() {
    let subAmount: number = 0,
      aumAmount: number = 0;
    if (this.showAumBilling) {
      aumAmount = this.aumBilling.addons.reduce((prev: number, cur: any) => {
        return prev + parseInt(cur.planAddOnAmount) * parseInt(cur.quantity);
      }, 0);
      aumAmount = aumAmount + this.aumBilling.plan.termPlanAmount;
    }

    if (this.showSubscription) {
      subAmount = this.subscriptionBilling.addons.reduce(
        (prev: number, cur: any) => {
          return prev + parseInt(cur.planAddOnAmount) * parseInt(cur.quantity);
        },
        0
      );
      subAmount = subAmount + this.subscriptionBilling.plan.termPlanAmount;
    }
    return aumAmount + subAmount;
  }

  get nextPaymentDate() {
    let date = new Date();
    if (
      this.aumBilling.commitmentTerm == "Monthly" ||
      this.subscriptionBilling.commitmentTerm == "Monthly"
    ) {
      date.setMonth(date.getMonth() + 1);
    } else {
      date.setFullYear(date.getFullYear() + 1);
    }
    return moment(String(date)).format("MM/DD/YYYY");
  }
}
</script>