<template>
  <div class="signup-plan-container">
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
              <div class="tab-label-name">Addons</div>
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
              <div class="tab-label-name">Payment</div>
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
              <div class="tab-label-name">Review & Confirm</div>
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
              <div class="tab-label-name">Sign & Subscribe</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="m-6">
      <div class="tab-group">
        <div class="tab-content-group">
          <addons @next="step = 2" v-if="step == 1" />
          <payment @back="step = 1" @next="step = 3" v-if="step == 2"/>
          <review @back="step = 2" @next="step = 4" v-if="step == 3"/>
          <subscribe @back="step = 3" v-if="step == 4"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Options } from "vue-class-component";
import Addons from "./components/Addons.vue";
import Payment from "./components/Payment.vue";
import Review from "./components/Review.vue";
import Subscribe from "./components/Subscribe.vue";

@Options({
  components: {
    Addons,
    Payment,
    Review,
    Subscribe
  },
})
export default class SignUpForAddons extends Vue {
  public step: number = 1;
}
</script>