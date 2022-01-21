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
            <button class="btn btn-light me-3">Delete</button>
            <button class="btn btn-light">Edit</button>
          </div>
        </div>
      </div>
      <div class="p-4">
        <router-link to="/payment" tag="button" class="btn btn-primary">
          Add Payment Method
        </router-link>
      </div>
    </div>
  </div>

  <div class="p-4" v-if="response">
    <div class="p-4 fw-bolder fs-4 border-bottom border-gray-secondary">
      Bills
    </div>
    <div v-for="(item, index) of response" :key="index">
      <div class="d-flex align-items-center justify-content-between mt-4 p-4">
        <div class="fs-5">
          <div class="fw-bolder mt-2 mb-2">{{ planEndDate(item.transactionDate) }}</div>
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

import { IBillsAndPaymentService } from "@/service";

import {
  billsAndPaymentRequestModel,
  billsAndPaymentResponseModel,
  cardDetailsRequestModel,
  cardDetailsResponsetModel,
} from "@/model";

@Options({
  components: {
    Billng,
  },
})
export default class Index extends Vue {
  @Inject("billsAndPaymentService") service: IBillsAndPaymentService;

  public store = useStore();

  public response: Array<billsAndPaymentResponseModel> = null;
  public availableCards: Array<cardDetailsResponsetModel> = [];

  created() {
    this.getBillAndPayment();
    this.getCardDetails();
  }

  public getCardDetails() {
    this.availableCards = [];
    let request = new cardDetailsRequestModel();
    request.firmId = this.store.getters.selectedFirmId;
    this.service
      .getCardDetails(request)
      .then((response) => {
        this.availableCards = response;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getBillAndPayment() {
    let request = new billsAndPaymentRequestModel();
    request.firmId = this.store.getters.selectedFirmId;

    this.service
      .geiBillAndPayment(request)
      .then((response) => {
        this.response = response;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  planEndDate(endDate: string) {
    let value: string = "";
    let date = new Date(
      parseInt(endDate.split("-")[0]),
      parseInt(endDate.split("-")[1]) - 1,
      parseInt(endDate.split("-")[2])
    );
    let month = date.toLocaleString("default", { month: "long" });

    value = `${endDate.split("-")[2]} ${month}, ${endDate.split("-")[0]}`;
    return value;
  }
}
</script>