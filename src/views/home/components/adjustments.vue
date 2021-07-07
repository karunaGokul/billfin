<template>
  <div class="tab-content pb-5 border-bottom">
    <div class="tab-group mt-10">
      <div class="tab-header position-relative">
        <div class="tab-header__title position-absolute fw-bolder fs-4">
          Adjustments
        </div>
        <ul class="tab-label-group justify-content-center border-bottom">
          <li
            v-for="(item, index) in tabs"
            :key="index"
            class="tab-label pb-4"
            :class="{ 'tab-active-border-bottom': adjustmentsTab == index }"
            @click="adjustmentsTab = index"
          >
            {{ item }}
          </li>
        </ul>
      </div>
      <div class="tab-content-group m-0">
        <div
          class="tab-content tab-content-lg__scroll"
          v-if="adjustmentsTab == 0"
        >
          <div class="d-flex fs-7 mt-10">
            <div class="fw-bolder">
              Do you charge a firm-wide standard minimum fee?
            </div>
            <div class="ms-5">
              <i class="fa fa-question-circle fs-4 text-dark"></i>
            </div>
          </div>
          <div class="d-flex align-items-center mt-6 ms-6">
            <div class="form-check form-check-solid form-switch">
              <input
                class="form-check-input"
                type="checkbox"
                v-model="request.firmWideStandardMinimumFee"
              />
              <label class="fs-7 text-muted form-check-label"
                >No firm-wide minimum fees</label
              >
            </div>
            <template v-if="request.firmWideStandardMinimumFee">
              <div class="input-group input-group-solid w-25 ms-4">
                <span class="input-group-text">$</span>
                <input
                  type="text"
                  class="form-control text-start"
                  v-model="request.firmWideMinimumFeeAmount"
                />
              </div>
              <div class="ms-4">annual minimum</div>
            </template>
          </div>

          <div class="d-flex fs-7 mt-10">
            <div class="fw-bolder">
              Do you limit fees to a firm-wide maximum fee?
            </div>
            <div class="ms-5">
              <i class="fa fa-question-circle fs-4 text-dark"></i>
            </div>
          </div>
          <div class="d-flex align-items-center mt-6 ms-6">
            <div class="form-check form-check-solid form-switch">
              <input
                class="form-check-input"
                type="checkbox"
                v-model="request.firmWideMaximumFee"
              />
              <label class="fs-7 text-muted form-check-label"
                >No firm-wide minimum fees</label
              >
            </div>
            <template v-if="request.firmWideMaximumFee">
              <div class="input-group input-group-solid w-25 ms-4">
                <span class="input-group-text">$</span>
                <input
                  type="text"
                  class="form-control text-start"
                  v-model="request.firmWideMaximumFeeAmount"
                />
              </div>
              <div class="ms-4">annual maximum</div>
            </template>
          </div>

          <div class="d-flex fs-7 mt-10">
            <div class="fw-bolder">
              Do you adjust billing for deposits and withdrawls?
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
                v-model="request.depositsAndWithdrawls"
              />
              <label class="fs-7 text-muted form-check-label"
                >Yes, billing is adjusted for flows</label
              >
            </div>
          </div>

          <template v-if="request.depositsAndWithdrawls">
            <div class="d-flex fs-7 mt-10">
              <div class="fw-bolder">
                Indicate whether you apply a threshold to flows.
              </div>
              <div class="ms-5">
                <i class="fa fa-question-circle fs-4 text-dark"></i>
              </div>
            </div>
            <div class="mt-6 ms-6">
              <SingleSelectionCheckBox
                :data="thresholdFlows"
                @update="updateThresholdFlows"
              />
            </div>

            <template v-if="request.thresholdFlows == 'Dollar amount'">
              <div class="d-flex fs-7 mt-10">
                <div class="fw-bolder">
                  Please enter the dollar amount of your threshold.
                </div>
                <div class="ms-5">
                  <i class="fa fa-question-circle fs-4 text-dark"></i>
                </div>
              </div>
              <div class="mt-6 ms-6">
                <div class="input-group input-group-solid w-50">
                  <span class="input-group-text">$</span>
                  <input
                    type="text"
                    class="form-control text-start"
                    v-model="request.thresholdFlowsAmount"
                  />
                </div>
              </div>
            </template>

            <template v-if="request.thresholdFlows == '% of AUM'">
              <div class="d-flex fs-7 mt-10">
                <div class="fw-bolder">
                  PLease enter the % aum of your threshold.
                </div>
                <div class="ms-5">
                  <i class="fa fa-question-circle fs-4 text-dark"></i>
                </div>
              </div>
              <div class="mt-6 ms-6">
                <div class="input-group input-group-solid w-50">
                  <span class="input-group-text">%</span>
                  <input
                    type="text"
                    class="form-control text-start"
                    v-model="request.thresholdFlowsAum"
                  />
                </div>
              </div>
            </template>
          </template>

          <div class="d-flex fs-7 mt-10">
            <div class="fw-bolder ms-4">
              Do you round fees to avoid charging cents?
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
                v-model="request.avoidCharging"
              />
              <label class="fs-7 text-muted form-check-label"
                >No, I charge exact amounts</label
              >
            </div>
          </div>

          <div class="d-flex justify-content-between mt-10">
            <button class="btn btn-secondary" @click="prev">Back</button>
            <button class="btn btn-primary me-10" @click="next">
              Continue
            </button>
          </div>
        </div>
        <div class="tab-content" v-if="adjustmentsTab == 1">
          {{ adjustmentsTab }}
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { Prop } from "vue-property-decorator";

import { adjustmentsModel } from "@/model";
import SingleSelectionCheckBox from "@/components/controls/SingleSelectionCheckBox.vue";

@Options({
  components: {
    SingleSelectionCheckBox,
  },
})
export default class Adjustments extends Vue {
  @Prop() tabs: Array<string> | any;

  public adjustmentsTab: number = 0;
  public request = new adjustmentsModel();

  public thresholdFlows: Array<string> = ["Dollar amount", "% of AUM", "None"];

  public updateThresholdFlows(value: any) {
    this.request.thresholdFlows = value[0];
  }

  prev() {
    this.$emit("prev");
  }

  next() {
    console.log(this.request);
    //this.$emit("next");
  }
}
</script>