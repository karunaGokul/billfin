<template>
  <div class="tab-content pb-5 tab-content-sm__scroll border-bottom">
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
          <div class="tab-header__title fw-bolder fs-3 pb-5">Methodologies</div>
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
          <advisory
            :response="item"
            :prevNext="index"
            :isCopied="isCopied"
            @prev="onPrev($event, data)"
            @next="onNext($event, data)"
            v-if="item.feeTypeName == feeTypeName"
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

import {
  firmRequestModel,
  frequencyRequestModel,
  aumFeeTypes,
  aumDetails,
} from "@/model";
import { IFirmService } from "@/service";

import Advisory from "./Advisory.vue";

@Options({
  components: {
    Advisory,
  },
})
export default class MethodologiesBoard extends Vue {
  @Inject("firmService") service: IFirmService;

  public store = useStore();
  public request = new frequencyRequestModel();
  private selectedAumDetails: frequencyRequestModel =
    new frequencyRequestModel();
  public feeTypeName: string = "";
  public isCopied: boolean = false;

  public step: number = 0;

  created() {
    this.getMethodologies();
  }

  private getMethodologies() {
    this.service
      .getMethodologies()
      .then((response) => {
        response.aumFeeTypes.forEach((item) => {
          if (item.aumFlag) this.request.aumFeeTypes.push(item);
        });
        this.request.aumCommonAssetMethodologyFlag =
          response.aumCommonAssetMethodologyFlag;

        this.feeTypeName = this.request.aumFeeTypes[0].feeTypeName;
        this.bindFees(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  private bindFees(response: frequencyRequestModel) {
    if (
      !response.aumCommonAssetMethodologyFlag &&
      this.request.aumFeeTypes.length > 0
    ) {
      for (var i in response.aumFeeTypes) {
        if (response.aumFeeTypes[i].aumDetails) {
          const object = {
            id: response.aumFeeTypes[i].id,
            feeTypeName: response.aumFeeTypes[i].feeTypeName,
            feeTypeCode: response.aumFeeTypes[i].feeTypeCode,
            aumFlag: true,
            aumDetails: response.aumFeeTypes[i].aumDetails,
          };
          this.selectedAumDetails.aumFeeTypes.push(
            this.$vuehelper.clone(object)
          );
          break;
        }
      }

      if (
        this.request.aumFeeTypes[0].aumDetails == null &&
        this.selectedAumDetails.aumFeeTypes.length > 0
      ) {
        this.request.aumFeeTypes[0].aumDetails = this.$vuehelper.clone(
          this.selectedAumDetails.aumFeeTypes[0].aumDetails
        );
      }
    }
  }

  public onPrev(data: {
    index: number;
    response: aumFeeTypes;
    copiedStatus: boolean;
  }) {
    this.isCopied = data.copiedStatus;
    if (data.index == 0) this.$emit("prev");
    else {
      if (this.isCopied) this.request.aumFeeTypes[data.index].aumDetails = null;
      this.isCopied = false;
      this.feeTypeName = this.request.aumFeeTypes[data.index - 1].feeTypeName;
    }
  }

  onNext(data: { index: number; response: aumDetails }) {
    const index = data.index;
    const response = data.response;
    this.isCopied = false;

    if (index == this.request.aumFeeTypes.length - 1) this.$emit("next");
    else {
      this.request.aumFeeTypes[index].aumDetails =
        this.$vuehelper.clone(response);
      this.feeTypeName = this.request.aumFeeTypes[index + 1].feeTypeName;
      if (
        this.request.aumFeeTypes[index + 1].aumFlag &&
        !this.request.aumCommonAssetMethodologyFlag
      ) {
        if (this.selectedAumDetails.aumFeeTypes.length == 0) {
          const object = {
            id: this.request.aumFeeTypes[0].id,
            feeTypeName: this.request.aumFeeTypes[0].feeTypeName,
            feeTypeCode: this.request.aumFeeTypes[0].feeTypeCode,
            aumFlag: true,
            aumDetails: this.request.aumFeeTypes[0].aumDetails,
          };
          this.selectedAumDetails.aumFeeTypes.push(
            this.$vuehelper.clone(object)
          );
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
          this.request.aumFeeTypes[index + 1].aumDetails =
            this.$vuehelper.clone(
              this.selectedAumDetails.aumFeeTypes[0].aumDetails
            );
        }
      }
    }
  }

  get firms() {
    return this.store.getters.firms;
  }
}
</script>