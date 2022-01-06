<template>
  <pick-addons
    v-for="(item, index) in plans"
    :key="index"
    :product="item.product"
    :planId="item.planId"
    :termPlanType="item.termPlanType"
    :preAddons="item.preAddons"
    @update="updatePlan($event, options)"
    addOnType="createAddon"
  />
  <div class="text-center mt-10">
    <button class="btn btn-light me-5" @click="back">Back</button>
    <button class="btn btn-primary ms-5" @click="next">Continue</button>
  </div>
</template>
<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { useStore } from "vuex";

import { subscribeAddonsResponseModel } from "@/model";

import PickAddons from "@/components/controls/PickAddons.vue";

@Options({
  components: {
    PickAddons,
  },
})
export default class Addons extends Vue {
  public store = useStore();

  public plans: Array<any> = [];

  public next() {
    this.$emit("next");
  }

  public back() {
    this.$emit("back");
  }

  created() {
    console.log(this.aumBilling.addons);
    console.log(this.aumBilling.plan.preIncludedAddons);
    this.products.forEach((item: string) => {
      if (item == "AUM")
        this.plans.push({
          product: item,
          planId: this.aumBilling.plan.planId,
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
          preAddons: this.addons(
            this.subscriptionBilling.plan.preIncludedAddons,
            this.subscriptionBilling.addons
          ),
          termPlanType: this.subscriptionBilling.commitmentTerm,
        });
    });
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
    return this.store.getters.products;
  }
}
</script>