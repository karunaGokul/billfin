<template>
  <div class="card">
    <div class="p-4 fw-bolder fs-4 text-dark-gray border-bottom">
      Select your Payment Method
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
    <payment-card :cards="cards" v-if="!addNewPayment" @addNewPayment="addNewPayment = true" />
    
    <template v-else>
      <ACH @back="onBack" @pay="onPayNow" v-if="paymentType == 'ACH'" />
      <credit-card
        @back="onBack"
        @pay="onPayNow"
        v-if="paymentType == 'Credit Card'"
      />
    </template>
  </div>
</template>
<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { Inject } from "vue-property-decorator";

import { useStore } from "vuex";

import ACH from "@/components/controls/ACH.vue";
import CreditCard from "@/components/controls/creditCard.vue";
import PaymentCard from "@/components/controls/PaymentCard.vue";

import {
  createCustomerRequestModel,
  paymentTokenRequestModel,
  PaymentMethod,
  cardDetailsRequestModel,
  cardDetailsResponsetModel,
} from "@/model";
import { ISubscripeService, IManageSubscription } from "@/service";

declare let ChargeOver: any;

@Options({
  components: {
    ACH,
    CreditCard,
    PaymentCard,
  },
})
export default class Payment extends Vue {
  @Inject("subscripeService") service: ISubscripeService;
  @Inject("manageSubscripeService") manageSubscripeService: IManageSubscription;

  public paymentType: string = "Credit Card";
  public store = useStore();

  public addNewPayment: boolean = false;

  public cards: Array<cardDetailsResponsetModel> = [];

  created() {
    if (this.store.getters.paymentType)
      this.paymentType = this.store.getters.paymentType;
    this.getCardDetails();
  }

  onBack() {
    this.$emit("back");
  }

  onPayNow() {
    this.store.dispatch("updatePaymentType", this.paymentType);
    this.createCustomer();
  }

  public getCardDetails() {
    this.cards = [];
    let request = new cardDetailsRequestModel();
    request.paymentMethod =
      PaymentMethod[this.paymentType as keyof typeof PaymentMethod];
    request.firmId = this.store.getters.selectedFirmId;
    this.manageSubscripeService
      .getCardDetails(request)
      .then((response) => {
        this.cards = response;
        if (this.cards.length > 0) this.addNewPayment = false;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  private createCustomer() {
    let request: createCustomerRequestModel = {
      company: this.adddress.company,
      bill_addr1: this.adddress.bill_addr1,
      bill_city: this.adddress.bill_city,
      bill_state: this.adddress.bill_state,
      bill_postcode: this.adddress.bill_postcode,
      bill_country: this.adddress.bill_country,
      external_key: this.firmId,
      superuser_name: this.userInfo.firstName,
      superuser_email: this.userInfo.email,
      superuser_phone: this.phoneNumber,
    };

    this.service
      .createCustomer(request)
      .then((response) => {
        this.$emit("next");
        if (this.paymentType == "Credit Card") this.tokenizingCreditCard();
        else this.tokenizingAch();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  private tokenizingCreditCard() {
    let request: any = {};
    request = this.store.getters.creditCard;
    request.customer_external_key = this.firmId;
    console.log(request);
    ChargeOver.CreditCard.tokenize(
      request,
      (code: any, message: any, response: any) => {
        console.log(message, response);
        if (code == 200) {
          this.updateToken(response.creditcard.token);
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
          this.updateToken(response.ach.token);
        } else if (code == 400) {
          console.log(message);
        } else {
          console.log(`Something went wrong, Please try again`);
        }
      }
    );
  }

  private updateToken(token: string) {
    let request = new paymentTokenRequestModel();
    request.token = token;
    request.firmId = this.firmId;
    request.paymentMethod =
      PaymentMethod[this.paymentType as keyof typeof PaymentMethod];
    this.paymentType.toUpperCase();
    this.service
      .updatePaymentToken(request)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  get adddress() {
    return this.store.getters.address;
  }

  get userInfo() {
    return this.store.getters.userInfo;
  }

  get phoneNumber() {
    let phoneNumber = this.userInfo.phoneNumber;
    phoneNumber = phoneNumber
      .replace(/\D/g, "")
      .match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
    phoneNumber = !phoneNumber[2]
      ? phoneNumber[1]
      : phoneNumber[1] +
        "-" +
        phoneNumber[2] +
        (phoneNumber[3] ? "-" + phoneNumber[3] : "");
    return phoneNumber;
  }

  get firmId() {
    return this.store.getters.selectedFirmId;
  }

  get creditCard() {
    return this.store.getters.creditCard;
  }

  get ach() {
    return this.store.getters.ach;
  }
}
</script>