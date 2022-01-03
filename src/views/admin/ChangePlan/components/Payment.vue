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
            'btn-success': paymentType == 'ACH',
            'text-muted': paymentType != 'ACH',
          }"
          @click="
            paymentType = 'ACH';
            getCardDetails();
          "
        >
          ACH
        </button>
        <button
          type="button"
          class="btn rounded"
          :class="{
            'btn-success': paymentType == 'Credit Card',
            'text-muted': paymentType != 'Credit Card',
          }"
          @click="
            paymentType = 'Credit Card';
            getCardDetails();
          "
        >
          Credit Card
        </button>
      </div>
    </div>

    <div class="p-4 ps-10 pe-10" v-if="cards">
      <div class="d-flex flex-wrap">
        <div
          class="d-flex border p-4 rounded m-4"
          v-for="(item, index) of cards"
          :key="index"
          :class="{
            'border border-primary bg-primary-alpha': item == selectedCard,
          }"
          @click="selectedCard = item"
        >
          <div>
            <div class="fw-bolder fs-4 p-2">
              {{ firms.name }}
              <span
                class="badge text-success ms-2 fs-6 bg-success-alpha"
                v-if="status"
                >Primary</span
              >
            </div>
            <div class="d-flex">
              <div>
                <img
                  src="@/assets/mastercard.svg"
                  alt="Card Type"
                  width="100"
                  v-if="item.cardType == 'MasterCard'"
                />
                <img
                  src="@/assets/visa.svg"
                  alt="Card Type"
                  width="100"
                  v-if="item.cardType == 'Visa'"
                />
                <img
                  src="@/assets/amex.svg"
                  alt="Card Type"
                  width="100"
                  v-if="item.cardType == 'American'"
                />
                <img
                  src="@/assets/discover.svg"
                  alt="Card Type"
                  width="100"
                  v-if="item.cardType == 'Discover'"
                />
              </div>
              <div class="pt-2 ps-3" v-if="paymentType == 'Credit Card'">
                <div class="fw-bolder">
                  {{ item.cardType }}
                  {{ item.maskNumber.split("x")[1] }}
                </div>
                <div class="text-gray-secondary mt-2">
                  Card expires at
                  {{ item.expDate.split("-")[1] }} /
                  {{ item.expDate.split("-")[0] }}
                </div>
              </div>
              <div v-else>Checking {{ item.maskNumber.split("x")[1] }}</div>
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
          border border-dashed border-dark-gray
          bg-dark-gray
          rounded
          m-4
          p-4
        "
        style="width: 490px"
      >
        <div style="width: 340px">
          <div class="fs-4 fw-bolder">Important Note!</div>
          <p class="fw-bold text-gray">
            Please carefully read <a href="">BillFin Terms</a> adding your new
            payment method.
          </p>
        </div>
        <div class="d-flex align-items-center justify-content-end w-50">
          <button class="btn btn-primary" type="button" @click="addCard">
            {{ paymentType == "Credit Card" ? "Add Card" : "Add Account" }}
          </button>
        </div>
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
import { Inject } from "vue-property-decorator";

import { useStore } from "vuex";

import {
  cardDetailsRequestModel,
  cardDetailsResponsetModel,
  PaymentMethod,
} from "@/model";

import { IManageSubscription } from "@/service";

export default class Payment extends Vue {
  @Inject("manageSubscripeService") service: IManageSubscription;

  public paymentType: string = "Credit Card";
  public store = useStore();

  public selectedCard: cardDetailsResponsetModel =
    new cardDetailsResponsetModel();
  public cards: Array<cardDetailsResponsetModel> = [];

  public paymentCard: any = {};

  created() {
    this.paymentType = this.store.getters.paymentType;
  }

  mounted() {
    this.getCardDetails();
  }

  public getCardDetails() {
    this.cards = [];
    let request = new cardDetailsRequestModel();
    request.paymentMethod =
      PaymentMethod[this.paymentType as keyof typeof PaymentMethod];
    request.firmId = this.store.getters.selectedFirmId;
    this.service
      .getCardDetails(request)
      .then((response) => {
        this.cards = response;
        this.selectedCard = this.cards[0];
        if (this.paymentType == "Credit Card")
          this.paymentCard = this.creditCard;
        else this.paymentCard = this.ach;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  public back() {
    this.$emit("back");
  }

  public addCard() {
    this.$router.push({name: "Payment Method", params: {pageType: 'change-plan'}});
  }

  public next() {
    this.store.dispatch("updatePaymentType", this.paymentType);
    if (this.paymentType == "Credit Card") {
      let cardDetails = {
        number: this.selectedCard.cardNumber,
        expdate_month: this.selectedCard.expDate.split("-")[1],
        expdate_year: this.selectedCard.expDate.split("-")[0],
        name: this.firms.name,
        cardType: this.selectedCard.cardType,
      };
      this.store.dispatch("updateCreditCard", cardDetails);
    } else if (this.paymentType == "ACH") {
      let ach = {
        number: this.selectedCard.cardNumber,
        routing: this.selectedCard.cardNumber,
        name: this.firms.name,
      };
      this.store.dispatch("updateACH", ach);
    }
    this.$emit("next");
  }

  get firms() {
    return this.store.getters.firms;
  }

  get creditCard() {
    return this.store.getters.creditCard;
  }

  get ach() {
    return this.store.getters.ach;
  }

  get status() {
    if (!this.paymentCard.number) return "";
    return (
      this.paymentCard.number.split(" ")[1] == this.selectedCard.maskNumber
    );
  }
}
</script>