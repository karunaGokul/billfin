<template>
  <div class="tab-content pb-5 tab-content-sm__scroll border-bottom">
    <div class="tab-group mt-5">
      <div
        class="
          tab-header
          d-flex
          justify-content-start
          align-items-center
          border-bottom
          row
          g-0
        "
      >
        <div class="col-5">
          <div class="tab-header__title fw-bolder fs-3 pb-5">
            Frequency & Timing
          </div>
        </div>
        <div class="col-7">
          <ul class="tab-header__scroll mt-4">
            <li
              v-for="(item, index) in request.aumFeeTypes"
              :key="index"
              class="tab-label border-1 pb-4"
              :class="{
                'tab-active-border-bottom':
                  response.feeTypeName == item.feeTypeName,
              }"
            >
              {{ item.feeTypeName }}
            </li>
          </ul>
        </div>
      </div>
      <div class="tab-content-group m-0">
        <aum-advisory
          :response="response"
          @prev="onPrev"
          @next="onNext"
          v-if="response && response.aumFlag"
        />
        <non-aum-advisory
          :response="response"
          @prev="onPrev"
          @next="onNext"
          v-if="response && !response.aumFlag"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { Inject } from "vue-property-decorator";

import { useStore } from "vuex";

import { IFirmService } from "@/service";
import { firmRequestModel, frequencyRequestModel, aumFeeTypes } from "@/model";

import AumAdvisory from "./AumAdvisory.vue";
import NonAumAdvisory from "./NonAumAdvisory.vue";

@Options({
  components: {
    AumAdvisory,
    NonAumAdvisory,
  },
})
export default class FrequencyBoard extends Vue {
  @Inject("firmService") service: IFirmService;

  public store = useStore();
  public request: frequencyRequestModel = new frequencyRequestModel();
  public response: aumFeeTypes = null;

  public step: number = 0;

  created() {
    this.getFrequncyAndTiming();
  }

  private getFrequncyAndTiming() {
    const request = new firmRequestModel();
    request.firmId = this.store.getters.selectedFirmId;
    this.service
      .getFrequencyAndTiming(request)
      .then((response) => {
        this.request = response;
        this.response = this.request.aumFeeTypes[this.step];
        this.showMethodolgiesAndAdjustments();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  private showMethodolgiesAndAdjustments() {
    const data: Array<aumFeeTypes> = [];
    this.request.aumFeeTypes.forEach((item) => {
      if (item.aumFlag) data.push(item);
    });

    if (data && data.length > 0) this.$emit("showAumTabs", "show");
    else this.$emit("showAumTabs", "hide");
  }

  onPrev() {
    this.step = this.step - 1;
    if (this.step >= 0) this.response = this.request.aumFeeTypes[this.step];
    else this.$emit("prev");
    console.log(this.request);
    console.log(this.response);
  }

  onNext(response: aumFeeTypes) {
    this.response = response;
    console.log(this.request);
    console.log(this.response);
    this.step = this.step + 1;   
    if (this.request.aumFeeTypes.length > this.step) {
      if (
        this.request.aumFeeTypes[this.step].aumFlag &&
        !this.request.aumCommonFrequencyTimingFlag
      ) {
        if (!this.request.aumFeeTypes[this.step].aumDetails) {
          this.response = this.request.aumFeeTypes[this.step];
          this.response.aumDetails = this.request.aumFeeTypes[0].aumDetails;
        } else this.response = this.request.aumFeeTypes[this.step];
      } else if (
        !this.request.aumFeeTypes[this.step].aumFlag &&
        !this.request.nonAumCommonFrequencyTimingFlag
      ) {
        if (!this.request.aumFeeTypes[this.step].aumDetails) {
          const nonAumFeeTypes: frequencyRequestModel =
            new frequencyRequestModel();
          this.request.aumFeeTypes.forEach((item) => {
            if (!item.aumFlag) nonAumFeeTypes.aumFeeTypes.push(item);
          });
          this.response = this.request.aumFeeTypes[this.step];
          this.response.aumDetails = nonAumFeeTypes.aumFeeTypes[0].aumDetails;
        } else this.response = this.request.aumFeeTypes[this.step];
      } else this.response = this.request.aumFeeTypes[this.step];
    } else this.$emit("next");
  }
}
</script>