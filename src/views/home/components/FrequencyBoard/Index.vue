<template>
  <div class="tab-content pb-5 border-bottom">
    <div class="tab-group mt-10">
      <div class="tab-header position-relative">
        <div class="tab-header__title position-absolute fw-bolder fs-4">
          Frequecy & Timing
        </div>
        <ul class="tab-label-group justify-content-center border-bottom">
          <li
            v-for="(item, index) in billingTypes"
            :key="index"
            class="tab-label pb-4"
            :class="{ 'tab-active-border-bottom': frequencyTab == item.value }"
          >
            {{ item.value }}
          </li>
        </ul>
      </div>
      <div class="tab-content-group m-0">
        <advisory-and-subscription
          billingType="AUM_ADVISORY"
          previousTab="prev"
          :nextTab="prevNextTab('Subscription')"
          @prev="onPrev"
          @next="onNext"
          v-if="frequencyTab == 'AUM Advisory'"
        />
        <advisory-and-subscription
          billingType="SUBSCRIPTION"
          :previousTab="prevNextTab('AUM Advisory')"
          :nextTab="prevNextTab('One Time')"
          @prev="onPrev"
          @next="onNext"
          v-if="frequencyTab == 'Subscription'"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { useStore } from "vuex";

import { ListItem } from "@/model";

import AdvisoryAndSubscription from "./AdvisoryAndSubscription.vue";

@Options({
  components: {
    AdvisoryAndSubscription,
  },
})
export default class FrequencyBoard extends Vue {

  public store = useStore();

  public frequencyTab: string = "";
  public billingTypes: Array<ListItem>;

  created() {
    this.billingTypes = this.store.getters.billingTypes;
    this.frequencyTab = this.billingTypes[0].value;
  }

  onPrev(value: string) {
    if (value == "prev") this.$emit("prev");
    else this.frequencyTab = value;
  }

  onNext(value: string) {
    if (value == "next") this.$emit("next");
    else this.frequencyTab = value;
  }

  prevNextTab(selectedTab: string) {
    let tab: string = '';
    this.billingTypes.find((item: ListItem) => { tab = item.value == selectedTab ? selectedTab : "next";})
    return tab;
  }
}
</script>