<template>
  <pick-plan
    :product="products"
    @update="updatePlan($event, options)"
    planType="Change Plan"
    v-if="products"
  />
  <div class="text-center m-4">
    <button class="btn btn-light me-5" @click="back">Cancel</button>
    <button
      class="btn btn-primary ms-5"
      :disabled="invalidPlan"
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
  public invalidPlan: boolean = false;

  mounted() {
    if (this.products == "") this.$router.push("/my-subscription");
  }

  public updatePlan(options: {
    product: string;
    plan: { termPlanId: number; planName: string; planId: number };
    addons: Array<any>;
    currentPlan: any
    commitmentTerm: string;
  }) {
    if (options.plan.planName == "Enterprise") {
      this.invalidPlan = true;
    } else {
      if (Object.keys(options.plan).length > 0) {
        this.invalidPlan = false;
        this.store.dispatch("updatePlan", options);
      }
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