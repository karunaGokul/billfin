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
                'tab-active-border-bottom': item.feeTypeName == feeTypeName,
              }"
            >
              {{ item.feeTypeName }}
            </li>
          </ul>
        </div>
      </div>
      <div class="tab-content-group m-0">
        <template v-for="(item, index) in request.aumFeeTypes" :key="index">
          <aum-advisory
            :response="item"
            :prevNext="index"
            :isBinding="isBinding"
            @prev="onPrev($event, data)"
            @next="onNext($event, data)"
            v-if="item.aumFlag && item.feeTypeName == feeTypeName"
          />
          <non-aum-advisory
            :response="item"
            :prevNext="index"
            :isBinding="isBinding"
            @prev="onPrev($event, data)"
            @next="onNext($event, data)"
            v-if="!item.aumFlag && item.feeTypeName == feeTypeName"
          />
        </template>
        <!--<aum-advisory
          :response="response"
          @prev="onPrev"
          @next="onNext($event, response)"
          v-if="response && response.aumFlag"
        />
        <non-aum-advisory
          :response="response"
          @prev="onPrev"
          @next="onNext($event, response)"
          v-if="response && !response.aumFlag"
        /> -->
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
  public feeTypeName: string = "";
  public isBinding: boolean = false;

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
        this.feeTypeName = this.request.aumFeeTypes[0].feeTypeName;
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

  onPrev(data: { index: number; isBinding: boolean }) {
    this.isBinding = data.isBinding;
    if (data.index == 0) this.$emit("prev");
    else {
      if(this.isBinding)  this.request.aumFeeTypes[data.index].aumDetails = null;
      this.isBinding = false;
      this.feeTypeName = this.request.aumFeeTypes[data.index - 1].feeTypeName;
    }
  }

  onNext(data: any) {
    const index = data.index;
    const response = data.response;
    if (index == this.request.aumFeeTypes.length - 1) this.$emit("next");
    else {
      this.request.aumFeeTypes[index].aumDetails = response;
      this.feeTypeName = this.request.aumFeeTypes[index + 1].feeTypeName;
      if (
        this.request.aumFeeTypes[index + 1].aumFlag &&
        !this.request.aumCommonFrequencyTimingFlag
      ) {
        console.log(this.request.aumFeeTypes[index + 1]);
        if (this.request.aumFeeTypes[index + 1].aumDetails == null) {
          this.isBinding = true;
          console.log(this.request.aumFeeTypes[index + 1]);
          console.log(this.request.aumFeeTypes[0]);
          this.request.aumFeeTypes[index + 1].aumDetails =
            this.request.aumFeeTypes[0].aumDetails;
            console.log(this.request.aumFeeTypes[index + 1]);
        }
      } else if (
        !this.request.aumFeeTypes[index + 1].aumFlag &&
        !this.request.nonAumCommonFrequencyTimingFlag
      ) {
        const nonAumFeeTypes: frequencyRequestModel =
          new frequencyRequestModel();
        this.request.aumFeeTypes.forEach((item) => {
          if (!item.aumFlag) nonAumFeeTypes.aumFeeTypes.push(item);
        });
        if (this.request.aumFeeTypes[index + 1].aumDetails == null) {
          this.isBinding = true;
          this.request.aumFeeTypes[index + 1].aumDetails =
            nonAumFeeTypes.aumFeeTypes[0].aumDetails;
        }
      }
    }
  }
}
</script>