<template>
  <div class="tab-content pb-5 border-bottom">
    <div class="tab-group mt-10">
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
          <div class="tab-header__title fw-bolder fs-4">Frequency & Timing</div>
        </div>
        <div class="col-7">
          <ul class="tab-header__scroll">
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
        <advisory-and-subscription
          :response="response"
          @prev="onPrev"
          @next="onNext"
          v-if="response"
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
import {
  firmRequestModel,
  frequencyRequestModel,
  aumFeeTypes,
  aumDetails,
} from "@/model";

import AdvisoryAndSubscription from "./AdvisoryAndSubscription.vue";

@Options({
  components: {
    AdvisoryAndSubscription,
  },
})
export default class FrequencyBoard extends Vue {
  @Inject("firmService") service: IFirmService;

  public store = useStore();
  public request: frequencyRequestModel = new frequencyRequestModel();
  public response: aumFeeTypes = null;

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
        this.response = this.request.aumFeeTypes[0];
        this.showMethodolgiesAndAdjustments();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  private showMethodolgiesAndAdjustments() {
    const data: Array<aumFeeTypes> = null;
    this.request.aumFeeTypes.forEach((item) => {
      if (item.aumFlag) data.push(item);
    });

    if (data && data.length > 0) this.$emit("showAumTabs", "show");
    else this.$emit("showAumTabs", "hide");
  }

  onPrev() {
    let index = this.request.aumFeeTypes.findIndex(
      (item) => item.feeTypeCode == this.response.feeTypeCode
    );
    index = index - 1;
    if (this.request.aumFeeTypes[index] != undefined) {
      this.response = this.request.aumFeeTypes[index];
      this.response.aumDetails = this.request.aumFeeTypes[index].aumDetails;
    } else this.$emit("prev");
  }

  onNext() {
    let index = this.request.aumFeeTypes.findIndex(
      (item) => item.feeTypeCode == this.response.feeTypeCode
    );
    index = index + 1;
    if (this.request.aumFeeTypes[index] != undefined) {
      this.response = this.request.aumFeeTypes[index];
      this.response.aumDetails = this.request.aumFeeTypes[index].aumDetails;
    } else this.$emit("next");
  }
}
</script>