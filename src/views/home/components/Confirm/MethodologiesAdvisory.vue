<template>
  <div class="tab-content mt-10">
    <div class="row pb-8 g-0">
      <div class="col-lg-8 fw-bolder">
        What valuation methodologies do you use for AUM advisory billing?
      </div>
      <div class="col-lg-4 fw-bold">
        {{$filters.filterArray(valuationMethod).join(', ')}}
      </div>
    </div>

    <div class="row pb-8 g-0">
      <div class="col-lg-8 fw-bolder">
        What valuation methodology do you want default for new accounts?
      </div>
      <div class="col-lg-4 fw-bold">
        <span v-for="(data, i) in defaultValuationMethod" :key="i">
          <template v-if="data.selected">
            {{ data.text }}
          </template>
        </span>
      </div>
    </div>

    <div class="row pb-8 g-0">
      <div class="col-lg-8 fw-bolder">
        What valuation date do you use for initial billing of advance fees?
      </div>
      <div class="col-lg-4 fw-bold">
        <span v-for="(data, i) in initialBillingValuationMethod" :key="i">
          <template v-if="data.selected">
            {{ data.text }}
          </template>
        </span>
      </div>
    </div>

    <div class="row pb-8 g-0">
      <div class="col-lg-8 fw-bolder">
        How do you prorate your annualized rates for the billing period?
      </div>
      <div class="col-lg-4 fw-bold">
        <span v-for="(data, i) in defaultProrationMethod" :key="i">
          <template v-if="data.selected">
            {{ data.text }}
          </template>
        </span>
      </div>
    </div>

    <div class="row pb-8 g-0">
      <div class="col-lg-8 fw-bolder">
        How would you like to express your billing rates?
      </div>
      <div class="col-lg-4 fw-bold">
        <span v-for="(data, i) in expressRatesAs" :key="i">
          <template v-if="data.selected">
            {{ data.text }}
          </template>
        </span>
      </div>
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
  
}
</script>