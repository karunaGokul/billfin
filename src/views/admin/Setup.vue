<template>
  <div class="setup-container">
    <on-boarding-step
      :step="lastOnboardingStep"
      @closeOnBoard="onCloseOnBoard"
      v-if="showOnBoard"
    />
  </div>
</template>
<script lang="ts">
import { Vue, Options } from "vue-class-component";

import OnBoardingStep from "@/components/Models/OnBoardingStep/Index.vue";
import { firmsResponseModel } from "@/model";

import { useStore } from "vuex";

@Options({
  components: {
    OnBoardingStep,
  },
})
export default class Setup extends Vue {
  public firms: firmsResponseModel = new firmsResponseModel();

  public store = useStore();
  public showOnBoard: boolean = false;
  public lastOnboardingStep: number = 1;

  created() {
    this.getFirms();
  }

  private getFirms() {
    this.firms = this.store.getters.firms;
    if (this.firms.trialOnboardingStatus != "COMPLETED") {
      this.showOnBoard = true;
      if (this.firms.trialOnboardingStatus == "NOT_STARTED") this.lastOnboardingStep = 1;
      else this.lastOnboardingStep = this.firms.lastOnboardingStepCompleted;
    }
  }

  public onCloseOnBoard() {
    this.showOnBoard = false;
    this.$router.push("/dashboard");
  }
}
</script>