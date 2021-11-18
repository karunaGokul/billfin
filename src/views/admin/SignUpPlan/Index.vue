<template>
  <div class="signup-plan-container" v-if="!isSubscriped">
    <div class="card m-6">
      <div class="tab-group">
        <div class="tab-header tab-header-icon pt-5 pb-5">
          <ul class="tab-label-group justify-content-evenly">
            <li
              class="tab-label d-flex align-items-center ms-8 me-8"
              :class="{
                'tab-label-active': step == 1,
                'tab-label-complete': step > 1,
              }"
            >
              <div class="tab-label-box me-4">
                <i class="fas fa-check text-primary tab-label-icon"></i>
                <span class="tab-label-count">1</span>
              </div>
              <div class="tab-label-name">Products</div>
            </li>
            <li
              class="tab-label d-flex align-items-center ms-8 me-8"
              :class="{
                'tab-label-active': step == 2,
                'tab-label-complete': step > 2,
              }"
            >
              <div class="tab-label-box me-4">
                <i class="fas fa-check text-primary tab-label-icon"></i>
                <span class="tab-label-count">2</span>
              </div>
              <div class="tab-label-name">Plans</div>
            </li>
            <li
              class="tab-label d-flex align-items-center ms-8 me-8"
              :class="{
                'tab-label-active': step == 3,
                'tab-label-complete': step > 3,
              }"
            >
              <div class="tab-label-box me-4">
                <i class="fas fa-check text-primary tab-label-icon"></i>
                <span class="tab-label-count">3</span>
              </div>
              <div class="tab-label-name">Add-Ons</div>
            </li>
            <li
              class="tab-label d-flex align-items-center ms-8 me-8"
              :class="{
                'tab-label-active': step == 4,
                'tab-label-complete': step > 4,
              }"
            >
              <div class="tab-label-box me-4">
                <i class="fas fa-check text-primary tab-label-icon"></i>
                <span class="tab-label-count">4</span>
              </div>
              <div class="tab-label-name">Payment</div>
            </li>
            <li
              class="tab-label d-flex align-items-center ms-8 me-8"
              :class="{
                'tab-label-active': step == 5,
                'tab-label-complete': step > 5,
              }"
            >
              <div class="tab-label-box me-4">
                <i class="fas fa-check text-primary tab-label-icon"></i>
                <span class="tab-label-count">5</span>
              </div>
              <div class="tab-label-name">Review & Confirm</div>
            </li>
            <li
              class="tab-label d-flex align-items-center ms-8 me-8"
              :class="{
                'tab-label-active': step == 6,
              }"
            >
              <div class="tab-label-box me-4">
                <i class="fas fa-check text-primary tab-label-icon"></i>
                <span class="tab-label-count">6</span>
              </div>
              <div class="tab-label-name">Sign & Subscribe</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="m-6">
      <div class="tab-group">
        <div class="tab-content-group">
          <products @next="step = 2" v-if="step == 1" />
          <plan @back="step = 1" @next="step = 3" v-if="step == 2" />
          <addons @back="step = 2" @next="step = 4" v-if="step == 3" />
          <payment @back="step = 3" @next="step = 5" v-if="step == 4" />
          <review @back="step = 4" @next="step = 6" v-if="step == 5" />
          <subscribe @back="step = 5" @next="onSubscripe" v-if="step == 6" />
        </div>
      </div>
    </div>
  </div>
  <div class="card ms-6 me-6 mb-6 p-4" v-else>
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
        <span class="text-gray">{{ $filters.currencyDisplay(totalFees) }}</span
        >is processing.
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
import { Vue, Options } from "vue-class-component";

import moment from "moment";
import { useStore } from "vuex";

import Products from "./components/Products.vue";
import Plan from "./components/Plan/Index.vue";
import Addons from "./components/Addons/Index.vue";
import Payment from "./components/Payment/Index.vue";
import Review from "./components/Review.vue";
import Subscribe from "./components/Subscribe.vue";

@Options({
  components: {
    Products,
    Plan,
    Addons,
    Payment,
    Review,
    Subscribe,
  },
})
export default class SignUpPlan extends Vue {
  public step: number = 1;
  public isSubscriped: boolean = false;

  public store = useStore();

  public dueAmount: number = 0;

  public onSubscripe() {
    this.isSubscriped = true;
  }

  get products() {
    return this.store.getters.getProducts;
  }

  get showAumBilling() {
    return this.products.includes("AUM");
  }

  get showSubscription() {
    return this.products.includes("SUBSCRIPTION");
  }

  get aumBilling() {
    return this.store.getters.getAumBilling;
  }

  get subscriptionBilling() {
    return this.store.getters.getSubscriptionBilling;
  }

  get totalFees() {
    let subAmount: number = 0;
    let aumAmount: number = 0;
    if (this.showAumBilling) {
      aumAmount = this.aumBilling.addons.reduce((prev: number, cur: any) => {
        return prev + parseInt(cur.planAddOnamount);
      }, 0);
      aumAmount = aumAmount + this.aumBilling.plan.termPlanAmount;
    } else {
      subAmount = this.subscriptionBilling.addons.reduce(
        (prev: number, cur: any) => {
          return prev + parseInt(cur.planAddOnamount);
        },
        0
      );
      subAmount = subAmount + this.subscriptionBilling.plan.termPlanAmount;
    }
    return aumAmount + subAmount;
  }

  get nextPaymentDate() {
    const currentDate = new Date();
    const date = new Date(currentDate);
    if (this.store.getters.getCommitmentTerm == "Monthly") {
      date.setMonth(currentDate.getMonth() + 1);
      date.setDate(currentDate.getDate() + 1);
    } else {
      date.setFullYear(currentDate.getFullYear() + 1);
      date.setDate(currentDate.getDate() + 1);
    }

    return moment(String(date)).format("MM/DD/YYYY");
  }
}
</script>