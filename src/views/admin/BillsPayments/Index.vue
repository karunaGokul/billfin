<template>
  <bread-crumb/>

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
                class="
                  badge
                  text-orange
                  ms-2
                  fs-6
                  bg-orange
                  border-1 border-orange border-dashed
                "
                style="cursor: pointer"
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
              :title="
                item.default
                  ? 'Please make another card primary before deleting the existing one'
                  : ''
              "
              :class="{
                'btn-light': item.default,
                'btn-primary': !item.default,
              }"
              @click="!item.default ? deleteConfirmation(item) : ''"
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
    <div v-for="(bills, index) of response" :key="index">
      <div class="d-flex align-items-center justify-content-between mt-4 p-4">
        <div class="fs-5">
          <div class="fw-bolder mt-2 mb-2">
            {{ $datehelper.changeMonthFormat(bills.transactionDate) }}
          </div>
          <div class="fw-bolder mb-2 fs-5">
            <img
              src="@/assets/mastercard.png"
              alt="Card Type"
              v-if="bills.transactionCardType == 'MasterCard'"
            />
            <img
              src="@/assets/visa.png"
              alt="Card Type"
              v-if="bills.transactionCardType == 'Visa'"
            />
            <img
              src="@/assets/amex.png"
              alt="Card Type"
              v-if="bills.transactionCardType == 'American'"
            />
            <img
              src="@/assets/discover.png"
              alt="Card Type"
              v-if="bills.transactionCardType == 'Discover'"
            />
            {{
              bills.transactionCardType == "American"
                ? "American Express"
                : bills.transactionCardType
            }}
            ****{{
              bills.transactionCardDetail.split(" ")[0] == "American"
                ? bills.transactionCardDetail.split(" ")[2]
                : bills.transactionCardDetail.split(" ")[1]
            }}
          </div>
        </div>
        <a class="btn btn-link">Download Invoice</a>
      </div>

      <div
        class="card mt-2 mb-4 rounded"
        v-for="(invoice, index) of bills.invoices"
        :key="index"
      >
        <table class="w-100 fs-5">
          <thead>
            <tr>
              <th
                class="p-5 text-dark-gray border-bottom border-light-gray"
                style="width: 35%"
              >
                Item
              </th>
              <th
                class="p-5 text-dark-gray border-bottom border-light-gray"
                style="width: 30%"
              >
                Product
              </th>
              <th class="p-5 text-dark-gray border-bottom border-light-gray">
                Term
              </th>
              <th
                class="
                  p-5
                  text-dark-gray
                  border-bottom border-light-gray
                  text-end
                "
              >
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, i) of invoice.planDetails"
              :key="'plan-details' + i"
            >
              <td
                class="p-5 border-bottom border-light-gray"
                style="width: 35%"
              >
                <div class="fw-bolder text-dark-gray">{{ item.planName }}</div>
                <div
                  class="text-gray pt-2 pb-2"
                  v-if="
                    item.planName != 'Admin User License' &&
                    item.planName != 'Multi-Connector Integrations'
                  "
                >
                  {{ description(item.type, item.planName) }}
                </div>
                <div
                  class="text-gray pt-2 pb-2"
                  v-if="item.planName == 'Admin User License'"
                >
                  Number of users: {{ item.quantity }}
                </div>
                <div
                  class="text-gray pt-2 pb-2"
                  v-if="item.planName == 'Multi-Connector Integrations'"
                >
                  Number of connectors: {{ item.quantity }}
                </div>
              </td>
              <td
                class="
                  p-5
                  fw-bolder
                  text-dark-gray
                  border-bottom border-light-gray
                "
                style="width: 30%"
              >
                {{ item.product == "AUM" ? "AUM" : "Subscription" }} Billing
                {{ item.type == "Plan" ? "Plan" : "Add-on" }}
              </td>
              <td
                class="
                  p-5
                  fw-bolder
                  text-dark-gray
                  border-bottom border-light-gray
                "
              >
                {{ item.planTerm == "ANNUAL" ? "Annual" : "Monthly" }}
              </td>
              <td
                class="
                  fw-bolder
                  fa-2x
                  p-5
                  fw-bolder
                  text-dark-gray
                  border-bottom
                  text-end
                  border-light-gray
                "
              >
                <span class="fs-7">$</span>
                {{ $filters.currencyDisplayWithoutSymbol(item.termPlanAmount) }}
                <span class="fs-8 fw-light"
                  >/{{ item.planTerm == "ANNUAL" ? "Yr" : "Mo" }}</span
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { Inject } from "vue-property-decorator";

import { useStore } from "vuex";

import BaseComponent from "@/components/base/BaseComponent.vue";
import BreadCrumb from "@/components/layout/BreadCrumb.vue";

import AppDelete from "@/components/layout/AppDelete.vue";

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
    AppDelete,
    BreadCrumb,
  },
})
export default class Index extends BaseComponent {
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

  public deleteConfirmation(card: cardDetailsResponsetModel) {
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
        this.confirmation("", "Your card has been deleted successfully");
        this.getCardDetails();
      })
      .catch((err) => {
        if (err.response.status == 500)
          this.alert(
            "Oops, sorry!",
            "Somthing went wrong, Please contact administration"
          );
        else if (err.response.status == 400)
          this.alert("Oops, sorry!", err.response.data.message);
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
        this.confirmation(
          "",
          `${details.cardHolderName} card changed to primary card`
        );
        this.getCardDetails();
      })
      .catch((err) => {
        if (err.response.status == 500)
          this.alert(
            "Oops, sorry!",
            "Somthing went wrong, Please contact administration"
          );
        else if (err.response.status == 400)
          this.alert("Oops, sorry!", err.response.data.message);
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
        if (err.response.status == 500)
          this.alert(
            "Oops, sorry!",
            "Somthing went wrong, Please contact administration"
          );
        else if (err.response.status == 400)
          this.alert("Oops, sorry!", err.response.data.message);
      });
  }

  private getBillAndPayment() {
    this.service
      .geiBillAndPayment()
      .then((response) => {
        this.response = response;
      })
      .catch((err) => {
        if (err.response.status == 500)
          this.alert(
            "Oops, sorry!",
            "Somthing went wrong, Please contact administration"
          );
        else if (err.response.status == 400)
          this.alert("Oops, sorry!", err.response.data.message);
      });
  }

  public description(type: string, planName: string) {
    if (type == "Plan")
      return this.planList.find((e: any) => e.planName == planName).description;
    else
      return this.addOnsList.find((e: any) => e.addOnName == planName)
        .description;
  }

  get planList() {
    return this.store.getters.planList;
  }

  get addOnsList() {
    return this.store.getters.addOnsList;
  }
}
</script>