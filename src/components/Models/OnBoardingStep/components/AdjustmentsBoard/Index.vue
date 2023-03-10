<template>
  <div class="tab-content tab-content-sm__scroll pb-5 border-bottom">
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
          <div class="tab-header__title fw-bolder fs-3 pb-5">Adjustments</div>
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
          @next="onNext($event)"
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

import BaseComponent from "@/components/base/BaseComponent.vue";

import { firmRequestModel, aumFeeTypes, frequencyRequestModel, aumDetails } from "@/model";
import { IFirmService } from "@/service";

import Advisory from "./Advisory.vue";

@Options({
  components: {
    Advisory,
  },
})
export default class AdjustmentsBoard extends BaseComponent {
  @Inject("firmService") service: IFirmService;

  public store = useStore();
  public request = new frequencyRequestModel();
  public response: aumFeeTypes = null;

  public step: number = 0;

  created() {
    this.getAdjustments();
  }

  private getAdjustments() {
    const request = new firmRequestModel();

    this.service
      ?.getAdjustments(request)
      .then((response) => {
        response.aumFeeTypes.forEach((item) => {
          if (item.aumFlag) this.request.aumFeeTypes.push(item);
        });
        this.response = this.request.aumFeeTypes[this.step];
      })
      .catch((err) => {
        if (err.response.status == 500)
          this.alert(
            "Oops, sorry!",
            "Something went wrong, Please contact administration"
          );
        else if (err.response.status == 400)
          this.alert("Oops, sorry!", err.response.data.message);
      });
  }

  onPrev() {
    this.step = this.step - 1;
    if (this.step >= 0) this.response = this.request.aumFeeTypes[this.step];
    else this.$emit("prev");
  }

  onNext(response: aumDetails) {
    this.request.aumFeeTypes[this.step].aumDetails = response;
    this.step = this.step + 1;
    if (this.request.aumFeeTypes.length > this.step)
      this.response = this.request.aumFeeTypes[this.step];
    else this.$emit("next");
  }

  get firms() {
    return this.store.getters.firms;
  }
}
</script>