<template>
  <div class="card">
    <h4 class="fw-bolder fs-4 text-dark-gray p-4 border-bottom">
      Review and agree to subscribe
    </h4>
    <div class="w-75 mx-auto m-4 p-4">
      <template v-if="showAumBilling">
        <div class="mt-8 d-flex justify-content-between">
          <div class="text-dark-black fs-4">
            <span class="fw-bolder">AUM Billing: </span>
            <span class="fw-bold ms-2">{{ aumBilling.plan.planName }}</span>
            <span class="ms-4 fst-italic fw-light fs-5"
              >({{ aumBilling.commitmentTerm }} Commitment)</span
            >
          </div>
          <div class="text-light-gray fs-4 fw-bold">
            {{ $filters.currencyDisplay(aumBilling.plan.termPlanAmount) }}
          </div>
        </div>

        <div
          class="row g-0 mt-8 ms-4 text-dark-black"
          v-for="(item, index) of aumBilling.addons"
          :key="index"
        >
          <div class="col-1 fw-bold fs-4">Add On:</div>
          <div class="col-9 fw-bold fs-4">
            <template
              v-if="
                item.addOnName == 'Admin User License' ||
                item.addOnName == 'Multi-Connector Integrations'
              "
            >
              {{
                item.addOnName == "Admin User License"
                  ? "Additional Admin User"
                  : item.addOnName == "Multi-Connector Integrations"
                  ? "Additional Connectors"
                  : item.addOnName
              }}
              1<template v-if="parseInt(item.quantity) > 1"
                >X{{ item.quantity }}</template
              >
            </template>
            <template v-else>
              {{ item.addOnName }}
            </template>
            <span class="ms-4 fst-italic fw-light fs-6"
              >(On {{ aumBilling.commitmentTerm }} Commitment)</span
            >
          </div>
          <div class="col-2 text-end fs-4 fw-bold text-light-gray">
            {{
              $filters.currencyDisplay(
                item.planAddOnAmount * parseInt(item.quantity)
              )
            }}
          </div>
        </div>
      </template>

      <template v-if="showSubscription">
        <div class="mt-8 d-flex justify-content-between">
          <div class="text-dark-black fs-4">
            <span class="fw-bolder">Subscription Billing: </span>
            <span class="fw-bold ms-2">{{
              subscriptionBilling.plan.planName
            }}</span>
            <span class="ms-4 fst-italic fw-light fs-5"
              >({{ subscriptionBilling.commitmentTerm }} Commitment)</span
            >
          </div>
          <div class="text-light-gray fs-4 fw-bold">
            {{
              $filters.currencyDisplay(subscriptionBilling.plan.termPlanAmount)
            }}
          </div>
        </div>

        <div
          class="row g-0 mt-8 ms-4 text-dark-black"
          v-for="(item, index) of subscriptionBilling.addons"
          :key="index"
        >
          <div class="col-1 fw-bold fs-4">Add On:</div>
          <div class="col-9 fw-bold fs-4">
            <template
              v-if="
                item.addOnName == 'Admin User License' ||
                item.addOnName == 'Multi-Connector Integrations'
              "
            >
              {{
                item.addOnName == "Admin User License"
                  ? "Additional Admin User"
                  : item.addOnName == "Multi-Connector Integrations"
                  ? "Additional Connectors"
                  : item.addOnName
              }}
              1<template v-if="parseInt(item.quantity) > 1"
                >X{{ item.quantity }}</template
              >
            </template>
            <template v-else>
              {{ item.addOnName }}
            </template>
            <span class="ms-4 fst-italic fw-light fs-6"
              >(On {{ subscriptionBilling.commitmentTerm }} Commitment)</span
            >
          </div>
          <div
            class="col-2 text-end text-light-gray fs-4 fw-bold text-light-gray"
          >
            {{
              $filters.currencyDisplay(
                item.planAddOnAmount * parseInt(item.quantity)
              )
            }}
          </div>
        </div>
      </template>

      <div
        class="
          mt-8
          fs-4
          fw-bolder
          pt-5
          pb-5
          d-flex
          justify-content-between
          border-top border-bottom border-dashed border-start-0 border-end-0
        "
      >
        <div>Total Due Today</div>
        <div>{{ $filters.currencyDisplay(totalFees) }}</div>
      </div>

      <div class="row g-0">
        <div class="col-4">
          <h4 class="fw-bold mt-10 pb-4">Billing Address</h4>

          <div class="text-gray mt-4">{{ address.bill_addr1 }}</div>
          <div class="text-gray">{{ address.bill_city }}</div>
          <div class="text-gray">{{ address.bill_state }}</div>
          <div class="text-gray">{{ address.bill_postcode }}</div>
          <div class="text-gray">{{ address.bill_country }}.</div>
        </div>
        <div class="col-5">
          <h4 class="fw-bold mt-10 pb-4">Payment Method</h4>
          <div
            class="border border-dashed rounded p-4"
            v-if="paymentType == 'Credit Card'"
          >
            <div class="fw-bold text-dark-gray p-2">{{ creditCard.name }}</div>
            <div class="d-flex align-items-center">
              <div>
                <img
                  src="@/assets/mastercard.svg"
                  alt="Card Type"
                  width="100"
                  v-if="creditCard.cardType == 'MasterCard'"
                />
                <img
                  src="@/assets/visa.svg"
                  alt="Card Type"
                  width="100"
                  v-if="creditCard.cardType == 'Visa'"
                />
                <img
                  src="@/assets/amex.svg"
                  alt="Card Type"
                  width="100"
                  v-if="creditCard.cardType == 'American Express'"
                />
                <img
                  src="@/assets/discover.svg"
                  alt="Card Type"
                  width="100"
                  v-if="creditCard.cardType == 'Discover'"
                />
              </div>
              <div class="p-4">
                <div class="text-dark-gray fw-bolder p-2">
                  {{ creditCard.cardType }} ****{{
                    creditCard.number.substr(creditCard.number.length - 4)
                  }}
                </div>
                <div class="text-dark-gray fw-bold p-2 text-muted">
                  Card expires at {{ creditCard.expdate_month }}/{{
                    creditCard.expdate_year
                  }}
                </div>
              </div>
            </div>
          </div>
          <div class="border border-dashed rounded p-4" v-else>
            <div class="text-dark-gray fw-bold p-2">{{ ach.name }}</div>
            <div class="d-flex align-items-center">
              <div>
                <img
                  src="@/assets/bank.png"
                  alt="Card Type"
                  width="80"
                />
              </div>
              <div class="p-4">
                <div class="text-dark-gray fw-bold p-2">
                  ****{{ ach.number.substr(ach.number.length - 4) }}
                </div>
                <div class="text-dark-gray fw-bold p-2">{{ ach.routing }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="text-center mt-10">
        <button class="btn btn-light me-5" @click="back">Back</button>
        <button class="btn btn-primary ms-5" @click="next">Continue</button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue } from "vue-class-component";

