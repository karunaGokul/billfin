<template>
  <div class="signup-plan-container">
    <div class="card ms-6 me-6">
      <div class="tab-group">
        <div class="tab-header tab-header-icon pt-10">
          <ul class="tab-label-group justify-content-evenly">
            <li
              class="tab-label d-flex align-items-center"
              :class="{ 'tab-label-active': activeTab == 1 }"
            >
              <div class="tab-label-icon me-4">1</div>
              <div class="tab-label-name">Plan</div>
            </li>
            <li
              class="tab-label d-flex align-items-center"
              :class="{ 'tab-label-active': activeTab == 2 }"
            >
              <div class="tab-label-icon me-4">2</div>
              <div class="tab-label-name">Add-Ons</div>
            </li>
            <li
              class="tab-label d-flex align-items-center"
              :class="{ 'tab-label-active': activeTab == 3 }"
            >
              <div class="tab-label-icon me-4">3</div>
              <div class="tab-label-name">Checkout</div>
            </li>
            <li
              class="tab-label d-flex align-items-center"
              :class="{ 'tab-label-active': activeTab == 4 }"
            >
              <div class="tab-label-icon me-4">4</div>
              <div class="tab-label-name">Finish</div>
            </li>
          </ul>
        </div>
        <div class="tab-content-group w-75 mx-auto">
          <plan 
            v-if="activeTab == 1"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Options } from "vue-class-component";

import Plan from "./components/Plan.vue";

@Options({
    components: {
        Plan
    }
}) 
export default class SignUpPlan extends Vue {
  public activeTab: number = 1;
  
}
</script>