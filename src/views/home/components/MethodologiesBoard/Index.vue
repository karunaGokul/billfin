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
                  response.feeTypeName == item.feeTypeName,
              }"
            >
              {{ item.feeTypeName }}
            </li>
          </ul>
        </div>
      </div>
      <div class="tab-content-group m-0">
        <advisory
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

import { firmRequestModel, aumFeeTypes, frequencyRequestModel } from "@/model";
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
  public response: aumFeeTypes = null;

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
        this.response = this.request.aumFeeTypes[this.step];
      })
      .catch((err) => {
        console.log(err);
      });
  }

  onPrev() {
    this.step = this.step - 1;
    if (this.step >= 0) this.response = this.request.aumFeeTypes[this.step];
    else this.$emit("prev");
  }

  onNext() {
    this.step = this.step + 1;
    if (this.request.aumFeeTypes.length > this.step) {
      if (
        this.request.aumFeeTypes[this.step].aumFlag &&
        !this.request.aumCommonAssetMethodologyFlag
      ) {
        if (!this.request.aumFeeTypes[this.step].aumDetails) {
          this.response = this.request.aumFeeTypes[this.step];
          this.response.aumDetails = this.request.aumFeeTypes[0].aumDetails;
        } else this.response = this.request.aumFeeTypes[this.step];
      } else this.response = this.request.aumFeeTypes[this.step];
    } else this.$emit("next");
  }
}
</script>