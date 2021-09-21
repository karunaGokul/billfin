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
            @prev="onPrev($event, index)"
            @next="onNext($event, data)"
            v-if="item.aumFlag && item.feeTypeName == feeTypeName"
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
  //public response: aumFeeTypes = null;

  public feeTypeName: string = "";

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
        //this.response = this.request.aumFeeTypes[0];
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

  onPrev(index: number) {
    console.log(index);
    if (index == 0) this.$emit("prev");
    else this.feeTypeName = this.request.aumFeeTypes[index - 1].feeTypeName;
  }

  onNext(data: any) {
    const index = data.index;
    const response = data.response;
    if (index == this.request.aumFeeTypes.length) this.$emit("next");
    else {
      this.request.aumFeeTypes[index].aumDetails = response;
      this.feeTypeName = this.request.aumFeeTypes[index + 1].feeTypeName;
      if (
        this.request.aumFeeTypes[index+1].aumFlag &&
        !this.request.aumCommonFrequencyTimingFlag
      ) {
        console.log(this.request.aumFeeTypes[index+1].aumDetails);
        if (this.request.aumFeeTypes[index+1].aumDetails == null) {
          this.request.aumFeeTypes[index+1].aumDetails = this.request.aumFeeTypes[index].aumDetails;
        }
      }
    }
  }

  /*onPrev() {
    this.step = this.step - 1;
    if (this.step >= 0) this.response = this.request.aumFeeTypes[this.step];
    else this.$emit("prev");
    console.log(this.request);
    console.log(this.response);
  }

  onNext(tab: string, response: aumFeeTypes) {
    console.log('child to parent');
    console.log(response);
    this.response = response;
    console.log('request');
    console.log(this.request);
    console.log('response')
    console.log(this.response);
    this.step = this.step + 1; 
    console.log('aumFlag', this.request.aumFeeTypes[this.step].aumFlag, 'aumCommonFrequencyTimingFlag', this.request.aumCommonFrequencyTimingFlag);  
    if (this.request.aumFeeTypes.length > this.step) {
      if (
        this.request.aumFeeTypes[this.step].aumFlag &&
        !this.request.aumCommonFrequencyTimingFlag
      ) {
        console.log('if flag false and aumFlag true');
        if (!this.request.aumFeeTypes[this.step].aumDetails) {
          this.response = this.request.aumFeeTypes[this.step];
          this.response.aumDetails = this.request.aumFeeTypes[0].aumDetails;
        } else this.response = this.request.aumFeeTypes[this.step];
      } else if (
        !this.request.aumFeeTypes[this.step].aumFlag &&
        !this.request.nonAumCommonFrequencyTimingFlag
      ) {
        console.log('else if flag false and aumFlag true');
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
    } else  {
      this.$emit(tab);
      console.log('else next');
    }
    console.log(this.response);
  }*/
}
</script>