<template>
  <div class="tab-content pb-5 border-bottom">
    <div class="tab-group mt-10">
      <div class="tab-header position-relative">
        <div class="tab-header__title position-absolute fw-bolder fs-4">
          Methodologies
        </div>
        <ul class="tab-label-group justify-content-center border-bottom">
          <li
            v-for="(item, index) in billingTypes"
            :key="index"
            class="tab-label pb-4"
            :class="{ 'tab-active-border-bottom': methodologiesTab == item }"
          >
            {{ item }}
          </li>
        </ul>
      </div>
      <div class="tab-content-group m-0">
        <advisory-and-subscription
          billingType="AUM Advisory"
          previousTab="prev"
          :nextTab="nextTab('Subscription')"
          @prev="onPrev"
          @next="onNext"
          v-if="methodologiesTab == 'AUM Advisory'"
        />
        <advisory-and-subscription
          billingType="Subscription"
          :previousTab="previousTab('AUM Advisory')"
          :nextTab="nextTab('One Time')"
          @prev="onPrev"
          @next="onNext"
          v-if="methodologiesTab == 'Subscription'"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { useStore } from "vuex";

import AdvisoryAndSubscription from "./AdvisoryAndSubscription.vue";

@Options({
  components: {
    AdvisoryAndSubscription,
  },
})
export default class MethodologiesBoard extends Vue {
  public store = useStore();

  public methodologiesTab: string = "";
  public billingTypes: Array<string> | any;

  created() {
    console.log('test');
    this.billingTypes = this.store.getters.billingTypes;
    this.methodologiesTab = this.billingTypes[0];
  }

  onPrev(value: string) {
    if (value == "prev") this.$emit("prev");
    else this.methodologiesTab = value;
  }

  onNext(value: string) {
    if (value == "next") this.$emit("next");
    else this.methodologiesTab = value;
  }

  previousTab(selectedTab: string) {
    return this.billingTypes.includes(selectedTab) ? selectedTab : "next";
  }

  nextTab(selectedTab: string) {
    return this.billingTypes.includes(selectedTab) ? selectedTab : "next";
  }
}
</script>