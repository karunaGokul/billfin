<template>
  <div class="tab-content tab-content-lg__scroll overflow-auto mt-4">
    <div class="d-flex fs-7 mt-10">
      <div class="fw-bolder">
        What valuation methodologies do you use for AUM advisory billing?
      </div>
      <div class="text-muted ms-4">Check all that apply</div>
      <div class="ms-5">
        <i class="fa fa-question-circle fs-4 text-dark"></i>
      </div>
    </div>
    <div class="mt-6 ms-6">
      <multi-checkBox :data="valuationMethod" @update="updateValuationMethod" />
    </div>

    <div class="d-flex fs-7 mt-10">
      <div class="fw-bolder">
        What valuation methodology do you want to default for new accounts?
      </div>
      <div class="ms-5">
        <i class="fa fa-question-circle fs-4 text-dark"></i>
      </div>
    </div>
    <div class="mt-6 ms-6">
      <single-checkBox
        :data="defaultValuationMethod"
        :value="request.defaultValuationMethod"
        @update="updateDefaultValuationMethod"
      />
    </div>

    <div class="d-flex fs-7 mt-10">
      <div class="fw-bolder">
        What valuation date do you use for initial billing of advance fees?
      </div>
      <div class="ms-5">
        <i class="fa fa-question-circle fs-4 text-dark"></i>
      </div>
    </div>
    <div class="mt-6 ms-6">
      <single-checkBox
        :data="initialBillingValuationMethod"
        :value="request.initialBillingValuationMethod"
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
      <single-checkBox
        :data="defaultProrationMethod"
        :value="request.defaultProrationMethod"
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
      <single-checkBox
        :data="expressRatesAs"
        :value="request.expressRatesAs"
        @update="updateExpressRatesAs"
      />
    </div>

    <div class="d-flex justify-content-between mt-10 mb-5">
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
</template>
<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { Prop, Inject, Watch } from "vue-property-decorator";

import { useStore } from "vuex";

import { IFirmService } from "@/service";
import {
  aumDetails,
  aumFeeTypes,
  ValuationMethodType,
  defaultValuationMethod,
  initialBillingValuationMethod,
  ProrationMethodType,
  expressRatesAs,
  ListItem,
} from "@/model";

import MultiCheckBox from "@/components/controls/MultiCheckBox.vue";
import SingleCheckBox from "@/components/controls/SingleCheckBox.vue";

@Options({
  components: {
    MultiCheckBox,
    SingleCheckBox,
  },
})
export default class Advisory extends Vue {
  @Inject("firmService") service: IFirmService;
  @Prop() response: aumFeeTypes;
  @Prop() prevNext: number;
  @Prop() isBinding: boolean;

  public store = useStore();
  public request: aumDetails = new aumDetails();
  
  public valuationMethod: Array<ListItem> = [];
  public defaultValuationMethod: Array<ListItem> = [];
  public initialBillingValuationMethod: Array<ListItem> = [];
  public defaultProrationMethod: Array<ListItem> = [];
  public expressRatesAs: Array<ListItem> = [];

  created() {
    this.valuationMethod = Object.entries(ValuationMethodType).map(
      ([key]) =>
        new ListItem(
          key,
          ValuationMethodType[key as keyof typeof ValuationMethodType]
        )
    );

    this.defaultValuationMethod = Object.entries(defaultValuationMethod).map(
      ([key]) =>
        new ListItem(
          key,
          defaultValuationMethod[key as keyof typeof defaultValuationMethod]
        )
    );
    this.initialBillingValuationMethod = Object.entries(
      initialBillingValuationMethod
    ).map(
      ([key]) =>
        new ListItem(
          key,
          initialBillingValuationMethod[
            key as keyof typeof initialBillingValuationMethod
          ]
        )
    );
    this.defaultProrationMethod = Object.entries(ProrationMethodType).map(
      ([key]) =>
        new ListItem(
          key,
          ProrationMethodType[key as keyof typeof ProrationMethodType]
        )
    );
    this.expressRatesAs = Object.entries(expressRatesAs).map(
      ([key]) =>
        new ListItem(key, expressRatesAs[key as keyof typeof expressRatesAs])
    );
  }

  mounted() {
    this.getMethodologies();
  }

