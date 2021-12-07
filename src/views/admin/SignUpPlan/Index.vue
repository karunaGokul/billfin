<template>
  <confirm v-if="firmStatus == 'SUBSCRIBED'" />
  <div class="signup-plan-container" v-else>
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
          <subscribe
            @back="step = 5"
            @next="updateFirmStatus"
            v-if="step == 6"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { useStore } from "vuex";

import Products from "./components/Products.vue";
import Plan from "./components/Plan.vue";
import Addons from "./components/Addons.vue";
import Payment from "./components/Payment.vue";
import Review from "./components/Review.vue";
import Subscribe from "./components/Subscribe.vue";
import Confirm from "./components/Confirm.vue";

@Options({
  components: {
    Products,
    Plan,
    Addons,
    Payment,
    Review,
    Subscribe,
    Confirm,
  },
})
export default class SignUpPlan extends Vue {
  public step: number = 1;
  public store = useStore();

  public firmStatus: string = "";

  public subscription: any = null;

  created() {
    this.firmStatus = this.store.getters.firms.firmStatus;
  }

  mounted() {
    this.subscription = this.store.subscribe((mutations) => {
      if (mutations.type == "onFirmIdChanged") {
        this.firmStatus = this.store.getters.firms.firmStatus;
        this.step = 1;
      }
    });
  }

  unmounted() {
    if (this.subscription) this.subscription();
  }

  public updateFirmStatus() {
    this.store.dispatch("updateFirmStatus");
    this.firmStatus = "SUBSCRIBED";
    console.log(this.firmStatus);
  }
}
</script>