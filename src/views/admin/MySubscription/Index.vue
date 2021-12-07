<template>
  <div class="subscription-container">
    <div class="tab-group">
      <div class="tab-header pt-4 pb-4">
        <ul class="tab-label-group border-bottom fs-5 position-relative">
          <li
            class="tab-label pb-4 m-0"
            :class="{ 'tab-active': selectedBillingType == 'AUM' }"
            @click="selectedBillingType = 'AUM'"
          >
            AUM Billing
          </li>
          <li
            class="tab-label pb-4"
            :class="{ 'tab-active': selectedBillingType == 'SUBSCRIPTION' }"
            @click="selectedBillingType = 'SUBSCRIPTION'"
          >
            Subscription Billing
          </li>
          <router-link
            to="/bills-payments"
            tag="button"
            class="
              btn btn-outline-primary
              border border-primary
              position-absolute
              bottom-50
              end-0
              fw-bolder
            "
          >
            Bills & Payments
          </router-link>
        </ul>
      </div>
      <div class="tab-content-group">
        <template v-for="(item, index) in bliingTypes" :key="index">
          <aum-subscription-billing
            :bliingType="item"
            v-if="selectedBillingType == item"
          />
        </template>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Options } from "vue-class-component";

import AumSubscriptionBilling from "./components/AumSubscriptionBilling.vue";

@Options({
  components: {
    AumSubscriptionBilling,
  },
})
export default class Index extends Vue {
  public bliingTypes: Array<string> = ["AUM", "SUBSCRIPTION"];
  public selectedBillingType: string = "AUM";
}
</script>