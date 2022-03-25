<template>
  <div class="modal fade show d-block vh-100">
    <div class="modal-dialog modal-dialog-centered modal-xl modal-lg">
      <div class="modal-content">
        <div class="modal-header justify-content-between p-5">
          <div class="d-flex">
            <h5 class="modal-title">Welcome to BillFin</h5>
            <h6 class="text-muted ms-10">
              Let's get you onboarded quickly and easily!
            </h6>
          </div>
          <button type="button" class="btn-close" v-if="dataEntitlements.length > 1" @click="onClose">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="modal-body p-0">
          <div class="tab-group">
            <div class="tab-header p-4 pt-10">
              <ul class="tab-label-group">
                <li class="tab-label" :class="{ 'tab-active': activeTab == 1 }">
                  General
                </li>
                <li class="tab-label" :class="{ 'tab-active': activeTab == 2 }">
                  Fee Types
                </li>
                <li class="tab-label" :class="{ 'tab-active': activeTab == 3 }">
                  Frequency & Timing
                </li>
                <li
                  class="tab-label"
                  :class="{ 'tab-active': activeTab == 4 }"
                  v-if="showAumTab"
                >
                  Methodologies
                </li>
                <li
                  class="tab-label"
                  :class="{ 'tab-active': activeTab == 5 }"
                  v-if="showAumTab"
                >
                  Adjustments
                </li>
                <li class="tab-label" :class="{ 'tab-active': activeTab == 6 }">
                  Confirm
                </li>
              </ul>
            </div>
            <div class="tab-content-group w-75 mx-auto">
              <GeneralBoard @next="activeTab = 2" v-if="activeTab == 1" />
              <FeeTypesBoard
                @prev="activeTab = 1"
                @next="activeTab = 3"
                @showAumTabs="updateAumTabs"
                v-if="activeTab == 2"
              />
              <FrequencyBoard
                @prev="activeTab = 2"
                @next="showAumTab ? (activeTab = 4) : (activeTab = 6)"
                @showAumTabs="updateAumTabs"
                v-if="activeTab == 3"
              />
              <MethodologiesBoard
                @prev="activeTab = 3"
                @next="activeTab = 5"
                v-if="activeTab == 4"
              />
              <AdjustmentsBoard
                @prev="activeTab = 4"
                @next="activeTab = 6"
                :tabs="tabs"
                v-if="activeTab == 5"
              />
              <ConfirmBoard
                @prev="activeTab = 5"
                @close="onClose"
                v-if="activeTab == 6"
              />
            </div>
          </div>
        </div>
        <div class="modal-footer d-flex justify-content-center p-4 border-0">
          <div class="d-flex align-items-center justify-content-center">
            <a href="#" class="fs-5 text-muted fw-bold pe-10">Terms</a>
            <a href="#" class="fs-5 text-muted fw-bold pe-10">Plans</a>
            <a href="#" class="fs-5 text-muted fw-bold pe-10">Contact us</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { Prop } from "vue-property-decorator";

import GeneralBoard from "./components/GeneralBoard.vue";
import FeeTypesBoard from "./components/FeeTypesBoard/Index.vue";
import FrequencyBoard from "./components/FrequencyBoard/Index.vue";
import MethodologiesBoard from "./components/MethodologiesBoard/Index.vue";
import AdjustmentsBoard from "./components/AdjustmentsBoard/Index.vue";
import ConfirmBoard from "./components/Confirm/Index.vue";

import { useStore } from "vuex";

@Options({
  components: {
    GeneralBoard,
    FeeTypesBoard,
    FrequencyBoard,
    MethodologiesBoard,
    AdjustmentsBoard,
    ConfirmBoard,
  },
})
export default class OnBoardingStep extends Vue {
  @Prop() step: number | any;

  public activeTab: number = 0;
  public tabs: Array<string> = [];
  public showAumTab: boolean = true;

  public store = useStore();

  mounted() {
    this.activeTab = this.step;
  }

  public onControlTabs(tabs: any) {
    this.tabs = tabs;
  }

  public updateAumTabs(control: string) {
    this.showAumTab = control == "show" ? true : false;
  }

  public onClose() {
    this.$emit("closeOnBoard");
  }

  get dataEntitlements() {
    return this.store.getters.dataEntitlements;
  }
}
</script>