<template>
  <div class="card pb-4">
    <div class="p-4 fw-bolder fs-4 text-dark-gray border-bottom">
      Select Payment Method
    </div>
    <div class="text-center m-6">
      <div class="btn-group border rounded p-1">
        <button
          type="button"
          class="btn rounded"
          :class="{
            'btn-success': paymenyType == 'ACH',
            'text-muted': paymenyType != 'ACH',
          }"
          @click="paymenyType = 'ACH'"
        >
          ACH
        </button>
        <button
          type="button"
          class="btn rounded"
          :class="{
            'btn-success': paymenyType == 'Credit Card',
            'text-muted': paymenyType != 'Credit Card',
          }"
          @click="paymenyType = 'Credit Card'"
        >
          Credit Card
        </button>
      </div>
    </div>

    <div class="d-flex flex-wrap">
      <div
        class="d-flex border border-dashed p-4 rounded m-4"
        v-for="(item, index) of availableCards"
        :key="index"
        :class="{
          'border border-primary bg-primary-alpha': item == selectedCard
        }"
        @click="selectedCard = item"
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
        border border-dashed
        rounded
        m-4
        p-4
        w-50
      "
    >
      <div class="w-50">
        <div class="fs-4 fw-bolder">Important Note!</div>
        <p class="fw-bold text-gray">
          Please carefully read <a href="">BillFin Terms</a> before adding your
          new payment method.
        </p>
      </div>
      <div class="d-flex align-items-center justify-content-center w-50">
        <router-link to="/payment-method" tag="button" class="btn btn-primary">
          Add Card
        </router-link>
      </div>
    </div>

    <div class="text-center mt-10">
      <button class="btn btn-light me-5" @click="back">Back</button>
      <button class="btn btn-primary ms-5" @click="next">Continue</button>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue } from "vue-class-component";

import { useStore } from "vuex";

export default class Payment extends Vue {
  public paymenyType: string = "Credit Card";
  public store = useStore();

  public selectedCard: any = {};

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

  created() {
    this.selectedCard = this.availableCards[0];
  }

  back() {
    this.$emit("back");
  }

  public next() {
    this.$emit("next");
  }
}
</script>