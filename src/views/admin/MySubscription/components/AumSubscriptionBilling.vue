<template>
  <div class="text-muted">
    {{
      bliingType == "AUM"
        ? "Your AUM Billing subscription lets you easily and intuitely automate your AUM advisory billing operations."
        : "Your Subscription Billing subscription lets you setup and bill for your services on a subscription model."
    }}
  </div>
  <div class="card mt-6 mb-6">
    <div class="card-header align-items-center border-bottom">
      <div class="card-title fw-bolder fs-4">
        {{
          bliingType == "AUM"
            ? "AUM Billing Subscription"
            : "Subscription Billing Subscription"
        }}
      </div>
    </div>
    <div class="card-body p-0">
      <div class="ps-9 pe-9 p-4" v-for="(item, index) in plans" :key="index">
        <plan
          :plan="item"
          :product="bliingType"
          :addons="addons"
          @termChanged="updateSubscription"
          @planAddOnCancelled="updateSubscription"
        />
      </div>
      <div class="p-8 text-center" v-if="!loading && !plans.length">
        <div class="fw-bolder fs-4 p-4">
          You currently do not have an
          {{
            bliingType == "AUM"
              ? "AUM Billing subscription."
              : "Subscription Billing."
          }}
        </div>
        <button type="button" class="btn btn-primary" @click="signUpPlan">
          Sign Up
        </button>
      </div>
    </div>
  </div>
  <div class="card mt-6 mb-6" v-if="plans.length">
    <div class="card-header align-items-center border-bottom">
      <div class="card-title fw-bolder fs-4">
        {{
          bliingType == "AUM"
            ? "AUM Billing Add-Ons"
            : "Subscription Billing Add-Ons"
        }}
      </div>
      <button
        type="button"
        class="btn btn-primary"
        @click="addMoreAddons('Sign Up For Add-Ons')"
        v-if="addons.length > 0"
      >
        Add More
      </button>
    </div>
    <div class="card-body p-0">
      <div class="ps-9 pe-9 p-4" v-for="(item, index) in addons" :key="index">
        <addons
          :addons="item"
          :allowChangeAddonTerm="allowChangeAddonTerm"
          @termChanged="updateSubscription"
          @addUserConnector="onAddUserConnector"
          @planAddOnCancelled="updateSubscription"
        />
      </div>
      <div class="p-8 text-center" v-if="!loading && !addons.length">
        <div class="fw-bolder fs-4 p-4">
          You currently are not subscribed to add-ons.
        </div>
        <button
          type="button"
          class="btn btn-primary"
          @click="addMoreAddons('Sign Up For Add-Ons')"
        >
          Subscribe to Add-ons
        </button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { Prop, Inject } from "vue-property-decorator";

import BaseComponent from "@/components/base/BaseComponent.vue";

import {
  manageSubscriptionRequestModel,
  subscriptionResponseModel,
  addonsResponseModel,
} from "@/model";

import { IManageSubscription } from "@/service";

import { useStore } from "vuex";

import Plan from "./Plan.vue";
import Addons from "./Addons.vue";

@Options({
  components: {
    Plan,
    Addons
  },
})
export default class AumSubscriptionBilling extends BaseComponent {
  @Inject("manageSubscripeService") service: IManageSubscription;
  @Prop() bliingType: string;

  public store = useStore();

  public plans: Array<subscriptionResponseModel> = [];
  public addons: Array<addonsResponseModel> = [];

  public subscription: any = null;
  public loading: boolean = false;

  created() {
    this.getSubscription();
  }

  public onPlanAddOnCancelled() {
    this.getSubscription();
  }

  public updateSubscription() {
    this.getSubscription();
  }

