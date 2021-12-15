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
        <plan :plan="item" />
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
        <button type="button" class="btn btn-primary">Sign Up</button>
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
      <button type="button" class="btn btn-primary" @click="addMoreAddons">
        Add More
      </button>
    </div>
    <div class="card-body p-0">
      <div class="ps-9 pe-9 p-4" v-for="(item, index) in addons" :key="index">
        <addons :addons="item" :allowChangeAddonTerm="allowChangeAddonTerm" />
      </div>
      <div class="p-8 text-center" v-if="!loading && !addons.length">
        <div class="fw-bolder fs-4 p-4">
          You currently are not subscribed to add-ons.
        </div>
        <button type="button" class="btn btn-primary">
          Subscribe to Add-ons
        </button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { Prop, Inject } from "vue-property-decorator";

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
    Addons,
  },
})
export default class AumSubscriptionBilling extends Vue {
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

  mounted() {
    this.subscription = this.store.subscribe((mutations) => {
      if (mutations.type == "onFirmIdChanged") this.getSubscription();
    });
  }

  unmounted() {
    if (this.subscription) this.subscription();
  }

  private getSubscription() {
    this.loading = true;
    let request = new manageSubscriptionRequestModel();
    request.productCode = this.bliingType;
    request.firmId = this.store.getters.selectedFirmId;
    this.service
      .getSubscription(request)
      .then((response) => {
        this.loading = false;
        this.plans = response.subscriptions;
        this.addons = response.addOns;
        console.log("allow", this.allowChangeAddonTerm);
      })
      .catch((err) => {
        this.loading = false;
        console.log(err);
      });
  }

  public addMoreAddons() {
    this.$router.push("/add-more-addons");
  }

  get allowChangeAddonTerm() {
    let allow: boolean = true;

    for (let i in this.plans) {
      if (this.plans[i].status == "UPCOMING") {
        if (this.plans[i].term == "MONTHLY") {
          allow = false;
          break;
        }
      } else if (this.plans[i].status == "NEW") {
        if (this.plans[i].term == "MONTHLY") {
          allow = false;
          break;
        }
      }
    }

    return allow;
  }
}
</script>