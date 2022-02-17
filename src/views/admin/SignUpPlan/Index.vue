<template>
  <confirm v-if="firmStatus == 'SUBSCRIBED'" :pageType="pageType" />
  <div class="signup-plan-container" v-else>
    <h3 v-if="pageType == 'Reactivate'" class="p-4 ps-5 fs-4">
      Reactivate Account
    </h3>
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
          <products @next="step = 2" @back="onBack" v-if="step == 1" />
          <plan @back="step = 1" @next="step = 3" v-if="step == 2" />
          <addons @back="step = 2" @next="step = 4" v-if="step == 3" />
          <pick-payment
            @back="step = 3"
            @next="step = 5"
            pageType="SignUp"
            v-if="step == 4"
          />
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
import PickPayment from "@/components/controls/PickPayment/Index.vue";
import Review from "./components/Review.vue";
import Subscribe from "./components/Subscribe.vue";
import Confirm from "./components/Confirm.vue";

@Options({
  components: {
    Products,
    Plan,
    Addons,
    PickPayment,
    Review,
    Subscribe,
    Confirm,
  },
})
export default class SignUpPlan extends Vue {
  public step: number = 1;
  public store = useStore();

  public firmStatus: string = "";
  public pageType: string = "";

  created() {
    if (this.$route.params.type)
      this.pageType = this.$route.params.type.toString();

  }

  public updateFirmStatus() {
    this.store.dispatch("updateFirmStatus");
    this.firmStatus = "SUBSCRIBED";

    if (this.pageType == "Reactivate") {
      this.store.dispatch("clearFirm");
      this.store.dispatch("loadEntitlements");
    }
  }

  onBack() {
    this.store.dispatch("clearSubscription");

    let redirectPage = this.$route.params.redirectPage
      ? this.$route.params.redirectPage.toString()
      : "/dashboard";
      
    this.$router.push(redirectPage);
  }
}
</script>