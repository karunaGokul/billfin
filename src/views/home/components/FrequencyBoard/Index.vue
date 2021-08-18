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
        "
      >
        <div class="tab-header__title fw-bolder fs-4">Frequecy & Timing</div>

        <div
          class="
            tab-label-group
            w-75
            align-items-center
            justify-content-center
            ms-2
            overflow-auto
          "
        >
          <div class="tab-label-group justify-content-center">
            <div
              v-for="(item, index) in request.aumFeeTypes"
              :key="index"
              class="tab-label border-1 pb-4"
              :class="{
                'tab-active-border-bottom':
                  selectedFee.feeTypeName == item.feeTypeName,
              }"
            >
              {{ item.feeTypeName }}
            </div>
          </div>
        </div>
      </div>
      <div class="tab-content-group m-0">
        <advisory-and-subscription
          :billingFee="selectedFee"
          :aumDetails="aumDetails"
          @prev="onPrev"
          @next="onNext"
          v-if="aumDetails && selectedFee"
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
  public selectedFee: aumFeeTypes = null;
  public aumDetails: aumDetails = null;

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
        this.selectedFee = this.request.aumFeeTypes[0];
        this.aumDetails = this.request.aumFeeTypes[0].aumDetails;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  onPrev() {
    let index = this.request.aumFeeTypes.findIndex(
      (item) => item.feeTypeCode == this.selectedFee.feeTypeCode
    );
    index = index - 1;
    if (this.request.aumFeeTypes[index] != undefined) {
      this.selectedFee = this.request.aumFeeTypes[index];
      this.aumDetails = this.request.aumFeeTypes[index].aumDetails;
    } else this.$emit("prev");
  }

  onNext() {
    let index = this.request.aumFeeTypes.findIndex(
      (item) => item.feeTypeCode == this.selectedFee.feeTypeCode
    );
    index = index + 1;
    if (this.request.aumFeeTypes[index] != undefined) {
      this.selectedFee = this.request.aumFeeTypes[index];
      this.aumDetails = this.request.aumFeeTypes[index].aumDetails;
    } else this.$emit("next");
  }
}
</script>