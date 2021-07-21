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
            :class="{ 'tab-active-border-bottom': methodologiesTab == item }"
            @click="methodologiesTab = item"
          >
            {{ item }}
          </li>
        </ul>
      </div>
      <div class="tab-content-group m-0">
        <div
          class="tab-content tab-content-lg__scroll mt-10"
          v-if="methodologiesTab == 'AUM Advisory'"
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
              :data="valuationMethod"
              @update="updateValuationMethod"
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
              :data="defaultValuationMethod"
              @update="updateDefaultValuationMethod"
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
            <SingleSelectionCheckBox
              :data="['Period End', 'Billing Start Date']"
              @update="updateInitialBillingValuationMethod"
            />
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
            <SingleSelectionCheckBox
              :data="['Days in period divided by days in the year', 'Divide by number of billing periods in the year']"
              @update="updateDefaultProrationMethod"
            />
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
            <SingleSelectionCheckBox
              :data="['Basis Point', 'Percentages']"
              @update="updateExpressRatesAs"
            />
          </div>

          <div class="d-flex justify-content-between mt-10">
            <button class="btn btn-secondary" @click="prev">Back</button>
            <button 
              class="btn me-10" 
              :class="{
                'btn-secondary': !formValidation,
                'btn-primary': formValidation,
              }"
              :disabled="!formValidation"
              @click="saveMethodologies"
            >
              Continue
            </button>
          </div>
        </div>
        <div
          class="tab-content tab-content-lg__scroll"
          v-if="methodologiesTab == 'One Time'"
        >
          {{ methodologiesTab }}
        </div>
        <div
          class="tab-content tab-content-lg__scroll"
          v-if="methodologiesTab == 'Subscription'"
        >
          {{ methodologiesTab }}
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { Prop, Inject } from "vue-property-decorator";

import { useStore } from "vuex";

import { IFirmService } from "@/service";

import { firmRequestModel, methodologiesBoardModel } from "@/model";
import MultiSelectCheckBox from "@/components/controls/MultiSelectCheckBox.vue";
import SingleSelectionCheckBox from "@/components/controls/SingleSelectionCheckBox.vue";

@Options({
  components: {
    MultiSelectCheckBox,
    SingleSelectionCheckBox,
  },
})
export default class MethodologiesBoard extends Vue {
  @Inject("firmService") service: IFirmService | undefined;

  @Prop() tabs: Array<string> | any;

  public methodologiesTab: string = "";

  public valuationMethod: Array<string> = [
    "Period End",
    "Average Daily Balance",
  ];
  public defaultValuationMethod: Array<string> = [
    "Period End",
    "Average Daily Balance",
    "Don't default",
  ];
  
  public store = useStore();
  public request = new methodologiesBoardModel();

  created() {
    this.methodologiesTab = this.tabs[0];
    this.getMethodologies();
  }

  private getMethodologies() {
    const request = new firmRequestModel();
    request.firmId = this.store.getters.selectedFirmId;
    request.billingType = this.methodologiesTab;
    this.service
      ?.getMethodologies(request)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  public saveMethodologies() {

    this.request.firmId = this.store.getters.selectedFirmId;
    this.request.payorType = "Investor Client";
    this.request.billingType = this.methodologiesTab;
    this.request.feeTypeCode = "CF";

    this.service
      ?.saveMethodologies(this.request)
      .then((response) => {
        console.log(response);
      })  
      .catch((err) => {
        console.log(err);
      });

      this.$emit("controlTabs", this.tabs);
      this.$emit("next");
  }

  prev() {
    this.$emit("prev");
  }

  next() {
    console.log(this.request);
    this.$emit("next");
  }

  public updateValuationMethod(valuationMethod: string[]) {
    this.request.valuationMethod = valuationMethod;
    this.defaultValuationMethod = [];
    this.defaultValuationMethod = this.defaultValuationMethod.concat(this.request.valuationMethod);

    if(this.defaultValuationMethod.length > 0)
      this.defaultValuationMethod.push("Don't default");
    else 
      this.defaultValuationMethod = ["Period End", "Average Daily Balance",  "Don't default"];

    this._sortOrder(this.defaultValuationMethod);
  }

  public updateDefaultValuationMethod(defaultValuationMethod: string) {
    this.request.defaultValuationMethod = defaultValuationMethod;
  }

  public updateInitialBillingValuationMethod(initialBillingValuationMethod: string) {
    this.request.initialBillingValuationMethod = initialBillingValuationMethod;
  }

  public updateDefaultProrationMethod(defaultProrationMethod: string) {
    this.request.defaultProrationMethod = defaultProrationMethod;
  }

  public updateExpressRatesAs(expressRatesAs: string) {
    this.request.expressRatesAs = expressRatesAs;
  }

  public _sortOrder(defaultValuationMethod: Array<string>) {
    const sortOrder = ["Period End", "Average Daily Balance", "Don't default"];
    defaultValuationMethod.sort((a, b) => {
      return sortOrder.indexOf(a) - sortOrder.indexOf(b);
    });
  }

  get formValidation() {
    let valid = false; 
    if(
      this.request.valuationMethod.length > 0 &&
      this.request.defaultValuationMethod &&
      this.request.initialBillingValuationMethod &&
      this.request.defaultProrationMethod &&
      this.request.expressRatesAs
    )
      valid = true;

    return valid;
  }
}
</script>