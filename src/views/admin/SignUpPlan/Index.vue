<template>
  <div class="signup-plan-container">
    <div class="card ms-6 me-6 mb-6">
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
                'tab-label-active': step == 5
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
          <subscribe @back="step = 4" v-if="step == 5" />
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
    Subscribe
  },
})
export default class SignUpPlan extends Vue {
  public step: number = 1;
}
</script>