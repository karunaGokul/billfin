<template>
  <pick-addons
    v-for="(item, index) in plans"
    :key="index"
    :product="item.product"
    :termPlanId="item.termPlanId"
    @update="updatePlan($event, options)"
  />
  <div class="text-center mt-10">
    <button class="btn btn-light me-5" @click="back">Back</button>
    <button class="btn btn-primary ms-5" @click="next">Continue</button>
  </div>
</template>
<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { useStore } from "vuex";

import PickAddons from "@/components/controls/PickAddons.vue";

@Options({
  components: {
    PickAddons,
  },
})
export default class Addons extends Vue {
  public store = useStore();

  public next() {
    this.$emit("next");
  }

  public back() {
    this.$emit("back");
  }

  get plans() {
    const plans: Array<any> = [];
    this.store.getters.products.forEach((item: string) => {
      if (item == "AUM")
        plans.push({
          product: item,
          termPlanId: this.store.getters.aumBilling.plan.termPlanId,
        });
      else
        plans.push({
          product: item,
          termPlanId: this.store.getters.subscriptionBilling.plan.termPlanId,
        });
    });
    return plans;
  }
}
</script>