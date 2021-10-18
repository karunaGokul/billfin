<template>
  <div class="text-center m-6">
    <div class="btn-group border rounded p-1">
      <button
        type="button"
        class="btn rounded"
        :class="{
          'btn-success': paymenyType == 'ACH',
          'text-muted': paymenyType != 'ACH',
        }"
        @click="paymenyType = 'ACH'"
      >
        ACH
      </button>
      <button
        type="button"
        class="btn rounded"
        :class="{
          'btn-success': paymenyType == 'Credit card',
          'text-muted': paymenyType != 'Credit card',
        }"
        @click="paymenyType = 'Credit card'"
      >
        Credit card
      </button>
    </div>
  </div>
  <ACH v-if="paymenyType == 'ACH'" />
  <credit-card @next="onNext" v-if="paymenyType == 'Credit card'" />
</template>
<script lang="ts">
import { Vue, Options } from "vue-class-component";

import ACH from "./components/ACH.vue";
import CreditCard from "./components/creditCard.vue";

@Options({
  components: {
    ACH,
    CreditCard,
  },
})
export default class Index extends Vue {
  public paymenyType: string = "Credit card";

  onNext() {
    this.$emit("next");
  }
}
</script>