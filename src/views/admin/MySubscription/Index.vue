<template>
  <div class="subscription-container">
    <div class="tab-group">
      <div class="tab-header p-4 pt-10">
        <ul class="tab-label-group border-bottom fs-5">
          <li
            class="tab-label pb-4"
            :class="{ 'tab-active': activeTab == 1 }"
            @click="activeTab = 1"
          >
            AUM Billing
          </li>
          <li
            class="tab-label pb-4"
            :class="{ 'tab-active': activeTab == 2 }"
            @click="activeTab = 2"
          >
            Subscription Billing
          </li>
          <button
            type="button"
            class="
              btn btn-outline-primary
              border border-primary
              position-absolute
              bottom-0
              end-0
              mb-14
              me-4
            "
          >
            Bill & Payments
          </button>
        </ul>
      </div>
      <div class="tab-content-group w-75 mx-auto">
        {{ activeTab }}
      </div>
    </div>
    <div class="card ms-6 me-6 mb-6">
      <div class="card-header align-items-center">
        <div class="card-title fw-bolder fs-4">My Subscription</div>
        <button type="button" class="btn btn-primary">Change Plan</button>
      </div>
      <div class="card-body p-0">
        <!--<plan-addons :plans="plans" /> -->
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Options } from "vue-class-component";

import PlanAddons from "./components/PlanAddons.vue";

@Options({
  components: {
    PlanAddons,
  },
})
export default class Index extends Vue {
  public activeTab: number = 1;

  plans: any = [
    {
      id: 3,
      product: "Standard",
      rate: "1,188",
      description: "For small to medium-sized RIAs",
      planType: "Yr",
    },
    {
      id: 4,
      product: "Professional",
      rate: "2,388",
      description: "For small to medium-sized RIAs",
      planType: "Yr",
    },
  ];
}
</script>