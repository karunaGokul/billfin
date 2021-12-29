<template>
  <pick-plan
    :product="products"
    @update="updatePlan($event, options)"
    playType="changePlan"
  />
  <div class="text-center m-4">
    <button class="btn btn-light me-5" @click="back">Back</button>
    <button
      class="btn btn-primary ms-5"
      :disabled="invalidAumPlan || invalidSubscriptionPlan"
      @click="next"
    >
      Continue
    </button>
  </div>
</template>
<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { useStore } from "vuex";

import PickPlan from "@/components/controls/PickPlan.vue";

@Options({
  components: {
    PickPlan,
  },
})
export default class Plan extends Vue {
  public store = useStore();
  public plans: Array<any> = [];
  public invalidAumPlan: boolean = false;
  public invalidSubscriptionPlan: boolean = false;

  /*mounted() {
    if (this.plans.length == 0) this.$router.push("/my-subscription");
  }*/

  public updatePlan(options: {
    product: string;
    plan: { termPlanId: number; planName: string; planId: number };
    addons: Array<any>;
    commitmentTerm: string;
  }) {
    if (options.plan.planName == "Enterprise") {
      if (options.product == "AUM") this.invalidAumPlan = true;
      else this.invalidSubscriptionPlan = true;
    } else {
      if (options.product == "AUM") this.invalidAumPlan = false;
      else this.invalidSubscriptionPlan = false;
      this.store.dispatch("updatePlan", options);
    }
  }

  public next() {
    this.$emit("next");
  }

  public back() {
    this.$router.push("/my-subscription");
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