  private getSubscription() {
    this.loading = true;
    let request = new manageSubscriptionRequestModel();
    request.productCode = this.bliingType;
    this.service
      .getSubscription(request)
      .then((response) => {
        this.loading = false;

        let status = ["CURRENT", "UPCOMING", "CANCELLED"];

        this.plans = response.subscriptions;
        this.addons = response.addOns;

        this.plans.sort((a, b) => {
          return status.indexOf(a.status) - status.indexOf(b.status);
        });

        this.addons.sort((a, b) => {
          return status.indexOf(a.status) - status.indexOf(b.status);
        });
        this.addons.sort((a, b) => {
          return status.indexOf(a.startDate) - status.indexOf(b.startDate);
        });
        console.log(this.addons);
      })
      .catch((err) => {
        this.loading = false;
        if (err.response.status == 500)
          this.alert(
            "Oops, sorry!",
            "Somthing went wrong, Please contact administration"
          );
        else if (err.response.status == 400)
          this.alert("Oops, sorry!", err.response.data.message);
      });
  }

  public signUpPlan() {
    let payload = [];
    payload.push(this.bliingType);
    this.store.dispatch("updateProducts", payload);
    this.$router.push({
      name: "Sign Up",
      params: {
        pageType: "SignUp",
        navigateTab: this.bliingType,
        redirectPage: "/my-subscription",
      },
    });
  }

  public onAddUserConnector(type: string, addons: addonsResponseModel) {
    let plans = new subscriptionResponseModel();

    if (this.upcomingPlanStatus) plans = this.upcomingPlanStatus;
    else if (this.newPlanStatus) plans = this.newPlanStatus;

    let payload = [];
    payload.push(this.bliingType);
    this.store.dispatch("updateProducts", payload);

    this.store.dispatch(
      "updatePaymentType",
      addons.cardType == "Credit Card" ? addons.cardType : "ACH"
    );

    let data: Array<addonsResponseModel> = [];
    let selectedAddon: addonsResponseModel = this.$vuehelper.clone(addons);
    selectedAddon.planAddOnAmount = selectedAddon.paymentAmount / +selectedAddon.quantity;

    selectedAddon.quantity = '1';
    data.push(selectedAddon);

    let options = {
      product: this.bliingType,
      plan: plans,
      addons: data,
      addMoreAddOns: addons,
      commitmentTerm: plans.commitmentTerm == "ANNUAL" ? "Annual" : "Monthly",
    };
    this.store.dispatch("updatePlan", options);
    this.$router.push({ name: type });
  }

  public addMoreAddons(page: string) {
    let plans = new subscriptionResponseModel(),
      addons = new addonsResponseModel();

    if (this.upcomingPlanStatus) plans = this.upcomingPlanStatus;
    else if (this.newPlanStatus) plans = this.newPlanStatus;

    if (this.upcomingAddOnStatus) addons = this.upcomingAddOnStatus;
    else if (this.newAddOnStatus) addons = this.newAddOnStatus;

    let payload = [];
    payload.push(this.bliingType);
    this.store.dispatch("updateProducts", payload);

    this.store.dispatch(
      "updatePaymentType",
      addons.cardType == "Credit Card" ? addons.cardType : "ACH"
    );

    let options = {
      product: this.bliingType,
      plan: plans,
      commitmentTerm: plans.commitmentTerm == "ANNUAL" ? "Annual" : "Monthly",
    };
    this.store.dispatch("updatePlan", options);
    this.$router.push({ name: page });
  }

  get allowChangeAddonTerm() {
    let allow: boolean = true;

    if (this.upcomingPlanStatus) {
      if (this.upcomingPlanStatus.commitmentTerm == "MONTHLY") allow = false;
    } else if (this.newPlanStatus) {
      if (
        this.newPlanStatus.commitmentTerm == "MONTHLY" &&
        this.newPlanStatus.endDate == null
      )
        allow = false;
    }
    return allow;
  }

  get upcomingPlanStatus() {
    return this.plans.find((item) => item.status == "UPCOMING");
  }

  get newPlanStatus() {
    return this.plans.find((item) => item.status == "CURRENT");
  }

  get upcomingAddOnStatus() {
    return this.addons.find((item) => item.status == "UPCOMING");
  }

  get newAddOnStatus() {
    return this.addons.find((item) => item.status == "CURRENT");
  }
}
</script>