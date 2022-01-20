<template>
  <div class="card">
    <h2 class="border-bottom">{{ page }}</h2>
    <div>
          {{addOns}}
    </div>
  </div>
  <div class="text-center mt-10">
    <button class="btn btn-light me-5" @click="back">Cancel</button>
    <button class="btn btn-primary ms-5" @click="next">Continue</button>
  </div>
</template>
<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { useStore } from "vuex";

export default class AddUserConnectors extends Vue {
  @Prop() page: string;

  public store = useStore();
  public addOns: any;

  created() {
    if (this.products == "AUM") this.addOns = this.aumBilling;
    else if (this.products == "SUBSCRIPTION")
      this.addOns = this.subscriptionBilling;

      console.log(this.addOns);
  }

  mounted() {
   // if (!this.addOns) this.$router.push("/my-subscription");
  }

  public next() {
    if (this.products == "AUM") {
      if (this.aumBilling.addons.length) this.$emit("next");
    } else if (this.products == "SUBSCRIPTION") {
      if (this.subscriptionBilling.addons.length) this.$emit("next");
    }
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