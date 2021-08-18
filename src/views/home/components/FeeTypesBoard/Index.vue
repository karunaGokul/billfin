<template>
  <div class="tab-content tab-content-sm__scroll border-bottom">
    <div class="mt-5">
      <p class="fs-3 fw-bolder pb-3 mb-5 border-bottom">
        Fee Types
        <i class="fa fa-question-circle fs-4 text-dark ms-4"></i>
      </p>

      <div class="row g-0">
        <div class="col-lg-5">
          <div class="fw-bolder">What billing do you wish to setup?</div>
          <div class="text-muted fs-8">Check all that apply</div>
        </div>
        <div class="col-lg-7">
          <multi-checkBox :data="billingType" @update="updateBillingTypes" />
        </div>
      </div>

      <template v-if="showAUMAdvisory">
        <div class="fw-bolder mt-10">
          For your AUM-based advisory billing,which fees do you bill? Feel free
          to edit descriptions as needed
          <i class="fa fa-question-circle fs-4 text-dark ms-4"></i>
        </div>

        <div class="d-flex mt-5 flex-wrap justify-content-between">
          <div class="m-3" v-for="(item, index) in aumFeeTypes" :key="index">
            <div class="d-flex align-items-center">
              <div class="form-check form-check-solid form-check-inline fs-7">
                <input
                  class="form-check-input"
                  type="checkbox"
                  v-model="item.selected"
                />
              </div>
              <div class="input-group input-group-solid mb-2">
                <input
                  type="text"
                  class="form-control text-start"
                  style="width: 280px"
                  v-model="item.feeTypeName"
                />
              </div>
            </div>
          </div>
        </div>
      </template>

      <template v-if="showAUMAdvisoryFees.length > 1">
        <div class="fw-bolder mt-10">
          Do you bill your various AUM fees on different frequencies and/or
          timing relative to each other?
          <i class="fa fa-question-circle fs-4 text-dark ms-4"></i>
        </div>
        <div class="form-check form-check-solid form-switch mt-6">
          <input
            class="form-check-input"
            type="checkbox"
            v-model="request.aumFeeTypes.commonFrequencyTimingFlag"
          />
          <label class="fs-7 text-muted form-check-label"
            >Yes, my AUM-based fees can bill on different freequencies and/or
            timing relative to each other.</label
          >
        </div>
      </template>

      <template v-if="showAUMAdvisoryFees.length > 1">
        <div class="fw-bolder mt-10">
          Do you bill your based various AUM fees on different assest
          methodologies relative to each other?
          <i class="fa fa-question-circle fs-4 text-dark ms-4"></i>
        </div>
        <div class="form-check form-check-solid form-switch mt-6">
          <input
            class="form-check-input"
            type="checkbox"
            v-model="request.aumFeeTypes.commonAssetMethodologyFlag"
          />
          <label class="fs-7 text-muted form-check-label"
            >Yes, my AUM-based fees can bill based on different assest
            methodologies relative to each other.</label
          >
        </div>
      </template>

      <template v-if="showNonAUMAdvisory">
        <div class="fw-bolder mt-10">
          For your non-AUM billing,which fees do you bill? Feel free to edit
          descriptions as needed
          <i class="fa fa-question-circle fs-4 text-dark ms-4"></i>
        </div>

        <div class="d-flex mt-5 flex-wrap justify-content-between">
          <div class="m-3" v-for="(item, index) in nonAUMFeeTypes" :key="index">
            <div class="d-flex align-items-center">
              <div class="form-check form-check-solid form-check-inline fs-7">
                <input
                  class="form-check-input"
                  type="checkbox"
                  v-model="item.selected"
                />
              </div>
              <div class="input-group input-group-solid mb-2">
                <input
                  type="text"
                  class="form-control text-start"
                  style="width: 280px"
                  :value="item.feeTypeName"
                />
              </div>
            </div>
          </div>
        </div>
      </template>

      <template v-if="showNonAUMAdvisoryFees.length > 1">
        <div class="fw-bolder mt-10">
          Do you bill your various non-AUM fees on different frequencies and/or
          timing relative to each other?
          <i class="fa fa-question-circle fs-4 text-dark ms-4"></i>
        </div>
        <div class="form-check form-check-solid form-switch mt-6">
          <input
            class="form-check-input"
            type="checkbox"
            v-model="request.nonAUMFeeTypes.commonFrequencyTimingFlag"
          />
          <label class="fs-7 text-muted form-check-label"
            >Yes, my non-AUM fees can bill on different frequencies and/or
            timing relative to each other.</label
          >
        </div>
      </template>

      <div class="d-flex justify-content-between mt-10">
        <button class="btn btn-secondary" @click="back">Back</button>
        <button
          class="btn me-10"
          :class="{
            'btn-secondary': !formValidation,
            'btn-primary': formValidation,
          }"
          :disabled="!formValidation"
          @click="saveFeeTypes"
        >
          Continue
        </button>
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
  Types,
  feeTypes,
  ListItem,
  feeTypesRequestModel,
} from "@/model";

