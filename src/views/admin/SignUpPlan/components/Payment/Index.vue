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
    <ACH @back="onBack" @pay="onPayNow" v-if="paymenyType == 'ACH'" />
    <credit-card
      @back="onBack"
      @pay="onPayNow"
      v-if="paymenyType == 'Credit Card'"
    />
  </div>
</template>
<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { Inject } from "vue-property-decorator";

import { useStore } from "vuex";

import ACH from "./components/ACH.vue";
import CreditCard from "./components/creditCard.vue";

import { createCustomerRequestModel, paymentTokenRequestModel, PaymentMethod } from "@/model";
import { ISubscripeService } from "@/service";

declare let ChargeOver: any;

@Options({
  components: {
    ACH,
    CreditCard,
  },
})
export default class Index extends Vue {
  @Inject("subscripeService") service: ISubscripeService;

  public paymenyType: string = "Credit Card";
  public store = useStore();

  onBack() {
    this.$emit("back");
  }

  onPayNow() {
    this.store.dispatch("updatePaymentType", this.paymenyType);
    this.createCustomer();
  }

  private createCustomer() {
    const request: createCustomerRequestModel = {
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
        if (this.paymentType == "Credit Card") this.tokenizingCreditCard();
        else this.tokenizingAch();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  private tokenizingCreditCard() {
    let request: any = {};
    request = this.store.getters.getCreditCard;
    request.customer_external_key = this.firmId;
    ChargeOver.CreditCard.tokenize(
      request,
      (code: any, message: any, response: any) => {
        console.log(message, response);
        if (code == 200) {
          this.updateToken(response.creditcard.token);
          this.$emit("next");
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
    request = this.store.getters.getAch;
    request.customer_external_key = this.firmId;
    ChargeOver.ACH.tokenize(
      request,
      (code: any, message: any, response: any) => {
        if (code == 200) {
          this.updateToken(response.ach.token);
          this.$emit("next");
        } else if (code == 400) {
          console.log(message);
        } else {
          console.log(`Something went wrong, Please try again`);
        }
      }
    );
  }

  private updateToken(token: string) {
    const request = new paymentTokenRequestModel();
    request.token = token;
    request.firmId = this.firmId;
    request.paymentMethod = PaymentMethod[this.paymenyType as keyof typeof PaymentMethod];
    this.paymenyType.toUpperCase();
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
    return this.store.getters.getCustomer;
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

  get paymentType() {
    return this.store.getters.getPaymentType;
  }

  get firmId() {
    return this.store.getters.firms.firmId;
  }
}
</script>