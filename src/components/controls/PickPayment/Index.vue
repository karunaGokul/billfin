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
          @click="eventPaymentHandler('ACH')"
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
          @click="eventPaymentHandler('Credit Card')"
        >
          Credit Card
        </button>
      </div>
    </div>
    <pick-card
      :cards="cards"
      :showPaymentMethod="showPaymentMethod"
      @addNewPayment="showPaymentMethod = true"
      @makePrimary="makePrimary"
      @deleteCard="deleteCard"
      @payNow="onPayNow"
      @back="onBack"
      @next="onNext"
      v-if="paymentType == 'Credit Card'"
    />
    <PickACH
      :cards="ach"
      :showPaymentMethod="showPaymentMethod"
      @addNewPayment="showPaymentMethod = true"
      @makePrimary="makePrimary"
      @deleteCard="deleteCard"
      @payNow="onPayNow"
      @back="onBack"
      @next="onNext"
      v-if="paymentType == 'ACH'"
    />
  </div>
</template>
<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { Prop, Inject } from "vue-property-decorator";

import { useStore } from "vuex";

import {
  cardDetailsRequestModel,
  cardDetailsResponsetModel,
  billingAddressRequestModel,
  PaymentMethod,
  createCustomerRequestModel,
  paymentTokenRequestModel,
  CardPrimaryType,
  deleteCardRequestModel,
  deleteCardResponseModel,
} from "@/model";
import { IManageSubscription, ISubscripeService } from "@/service";

import PickACH from "./PickACH.vue";
import PickCard from "./PickCard.vue";

declare let ChargeOver: any;

@Options({
  components: {
    PickACH,
    PickCard,
  },
})
export default class PickPayment extends Vue {
  @Prop() pageType: string;

  @Inject("manageSubscripeService") service: IManageSubscription;
  @Inject("subscripeService") subscripeService: ISubscripeService;

  public store = useStore();

  public paymentType: string = "Credit Card";

  public cards: Array<cardDetailsResponsetModel> = null;
  public ach: Array<cardDetailsResponsetModel> = null;

  public showPaymentMethod: boolean = false;

  created() {
    this.getBillingAddress();
    this.getCardDetails();
  }

  public onBack() {
    this.$emit("back");
  }

  public onNext() {
    this.$emit("next");
  }

  public eventPaymentHandler(paymentType: string) {
    console.log(this.showPaymentMethod);
    this.paymentType = paymentType;
    if (!this.showPaymentMethod) this.getCardDetails();
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

  public getCardDetails() {
    this.cards = [];
    let request = new cardDetailsRequestModel();
    request.paymentMethod =
      PaymentMethod[this.paymentType as keyof typeof PaymentMethod];
    request.firmId = this.store.getters.selectedFirmId;
    this.service
      .getCardDetails(request)
      .then((response) => {
        if (this.paymentType == "Credit Card") this.cards = response;
        else this.ach = response;

        this.redirectPayment();
      })
      .catch((err) => {
        this.redirectPayment();
      });
  }

  private redirectPayment() {
    if (this.paymentType == "Credit Card" && this.cards.length == 0) {
      this.paymentType = "ACH";
      this.getCardDetails();
    } else if (
      this.paymentType == "ACH" &&
      this.cards.length == 0 &&
      this.ach.length == 0
    ) {
      this.paymentType = "Credit Card";
      this.showPaymentMethod = true;
    }
  }

  public onPayNow() {
    this.store.dispatch("updatePaymentType", this.paymentType);
    this.pageType == "SignUp" ? this.createCustomer() : this.tokenizeAccount();
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

    this.subscripeService
      .createCustomer(request)
      .then((response) => {
        this.tokenizeAccount();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  private tokenizeAccount() {
    if (this.paymentType == "Credit Card") this.tokenizingCreditCard();
    else this.tokenizingAch();
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
    request.firmId = this.firmId;
    request.paymentMethod =
      PaymentMethod[this.paymentType as keyof typeof PaymentMethod];
    request.reqType = CardPrimaryType[cardType as keyof typeof CardPrimaryType];
    this.subscripeService
      .updatePaymentToken(request)
      .then((response) => {
        this.getCardDetails();
        this.showPaymentMethod = false;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  public makePrimary(token: string) {
    this.updateToken(token, "primary");
  }

  public deleteCard(card: cardDetailsResponsetModel) {
    let request = new deleteCardRequestModel();
    request.paymentFirmTokenId = card.paymentFirmTokenId;
    request.customerId = card.customerId;
    console.log(request);

    this.service
      .deleteCard(request)
      .then((response) => {
        if (response.status == "SUCCESS") this.getCardDetails();
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
}
</script>   