import { useStore } from "vuex";

export default class Review extends Vue {
  public store = useStore();

  public back() {
    this.$emit("back");
  }

  public next() {
    this.$emit("next");
  }

  get products() {
    return this.store.getters.products;
  }

  get showAumBilling() {
    return this.products.includes("AUM");
  }

  get showSubscription() {
    return this.products.includes("SUBSCRIPTION");
  }

  get aumBilling() {
    return this.store.getters.aumBilling;
  }

  get subscriptionBilling() {
    return this.store.getters.subscriptionBilling;
  }

  get totalFees() {
    let subAmount: number = 0,
      aumAmount: number = 0;
    if (this.showAumBilling) {
      aumAmount = this.aumBilling.addons.reduce((prev: number, cur: any) => {
        return prev + parseInt(cur.planAddOnAmount) * parseInt(cur.quantity);
      }, 0);
      aumAmount = aumAmount + this.aumBilling.plan.termPlanAmount;
    }

    if (this.showSubscription) {
      subAmount = this.subscriptionBilling.addons.reduce(
        (prev: number, cur: any) => {
          return prev + parseInt(cur.planAddOnAmount) * parseInt(cur.quantity);
        },
        0
      );
      subAmount = subAmount + this.subscriptionBilling.plan.termPlanAmount;
    }
    return aumAmount + subAmount;
  }

  get paymentType() {
    return this.store.getters.paymentType;
  }

  get creditCard() {
    console.log(this.store.getters.creditCard);
    return this.store.getters.creditCard;
  }

  get ach() {
    console.log(this.store.getters.ach);
    return this.store.getters.ach;
  }
  get address() {
    return this.store.getters.address;
  }

}
</script>