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
      <div>{{ $filters.currencyDisplay(planRate) }}</div>
    </div>

    <div class="row g-0 mt-8" v-for="(item, index) of addons" :key="index">
      <div class="col-1 fw-bold">Add On:</div>
      <div class="col-9 fw-bold">
        {{ item.planName }}
        <span class="ms-4 fst-italic fw-light">(On Annual Commitment)</span>
      </div>
      <div class="col-2 text-end">
        {{ $filters.currencyDisplay(item.rate) }}
      </div>
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
        border-top
        border-bottom
        border-dashed
        border-start-0
        border-end-0
      "
    >
      <div>Total Due Today</div>
      <div>{{ $filters.currencyDisplay(totalFees) }}</div>
    </div>

    <h4 class="fw-bold mt-10 pb-4 border-bottom">Payment Method</h4>

    <h4 class="fw-bold mt-10 pb-4 border-bottom">Billing Address</h4>

    <div class="text-muted mt-4">{{ address.bill_addr1 }}</div>
    <div class="text-muted">{{ address.bill_city }}</div>
    <div class="text-muted">{{ address.bill_state }}</div>
    <div class="text-muted">{{ address.bill_postcode }}</div>
    <div class="text-muted">{{ address.bill_country }}.</div>

    <div class="text-center mt-10">
      <button class="btn btn-light me-5" @click="back">Cancel</button>
      <button class="btn btn-primary ms-5" @click="next">Continue</button>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue } from "vue-class-component";

import { useStore } from "vuex";

export default class Review extends Vue {
  public store = useStore();

  back() {
    this.$emit("back");
  }

  next() {
    this.$emit("next");
  }

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
      return prev + parseInt(cur.rate);
    }, 0);
    addons = addons + this.planRate;
    return addons;
  }

  get planRate() {
    return this.currencyToNumber(this.store.getters.getPlan.rate);
  }

  get paymentType() {
    return this.store.getters.getPaymentType;
  }

  get creditCard() {
    return this.store.getters.getCreditCard;
  }

  get ach() {
    return this.store.getters.getAch;
  }
  get address() {
    return this.store.getters.getCustomer;
  }
}
</script>