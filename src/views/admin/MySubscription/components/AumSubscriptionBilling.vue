<template>
  <div class="text-muted">
    {{
      bliingType == "AUM Billing"
        ? "Your AUM Billing subscription lets you easily and intuitely automate your AUM advisory billing operations."
        : "Your Subscription Billing subscription lets you setup and bill for your services on a subscription model."
    }}
  </div>
  <div class="card mt-6 mb-6">
    <div class="card-header align-items-center border-bottom">
      <div class="card-title fw-bolder fs-4">
        {{
          bliingType == "AUM Billing"
            ? "AUM Billing Subscription"
            : "Subscription Billing Subscription"
        }}
      </div>
    </div>
    <div class="card-body p-0">
      <div class="ps-9 pe-9 p-4" v-for="(item, index) in plans" :key="index">
        <plan :plan="item" />
      </div>
    </div>
  </div>
  <div class="card mt-6 mb-6">
    <div class="card-header align-items-center border-bottom">
      <div class="card-title fw-bolder fs-4">
        {{
          bliingType == "AUM Billing"
            ? "AUM Billing Add-Ons"
            : "Subscription Billing Add-Ons"
        }}
      </div>
      <button type="button" class="btn btn-primary">Add More</button>
    </div>
    <div class="card-body p-0">
      <div class="ps-9 pe-9 p-4" v-for="(item, index) in addons" :key="index">
        <addons :addons="item" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { Prop, Inject } from "vue-property-decorator";

import {
  manageSubscriptionRequestModel,
  manageSubscriptionPlanResponseModel,
  manageSubscriptionAddonsResponseModel,
} from "@/model";

import { IManageSubscription } from "@/service";

import Plan from "./Plan.vue";
import Addons from "./Addons.vue";

@Options({
  components: {
    Plan,
    Addons,
  },
})
export default class AumSubscriptionBilling extends Vue {
  @Inject("manageSubscripeService") service: IManageSubscription;
  @Prop() bliingType: string;

  public plans: Array<manageSubscriptionPlanResponseModel> = [];
  public addons: Array<manageSubscriptionAddonsResponseModel> = [];

  mounted() {
    this.getPlans();
    this.getAddons();
  }

  private getPlans() {
    const request = new manageSubscriptionRequestModel();
    request.billingType = this.bliingType;
    this.service
      .getPlans(request)
      .then((response) => {
        console.log(response);
        this.plans = response;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  private getAddons() {
    const request = new manageSubscriptionRequestModel();
    request.billingType = this.bliingType;
    this.service
      .getAddons(request)
      .then((response) => {
        console.log(response);
        this.addons = response;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
</script>