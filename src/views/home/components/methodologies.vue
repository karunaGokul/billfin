<template>
  <div class="tab-content pb-5 border-bottom">
    <div class="tab-group mt-10">
      <div class="tab-header position-relative">
        <div class="tab-header__title position-absolute fw-bolder fs-4">
          Methodologies
        </div>
        <ul class="tab-label-group justify-content-center border-bottom">
          <li
            v-for="(item, index) in tabs"
            :key="index"
            class="tab-label pb-4"
            :class="{ 'tab-active-border-bottom': methodologiesTab == index }"
            @click="methodologiesTab = index"
          >
            {{item}}
          </li>
        </ul>
      </div>
      <div class="tab-content-group m-0">
        <div
          class="tab-content tab-content-lg__scroll mt-10"
          v-if="methodologiesTab == 0"
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
            <MultiSelectCheckBox
              :data="aumAdvisoryBilling"
              @update="updateAumAdvisoryBilling"
            />
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
            <SingleSelectionCheckBox
              :data="newAccounts"
              @update="updateNewAccounts"
            />
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
              <input
                class="form-check-input"
                type="checkbox"
                v-model="request.advanceFees"
                value="Period End"
              />
              Period End
            </div>
            <div class="form-check form-check-solid form-check-inline fs-7">
              <input
                class="form-check-input"
                type="checkbox"
                v-model="request.advanceFees"
                value="Billing Start Date"
              />
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
              <input class="form-check-input" type="checkbox" v-model="request.billingPeriod" value="Days in period divided by days in the year"/>
              Days in period divided by days in the year
            </div>
            <div class="form-check form-check-solid form-check-inline fs-7">
              <input class="form-check-input" type="checkbox" v-model="request.billingPeriod" value="Divide by number of billing periods in the year"/>
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
              <input class="form-check-input" type="checkbox" v-model="request.billingRates" value="Basis Point"/>
              Basis Point
            </div>
            <div class="form-check form-check-solid form-check-inline fs-7">
              <input class="form-check-input" type="checkbox"  v-model="request.billingRates" value="Percentages"/>
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
          v-if="methodologiesTab == 1"
        >
          {{ methodologiesTab }}
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { Prop } from "vue-property-decorator";

import { methodologiesModel } from "@/model";
import MultiSelectCheckBox from "@/components/controls/MultiSelectCheckBox.vue";
import SingleSelectionCheckBox from "@/components/controls/SingleSelectionCheckBox.vue";

@Options({
  components: {
    MultiSelectCheckBox,
    SingleSelectionCheckBox,
  },
})
export default class Methodologies extends Vue {
  @Prop() tabs: Array<string> | any;
  public methodologiesTab: number = 0;

  public aumAdvisoryBilling: Array<string> = [
    "Period End",
    "Average Daily Balance",
  ];
  public newAccounts: Array<string> = [
    "Period End",
    "Average Daily Balance",
    "Don't default",
  ];
  public request = new methodologiesModel();

  prev() {
    this.$emit("prev");
  }

  next() {
    console.log(this.request);
    this.$emit("next");
  }

  public updateAumAdvisoryBilling(selectedAUM: any) {
    this.request.aumAdvisoryBilling = selectedAUM;
    this.newAccounts = [];
    this.newAccounts = this.newAccounts.concat(this.request.aumAdvisoryBilling);
    this.newAccounts.push("Don't default");
    this._sortOrder(this.newAccounts);
  }

  public updateNewAccounts(newAccounts: any) {
    this.request.newAccounts = newAccounts;
  }

  public _sortOrder(newAccounts: Array<string>) {
    const sortOrder = ["Period End", "Average Daily Balance", "Don't default"];
    newAccounts.sort((a, b) => {
      return sortOrder.indexOf(a) - sortOrder.indexOf(b);
    });
  }
}
</script>