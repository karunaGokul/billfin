<template>
  <div class="dropdown-menu show">
    <ul class="p-0">
      <li
        v-for="(item, index) in availableCards"
        :key="index"
        class="dropdown-item p-4 fw-bold ps-6 pe-6"
        :class="{
          'bg-primary text-white': item.cardNumber == selectedCardNumber,
        }"
      >
        <img
          src="@/assets/mastercard.png"
          alt="Card Type"
          v-if="item.cardType == 'mast'"
        />
        <img
          src="@/assets/visa.png"
          alt="Card Type"
          v-if="item.cardType == 'visa'"
        />
        <img
          src="@/assets/amex.png"
          alt="Card Type"
          v-if="item.cardType == 'amex'"
        />
        <img
          src="@/assets/discover.png"
          alt="Card Type"
          v-if="item.cardType == 'disc'"
        />
        {{ item.accountType == "Credit Card" ? $filters.creditCardType(item.cardType) : "Checking" }}
        **** {{ item.cardNumber }}
      </li>
    </ul>
    <div class="border-top text-center pt-2">
      <button type="button" class="btn text-primary">
        <i class="fas fa-plus text-primary"></i>
        Add New
      </button>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";

export default class ChangePaymentInfo extends Vue {
  @Prop() selectedCardNumber: string;
  @Prop() availableCards: any;
}
</script>