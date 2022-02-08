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
              <span
                class="badge text-success ms-2 fs-6 bg-success-alpha"
                v-if="item.default"
                >Primary</span
              >
              <span
                class="badge text-orange ms-2 fs-6 bg-orange"
                v-if="!item.default"
                @click="makePrimary(item, 'primary')"
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
                  v-if="item.cardType == 'American Express'"
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
              <div class="pt-2 ps-3" v-if="item.cardType != 'chec'">
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
              :class="{
                'btn-light': !item.default,
                'btn-primary': item.default,
              }"
              :disabled="!item.default"
              @click="confirmation(item)"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
      <div class="p-4">
        <router-link
          :to="{
            name: 'Add Payment Method',
            params: { redirectPage: 'bills-payments' },
          }"
          tag="button"
          class="btn btn-primary"
        >
          Add Payment Method
        </router-link>
      </div>
    </div>
  </div>

  <app-delete
    message="Do you really want to delete this payment method?"
    subMessage="This process cannot be undone."
    @cancel="cancelDelete"
    @delete="deleteCard"
    v-if="showDeleteModel"
  />

  <div class="p-4" v-if="response">
    <div class="p-4 fw-bolder fs-4 border-bottom border-gray-secondary">
      Bills
    </div>
    <div v-for="(item, index) of response" :key="index">
      <div class="d-flex align-items-center justify-content-between mt-4 p-4">
        <div class="fs-5">
          <div class="fw-bolder mt-2 mb-2">
            {{ $datehelper.changeDateFormatWithSlash(item.transactionDate) }}
          </div>
          <div class="fw-bolder mb-2 fs-5">
            <img
              src="@/assets/mastercard.png"
              alt="Card Type"
              v-if="item.transactionCardType == 'MasterCard'"
            />
            <img
              src="@/assets/visa.png"
              alt="Card Type"
              v-if="item.transactionCardType == 'Visa'"
            />
            <img
              src="@/assets/amex.png"
              alt="Card Type"
              v-if="item.transactionCardType == 'American'"
            />
            <img
              src="@/assets/discover.png"
              alt="Card Type"
              v-if="item.transactionCardType == 'Discover'"
            />
            {{
              item.transactionCardType == "American"
                ? "American Express"
                : item.transactionCardType
            }}
            ****{{
              item.transactionCardDetail.split(" ")[0] == "American"
                ? item.transactionCardDetail.split(" ")[2]
                : item.transactionCardDetail.split(" ")[1]
            }}
          </div>
        </div>
        <a class="btn btn-link">Download Invoice</a>
      </div>

      <billng :products="item.products" />
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { Inject } from "vue-property-decorator";

import { useStore } from "vuex";

import Billng from "./component/Billing.vue";
import AppDelete from "@/components/Models/AppDelete.vue";

import {
  IBillsAndPaymentService,
  IManageSubscription,
  ISubscripeService,
} from "@/service";

import {
  billsAndPaymentResponseModel,
  cardDetailsRequestModel,
  cardDetailsResponsetModel,
  deleteCardRequestModel,
  paymentTokenRequestModel,
  PaymentMethod,
  CardPrimaryType,
} from "@/model";

@Options({
  components: {
    Billng,
    AppDelete,
  },
})
export default class Index extends Vue {
  @Inject("billsAndPaymentService") service: IBillsAndPaymentService;
  @Inject("manageSubscripeService") manageSubscripeService: IManageSubscription;
  @Inject("subscripeService") subscripeService: ISubscripeService;

  public store = useStore();

  public response: Array<billsAndPaymentResponseModel> = null;
  public availableCards: Array<cardDetailsResponsetModel> = [];

  public showDeleteModel: boolean = false;

  private selectedCard: cardDetailsResponsetModel =
    new cardDetailsResponsetModel();

  created() {
    this.getBillAndPayment();
    this.getCardDetails();
  }

  public confirmation(card: cardDetailsResponsetModel) {
    this.selectedCard = card;
    this.showDeleteModel = true;
  }

  public cancelDelete() {
    this.showDeleteModel = false;
    this.selectedCard = new cardDetailsResponsetModel();
  }

  public deleteCard() {
    this.showDeleteModel = false;
    let request = new deleteCardRequestModel();
    request.paymentFirmTokenId = this.selectedCard.paymentFirmTokenId;
    request.customerId = this.selectedCard.customerId;

    this.manageSubscripeService
      .deleteCard(request)
      .then((response) => {
        if (response.status == "SUCCESS") this.getCardDetails();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  public makePrimary(details: cardDetailsResponsetModel, cardType: string) {
    let request = new paymentTokenRequestModel(),
      paymentType: string;
    request.token = details.token;

    if (
      details.cardType == "Visa" ||
      details.cardType == "MasterCard" ||
      details.cardType == "Discover" ||
      details.cardType == "American Express"
    )
      paymentType = "Credit Card";
    else paymentType = "ACH";

    request.paymentMethod =
      PaymentMethod[paymentType as keyof typeof PaymentMethod];
    request.reqType = CardPrimaryType[cardType as keyof typeof CardPrimaryType];
    this.subscripeService
      .updatePaymentToken(request)
      .then((response) => {
        this.getCardDetails();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  private getCardDetails() {
    this.availableCards = [];
    let request = new cardDetailsRequestModel();
    this.service
      .getCardDetails(request)
      .then((response) => {
        this.availableCards = response;
        this.availableCards = this.availableCards.sort((a) => {
          return a.default ? -1 : 1;
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  private getBillAndPayment() {
    this.service
      .geiBillAndPayment()
      .then((response) => {
        this.response = response;
      })
      .catch((err) => {
        console.log(err);
      });
  }

}
</script>