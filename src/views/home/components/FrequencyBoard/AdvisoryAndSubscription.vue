<template>
  <div class="tab-content tab-content-lg__scroll mt-10">
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
      <multi-checkBox
        :data="billingFrequency"
        :value="request.billingFrequency"
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
      <single-checkBox
        :data="defaultBillingFrequency"
        :value="request.defaultBillingFrequency"
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
      <multi-checkBox
        :data="billingMethod"
        :value="request.billingMethod"
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
      <single-checkBox
        :data="defaultBillingMethod"
        :value="request.defaultBillingMethod"
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
              !request.offsetCycleFlag ? (request.defaultOffsetCycle = '') : ''
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
        <div class="fw-bolder">What’s your default quarterly cycle?</div>
        <div class="ms-5">
          <i class="fa fa-question-circle fs-4 text-dark"></i>
        </div>
      </div>
      <div class="mt-6 ms-6">
        <single-checkBox
          :data="defaultOffsetCycle"
          :value="request.defaultOffsetCycle"
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
<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { Prop, Inject } from "vue-property-decorator";

import { useStore } from "vuex";

import { IFirmService } from "@/service";
import { firmRequestModel, frequencyRequestModel } from "@/model";

import MultiCheckBox from "@/components/controls/MultiCheckBox.vue";
import SingleCheckBox from "@/components/controls/SingleCheckBox.vue";

@Options({
  components: {
    MultiCheckBox,
    SingleCheckBox,
  },
})
export default class AdvisoryAndSubscription extends Vue {
  @Inject("firmService") service: IFirmService | undefined;
  @Prop() billingType: string | any;
  @Prop() previousTab: string | any;
  @Prop() nextTab: string | any;

  public store = useStore();
  public request = new frequencyRequestModel();

  public billingFrequency: Array<string> = [
    "Monthly",
    "Quarterly",
    "Semi-Annually",
    "Annually",
  ];

  public defaultBillingFrequency: Array<string> = [
    "Monthly",
    "Quarterly",
    "Semi-Annually",
    "Annually",
    "Don't default",
  ];

  public billingMethod: Array<string> = ["Advance", "Arrears"];
  public defaultBillingMethod: Array<string> = [
    "Advance",
    "Arrears",
    "Don't default",
  ];

  public defaultOffsetCycle: Array<string> = [
    "Jan-Apr-Jul-Oct",
    "Feb-May-Aug-Nov",
    "Mar-Jun-Seb-Dec",
    "Don't default",
  ];

  created() {
    this.getFrequncyAndTiming();
  }

  private getFrequncyAndTiming() {
    const request = new firmRequestModel();
    request.billingType = this.billingType;
    request.firmId = this.store.getters.selectedFirmId;
    this.service
      ?.getFrequencyAndTiming(request)
      .then((response) => {
        this.request = response;
        this.request.billingType = this.billingType;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  public saveFrequncyAndTiming() {
    console.log(this.request);
    this.request.billingType = this.billingType;
    this.request.firmId = this.store.getters.selectedFirmId;
    this.request.payorType = "Investor Client";
    this.request.feeTypeCode = "CF";

    this.service
      ?.saveFrequncyAndTiming(this.request)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });

    this.$emit("next", this.nextTab);
  }

  updatebillingFrequency(billingFrequency: string[]) {
    this.request.billingFrequency = billingFrequency;
    this.defaultBillingFrequency = [];
    this.defaultBillingFrequency = this.defaultBillingFrequency.concat(
      this.request.billingFrequency
    );

    if (this.defaultBillingFrequency.length > 0)
      this.defaultBillingFrequency.push("Don't default");
    else
      this.defaultBillingFrequency = [
        "Monthly",
        "Quarterly",
        "Semi-Annually",
        "Annually",
        "Don't default",
      ];

    this._sortOrder(this.defaultBillingFrequency);
  }

  updateDefaultBillingFrequency(defaultBillingFrequency: string) {
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

  private _sortOrder(value: Array<string>) {
    const sortOrder = [
      "Monthly",
      "Quarterly",
      "Semi-Annually",
      "Annually",
      "Advance",
      "Arrears",
      "Don't default",
    ];
    value.sort((a, b) => {
      return sortOrder.indexOf(a) - sortOrder.indexOf(b);
    });
  }

  public prev() {
    this.$emit("prev", this.previousTab);
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