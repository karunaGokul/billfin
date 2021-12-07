<template>
  <div class="card">
    <div class="p-4 fw-bolder text-center mt-4 fs-4 text-dark-gray">
      Add New Payment Method
    </div>
    <div class="text-center m-4">
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
            'btn-success': paymenyType == 'Credit Card',
            'text-muted': paymenyType != 'Credit Card',
          }"
          @click="paymenyType = 'Credit Card'"
        >
          Credit Card
        </button>
      </div>
    </div>
    <ACH @back="onExit" @pay="onPayNow" v-if="paymenyType == 'ACH'" />
    <credit-card
      @back="onExit"
      @pay="onPayNow"
      v-if="paymenyType == 'Credit Card'"
    />
  </div>
</template>
<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { Inject } from "vue-property-decorator";

import { useStore } from "vuex";

import ACH from "@/components/controls/ACH.vue";
import CreditCard from "@/components/controls/creditCard.vue";

@Options({
  components: {
    ACH,
    CreditCard,
  },
})
export default class PaymentMethod extends Vue {
  public paymenyType: string = "Credit Card";
  public store = useStore();

  onExit() {
    this.$router.push("/bills-payments");
  }
}
</script>