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
        <template v-for="(tab, index) in tabs" :key="index">
          <div
            class="tab-content tab-content-lg__scroll mt-10"
            v-if="frequencyTab == tab"
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
                :data="billingFrequency"
                @update="updatebillingFrequency"
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
                @update="updateDefaultBillingFrequency"
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
                @update="updateBillingMethod"
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
                :data="defaultBillingMethod"
                @update="updateDefaultBillingMethod"
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
                    v-model="request.offsetCycleFlag"
                    @change="
                      !request.offsetCycleFlag
                        ? (request.defaultOffsetCycle = '')
                        : ''
                    "
                  />
                  <label
                    class="fs-8 text-muted form-check-label"
                    for="flexSwitchCheckChecked"
                    >Yes, I bill quarterly on off-cycle months</label
                  >
                </div>
              </div>
            </template>

            <template v-if="request.offsetCycleFlag">
              <div class="d-flex fs-7 mt-10">
                <div class="fw-bolder">
                  What’s your default quarterly cycle?
                </div>
                <div class="ms-5">
                  <i class="fa fa-question-circle fs-4 text-dark"></i>
                </div>
              </div>
              <div class="mt-6 ms-6">
                <SingleSelectionCheckBox
                  :data="defaultQuarterlyCycle"
                  @update="updateDefaultOffsetCycle"
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
                @click="saveFrequncyAndTiming"
              >
                Continue
              </button>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { Prop, Inject } from "vue-property-decorator";

import { useStore } from "vuex";

import { IFirmService } from "@/service";
import { firmRequestModel, frequencyRequestModel } from "@/model";

import MultiSelectCheckBox from "@/components/controls/MultiSelectCheckBox.vue";
import SingleSelectionCheckBox from "@/components/controls/SingleSelectionCheckBox.vue";
import { required } from "@vuelidate/validators";

@Options({
  components: {
    MultiSelectCheckBox,
    SingleSelectionCheckBox,
  },
})
export default class FrequencyBoard extends Vue {
  @Inject("firmService") service: IFirmService | undefined;

  @Prop() tabs: Array<string> | any;

  public frequencyTab: string = "";
  public request = new frequencyRequestModel();
  public billingFrequency: Array<string> = [
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
  public defaultBillingMethod: Array<string> = [
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

  public store = useStore();

  created() {
    this.frequencyTab = this.tabs[0];
    this.getFrequncyAndTiming();
  }

  prev() {
    this.$emit("prev");
  }

  updatebillingFrequency(billingFrequency: string[]) {
    this.request.billingFrequency = billingFrequency;
    this.aumAdvisoryNewAccount = [];
    this.aumAdvisoryNewAccount = this.aumAdvisoryNewAccount.concat(
      this.request.billingFrequency
    );

    if (this.aumAdvisoryNewAccount.length > 0)
      this.aumAdvisoryNewAccount.push("Don't default");
    else
      this.aumAdvisoryNewAccount = [
        "Monthly",
        "Quarterly",
        "Semi-Annually",
        "Annually",
        "Don't default",
      ];

    this._sortOrder(this.aumAdvisoryNewAccount);
  }

  updateDefaultBillingFrequency(defaultBillingFrequency: string) {
    console.log(defaultBillingFrequency);
    this.request.defaultBillingFrequency = defaultBillingFrequency;
  }

  updateBillingMethod(billingMethod: string[]) {
    this.request.billingMethod = billingMethod;
    this.defaultBillingMethod = [];
    this.defaultBillingMethod = this.defaultBillingMethod.concat(
      this.request.billingMethod
    );

    if (this.defaultBillingMethod.length > 0)
      this.defaultBillingMethod.push("Don't default");
    else this.defaultBillingMethod = ["Advance", "Arrears", "Don't default"];

    this._sortOrder(this.defaultBillingMethod);
  }

  updateDefaultBillingMethod(defaultBillingMethod: string) {
    this.request.defaultBillingMethod = defaultBillingMethod;
  }

  updateDefaultOffsetCycle(defaultOffsetCycle: string) {
    this.request.defaultOffsetCycle = defaultOffsetCycle;
  }

  private getFrequncyAndTiming() {
    const request = new firmRequestModel();
    request.firmId = this.store.getters.selectedFirmId;
    request.billingType = this.frequencyTab;
    this.service
      ?.getFrequencyAndTiming(request)
      .then((response) => {
        this.request = response;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  public saveFrequncyAndTiming() {

    this.request.firmId = this.store.getters.selectedFirmId;
    this.request.payorType = "Investor Client";
    this.request.billingType = this.frequencyTab;
    this.request.feeTypeCode = "CF";

    this.service
      ?.saveFrequncyAndTiming(this.request)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });

      this.$emit("controlTabs", this.tabs);
      this.$emit("next");
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

  get isQuarterlySelected() {
    return this.request.billingFrequency.includes("Quarterly");
  }

  get formValidation() {
    let valid = false;

    if (
      this.request.billingFrequency.length > 0 &&
      this.request.billingMethod.length > 0 &&
      this.request.defaultBillingFrequency &&
      this.request.defaultBillingMethod
    ) {
      valid = true;
      if (this.request.offsetCycleFlag)
        if (this.request.defaultOffsetCycle) valid = true;
        else valid = false;
    }

    return valid;
  }
}
</script>