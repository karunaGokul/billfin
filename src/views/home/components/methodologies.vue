<template>
  <div class="tab-content pb-5 border-bottom">
    <div class="tab-group mt-10">
      <div class="tab-header position-relative">
        <div class="tab-header__title position-absolute fw-bolder fs-4">
          Methodologies
        </div>
        <ul class="tab-label-group justify-content-center border-bottom">
          <li
            class="tab-label pb-4"
            :class="{ 'tab-active-border-bottom': methodologiesTab == 1 }"
            @click="methodologiesTab = 1"
          >
            AUM Advisory
          </li>
          <li
            class="tab-label pb-4"
            :class="{ 'tab-active-border-bottom': methodologiesTab == 2 }"
            @click="methodologiesTab = 2"
          >
            Subscription
          </li>
        </ul>
      </div>
      <div class="tab-content-group m-0">
        <div
          class="tab-content tab-content-lg__scroll mt-10"
          v-if="methodologiesTab == 1"
        >
          <div class="d-flex fs-7 mt-5">
            <div class="fw-bolder">
              What valuation methodologies do you use for AUM advisory billing?
            </div>
            <div class="text-muted ms-4">Check all that apply</div>
            <div class="ms-5">
              <i class="fa fa-question-circle fs-4 text-dark"></i>
            </div>
          </div>
          <div class="mt-6 ms-6">
            <div
              class="form-check form-check-solid form-check-inline fs-7"
              v-for="(item, index) in aumAdvisoryBilling"
              :key="index"
            >
              <input
                class="form-check-input"
                type="checkbox"
                v-model="request.aumAdvisoryBilling"
                :value="item"
              />
              {{ item }}
            </div>
          </div>

          <div class="d-flex fs-7 mt-10">
            <div class="fw-bolder">
              What valuation methodology do you want default for new accounts?
            </div>
            <div class="ms-5">
              <i class="fa fa-question-circle fs-4 text-dark"></i>
            </div>
          </div>
          <div class="mt-6 ms-6">
            <div
              class="form-check form-check-solid form-check-inline fs-7"
              v-for="(item, index) in request.aumAdvisoryBilling"
              :key="index"
            >
              <input
                class="form-check-input"
                type="checkbox"
                v-model="request.newAccounts"
                :value="item"
              />
              {{ item }}
            </div>
            <div class="form-check form-check-solid form-check-inline fs-7">
              <input class="form-check-input" type="checkbox" />
              Don't default
            </div>
          </div>

          <div class="d-flex fs-7 mt-10">
            <div class="fw-bolder">
              What valuation date do you use for initial billing of advance
              fees?
            </div>
            <div class="ms-5">
              <i class="fa fa-question-circle fs-4 text-dark"></i>
            </div>
          </div>
          <div class="mt-6 ms-6">
            <div class="form-check form-check-solid form-check-inline fs-7">
              <input class="form-check-input" type="checkbox" />
              Period End
            </div>
            <div class="form-check form-check-solid form-check-inline fs-7">
              <input class="form-check-input" type="checkbox" />
              Billing Start Date
            </div>
          </div>

          <div class="d-flex fs-7 mt-10">
            <div class="fw-bolder">
              How do you prorate your annualized rates for the billing period?
            </div>
            <div class="ms-5">
              <i class="fa fa-question-circle fs-4 text-dark"></i>
            </div>
          </div>
          <div class="mt-6 ms-6">
            <div class="form-check form-check-solid form-check-inline fs-7">
              <input class="form-check-input" type="checkbox" />
              Days in period divided by days in the year
            </div>
            <div class="form-check form-check-solid form-check-inline fs-7">
              <input class="form-check-input" type="checkbox" />
              Divide by number of billing periods in the year
            </div>
          </div>

          <div class="d-flex fs-7 mt-10">
            <div class="fw-bolder">
              How would you like to express your billing rates?
            </div>
            <div class="ms-5">
              <i class="fa fa-question-circle fs-4 text-dark"></i>
            </div>
          </div>
          <div class="mt-6 ms-6">
            <div class="form-check form-check-solid form-check-inline fs-7">
              <input class="form-check-input" type="checkbox" />
              Basis Point
            </div>
            <div class="form-check form-check-solid form-check-inline fs-7">
              <input class="form-check-input" type="checkbox" />
              Percentages
            </div>
          </div>

          <div class="d-flex justify-content-between mt-10">
            <button class="btn btn-secondary" @click="prev">Back</button>
            <button class="btn btn-primary me-10" @click="next">
              Continue
            </button>
          </div>
        </div>
        <div
          class="tab-content tab-content-lg__scroll"
          v-if="methodologiesTab == 2"
        >
          {{ methodologiesTab }}
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue } from "vue-class-component";
import { methodologiesModel } from "@/model";

export default class Methodologies extends Vue {
  public methodologiesTab: number = 1;
  public aumAdvisoryBilling: Array<string> = [
    "Period End",
    "Average Daily Balance",
  ];
  public request = new methodologiesModel();

  prev() {
    this.$emit("prev");
  }

  next() {
    this.$emit("next");
  }
}
</script>