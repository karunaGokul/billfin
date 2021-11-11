<template>
  <div class="signup-plan-container">
    <div
      class="d-flex justify-content-between align-items-center ps-9 pe-9 p-4"
      v-for="(item, index) in plans"
      :key="index"
    >
      <div>
        <div class="fw-bolder fs-4 mb-2">{{ item.product }}</div>
        <div class="fs-6 text-muted">{{ item.description }}</div>
      </div>
      <div class="d-flex align-items-center">
        <div class="fw-bolder fs-1">
          <span class="fs-7">$</span>
          {{ item.rate }}
          <span class="fs-7 text-muted">/{{ item.planType }}</span>
        </div>
        <div class="dropdown" v-click-outside="clickOutSidePlan">
          <i
            class="fas fa-ellipsis-v fs-1 ms-4 mt-2"
            style="cursor: pointer"
            @click="togglePlan = true"
          ></i>
          <ul
            class="dropdown-menu overflow-auto"
            :class="{ show: togglePlan }"
            style="right: 0"
          >
            <li class="dropdown-item">Cancel Plan</li>
            <li class="dropdown-item">Renew Plan</li>
            <li class="dropdown-item">Invoice</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";

export default class PlanAddons extends Vue {
  @Prop() plans: any;

  togglePlan: boolean = false;

  public clickOutSidePlan() {
    if (this.togglePlan) this.togglePlan = false;
  }
}
</script>