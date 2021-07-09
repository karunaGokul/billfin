<template>
  <div class="tab-content pb-5 border-bottom">
    <div class="tab-group mt-10">
      <div class="tab-header position-relative">
        <div class="tab-header__title position-absolute fw-bolder fs-4">
          Frequecy & Timing
        </div>
        <ul class="tab-label-group justify-content-center border-bottom">
          <li
            v-for="(item, index) in tabs"
            :key="index"
            class="tab-label pb-4"
            :class="{ 'tab-active-border-bottom': frequencyTab == item }"
            @click="frequencyTab = item"
          >
            {{ item }}
          </li>
        </ul>
      </div>
      <div class="tab-content-group m-0">
        <div
          class="tab-content tab-content-lg__scroll mt-10"
          v-if="frequencyTab == 'AUM Advisory'"
        >
          <div class="d-flex fs-7">
            <div class="fw-bolder">
              How frequently do you bill your AUM advisory fees?
            </div>
            <div class="text-muted ms-4 fs-8">Check all that apply</div>
            <div class="ms-5">
              <i class="fa fa-question-circle fs-4 text-dark"></i>
            </div>
          </div>
          <div class="mt-6 ms-6">
            <MultiSelectCheckBox
              :data="aumAdvisoryFees"
              @update="updateAumAdvisoryFees"
            />
          </div>

          <div class="d-flex fs-7 mt-10">
            <div class="fw-bolder">
              What frequency do you want to default for new accounts?
            </div>
            <div class="ms-5">
              <i class="fa fa-question-circle fs-4 text-dark"></i>
            </div>
          </div>
          <div class="mt-6 ms-6">
            <SingleSelectionCheckBox
              :data="aumAdvisoryNewAccount"
              @update="updateAumAdvisoryNewAccount"
            />
          </div>

          <div class="d-flex fs-7 mt-10">
            <div class="fw-bolder">
              Do you bill your AUM advisory fees in advance or in arrears?
            </div>
            <div class="text-muted ms-4 fs-8">Check all that apply</div>
            <div class="ms-5">
              <i class="fa fa-question-circle fs-4 text-dark"></i>
            </div>
          </div>

          <div class="mt-6 ms-6">
            <MultiSelectCheckBox
              :data="aumAdvisoryArrears"
              @update="updateAumAdvisoryArrears"
            />
          </div>

          <div class="d-flex fs-7 mt-10">
            <div class="fw-bolder">
              What billing timing do you want to default for new accounts?
            </div>
            <div class="ms-5">
              <i class="fa fa-question-circle fs-4 text-dark"></i>
            </div>
          </div>
          <div class="mt-6 ms-6">
            <SingleSelectionCheckBox
              :data="aumDefaultNewAccounts"
              @update="updateAumDefaultNewAccounts"
            />
          </div>

          <template v-if="isQuarterlySelected">
            <div class="d-flex fs-7 mt-10">
              <div class="fw-bolder">
                Do you bill any quarterly clients during off-cycle months?
              </div>
              <div class="ms-5">
                <i class="fa fa-question-circle fs-4 text-dark"></i>
              </div>
            </div>
            <div class="mt-6 ms-6">
              <div class="form-check form-check-solid form-switch">
                <input
                  class="form-check-input"
                  type="checkbox"
                  v-model="request.quarterltyClients"
                />
                <label
                  class="fs-8 text-muted form-check-label"
                  for="flexSwitchCheckChecked"
                  >Yes, I bill quarterly on off-cycle months</label
                >
              </div>
            </div>
          </template>

          <template v-if="request.quarterltyClients">
            <div class="d-flex fs-7 mt-10">
              <div class="fw-bolder">What’s your default quarterly cycle?</div>
              <div class="ms-5">
                <i class="fa fa-question-circle fs-4 text-dark"></i>
              </div>
            </div>
            <div class="mt-6 ms-6">
              <SingleSelectionCheckBox
                :data="defaultQuarterlyCycle"
                @update="updateDefaultQuarterltyCycle"
              />
            </div>
          </template>

          <div class="d-flex justify-content-between mt-10">
            <button class="btn btn-secondary" @click="prev">Back</button>
            <button 
              class="btn me-10" 
              :class="{
                'btn-secondary': !formValidation,
                'btn-primary': formValidation,
              }"
              :disabled="!formValidation"
              @click="next"
            >
              Continue
            </button>
          </div>
        </div>
        <div class="tab-content" v-if="frequencyTab == 'One Time'">
          {{ frequencyTab }}
        </div>
        <div class="tab-content" v-if="frequencyTab == 'Subscription'">
          {{ frequencyTab }}
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { Prop } from "vue-property-decorator";

