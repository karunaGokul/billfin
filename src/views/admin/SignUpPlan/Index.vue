<template>
  <div class="signup-plan-container">
    <div class="card ms-6 me-6 mb-6" v-if="!isSubscriped">
      <div class="tab-group">
        <div class="tab-header tab-header-icon pt-10">
          <ul class="tab-label-group justify-content-evenly">
            <li
              class="tab-label d-flex align-items-center"
              :class="{
                'tab-label-active': step == 1,
                'tab-label-complete': step > 1,
              }"
            >
              <div class="tab-label-box me-4">
                <i class="fas fa-check text-primary tab-label-icon"></i>
                <span class="tab-label-count">1</span>
              </div>
              <div class="tab-label-name">Plan</div>
            </li>
            <li
              class="tab-label d-flex align-items-center"
              :class="{
                'tab-label-active': step == 2,
                'tab-label-complete': step > 2,
              }"
            >
              <div class="tab-label-box me-4">
                <i class="fas fa-check text-primary tab-label-icon"></i>
                <span class="tab-label-count">2</span>
              </div>
              <div class="tab-label-name">Add-Ons</div>
            </li>
            <li
              class="tab-label d-flex align-items-center"
              :class="{
                'tab-label-active': step == 3,
                'tab-label-complete': step > 3,
              }"
            >
              <div class="tab-label-box me-4">
                <i class="fas fa-check text-primary tab-label-icon"></i>
                <span class="tab-label-count">3</span>
              </div>
              <div class="tab-label-name">Payment</div>
            </li>
            <li
              class="tab-label d-flex align-items-center"
              :class="{
                'tab-label-active': step == 4,
                'tab-label-complete': step > 4,
              }"
            >
              <div class="tab-label-box me-4">
                <i class="fas fa-check text-primary tab-label-icon"></i>
                <span class="tab-label-count">4</span>
              </div>
              <div class="tab-label-name">Review & Confirm</div>
            </li>
            <li
              class="tab-label d-flex align-items-center"
              :class="{
                'tab-label-active': step == 5,
              }"
            >
              <div class="tab-label-box me-4">
                <i class="fas fa-check text-primary tab-label-icon"></i>
                <span class="tab-label-count">5</span>
              </div>
              <div class="tab-label-name">Sign & Subscribe</div>
            </li>
          </ul>
        </div>
        <div class="tab-content-group w-75 mx-auto">
          <plan @next="step = 2" v-if="step == 1" />
          <add-ons @back="step = 1" @next="step = 3" v-if="step == 2" />
          <payment @back="step = 2" @next="step = 4" v-if="step == 3" />
          <review @back="step = 3" @next="step = 5" v-if="step == 4" />
          <subscribe @back="step = 4" @next="onSubscripe" v-if="step == 5" />
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
        <div class="fa-lg text-muted mt-6 mb-6">
          You’re all set! Your payment of $2,188 is processing.
        </div>
        <div class="fa-lg text-muted mt-6 mb-6">
          You are also setup for Auto Pay, and your next payment date is
          10/8/2022.
        </div>
        <div class="fa-lg mt-4 mb-6 fw-bold">Thank you!</div>
        <div>
          <router-link to="/dashboard" tag="button" class="btn btn-primary">
            Go to dashboard
          </router-link>
        </div>
        <div>
          <router-link to="/my-subscription" tag="a" class="btn btn-link text-muted">
            Manage subscription
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Options } from "vue-class-component";

import Plan from "./components/Plan.vue";
import AddOns from "./components/AddOns.vue";
import Payment from "./components/Payment/Index.vue";
import Review from "./components/Review.vue";
import Subscribe from "./components/Subscribe.vue";

@Options({
  components: {
    Plan,
    AddOns,
    Payment,
    Review,
    Subscribe,
  },
})
export default class SignUpPlan extends Vue {
  public step: number = 1;
  public isSubscriped: boolean = false;

  public dueAmount: number = 0;

  public onSubscripe() {
    this.isSubscriped = true;
  }
}
</script>