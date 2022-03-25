<template>
  <bread-crumb />

  <div class="card">
    <div class="p-4 fw-bolder text-center mt-4 fs-4 text-dark-gray">
      Add New Payment Method
    </div>
    <div class="text-center m-4">
      <div class="btn-group border rounded p-1">
        <button
          type="button"
          class="btn rounded"
          :class="{
            'btn-success': paymentType == 'ACH',
            'text-muted': paymentType != 'ACH',
          }"
          @click="paymentType = 'ACH'"
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
          @click="paymentType = 'Credit Card'"
        >
          Credit Card
        </button>
      </div>
    </div>
    <ACH @back="onExit" @pay="onPayNow" v-if="paymentType == 'ACH'" />
    <credit-card
      @back="onExit"
      @pay="onPayNow"
      v-if="paymentType == 'Credit Card'"
    />
  </div>
</template>
<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { Inject } from "vue-property-decorator";

import { useStore } from "vuex";

import BreadCrumb from "@/components/layout/BreadCrumb.vue";

declare let ChargeOver: any;

import {
  paymentTokenRequestModel,
  PaymentMethod,
  CardPrimaryType,
} from "@/model";
import { ISubscripeService } from "@/service";

import ACH from "@/components/controls/ACH.vue";
import CreditCard from "@/components/controls/creditCard.vue";

@Options({
  components: {
    ACH,
    CreditCard,
    BreadCrumb
  },
})
export default class Payment extends Vue {
  @Inject("subscripeService") service: ISubscripeService;

  public paymentType: string = "Credit Card";
  public store = useStore();

  onExit() {
    this.$router.push(
      `/${
        this.$route.params.redirectPage
          ? this.$route.params.redirectPage
          : "bills-payments"
      }`
    );
  }

  onPayNow() {
    this.store.dispatch("updatePaymentType", this.paymentType);
    if (this.paymentType == "Credit Card") this.tokenizingCreditCard();
    else this.tokenizingAch();
  }

  private tokenizingCreditCard() {
    let request: any = {};
    request = this.store.getters.creditCard;
    request.customer_external_key = this.firmId;
    ChargeOver.CreditCard.tokenize(
      request,
      (code: any, message: any, response: any) => {
        console.log(message, response);
        if (code == 200) {
          this.updateToken(response.creditcard.token, "new");
        } else if (code == 400) {
          console.log(message);
        } else {
          console.log(`Something went wrong, Please try again`);
        }
      }
    );
  }

  private tokenizingAch() {
    let request: any = {};
    request = this.store.getters.ach;
    request.customer_external_key = this.firmId;
    console.log(request);
    ChargeOver.ACH.tokenize(
      request,
      (code: any, message: any, response: any) => {
        if (code == 200) {
          this.updateToken(response.ach.token, "new");
        } else if (code == 400) {
          console.log(message);
        } else {
          console.log(`Something went wrong, Please try again`);
        }
      }
    );
  }

  private updateToken(token: string, cardType: string) {
    let request = new paymentTokenRequestModel();
    request.token = token;
    request.paymentMethod =
      PaymentMethod[this.paymentType as keyof typeof PaymentMethod];
    request.reqType = CardPrimaryType[cardType as keyof typeof CardPrimaryType];
    this.paymentType.toUpperCase();
    this.service
      .updatePaymentToken(request)
      .then((response) => {
        this.onExit();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  get firmId() {
    return this.store.getters.selectedFirmId;
  }
}
</script>