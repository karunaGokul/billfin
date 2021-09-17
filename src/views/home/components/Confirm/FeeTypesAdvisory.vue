<template>
  <div class="tab-content border-bottom">
    <div class="mt-5">
      <p class="fs-3 text-center fw-bolder pb-3 mb-5 border-bottom">
        Fee Types
      </p>

      <div class="ps-4 pe-4">
        <div class="row pb-8 g-0">
          <div class="col-lg-9 fw-bolder">
            What billing do you wish to setup?
          </div>
          <div class="col-lg-3">
            {{$filters.filterArray(billingTypes).join(', ')}}
          </div>
        </div>

        <template v-if="showAUMAdvisory">
          <div class="row pb-8 g-0">  
            <div class="col-lg-9 fw-bolder">
              For your AUM-based advisory billing,which fees do you bill?
            </div>
            <div class="col-lg-3">
              {{$filters.filterFeeTypes(aumFeeTypes).join(', ')}}
            </div>
          </div>
        </template>

        <!--<template v-if="showAUMAdvisoryFees.length > 1">
          <div class="row pb-8 g-0">
            <div class="col-lg-9 fw-bolder">
              Do you bill your various AUM fees on different frequencies and/or
              timing relative to each other?
            </div>
            <div class="col-lg-3 fw-bold">
              {{
                request.aumFeeTypes.commonFrequencyTimingFlag
                  ? "Yes, my AUM-based fees can bill on different frequencies and/or timing relative to each other."
                  : "No, my AUM-based fees cannot bill on different frequencies and/or timing relative to each other."
              }}
            </div>
          </div>

          <div class="row pb-8 g-0">
            <div class="col-lg-9 fw-bolder">
              Do you bill your various AUM fees based on different assest
              methodologies relative to each other?
            </div>
            <div class="col-lg-3 fw-bold">
              {{
                request.aumFeeTypes.commonAssetMethodologyFlag
                  ? "Yes, my AUM-based fees can bill based on different assest methodologies relative to each other."
                  : "No, my AUM-based fees cannot bill based on different assest methodologies relative to each other."
              }}
            </div>
          </div>
        </template> -->

        <template v-if="showNonAUMAdvisory">
          <div class="row pb-8 g-0">
            <div class="col-lg-9 fw-bolder">
              For your non-AUM subscription billing,which fees do you bill?
            </div>
            <div class="col-lg-3">
              {{$filters.filterFeeTypes(nonAUMFeeTypes).join(', ')}}
            </div>
          </div>
        </template>

       <!-- <template v-if="showNonAUMAdvisoryFees.length > 1">
          <div class="row pb-8 g-0">
            <div class="col-lg-9 fw-bolder">
              Do you bill your various non-AUM fees on different frequencies
              and/or timing relative to each other?
            </div>
            <div class="col-lg-3 fw-bold">
              {{
                request.aumFeeTypes.commonFrequencyTimingFlag
                  ? "Yes, my non-AUM fees can bill on different frequencies and/or timing relative to each other."
                  : "No, my non-AUM fees cannot bill on different frequencies and/or timing relative to each other."
              }}
            </div>
          </div>
        </template> -->
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { Inject } from "vue-property-decorator";

import { useStore } from "vuex";

import { IFirmService } from "@/service";
import {
  firmRequestModel,
  BillingTypes,
  feeTypes,
  feeTypesRequestModel,
  ListItem,
} from "@/model";

import MultiCheckBox from "@/components/controls/MultiCheckBox.vue";
import SelectBox from "@/components/controls/SelectBox.vue";

@Options({
  components: {
    MultiCheckBox,
    SelectBox,
  },
})
export default class FeeTypesAdvisory extends Vue {
  @Inject("firmService") service: IFirmService;

  public request = new feeTypesRequestModel();

  public store = useStore();

  public billingTypes: Array<ListItem> = [];
  public aumFeeTypes: Array<feeTypes> = [];
  public nonAUMFeeTypes: Array<feeTypes> = [];

  created() {
    this.billingTypes = Object.entries(BillingTypes).map(
      ([key]) =>
        new ListItem(key, BillingTypes[key as keyof typeof BillingTypes])
    );
    this.getFeeType();
  }

  private getFeeType() {
    this.service.getFeeType().then((response) => {
      response.map((item) => {
        if (item.aumFlag) this.aumFeeTypes.push(item);
        else this.nonAUMFeeTypes.push(item);
      });
      this.getFeeTypesSetup();
    });
  }

  private getFeeTypesSetup() {
    const request = new firmRequestModel();
    request.firmId = this.store.getters.selectedFirmId;
    this.service.getFeeTypesSetup(request).then((response) => {
      this.request.billingType = response.billingType;
      this.bindValues(response);
    });
  }

  private bindValues(response: feeTypesRequestModel) {
    this.billingTypes.forEach((item) => {
      if (response.billingType.includes(item.value)) item.selected = true;
    });

    if (response.aumFeeTypes) {
      this.request.aumFeeTypes = response.aumFeeTypes;
      response.aumFeeTypes.feeTypes.forEach((item) => {
        this.aumFeeTypes.forEach((data) => {
          if (item.feeTypeCode == data.feeTypeCode) {
            data.selected = true;
            data.feeTypeName = item.feeTypeName;
          }
        });
      });
    }

    if (response.nonAUMFeeTypes) {
      this.request.nonAUMFeeTypes = response.nonAUMFeeTypes;
      response.nonAUMFeeTypes.feeTypes.forEach((item) => {
        this.nonAUMFeeTypes.forEach((data) => {
          if (item.feeTypeCode == data.feeTypeCode) {
            data.selected = true;
            data.feeTypeName = item.feeTypeName;
          }
        });
      });
    }
  }

  get showAUMAdvisory() {
    return this.request.billingType.includes("AUM");
  }

  get showNonAUMAdvisory() {
    return this.request.billingType.includes("NON-AUM");
  }

  get showAUMAdvisoryFees() {
    const data: Array<string> = this.aumFeeTypes.reduce(
      (a, o) => (o.selected && a.push(o.feeTypeName), a),
      []
    );
    return data;
  }

  get showNonAUMAdvisoryFees() {
    const data: Array<string> = this.nonAUMFeeTypes.reduce(
      (a, o) => (o.selected && a.push(o.feeTypeName), a),
      []
    );
    return data;
  }

}
</script>