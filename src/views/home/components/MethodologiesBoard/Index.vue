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
                'tab-active-border-bottom':
                  item.feeTypeName == feeTypeName,
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
            :isBinding="isBinding"
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

import { firmRequestModel, frequencyRequestModel } from "@/model";
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
  public feeTypeName: string = "";
  public isBinding: boolean = false;


  public step: number = 0;

  created() {
    this.getMethodologies();
  }

  private getMethodologies() {
    const request = new firmRequestModel();
    request.firmId = this.store.getters.selectedFirmId;

    this.service
      ?.getMethodologies(request)
      .then((response) => {
        response.aumFeeTypes.forEach((item) => {
          if (item.aumFlag) this.request.aumFeeTypes.push(item);
        });
        this.feeTypeName = this.request.aumFeeTypes[0].feeTypeName;
      })
      .catch((err) => {
        console.log(err);
      });
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
      this.request.aumFeeTypes[index].aumDetails = this.clone(response);
      this.feeTypeName = this.request.aumFeeTypes[index + 1].feeTypeName;
      if (
        this.request.aumFeeTypes[index + 1].aumFlag &&
        !this.request.aumCommonAssetMethodologyFlag
      ) {
        if (this.request.aumFeeTypes[index + 1].aumDetails == null) {
          this.isBinding = true;
          this.request.aumFeeTypes[index + 1].aumDetails =
            this.clone(this.request.aumFeeTypes[0].aumDetails);
        }
      }
    }
  }

  clone<T>(object: T): T {
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