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
    this.products.forEach((item: string) => {
      if (item == "AUM")
        this.plans.push({
          product: item,
          planId: this.aumBilling.plan.planId,
          planSubscriptionId: this.aumBilling.plan.subscriptionPlanId,
          preAddons: this.addons(
            this.aumBilling.plan.preIncludedAddons,
            this.aumBilling.addons
          ),
          termPlanType: this.aumBilling.commitmentTerm,
        });
      else
        this.plans.push({
          product: item,
          planId: this.subscriptionBilling.plan.planId,
          planSubscriptionId: this.subscriptionBilling.plan.subscriptionPlanId,
          preAddons: this.addons(
            this.subscriptionBilling.plan.preIncludedAddons,
            this.subscriptionBilling.addons
          ),
          termPlanType: this.subscriptionBilling.commitmentTerm,
        });
    });
  }

  mounted() {
    if (this.plans.length == 0) this.$router.push("/my-subscription");
  }

  public next() {
    console.log(this.subscriptionBilling.addons);
    this.$emit("next");
  }

  public back() {
    this.$router.push("/my-subscription");
  }

  private addons(
    preIncludedAddons: Array<subscribeAddonsResponseModel>,
    selectedAddons: Array<subscribeAddonsResponseModel>
  ) {
    let addons: Array<subscribeAddonsResponseModel> = [];

    if (selectedAddons && preIncludedAddons) {
      selectedAddons.forEach((item) => {
        item.current = true;
      });

      let addOnName = new Set(preIncludedAddons.map((item) => item.addOnName));
      addons = [
        ...preIncludedAddons,
        ...selectedAddons.filter((item) => !addOnName.has(item.addOnName)),
      ];
    }

    return addons;
  }

  get aumBilling() {
    return this.store.getters.aumBilling;
  }

  get subscriptionBilling() {
    return this.store.getters.subscriptionBilling;
  }

  get products() {
    return this.store.getters.products;
  }
}
</script>