<template>
  <div class="card">
    <h4 class="fw-bolder fs-4 text-dark-gray p-4 border-bottom">
      Review and agree to subscribe
    </h4>
    <div class="w-75 mx-auto m-4 p-4">
      <template v-if="showAumBilling">
        <div class="mt-8 d-flex justify-content-between">
          <div class="text-dark-black">
            <span class="fw-bolder">AUM Billing: </span>
            <span class="fw-bold ms-2">{{ aumBilling.plan.planName }}</span>
            <span class="ms-4 fst-italic fw-light">(Annual Commitment)</span>
          </div>
          <div class="text-light-gray">
            {{ $filters.currencyDisplay(aumBilling.plan.termPlanAmount) }}
          </div>
        </div>

        <div
          class="row g-0 mt-8 ms-4 text-dark-black"
          v-for="(item, index) of aumBilling.addons"
          :key="index"
        >
          <div class="col-1 fw-bold">Add On:</div>
          <div class="col-9 fw-bold">
            {{ item.addOnName }}
            <span class="ms-4 fst-italic fw-light">(On Annual Commitment)</span>
          </div>
          <div class="col-2 text-end text-light-gray">
            {{ $filters.currencyDisplay(item.planAddOnamount) }}
          </div>
        </div>
      </template>

      <template v-if="showSubscription">
        <div class="mt-8 d-flex justify-content-between">
          <div class="text-dark-black">
            <span class="fw-bolder">Subscription Billing: </span>
            <span class="fw-bold ms-2">{{ subscriptionBilling.plan.planName }}</span>
            <span class="ms-4 fst-italic fw-light">(Annual Commitment)</span>
          </div>
          <div class="text-light-gray">
            {{
              $filters.currencyDisplay(subscriptionBilling.plan.termPlanAmount)
            }}
          </div>
        </div>

        <div
          class="row g-0 mt-8 ms-4 text-dark-black"
          v-for="(item, index) of subscriptionBilling.addons"
          :key="index"
        >
          <div class="col-1 fw-bold">Add On:</div>
          <div class="col-9 fw-bold">
            {{ item.addOnName }}
            <span class="ms-4 fst-italic fw-light">(On Annual Commitment)</span>
          </div>
          <div class="col-2 text-end text-light-gray">
            {{ $filters.currencyDisplay(item.planAddOnamount) }}
          </div>
        </div>
      </template>

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

      <div class="row g-0">
        <div class="col-4">
          <h4 class="fw-bold mt-10 pb-4">Billing Address</h4>

          <div class="text-gray mt-4">{{ address.bill_addr1 }}</div>
          <div class="text-gray">{{ address.bill_city }}</div>
          <div class="text-gray">{{ address.bill_state }}</div>
          <div class="text-gray">{{ address.bill_postcode }}</div>
          <div class="text-gray">{{ address.bill_country }}.</div>
        </div>
        <div class="col-5">
          <h4 class="fw-bold mt-10 pb-4">Payment Method</h4>
          <div
            class="border border-dashed p-4"
            v-if="paymentType == 'Credit Card'"
          >
            <div class="fw-bold text-dark-gray p-2">{{ creditCard.name }}</div>
            <div class="d-flex align-items-center">
              <div>
                <img
                  src="@/assets/mastercard-hd.png"
                  alt="Card Type"
                  width="100"
                  v-if="creditCard.cardType == 'mast'"
                />
                <img
                  src="@/assets/visa-hd.png"
                  alt="Card Type"
                  width="100"
                  v-if="creditCard.cardType == 'visa'"
                />
                <img
                  src="@/assets/amex-hd.png"
                  alt="Card Type"
                  width="100"
                  v-if="creditCard.cardType == 'amex'"
                />
                <img
                  src="@/assets/discover-hd.png"
                  alt="Card Type"
                  width="100"
                  v-if="creditCard.cardType == 'disc'"
                />
              </div>
              <div class="p-4">
                <div class="text-dark-gray fw-bolder p-2">
                  {{ cardType }} ****{{
                    creditCard.number.substr(creditCard.number.length - 4)
                  }}
                </div>
                <div class="text-dark-gray fw-bold p-2 text-muted">
                  Card expires at {{ creditCard.expdate_month }}/{{
                    creditCard.expdate_year
                      .toString()
                      .substr(creditCard.expdate_year.toString().length - 2)
                  }}
                </div>
              </div>
            </div>
          </div>
          <div class="border border-dashed p-4" v-else>
            <div class="text-dark-gray fw-bold p-2">{{ ach.name }}</div>
            <div class="text-dark-gray fw-bold p-2">
              ****{{ ach.number.substr(ach.number.length - 4) }}
            </div>
            <div class="text-dark-gray fw-bold p-2">{{ ach.routing }}</div>
          </div>
        </div>
      </div>

      <div class="text-center mt-10">
        <button class="btn btn-light me-5" @click="back">Back</button>
        <button class="btn btn-primary ms-5" @click="next">Continue</button>
      </div>
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

  get products() {
    return this.store.getters.getProducts;
  }

  get showAumBilling() {
    return this.products.includes("AUM");
  }

  get showSubscription() {
    return this.products.includes("SUBSCRIPTION");
  }

  get aumBilling() {
    return this.store.getters.getAumBilling;
  }

  get subscriptionBilling() {
    return this.store.getters.getSubscriptionBilling;
  }

  get totalFees() {
    let subAmount: number = 0;
    let aumAmount: number = 0;
    if (this.showAumBilling) {
      aumAmount = this.aumBilling.addons.reduce((prev: number, cur: any) => {
        return prev + parseInt(cur.planAddOnamount);
      }, 0);
      aumAmount = aumAmount + this.aumBilling.plan.termPlanAmount;
    } else {
      subAmount = this.subscriptionBilling.addons.reduce(
        (prev: number, cur: any) => {
          return prev + parseInt(cur.planAddOnamount);
        },
        0
      );
      subAmount = subAmount + this.subscriptionBilling.plan.termPlanAmount;
    }
    return aumAmount + subAmount;
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