  @Watch("response")
  private getMethodologies() {
    if (this.response.aumDetails) {
      this.request = this.response.aumDetails;
      this.bindValues(this.response.aumDetails);
    } else {
      this.request = new aumDetails();
      this.bindValues(this.request);
    }
  }

  public saveMethodologies() {
    this.request.firmId = this.store.getters.selectedFirmId;
    this.request.feeTypeName = this.response.feeTypeName;
    this.request.onboardingFeeTypeId = this.response.id;
    this.request.aumFeeTypeFlag = this.response.aumFlag;

    this.service
      ?.saveMethodologies(this.request)
      .then((response) => {
        if (response.status == "SUCCESS") this.$emit("next", {response: response, index: this.prevNext, isBinding: false});
      })
      .catch((err) => {
        console.log(err);
      });
  }

  public updateValuationMethod(valuationMethod: Array<ListItem>) {
    this.request.valuationMethod = [];
    this.defaultValuationMethod = [];
    this.request.defaultValuationMethod = '';

    valuationMethod.forEach((item) => {
      if (item.selected) {
        this.request.valuationMethod.push(item.value);
        const data = new ListItem(item.text, item.value);
        if (this.request.defaultValuationMethod == item.value)
          data.selected = true;
        this.defaultValuationMethod.push(data);
      }
    });

    this.defaultValuationMethod.push(new ListItem("Don't Default", "NONE"));

    if (this.request.valuationMethod.length == 0) {
      this.defaultValuationMethod = [];
      this.defaultValuationMethod = Object.entries(defaultValuationMethod).map(
        ([key]) =>
          new ListItem(
            key,
            defaultValuationMethod[key as keyof typeof defaultValuationMethod]
          )
      );
    }

    if (this.request.valuationMethod.length == 1) {
      this.defaultValuationMethod.forEach((item: ListItem) => {
        if(this.request.valuationMethod.includes(item.value)) {
          item.selected = true;
          this.request.defaultValuationMethod = item.value;
        }
      });
    } 
  }

  public updateDefaultValuationMethod(defaultValuationMethod: string) {
    this.request.defaultValuationMethod = defaultValuationMethod;
  }

  public updateInitialBillingValuationMethod(
    initialBillingValuationMethod: string
  ) {
    this.request.initialBillingValuationMethod = initialBillingValuationMethod;
  }

  public updateDefaultProrationMethod(defaultProrationMethod: string) {
    this.request.defaultProrationMethod = defaultProrationMethod;
  }

  public updateExpressRatesAs(expressRatesAs: string) {
    this.request.expressRatesAs = expressRatesAs;
  }

  private bindValues(response: aumDetails) {
    this.defaultValuationMethod = [];
    this.valuationMethod.forEach((item) => {
      if (
        response.valuationMethod &&
        response.valuationMethod.includes(item.value)
      ) {
        item.selected = true;
        this.defaultValuationMethod.push(new ListItem(item.text, item.value));
      } else item.selected = false;
    });

    if (this.defaultValuationMethod.length == 0)
      this.defaultValuationMethod = Object.entries(defaultValuationMethod).map(
        ([key]) =>
          new ListItem(
            key,
            defaultValuationMethod[key as keyof typeof defaultValuationMethod]
          )
      );
    else
      this.defaultValuationMethod.push(new ListItem("Don't Default", "NONE"));

    this.defaultValuationMethod.forEach((item) => {
      if (
        response.defaultValuationMethod &&
        response.defaultValuationMethod == item.value
      )
        item.selected = true;
      else item.selected = false;
    });

    this.initialBillingValuationMethod.forEach((item) => {
      if (
        response.initialBillingValuationMethod &&
        response.initialBillingValuationMethod == item.value
      )
        item.selected = true;
      else item.selected = false;
    });

    this.defaultProrationMethod.forEach((item) => {
      if (
        response.defaultProrationMethod &&
        response.defaultProrationMethod == item.value
      )
        item.selected = true;
      else item.selected = false;
    });

    this.expressRatesAs.forEach((item) => {
      if (response.expressRatesAs && response.expressRatesAs == item.value)
        item.selected = true;
      else item.selected = false;
    });
  }

  public prev() {
    this.$emit("prev", {index: this.prevNext, isBinding: this.isBinding});
  }

  get formValidation() {
    let valid = false;

    if (
      this.request.valuationMethod &&
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