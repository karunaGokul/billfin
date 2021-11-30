<template>
  <AumSubscriptionPlan
    v-for="(item, index) in products"
    :key="index"
    :product="item"
    @update="updatePlan($event, options)"
  />
  <div class="text-center m-4">
    <button class="btn btn-light me-5" @click="back">Back</button>
    <button class="btn btn-primary ms-5" :disabled="invalidAumPlan || invalidSubscriptionPlan" @click="next">
      Continue
    </button>
  </div>
</template>
<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { useStore } from "vuex";

import AumSubscriptionPlan from "./component/AumSubscriptionPlan.vue";

@Options({
  components: {
    AumSubscriptionPlan,
  },
})
export default class Index extends Vue {
  public store = useStore();
  public invalidAumPlan: boolean = false;
  public invalidSubscriptionPlan: boolean = false;

  public updatePlan(options: {
    product: string;
    plan: { termPlanId: number; planName: string };
    addons: Array<any>,
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
    this.$emit("back");
  }

  get products() {
    let products: Array<string> = [];
    products = this.store.getters.getProducts;
    return products;
  }
}
</script>