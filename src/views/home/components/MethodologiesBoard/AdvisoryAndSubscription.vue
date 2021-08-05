<template>
  <div class="tab-content tab-content-lg__scroll mt-10">
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
      <multi-checkBox
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
</template>
<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { Prop, Inject } from "vue-property-decorator";

import { useStore } from "vuex";

import { IFirmService } from "@/service";
import {
  firmRequestModel,
  methodologiesRequestModel,

  ValuationMethodType,
  defaultValuationMethod,
  initialBillingValuationMethod,
  ProrationMethodType,
  expressRatesAs,
  PayorType,
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
export default class AdvisoryAndSubscription extends Vue {
  @Inject("firmService") service: IFirmService | undefined;
  @Prop() billingType: string | any;
  @Prop() previousTab: string | any;
  @Prop() nextTab: string | any;

  public store = useStore();
  public request = new methodologiesRequestModel();

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
    this.initialBillingValuationMethod = Object.entries(initialBillingValuationMethod).map(
      ([key]) =>
        new ListItem(
          key,
          initialBillingValuationMethod[key as keyof typeof initialBillingValuationMethod]
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
        new ListItem(
          key,
          expressRatesAs[key as keyof typeof expressRatesAs]
        )
    );
  }

  mounted() {
    this.getMethodologies();
  }

  private getMethodologies() {
    const request = new firmRequestModel();
    request.billingType = this.billingType;
    request.firmId = this.store.getters.selectedFirmId;

    this.service
      ?.getMethodologies(request)
      .then((response) => {
        this.request.valuationMethod = response.valuationMethod;
        this.request.defaultValuationMethod = this.nullCheck(response.defaultValuationMethod);
        this.request.initialBillingValuationMethod = this.nullCheck(response.initialBillingValuationMethod);
        this.request.defaultProrationMethod = this.nullCheck(response.defaultProrationMethod);
        this.request.expressRatesAs = this.nullCheck(response.expressRatesAs);
        this.bindValues(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  public saveMethodologies() {
    this.request.firmId = this.store.getters.selectedFirmId;
    this.request.payorType = PayorType.INVESTOR_CLIENT;
    this.request.billingType = this.billingType;
    this.request.feeTypeCode = "CF";

    this.service
      ?.saveMethodologies(this.request)
      .then((response) => {
        //console.log(response);
        this.$emit("next", this.nextTab);
      })
      .catch((err) => {
        console.log(err);
      });
    
  }

  public updateValuationMethod(valuationMethod: any[]) {
    this.request.valuationMethod = [];
    this.defaultValuationMethod = [];

    for(var i in valuationMethod) {
      if(valuationMethod[i].selected) {
        this.request.valuationMethod.push(valuationMethod[i].value);
        const item = new ListItem(
          valuationMethod[i].text,
          valuationMethod[i].value
        );
        if(this.request.defaultValuationMethod == valuationMethod[i].value) item.selected = true;
        this.defaultValuationMethod.push(item);
      }
    }

    if (this.request.valuationMethod.length == 0)
      this.defaultValuationMethod = Object.entries(
        defaultValuationMethod
      ).map(
        ([key]) =>
          new ListItem(
            key,
            defaultValuationMethod[key as keyof typeof defaultValuationMethod]
          )
      );

    if (
      !this.defaultValuationMethod.some((item) => {
        return item.text == "Don't Default";
      })
    )
      this.defaultValuationMethod.push(
        new ListItem("Don't Default", "DONT_DEFAULT")
      );
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

  private bindValues(response: methodologiesRequestModel) {
    this.defaultValuationMethod = [];
    this.valuationMethod.forEach((item) => {
      if (response.valuationMethod && response.valuationMethod.includes(item.value)) {
        item.selected = true;
        this.defaultValuationMethod.push(new ListItem(item.text, item.value));
      }
    });

    if(this.defaultValuationMethod.length == 0)
    this.defaultValuationMethod = Object.entries(defaultValuationMethod).map(
      ([key]) =>
        new ListItem(
          key,
          defaultValuationMethod[key as keyof typeof defaultValuationMethod]
        )
    );
    else 
      this.defaultValuationMethod.push(
      new ListItem("Don't Default", "DONT_DEFAULT")
    );

    this.defaultValuationMethod.forEach((item) => {
      if (response.defaultValuationMethod && response.defaultValuationMethod == item.value) item.selected = true;
    });

    this.initialBillingValuationMethod.forEach((item) => {
      if (response.initialBillingValuationMethod && response.initialBillingValuationMethod == item.value) item.selected = true;
    });

    this.defaultProrationMethod.forEach((item) => {
      if (response.defaultProrationMethod && response.defaultProrationMethod == item.value) item.selected = true;
    });

    this.expressRatesAs.forEach((item) => {
      if (response.expressRatesAs && response.expressRatesAs == item.value) item.selected = true;
    });
  }

  public _sortOrder(defaultValuationMethod: Array<string>) {
    const sortOrder = ["Period End", "Average Daily Balance", "Don't default"];
    defaultValuationMethod.sort((a, b) => {
      return sortOrder.indexOf(a) - sortOrder.indexOf(b);
    });
  }

  public nullCheck(value: any) {
    return value ? value : "";
  }

  public prev() {
    this.$emit("prev", this.previousTab);
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