import { frequencyBoardModel } from "@/model";
import MultiSelectCheckBox from "@/components/controls/MultiSelectCheckBox.vue";
import SingleSelectionCheckBox from "@/components/controls/SingleSelectionCheckBox.vue";

@Options({
  components: {
    MultiSelectCheckBox,
    SingleSelectionCheckBox,
  }
})
export default class FrequencyBoard extends Vue {
  @Prop() tabs: Array<string> | any;

  public frequencyTab: string = "";
  public request = new frequencyBoardModel();
  public aumAdvisoryFees: Array<string> = [
    "Monthly",
    "Quarterly",
    "Semi-Annually",
    "Annually",
  ];

  public aumAdvisoryNewAccount: Array<string> = [
    "Monthly",
    "Quarterly",
    "Semi-Annually",
    "Annually",
    "Don't default",
  ];

  public aumAdvisoryArrears: Array<string> = ["Advance", "Arrears"];
  public aumDefaultNewAccounts: Array<string> = [
    "Advance",
    "Arrears",
    "Don't default",
  ];

  public defaultQuarterlyCycle: Array<string> = [
    "Jan-Apr-Jul-Oct",
    "Feb-May-Aug-Nov",
    "Mar-Jun-Seb-Dec",
    "Don't default",
  ];

  created() {
    this.frequencyTab = this.tabs[0];
  }

  prev() {
    this.$emit("prev");
  }

  next() {
    console.log(this.request);
    this.$emit("next");
  }

  updateAumAdvisoryFees(selectedAUM: any) {
    this.request.aumAdvisoryFees = selectedAUM;
    this.aumAdvisoryNewAccount = [];
    this.aumAdvisoryNewAccount = this.aumAdvisoryNewAccount.concat(
      this.request.aumAdvisoryFees
    );

    if(this.aumAdvisoryNewAccount.length > 0 )
      this.aumAdvisoryNewAccount.push("Don't default");
    else
      this.aumAdvisoryNewAccount = ["Monthly",  "Quarterly",  "Semi-Annually",  "Annually", "Don't default"];

    this._sortOrder(this.aumAdvisoryNewAccount);
  }

  updateAumAdvisoryNewAccount(newAccount: any) {
    this.request.aumAdvisoryNewAccount = newAccount;
  }

  updateAumAdvisoryArrears(aumArrears: any) {
    this.request.aumAdvisoryArrears = aumArrears;
    this.aumDefaultNewAccounts = [];
    this.aumDefaultNewAccounts = this.aumDefaultNewAccounts.concat(
      this.request.aumAdvisoryArrears
    );

    if(this.aumDefaultNewAccounts.length > 0)
      this.aumDefaultNewAccounts.push("Don't default");
    else
      this.aumDefaultNewAccounts = ["Advance",  "Arrears",  "Don't default",];
      
    this._sortOrder(this.aumDefaultNewAccounts);
  }

  updateAumDefaultNewAccounts(selectedAccounts: any) {
    this.request.aumDefaultNewAccounts = selectedAccounts;
  }

  updateDefaultQuarterltyCycle(QuarterltyCycle: any) {
    this.request.defaultQuarterltyCycle = QuarterltyCycle;
  }

  get isQuarterlySelected() {
    return this.request.aumAdvisoryFees.includes("Quarterly");
  }

  public _sortOrder(aumNewAccounts: Array<string>) {
    const sortOrder = [
      "Monthly",
      "Quarterly",
      "Semi-Annually",
      "Annually",
      "Advance",
      "Arrears",
      "Don't default",
    ];
    aumNewAccounts.sort((a, b) => {
      return sortOrder.indexOf(a) - sortOrder.indexOf(b);
    });
  }

  get formValidation() {
    let valid = false;

    if(
      this.request.aumAdvisoryFees.length > 0 &&
      this.request.aumAdvisoryNewAccount.length > 0 &&
      this.request.aumAdvisoryArrears.length > 0 &&
      this.request.aumDefaultNewAccounts.length > 0 
    ) {
        valid = true;
        if(this.request.quarterltyClients)
          if(this.request.defaultQuarterltyCycle.length > 0)  valid = true; 
          else valid = false;
    }

    return valid;
  }

}
</script>