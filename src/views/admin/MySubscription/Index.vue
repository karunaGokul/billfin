<template>
  <div class="subscription-container">
    <div class="tab-group">
      <div class="tab-header pt-4 pb-4">
        <ul class="tab-label-group border-bottom fs-5 position-relative">
          <li
            class="tab-label pb-4 m-0"
            :class="{ 'tab-active': activeBilling == 'AUM Billing' }"
            @click="activeBilling = 'AUM Billing'"
          >
            AUM Billing
          </li>
          <li
            class="tab-label pb-4"
            :class="{ 'tab-active': activeBilling == 'Subscription Billing' }"
            @click="activeBilling = 'Subscription Billing'"
          >
            Subscription Billing
          </li>
          <button
            type="button"
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
          </button>
        </ul>
      </div>
      <div class="tab-content-group">
        <aum-subscription-billing
          :bliingType="activeBilling"
        />
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
  public activeBilling: string = "AUM Billing";
}
</script>