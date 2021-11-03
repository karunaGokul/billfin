<template>
  <div class="signup-plan-container">
    <div class="card ms-6 me-6 mb-6">
      <div class="card-header align-items-center">
        <div class="card-title fw-bolder fs-4">My Subscription</div>
        <button type="button" class="btn btn-primary">Change Plan</button>
      </div>
      <div class="card-body p-0">
        <plan-addons :plans="plans" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { Inject } from "vue-property-decorator";

import PlanAddons from "./components/PlanAddons.vue";

import { IAddressService } from "@/service";

@Options({
  components: {
    PlanAddons,
  },
})
export default class Index extends Vue {
  @Inject("addressService") service: IAddressService;

  mounted() {
    //this.service.getPick();
  }

  plans: any = [
    {
      id: 3,
      product: "Standard",
      rate: "1,188",
      description: "For small to medium-sized RIAs",
      planType: "Yr"
    },
    {
      id: 4,
      product: "Professional",
      rate: "2,388",
      description: "For small to medium-sized RIAs",
      planType: "Yr"
    },
  ];
}
</script>