import MultiCheckBox from "@/components/controls/MultiCheckBox.vue";
import SelectBox from "@/components/controls/SelectBox.vue";

@Options({
  components: {
    MultiCheckBox,
    SelectBox,
  },
})
export default class FeeTypesBoard extends Vue {
  @Inject("firmService") service: IFirmService;

  public request = new feeTypesRequestModel();

  public store = useStore();

  public billingType: Array<ListItem> = [];
  public aumFeeTypes: Array<feeTypes> = [];
  public nonAUMFeeTypes: Array<feeTypes> = [];

  created() {
    this.billingType = Object.entries(Types).map(
      ([key]) => new ListItem(key, Types[key as keyof typeof Types])
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

  public saveFeeTypes() {
    this.request.aumFeeTypes.feeTypes = [];
    this.request.nonAUMFeeTypes.feeTypes = [];

    this.aumFeeTypes.forEach((item) => {
      if (item.selected)
        this.request.aumFeeTypes.feeTypes.push({
          feeTypeCode: item.feeTypeCode,
          feeTypeName: item.feeTypeName,
          aumFlag: item.aumFlag,
          id: item.id,
        });
    });

    this.nonAUMFeeTypes.forEach((item) => {
      if (item.selected)
        this.request.nonAUMFeeTypes.feeTypes.push({
          feeTypeCode: item.feeTypeCode,
          feeTypeName: item.feeTypeName,
          aumFlag: item.aumFlag,
          id: item.id,
        });
    });

    //if(this.request.nonAUMFeeTypes.feeTypes.length <= 0) this.request.nonAUMFeeTypes = null;

    this.request.firmId = this.store.getters.selectedFirmId;
    this.service.saveFeeTypesSetup(this.request).then((response) => {
      if (response.status == "SUCCESS") this.$emit("next");
    });
  }

  public updateBillingTypes(billingType: Array<ListItem>) {
    this.request.billingType = billingType.reduce(
      (a, o) => (o.selected && a.push(o.value), a),
      []
    );
  }

  public back() {
    this.$emit("prev");
  }

  private bindValues(response: feeTypesRequestModel) {
    if (response.billingType.length > 0) {
      this.billingType.forEach((item: ListItem) => {
        if (response.billingType.includes(item.value)) item.selected = true;
      });
    }

    if (response.aumFeeTypes) {
      this.request.aumFeeTypes = response.aumFeeTypes;
      for (var i in response.aumFeeTypes.feeTypes) {
        if (
          response.aumFeeTypes.feeTypes[i].feeTypeCode ==
          this.aumFeeTypes[i].feeTypeCode
        )
          this.aumFeeTypes[i].selected = true;
      }
    }

    if (response.nonAUMFeeTypes) {
      this.request.nonAUMFeeTypes = response.nonAUMFeeTypes;
      for (var j in response.nonAUMFeeTypes.feeTypes) {
        if (
          response.nonAUMFeeTypes.feeTypes[j].feeTypeCode ==
          this.nonAUMFeeTypes[j].feeTypeCode
        )
          this.nonAUMFeeTypes[j].selected = true;
      }
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

  get formValidation() {
    let valid = false;
    if (this.request.billingType.length == 2) {
      if (
        this.showAUMAdvisoryFees.length > 0 &&
        this.showNonAUMAdvisoryFees.length > 0
      )
        valid = true;
    } else if (this.request.billingType.length > 0) {
      if (
        this.request.billingType.includes("AUM") &&
        this.showAUMAdvisoryFees.length > 0
      )
        valid = true;
      else if (
        this.request.billingType.includes("NON-AUM") &&
        this.showNonAUMAdvisoryFees.length > 0
      )
        valid = true;
    }

    return valid;
  }
}
</script>