<template>
  <div class="p-4 ps-10 pe-10">
    <div class="d-flex flex-wrap">
      <div
        class="d-flex border p-4 rounded m-4"
        v-for="(item, index) of cards"
        :key="'card-' + index"
        :class="{
          'border border-primary bg-primary-alpha': item.default,
        }"
      >
        <div>
          <div class="fw-bolder fs-4 p-2">
            {{ item.cardHolderName }}
            <span
              class="badge text-success ms-2 fs-6 bg-success-alpha"
              v-if="item.default"
              >Primary</span
            >
            <span
              class="badge text-orange ms-2 fs-6 bg-orange"
              v-if="!item.default"
              @click="makePrimary(item)"
              >Make Primary</span
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
              <img
                src="@/assets/bank.png"
                alt="Card Type"
                width="80"
                v-if="item.cardType == 'chec'"
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
            <div class="pt-2 ps-3" v-else>
              <div class="fw-bolder">
                Checking
                {{ item.maskNumber.split("x")[1] }}
              </div>
            </div>
          </div>
        </div>
        <div class="d-flex align-items-center p-4">
          <button
            class="btn me-3"
            :disabled="!item.default"
            :class="{ 'btn-light': !item.default, 'btn-primary': item.default }"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
    <div class="m-4">
      <button class="btn btn-primary" type="button" @click="addNewPayment">
        Add Payment Method
      </button>
    </div>
  </div>
  <div class="mt-6 p-4 d-flex align-items-center justify-content-center">
    <button type="button" class="btn btn-light me-5" @click="back">Back</button>
    <button
      type="submit"
      class="btn btn-primary ms-5"
      @click="updateCardDetails"
    >
      Continue
    </button>
  </div>
</template>
<script lang="ts">
import { Vue } from "vue-class-component";
import { Prop, Inject } from "vue-property-decorator";

import { useStore } from "vuex";

import { cardDetailsResponsetModel, billingAddressRequestModel } from "@/model";
import { IManageSubscription } from "@/service";

export default class PaymentCard extends Vue {
  @Prop() cards: Array<cardDetailsResponsetModel> = [];
  @Prop() paymentType: string;
  @Inject("manageSubscripeService") service: IManageSubscription;

  public store = useStore();

  created() {
    this.getBillingAddress();
  }

  public back() {
    this.$emit("back");
  }

  public addNewPayment() {
    this.$emit("addNewPayment");
  }

  private getBillingAddress() {
    let request = new billingAddressRequestModel();
    request.firmId = this.store.getters.selectedFirmId;
    this.service
      .getBillingAddress(request)
      .then((response) => {
        this.store.dispatch("updateAddress", response);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  public makePrimary(card: cardDetailsResponsetModel) {
    console.log(card);
  }

  private updateCardDetails() {
    this.store.dispatch("updatePaymentType", this.paymentType);
    let selectedCard =
      this.cards.find((item) => {
        return item.default;
      }) || null;

    if (this.paymentType == "Credit Card") {
      let cardDetails = {
        number: selectedCard.cardNumber,
        expdate_month: selectedCard.expDate.split("-")[1],
        expdate_year: selectedCard.expDate.split("-")[0],
        name: selectedCard.cardHolderName,
        cardType: selectedCard.cardType,
      };
      this.store.dispatch("updateCreditCard", cardDetails);
    } else {
      let ach = {
        number: selectedCard.cardNumber,
        name: selectedCard.cardHolderName,
      };

      this.store.dispatch("updateACH", ach);
    }

    this.$emit("next")

  }

}
</script>