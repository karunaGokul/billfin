<template>
  <div class="card">
    <p class="p-6 fw-bolder fs-4 border-bottom">Select your subscription</p>
    <div class="w-50 mx-auto m-12">
      <div
        class="
          w-75
          row
          g-0
          m-8
          pt-6
          pb-6
          ps-4
          pe-4
          border border-primary
          rounded
          border-dashed
          bg-primary-alpha
        "
      >
        <div class="col-3 d-flex align-items-center justify-content-evenly">
          <div class="form-check form-check-success">
            <input
              class="form-check-input"
              type="checkbox"
              value="AUM"
              v-model="products"
            />
          </div>
          <img src="@/assets/subscription-billing.svg" alt="Aum Billing" />
        </div>
        <div class="col-9">
          <div class="fs-3 fw-bolder">AUM Billing</div>
          <div class="text-muted">
            AUM Billing subscription lets you easily and intuitely automate your
            AUM advisory billing operations.
          </div>
        </div>
      </div>
      <div
        class="
          w-75
          row
          g-0
          m-8
          pt-6
          pb-6
          ps-4
          pe-4
          border border-primary
          rounded
          border-dashed
          bg-primary-alpha
        "
      >
        <div class="col-3 d-flex align-items-center justify-content-evenly">
          <div class="form-check form-check-success">
            <input
              class="form-check-input"
              type="checkbox"
              value="SUBSCRIPTION"
              v-model="products"
            />
          </div>
          <img src="@/assets/aum-billing.svg" alt="Subscription Billing" />
        </div>
        <div class="col-9">
          <div class="fs-3 fw-bolder">Subscription Billing</div>
          <div class="text-muted">
            Subscription Billing subscription lets you setup and bill for your
            services on a subscription model.
          </div>
        </div>
      </div>

      <div class="text-center mt-10">
        <button class="btn btn-light me-5">Cancel</button>
        <button
          class="btn btn-primary ms-5"
          @click="next"
          :disabled="products.length == 0"
        >
          Continue
        </button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue } from "vue-class-component";

import { useStore } from "vuex";

export default class Products extends Vue {
  public products: Array<string> = [];
  public store = useStore();

  public next() {
    this.store.dispatch("updateProducts", this.products.sort());
    this.$emit("next");
  }
  
}
</script>