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
            :isCopied="isCopied"
            @prev="onPrev($event, data)"
            @next="onNext($event, data)"
            v-if="item.aumFlag && item.feeTypeName == feeTypeName"
          />
          <non-aum-advisory
            :response="item"
            :prevNext="index"
            :isCopied="isCopied"
            @prev="onPrev($event, data)"
            @next="onNext($event, data)"
            v-if="!item.aumFlag && item.feeTypeName == feeTypeName"
          />
        </template>
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
  private selectedAumDetails: frequencyRequestModel =
    new frequencyRequestModel();
  private selectedNonAumDetails: frequencyRequestModel =
    new frequencyRequestModel();
  public isCopied: boolean = false;

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
        this.feeTypeName = response.aumFeeTypes[0].feeTypeName;
        this.bindFees(response);
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

  private bindFees(response: frequencyRequestModel) {
    const aum: frequencyRequestModel = new frequencyRequestModel(),
      nonAum: frequencyRequestModel = new frequencyRequestModel();
    response.aumFeeTypes.forEach((item) => {
      if (item.aumFlag) aum.aumFeeTypes.push(item);
      else nonAum.aumFeeTypes.push(item);
    });
    if (!response.aumCommonFrequencyTimingFlag && aum.aumFeeTypes.length > 0) {
      for (var i in response.aumFeeTypes) {
        if (
          response.aumFeeTypes[i].aumDetails &&
          response.aumFeeTypes[i].aumFlag
        ) {
          const object = {
            id: response.aumFeeTypes[i].id,
            feeTypeName: response.aumFeeTypes[i].feeTypeName,
            feeTypeCode: response.aumFeeTypes[i].feeTypeCode,
            aumFlag: true,
            aumDetails: response.aumFeeTypes[i].aumDetails,
          };
          this.selectedAumDetails.aumFeeTypes.push(this.clone(object));
          break;
        }
      }
      if (
        !this.request.aumFeeTypes[0].aumDetails &&
        this.selectedAumDetails.aumFeeTypes.length > 0
      )
        this.request.aumFeeTypes[0].aumDetails = this.clone(
          this.selectedAumDetails.aumFeeTypes[0].aumDetails
        );
    }
    if (
      !response.nonAumCommonFrequencyTimingFlag &&
      nonAum.aumFeeTypes.length > 0
    ) {
      for (var j in nonAum.aumFeeTypes) {
        if (
          response.aumFeeTypes[j].aumDetails &&
          !response.aumFeeTypes[j].aumFlag
        ) {
          const object = {
            id: response.aumFeeTypes[j].id,
            feeTypeName: response.aumFeeTypes[j].feeTypeName,
            feeTypeCode: response.aumFeeTypes[j].feeTypeCode,
            aumFlag: true,
            aumDetails: response.aumFeeTypes[j].aumDetails,
          };
          this.selectedNonAumDetails.aumFeeTypes.push(this.clone(object));
          break;
        }
      }
      if (
        !nonAum.aumFeeTypes[0].aumDetails &&
        this.selectedNonAumDetails.aumFeeTypes.length > 0
      )
        nonAum.aumFeeTypes[0].aumDetails = this.clone(
          this.selectedNonAumDetails.aumFeeTypes[0].aumDetails
        );

      this.request.aumFeeTypes.forEach((item) => {
        if (item.feeTypeName == nonAum.aumFeeTypes[0].feeTypeName)
          item.aumDetails = nonAum.aumFeeTypes[0].aumDetails;
      });
    }
  }

  public onPrev(data: {
    index: number;
    response: aumFeeTypes;
    copiedStatus: boolean;
  }) {
    const index = data.index;
    this.isCopied = data.copiedStatus;

    console.log(data.copiedStatus);

    if (data.index == 0) this.$emit("prev");
    else {
      if (data.copiedStatus) this.request.aumFeeTypes[index].aumDetails = null;
      this.isCopied = false;
      this.feeTypeName = this.request.aumFeeTypes[index - 1].feeTypeName;
    }
  }

  public onNext(data: { index: number; response: aumDetails }) {
    const index = data.index;
    const response = data.response;
    this.isCopied = false;

    if (index == this.request.aumFeeTypes.length - 1) this.$emit("next");
    else {
      this.request.aumFeeTypes[index].aumDetails = this.clone(response);
      this.feeTypeName = this.request.aumFeeTypes[index + 1].feeTypeName;

      if (
        this.request.aumFeeTypes[index + 1].aumFlag &&
        !this.request.aumCommonFrequencyTimingFlag
      ) {
        if (this.selectedAumDetails.aumFeeTypes.length == 0) {
          const object = {
            id: this.request.aumFeeTypes[0].id,
            feeTypeName: this.request.aumFeeTypes[0].feeTypeName,
            feeTypeCode: this.request.aumFeeTypes[0].feeTypeCode,
            aumFlag: true,
            aumDetails: this.request.aumFeeTypes[0].aumDetails,
          };
          this.selectedAumDetails.aumFeeTypes.push(this.clone(object));
        }
        if (
          this.request.aumFeeTypes[index].feeTypeName ==
            this.selectedAumDetails.aumFeeTypes[0].feeTypeName &&
          this.request.aumFeeTypes[index].aumDetails !=
            this.selectedAumDetails.aumFeeTypes[0].aumDetails
        ) {
          this.selectedAumDetails.aumFeeTypes[0].aumDetails =
            this.request.aumFeeTypes[index].aumDetails;
        }

        if (this.request.aumFeeTypes[index + 1].aumDetails == null) {
          this.isCopied = true;
          this.request.aumFeeTypes[index + 1].aumDetails = this.clone(
            this.selectedAumDetails.aumFeeTypes[0].aumDetails
          );
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

        if (this.selectedNonAumDetails.aumFeeTypes.length == 0) {
          const object = {
            id: nonAumFeeTypes.aumFeeTypes[0].id,
            feeTypeName: nonAumFeeTypes.aumFeeTypes[0].feeTypeName,
            feeTypeCode: nonAumFeeTypes.aumFeeTypes[0].feeTypeCode,
            aumFlag: false,
            aumDetails: nonAumFeeTypes.aumFeeTypes[0].aumDetails,
          };
          this.selectedNonAumDetails.aumFeeTypes.push(this.clone(object));
        }
        if (
          this.request.aumFeeTypes[index].feeTypeName ==
            this.selectedNonAumDetails.aumFeeTypes[0].feeTypeName &&
          this.request.aumFeeTypes[index].aumDetails !=
            this.selectedNonAumDetails.aumFeeTypes[0].aumDetails
        ) {
          this.selectedNonAumDetails.aumFeeTypes[0].aumDetails =
            this.request.aumFeeTypes[index].aumDetails;
        }

        if (this.request.aumFeeTypes[index + 1].aumDetails == null) {
          this.isCopied = true;
          this.request.aumFeeTypes[index + 1].aumDetails = this.clone(
            this.selectedNonAumDetails.aumFeeTypes[0].aumDetails
          );
        }
      }
    }
  }

  public clone<T>(object: T): T {
    return this._clone(object);
  }

  private _clone(obj: any) {
    if (obj == null || typeof obj != "object") return obj;
    var temp = new obj.constructor();
    for (var key in obj) temp[key] = this._clone(obj[key]);
    return temp;
  }
}
</script>