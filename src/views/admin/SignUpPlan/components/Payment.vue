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
    <template v-if="showCardDetails">
      <div class="p-4 ps-10 pe-10">
        <div class="d-flex flex-wrap">
          <div
            class="d-flex border p-4 rounded m-4"
            v-for="(item, index) of cards"
            :key="'card-' + index"
            :class="{
              'border border-primary bg-primary-alpha': item == selectedCard,
            }"
            @click="selectedCard = item"
          >
            <div>
              <div class="fw-bolder fs-4 p-2">
                {{ item.cardHolderName }}
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
                <div  class="pt-2 ps-3" v-else>
                  <div class="fw-bolder">
                    Checking
                    {{ item.maskNumber.split("x")[1] }}
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

        <div class="m-4">
          <button
            class="btn btn-primary"
            type="button"
            @click="showCardDetails = false"
          >
            Add Payment Method
          </button>
        </div>
      </div>
    </template>
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
  },
})
export default class Payment extends Vue {
  @Inject("subscripeService") service: ISubscripeService;
  @Inject("manageSubscripeService") manageSubscripeService: IManageSubscription;

  public paymentType: string = "Credit Card";
  public store = useStore();

  public showCardDetails: boolean = false;

  public cards: Array<cardDetailsResponsetModel> = [];
  public selectedCard: cardDetailsResponsetModel =
    new cardDetailsResponsetModel();

  public paymentCard: any = {};

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
        if (this.cards.length > 0) this.showCardDetails = true;

        this.selectedCard = this.cards[0];
        if (this.paymentType == "Credit Card")
          this.paymentCard = this.creditCard;
        else this.paymentCard = this.ach;
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