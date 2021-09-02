<template>
  <div class="tab-content mt-10">
    <div class="row pb-8 g-0">
      <div class="col-lg-8 fw-bolder">
        What valuation methodologies do you use for AUM advisory billing?
      </div>
      <div class="col-lg-4 fw-bold" v-if="!showValuationMethod">
        <span v-for="(data, i) in valuationMethod" :key="i">
          <template v-if="data.selected">
            {{ data.text.concat(", ") }}
          </template>
        </span>
        <i
          class="fa fa-solid fa-pen text-primary ms-4"
          @click="showValuationMethod = true"
        ></i>
      </div>
    </div>
    <div class="ms-2 pb-8" v-if="showValuationMethod">
      <multi-checkBox :data="valuationMethod" @update="updateValuationMethod" />
      <i
        class="fa fa-check text-primary ms-4"
        @click="
          showValuationMethod = false;
          saveMethodologies();
        "
      ></i>
    </div>

    <div class="row pb-8 g-0">
      <div class="col-lg-8 fw-bolder">
        What valuation methodology do you want default for new accounts?
      </div>
      <div class="col-lg-4 fw-bold" v-if="!showDefaultValuationMethod">
        <span v-for="(data, i) in defaultValuationMethod" :key="i">
          <template v-if="data.selected">
            {{ data.text }}
          </template>
        </span>
        <i
          class="fa fa-solid fa-pen text-primary ms-4"
          @click="showDefaultValuationMethod = true"
        ></i>
      </div>
    </div>
    <div class="ms-2 pb-8" v-if="showDefaultValuationMethod">
      <single-checkBox
        :data="defaultValuationMethod"
        :value="request.defaultValuationMethod"
        @update="updateDefaultValuationMethod"
      />
      <i
        class="fa fa-check text-primary ms-4"
        @click="
          showDefaultValuationMethod = false;
          saveMethodologies();
        "
      ></i>
    </div>

    <div class="row pb-8 g-0">
      <div class="col-lg-8 fw-bolder">
        What valuation date do you use for initial billing of advance fees?
      </div>
      <div class="col-lg-4 fw-bold" v-if="!showInitialBillingValuationMethod">
        <span v-for="(data, i) in initialBillingValuationMethod" :key="i">
          <template v-if="data.selected">
            {{ data.text }}
          </template>
        </span>
        <i
          class="fa fa-solid fa-pen text-primary ms-4"
          @click="showInitialBillingValuationMethod = true"
        ></i>
      </div>
    </div>
    <div class="ms-2 pb-8" v-if="showInitialBillingValuationMethod">
      <single-checkBox
        :data="initialBillingValuationMethod"
        :value="request.initialBillingValuationMethod"
        @update="updateInitialBillingValuationMethod"
      />
      <i
        class="fa fa-check text-primary ms-4"
        @click="
          showInitialBillingValuationMethod = false;
          saveMethodologies();
        "
      ></i>
    </div>

    <div class="row pb-8 g-0">
      <div class="col-lg-8 fw-bolder">
        How do you prorate your annualized rates for the billing period?
      </div>
      <div class="col-lg-4 fw-bold" v-if="!showDefaultProrationMethod">
        <span v-for="(data, i) in defaultProrationMethod" :key="i">
          <template v-if="data.selected">
            {{ data.text }}
          </template>
        </span>
        <i
          class="fa fa-solid fa-pen text-primary ms-4"
          @click="showDefaultProrationMethod = true"
        ></i>
      </div>
    </div>
    <div class="ms-2 pb-8" v-if="showDefaultProrationMethod">
      <single-checkBox
        :data="defaultProrationMethod"
        :value="request.defaultProrationMethod"
        @update="updateDefaultProrationMethod"
      />
      <i
        class="fa fa-check text-primary ms-4"
        @click="
          showDefaultProrationMethod = false;
          saveMethodologies();
        "
      ></i>
    </div>

    <div class="row pb-8 g-0">
      <div class="col-lg-8 fw-bolder">
        How would you like to express your billing rates?
      </div>
      <div class="col-lg-4 fw-bold" v-if="!showExpressRatesAs">
        <span v-for="(data, i) in expressRatesAs" :key="i">
          <template v-if="data.selected">
            {{ data.text }}
          </template>
        </span>
        <i
          class="fa fa-solid fa-pen text-primary ms-4"
          @click="showExpressRatesAs = true"
        ></i>
      </div>
    </div>
    <div class="ms-2 pb-8" v-if="showExpressRatesAs">
      <single-checkBox
        :data="expressRatesAs"
        :value="request.expressRatesAs"
        @update="updateExpressRatesAs"
      />
      <i
        class="fa fa-check text-primary ms-4"
        @click="
          showExpressRatesAs = false;
          saveMethodologies();
        "
      ></i>
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
export default class MethodologiesAdvisory extends Vue {
  @Inject("firmService") service: IFirmService;
  @Prop() response: aumFeeTypes;

  public store = useStore();
  public request: aumDetails = new aumDetails();

  public valuationMethod: Array<ListItem> = [];
  public defaultValuationMethod: Array<ListItem> = [];
  public initialBillingValuationMethod: Array<ListItem> = [];
  public defaultProrationMethod: Array<ListItem> = [];
  public expressRatesAs: Array<ListItem> = [];

  public showValuationMethod: boolean = false;
  public showDefaultValuationMethod: boolean = false;
  public showInitialBillingValuationMethod: boolean = false;
  public showDefaultProrationMethod: boolean = false;
  public showExpressRatesAs: boolean = false;

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
    console.log(this.request);
  }

  public saveMethodologies() {
    if (this.formValidation) {
      this.request.firmId = this.store.getters.selectedFirmId;
      this.request.feeTypeName = this.response.feeTypeName;
      this.request.onboardingFeeTypeId = this.response.id;
      this.request.aumFeeTypeFlag = this.response.aumFlag;

      this.service
        ?.saveMethodologies(this.request)
        .then((response) => {
          if (response.status == "SUCCESS") this.$emit("next");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  public updateValuationMethod(valuationMethod: Array<ListItem>) {
    this.request.valuationMethod = [];
    this.defaultValuationMethod = [];

    valuationMethod.forEach((item) => {
      if (item.selected) {
        this.request.valuationMethod.push(item.value);
        const data = new ListItem(item.text, item.value);
        if (this.request.defaultValuationMethod == item.value)
          data.selected = true;
        this.defaultValuationMethod.push(data);
      }
    });

    this.defaultValuationMethod.forEach((item: ListItem) => {
      if (item.value != this.request.defaultValuationMethod)
        this.request.defaultValuationMethod = "";
    });

    if (this.request.valuationMethod.length == 0)
      this.defaultValuationMethod = Object.entries(defaultValuationMethod).map(
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
      this.defaultValuationMethod.push(new ListItem("Don't Default", "NONE"));
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
    this.$emit("prev");
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