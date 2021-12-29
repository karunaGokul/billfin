<template>
  <div class="card">
    <p class="p-6 fw-bolder fs-4 border-bottom text-dark-gray">
      Please confirm you understand when your plan change will become effective.
    </p>
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
              value="Effective Immediately"
              v-model="activatePlan"
            />
          </div>
        </div>
        <div class="col-9">
          <div class="fs-3 fw-bolder">Effective Immediately</div>
          <div class="text-gray-secondary">
            The appropriate prorated refunds/charges will be calculated.
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
              value="Next Billing Term"
              v-model="activatePlan"
            />
          </div>
        </div>
        <div class="col-9">
          <div class="fs-3 fw-bolder">Next Billing Term</div>
          <div class="text-gray-secondary">
            There are no prorated refunds or charges.
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

export default class ActivatePlan extends Vue {
  public activatePlan: Array<string> = [];
  public store = useStore();

  public next() {
    //this.store.dispatch("updateProducts", this.activatePlan.sort());
    this.$emit("next");
  }
}
</script>