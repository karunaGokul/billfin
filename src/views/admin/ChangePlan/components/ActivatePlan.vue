<template>
  <div class="card">
    <p class="p-6 fw-bolder fs-4 border-bottom text-dark-gray">
      {{ products }} Billing
    </p>
    <p class="text-center fw-bold fs-4 m-6">
      When would you like to make your new plan effective.
    </p>
    <div class="w-50 mx-auto">
      <div
        class="row g-0 m-8 pt-8 pb-8 ps-4 pe-4 border rounded border-dashed"
        :class="{ 'bg-primary': activatePlan == 'Effective Immediately' }"
        v-if="planAction == 'UPGRADE'"
      >
        <div class="col-2 d-flex align-items-center justify-content-evenly">
          <div class="form-check form-check-success">
            <input
              class="form-check-input"
              type="radio"
              value="Effective Immediately"
              v-model="activatePlan"
            />
          </div>
        </div>
        <div class="col-8">
          <div
            class="fs-3 fw-bolder"
            :class="{
              'text-white': activatePlan == 'Effective Immediately',
            }"
          >
            Effective Immediately
          </div>
          <div
            class="mt-2"
            :class="{
              'text-white': activatePlan == 'Effective Immediately',
              'text-gray-secondary': activatePlan != 'Effective Immediately',
            }"
          >
            The appropriate prorated refunds/charges will be calculated.
          </div>
        </div>
        <div class="col-2"></div>
      </div>
      <div
        class="row g-0 m-8 pt-8 pb-8 ps-4 pe-4 border rounded border-dashed"
        :class="{ 'bg-primary': activatePlan == 'Next Billing Term' }"
      >
        <div class="col-2 d-flex align-items-center justify-content-evenly">
          <div class="form-check form-check-success">
            <input
              class="form-check-input"
              type="radio"
              value="Next Billing Term"
              v-model="activatePlan"
            />
          </div>
        </div>
        <div class="col-8">
          <div
            class="fs-3 fw-bolder"
            :class="{
              'text-white': activatePlan == 'Next Billing Term',
            }"
          >
            Next Billing Term
          </div>
          <div
            class="mt-2"
            :class="{
              'text-white': activatePlan == 'Next Billing Term',
              'text-gray-secondary': activatePlan != 'Next Billing Term',
            }"
          >
            There are no prorated refunds or charges.
          </div>
        </div>
        <div class="col-2"></div>
      </div>

      <div class="text-center mt-10 m-4">
        <button class="btn btn-light me-5" @click="back">Back</button>
        <button
          class="btn btn-primary ms-5"
          @click="next"
          :disabled="activatePlan == ''"
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

export default class ActivatePlan extends Vue {
  public activatePlan: string = "";
  public store = useStore();

  created() {
    if (this.getActivatePlan) this.activatePlan = this.getActivatePlan;
  }

  public back() {
    this.$emit("back");
  }

  public next() {
    this.store.dispatch("updateActivatePlan", this.activatePlan);
    this.$emit("next");
  }

  get products() {
    return this.store.getters.products.toString();
  }

  get planAction() {
    return this.store.getters.planAction;
  }

  get getActivatePlan() {
    return this.store.getters.activatePlan;
  }
}
</script>