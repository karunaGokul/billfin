<template>
  <pick-addons
    v-for="(item, index) in plans"
    :key="index"
    :product="item.product"
    :planId="item.planId"
    :planSubscriptionId="item.planSubscriptionId"
    :termPlanType="item.termPlanType"
    :preAddons="item.preAddons"
    @update="updatePlan($event, options)"
    addOnType="AddMoreAddOns"
  />
  <div class="text-center mt-10">
    <button class="btn btn-light me-5" @click="back">Back</button>
    <button class="btn btn-primary ms-5" @click="next">Continue</button>
  </div>
</template>
<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { Inject } from "vue-property-decorator";
import { useStore } from "vuex";

import { IManageSubscription } from "@/service";

import { subscribeAddonsResponseModel } from "@/model";

import PickAddons from "@/components/controls/PickAddons.vue";

@Options({
  components: {
    PickAddons,
  },
})
export default class Addons extends Vue {
  @Inject("manageSubscripeService") service: IManageSubscription;

  public store = useStore();
  public plans: Array<any> = [];

  created() {
    if (this.products == "AUM")
      this.plans.push({
        product: this.products,
        planId: this.aumBilling.plan.planId,
        planSubscriptionId: this.aumBilling.plan.subscriptionPlanId,
        preAddons: this.addons(
          this.aumBilling.plan.preIncludedAddons,
          this.aumBilling.addons
        ),
        termPlanType: this.aumBilling.commitmentTerm,
      });
    else if (this.products == "SUBSCRIPTION")
      this.plans.push({
        product: this.products,
        planId: this.subscriptionBilling.plan.planId,
        planSubscriptionId: this.subscriptionBilling.plan.subscriptionPlanId,
        preAddons: this.addons(
          this.subscriptionBilling.plan.preIncludedAddons,
          this.subscriptionBilling.addons
        ),
        termPlanType: this.subscriptionBilling.commitmentTerm,
      });
      console.log(this.plans);
  }

  mounted() {
    if (this.plans.length == 0) this.$router.push("/my-subscription");
  }

  public next() {
    if (this.products == "AUM") {
      if (this.aumBilling.addons.length) this.$emit("next");
    } else if (this.products == "SUBSCRIPTION") {
      if (this.subscriptionBilling.addons.length) this.$emit("next");
    }
  }

  public back() {
    this.$emit("back");
  }

  private addons(
    preIncludedAddons: Array<subscribeAddonsResponseModel>,
    selectedAddons: Array<subscribeAddonsResponseModel>
  ) {
    let addons: Array<subscribeAddonsResponseModel> = [];

    if (selectedAddons && preIncludedAddons) {
      let addOnName = new Set(preIncludedAddons.map((item) => item.addOnName));
      addons = [
        ...preIncludedAddons,
        ...selectedAddons.filter((item) => !addOnName.has(item.addOnName)),
      ];
    } else if (selectedAddons) addons = selectedAddons;
    else if (preIncludedAddons) addons = preIncludedAddons;

    return addons;
  }

  get aumBilling() {
    return this.store.getters.aumBilling;
  }

  get subscriptionBilling() {
    return this.store.getters.subscriptionBilling;
  }

  get products() {
    return this.store.getters.products.toString();
  }
}
</script>