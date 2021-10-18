<template>
  <div class="w-75 mx-auto m-4 p-4">
    <h4 class="fw-bold mt-4 pb-4 border-bottom">
      Review and Confirm your order
    </h4>

    <div class="mt-8 d-flex justify-content-between">
      <div class="fw-bold">
        Standard Plan
        <span class="ms-4 fst-italic fw-light">(Annual Commitment)</span>
      </div>
      <div>$100</div>
    </div>

    <div class="row g-0 mt-8" v-for="(item, index) of addons" :key="index">
      <div class="col-1 fw-bold">Add On:</div>
      <div class="col-9 fw-bold">
        {{ item.planName }}
        <span class="ms-4 fst-italic fw-light">(On Annual Commitment)</span>
      </div>
      <div class="col-2 text-end">{{ $filters.currencyDisplay(item.planPrice) }}</div>
    </div>

    <div
      class="
        mt-8
        fs-4
        fw-bolder
        pt-5
        pb-5
        d-flex
        justify-content-between
        border-top border-bottom
      "
    >
      <div>Total Due Today</div>
      <div>{{ $filters.currencyDisplay(totalFees) }}</div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue } from "vue-class-component";

import { useStore } from "vuex";

export default class Review extends Vue {
  public store = useStore();

  private currencyToNumber(value: any) {
    if (!value) return 0;

    if (isNaN(value)) value = value.replaceAll(",", "");
    value = parseFloat(value);

    return value;
  }

  get addons() {
    return this.store.getters.getAddons;
  }

  get totalFees() {
    let addons: number = 0;
    addons = this.addons.reduce((prev: number, cur: any) => {
      return prev + parseInt(cur.planPrice);
    }, 0);
    addons = addons + this.currencyToNumber(this.store.getters.getPlanFee);
    return addons;
  }
  
}
</script>