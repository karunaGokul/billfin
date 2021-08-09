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
          <multi-checkBox :data="billingTypes" @update="updateBillingTypes" />
        </div>
      </div>

      <div class="fw-bolder mt-10">
        For your AUM-based advisory billing,which fees do you bill? Feel free to
        edit descriptions as needed
        <i class="fa fa-question-circle fs-4 text-dark ms-4"></i>
      </div>

      <div class="d-flex mt-5 flex-wrap justify-content-between">
        <div class="m-3" v-for="(item, index) in AUMAdvisory" :key="index">
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
                :value="item.text"
              />
            </div>
          </div>
        </div>
      </div>

      <template v-if="showAUMAdvisoryFees">
        <div class="fw-bolder mt-10">
          Do you bill your {{ showAUMAdvisoryFees }} on different frequencies
          and/or timing relative to each other?
          <i class="fa fa-question-circle fs-4 text-dark ms-4"></i>
        </div>
        <div class="form-check form-check-solid form-switch mt-6">
          <input class="form-check-input" type="checkbox" />
          <label class="fs-7 text-muted form-check-label"
            >Yes, my AUM-based fees can bill on different freequencies and/or
            timing relative to each other.</label
          >
        </div>
      </template>

      <template v-if="showAUMAdvisoryFees">
        <div class="fw-bolder mt-10">
          Do you bill your {{ showAUMAdvisoryFees }} based on different assest
          methodologies relative to each other?
          <i class="fa fa-question-circle fs-4 text-dark ms-4"></i>
        </div>
        <div class="form-check form-check-solid form-switch mt-6">
          <input class="form-check-input" type="checkbox" />
          <label class="fs-7 text-muted form-check-label"
            >Yes, my AUM-based fees can bill based on different assest
            methodologies relative to each other.</label
          >
        </div>
      </template>

      <div class="fw-bolder mt-10">
        For your non-AUM billing,which fees do you bill? Feel free to edit
        descriptions as needed
        <i class="fa fa-question-circle fs-4 text-dark ms-4"></i>
      </div>

      <div class="d-flex mt-5 flex-wrap justify-content-between">
        <div class="m-3" v-for="(item, index) in NonAUMBilling" :key="index">
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
                :value="item.text"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="fw-bolder mt-10">
        Do you bill your various non-AUM fees on different frequencies and/or
        timing relative to each other?
        <i class="fa fa-question-circle fs-4 text-dark ms-4"></i>
      </div>
      <div class="form-check form-check-solid form-switch mt-6">
        <input class="form-check-input" type="checkbox" />
        <label class="fs-7 text-muted form-check-label"
          >Yes, my AUM-based fees can bill on different frequencies and/or
          timing relative to each other.</label
        >
      </div>

      <div class="d-flex justify-content-between mt-10">
        <button class="btn btn-secondary">Back</button>
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

import { IFirmService } from "@/service";
import { Types, ListItem, feeTypesRequestModel } from "@/model";

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

  public billingTypes: Array<ListItem> = [];
  public AUMAdvisory: Array<ListItem> = [];
  public NonAUMBilling: Array<ListItem> = [];

  created() {
    this.billingTypes = Object.entries(Types).map(
      ([key]) => new ListItem(key, Types[key as keyof typeof Types])
    );
    this.getAUMAdvisory();
    this.getNonAUMBilling();
  }

  private getAUMAdvisory() {
    this.service.getAUMAdvisory().then((response) => {
      this.AUMAdvisory = response;
    });
  }

  private getNonAUMBilling() {
    this.service.getNonAUMBilling().then((response) => {
      this.NonAUMBilling = response;
    });
  }

  public saveFeeTypes() {
    console.log(this.request);
    console.log(this.AUMAdvisory);
    this.$emit("next");
  }

  public updateBillingTypes(billingTypes: any[]) {
    this.request.billingTypes = billingTypes.reduce(
      (a, o) => (o.selected && a.push(o.value), a),
      []
    );
  }

  get showAUMAdvisoryFees() {
    let value: string = "";
    const data: Array<string> = [];
    for (var i in this.AUMAdvisory) {
      if (this.AUMAdvisory[i].selected) data.push(this.AUMAdvisory[i].text);
    }

    if (data.length >= 1)
      value = data.slice(0, data.length - 1).join(", ") + data.slice(-1);
    if (data.length > 0)
      value =
        data.slice(0, data.length - 1).join(", ") + " and " + data.slice(-1);

    return value;
  }

  get formValidation() {
    let valid = false;
    if (this.request.billingTypes.length > 0) valid = true;

    return valid;
  }
}
</script>