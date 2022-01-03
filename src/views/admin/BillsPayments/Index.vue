<template>
  <div class="card">
    <div class="p-4 fw-bolder fs-4 text-dark-gray border-bottom">
      Payment Method
    </div>
    <div class="card-body p-0">
      <div class="d-flex flex-wrap">
        <div
          class="d-flex border border-dashed p-4 rounded m-4"
          v-for="(item, index) of availableCards"
          :key="index"
        >
          <div>
            <div class="fw-bolder fs-4 p-4">
              {{ item.cardHolderName }}
              <span class="badge text-success ms-2 fs-6 bg-success-alpha">{{
                item.status
              }}</span>
            </div>
            <div class="d-flex">
              <div>
                <img
                  src="@/assets/mastercard.svg"
                  alt="Card Type"
                  width="100"
                  v-if="item.cardType == 'mast'"
                />
                <img
                  src="@/assets/visa.svg"
                  alt="Card Type"
                  width="100"
                  v-if="item.cardType == 'visa'"
                />
                <img
                  src="@/assets/amex.svg"
                  alt="Card Type"
                  width="100"
                  v-if="item.cardType == 'amex'"
                />
                <img
                  src="@/assets/discover.svg"
                  alt="Card Type"
                  width="100"
                  v-if="item.cardType == 'disc'"
                />
              </div>
              <div class="pt-2 ps-3">
                <div class="fw-bolder">
                  {{ $filters.creditCardType(item.cardType) }}
                  {{ item.cardNumber }}
                </div>
                <div class="text-gray-secondary mt-2">
                  Card expires at {{ item.expiryMonth }} / {{ item.expiryyear }}
                </div>
              </div>
            </div>
          </div>
          <div class="d-flex align-items-center p-4">
            <button class="btn btn-light me-3">Delete</button>
            <button class="btn btn-light">Edit</button>
          </div>
        </div>
      </div>
      <div
        class="
          d-flex
          bg-primary-alpha
          border border-dashed border-primary
          rounded
          m-4
          p-4
          w-50
        "
      >
        <div class="w-50">
          <div class="fs-4 fw-bolder">Important Note!</div>
          <p class="fw-bold text-gray">
            Please carefully read <a href="">BillFin Terms</a> before adding
            your new payment method.
          </p>
        </div>
        <div class="d-flex align-items-center justify-content-center w-50">
          <router-link
            to="/payment"
            tag="button"
            class="btn btn-primary"
          >
            Add Payment Method
          </router-link>
        </div>
      </div>
    </div>
  </div>

  <div class="p-4">
    <div class="p-4 fw-bolder fs-4 border-bottom border-gray-secondary">
      Bills
    </div>
    <div v-for="(item, index) of bills" :key="index">
      <div class="d-flex align-items-center justify-content-between mt-4 p-4">
        <div>
          <div class="fw-bolder">{{ item.billingDate }}</div>
          <div>Transaction ID {{ item.transactionId }}</div>
        </div>
        <a class="btn btn-link">Print Receipt</a>
      </div>
      <billng :plans="item.plans" />
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Options } from "vue-class-component";

import Billng from "./component/Billing.vue";

@Options({
  components: {
    Billng,
  },
})
export default class Index extends Vue {
  public availableCards = [
    {
      cardHolderName: "Joe Blacke",
      cardType: "mast",
      cardNumber: "6789",
      expiryMonth: "20",
      expiryyear: "2030",
      status: "Primary",
    },
    {
      cardType: "visa",
      cardNumber: "9010",
      cardHolderName: "Joe Blacke",
      expiryMonth: "20",
      expiryyear: "2030",
      status: "",
    },
  ];

  public bills = [
    {
      billingDate: "2 January 2021",
      transactionId: "AMXBI896587043534",
      plans: [
        {
          planName: "Professional Plan",
          description: "For small to medium-sized RIAs",
          product: "AUM Billing Plan",
          commitmentTerm: "Annual",
          termPlanAmount: 2300,
        },
        {
          planName: "Average Daily Balances",
          description: "Support ADB calculations and reporting",
          product: "AUM Billing Add-on",
          commitmentTerm: "Annual",
          termPlanAmount: 11808,
        },
      ],
    },
    {
      billingDate: "30 December 2020",
      transactionId: "DHKY4764345433456",
      plans: [
        {
          planName: "Launch Plan",
          description: "Easy and lightweight payment processing",
          product: "Subscription Billing Plan",
          commitmentTerm: "Annual",
          termPlanAmount: 1250,
        },
      ],
    },
  ];
}
</script>