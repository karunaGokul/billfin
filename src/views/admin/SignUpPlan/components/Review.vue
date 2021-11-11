<template>
  <div class="w-75 mx-auto m-4 p-4">
    <h4 class="fw-bold mt-4 pb-4 border-bottom">
      Review and Confirm your order
    </h4>
    <div class="mt-8 d-flex justify-content-between">
      <div class="fw-bold">
        {{ plan.planName }}
        <span class="ms-4 fst-italic fw-light">(Annual Commitment)</span>
      </div>
      <div>
        {{ $filters.currencyDisplay($currencyToNumber(plan.termPlanAmount)) }}
      </div>
    </div>

    <div class="row g-0 mt-8" v-for="(item, index) of addons" :key="index">
      <div class="col-1 fw-bold">Add On:</div>
      <div class="col-9 fw-bold">
        {{ item.addOnName }}
        <span class="ms-4 fst-italic fw-light">(On Annual Commitment)</span>
      </div>
      <div class="col-2 text-end">
        {{ $filters.currencyDisplay(item.planAddOnamount) }}
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
        border-top border-bottom border-dashed border-start-0 border-end-0
      "
    >
      <div>Total Due Today</div>
      <div>{{ $filters.currencyDisplay(totalFees) }}</div>
    </div>

    <h4 class="fw-bold mt-10 pb-4 mb-8 border-bottom">Payment Method</h4>

    <div
      class="border border-dashed w-50 p-4"
      v-if="paymentType == 'Credit Card'"
    >
      <div class="fw-bold p-2">{{ creditCard.name }}</div>
      <div class="d-flex align-items-center">
        <div>
          <img
            src="@/assets/mastercard.png"
            alt="Card Type"
            width="100"
            v-if="this.creditCard.cardType == 'mast'"
          />
          <img
            src="@/assets/visa.png"
            alt="Card Type"
            width="100"
            v-if="this.creditCard.cardType == 'visa'"
          />
          <img
            src="@/assets/amex.png"
            alt="Card Type"
            width="100"
            v-if="this.creditCard.cardType == 'amex'"
          />
          <img
            src="@/assets/discover.png"
            alt="Card Type"
            width="100"
            v-if="this.creditCard.cardType == 'disc'"
          />
        </div>
        <div class="p-4">
          <div class="fw-bolder p-2">
            {{ cardType }} ****{{
              creditCard.number.substr(creditCard.number.length - 4)
            }}
          </div>
          <div class="fw-bold p-2 text-muted">
            Card expires at {{ creditCard.expdate_month }}/
            {{
              creditCard.expdate_year.substr(creditCard.expdate_year.length - 2)
            }}
          </div>
        </div>
      </div>
    </div>
    <div class="border border-dashed w-50 p-4" v-else>
      <div class="fw-bold p-2">{{ ach.name }}</div>
      <div class="fw-bold p-2">
        ****{{ ach.number.substr(ach.number.length - 4) }}
      </div>
      <div class="fw-bold p-2">{{ ach.routing }}</div>
    </div>

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

  public back() {
    this.$emit("back");
  }

  public next() {
    this.$emit("next");
  }

  get addons() {
    return this.store.getters.getAddons;
  }

  get totalFees() {
    let addons: number = 0;
    addons = this.addons.reduce((prev: number, cur: any) => {
      return prev + parseInt(cur.planAddOnamount);
    }, 0);
    addons = addons + this.$currencyToNumber(this.plan.termPlanAmount);
    return addons;
  }

  get plan() {
    return this.store.getters.getPlan;
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

  get cardType() {
    let cardType: string = "";
    if (this.creditCard.cardType == "mast") cardType = "Master card";
    else if (this.creditCard.cardType == "visa") cardType = "Visa";
    else if (this.creditCard.cardType == "amex") cardType = "American Express";
    else cardType = "Discover";
    return cardType;
  }
}
</script>