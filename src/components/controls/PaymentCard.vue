<template>
  <div class="p-4 ps-10 pe-10">
    <div class="d-flex flex-wrap">
      <div
        class="d-flex border p-4 rounded m-4"
        v-for="(item, index) of cards"
        :key="'card-' + index"
        :class="{
          'border border-primary bg-primary-alpha': item == selectedCard,
        }"
      >
        <div>
          <div class="fw-bolder fs-4 p-2">
            {{ item.cardHolderName }}
            <span
              class="badge text-success ms-2 fs-6 bg-success-alpha"
              v-if="item.isDefault"
              >Primary</span
            >
            <span
              class="badge text-orange ms-2 fs-6 bg-orange"
              v-if="!item.isDefault"
              @click="selectedCard = item"
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
          <button class="btn btn-light me-3" :disabled="!item.isDefault">
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
</template>
<script lang="ts">
import { Vue } from "vue-class-component";
import { Prop, Inject } from "vue-property-decorator";

import { useStore } from "vuex";

import {
  cardDetailsResponsetModel,
  billingAddressRequestModel,
} from "@/model";
import { IManageSubscription } from "@/service";

export default class PaymentCard extends Vue {
  @Prop() cards: Array<cardDetailsResponsetModel> = [];
  @Inject("manageSubscripeService") service: IManageSubscription;

  public store = useStore();

  public selectedCard: cardDetailsResponsetModel = null;

  created() {
    this.getBillingAddress();
    this.selectedCard = this.cards[0];
    this.selectedCard.isDefault = true;
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
}
</script>