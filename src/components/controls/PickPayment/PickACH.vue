<template>
  <ACH v-if="addNewPayment" @back="back" @pay="onPayNow" />
  <template v-else>
    <div class="p-4 ps-10 pe-10">
      <div class="d-flex flex-wrap">
        <div
          class="d-flex border p-4 rounded m-4"
          v-for="(item, index) of cards"
          :key="'card-' + index"
          :class="{
            'border border-primary bg-primary-alpha': item.default,
          }"
        >
          <div>
            <div class="fw-bolder fs-4 p-2">
              {{ item.cardHolderName }}
              <span
                class="badge text-success ms-2 fs-6 bg-success-alpha"
                v-if="item.default"
                >Primary</span
              >
              <span
                class="badge text-orange ms-2 fs-6 bg-orange"
                v-if="!item.default"
                @click="makePrimary(item)"
                >Make Primary</span
              >
            </div>
            <div class="d-flex">
              <div>
                <img src="@/assets/bank.png" alt="Card Type" width="80" />
              </div>
              <div class="pt-2 ps-3">
                <div class="fw-bolder">
                  Checking
                  {{ item.maskNumber.split("x")[1] }}
                </div>
              </div>
            </div>
          </div>
          <div class="d-flex align-items-center p-4">
            <button
              class="btn me-3"
              :title="item.default ? 'This card cannot allowed to delete' : ''"
              :class="{
                'btn-light': item.default,
                'btn-primary': !item.default,
              }"
              @click="!item.default ? confirmation(item) : ''"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
      <div class="m-4">
        <button class="btn btn-primary" type="button" @click="addPayment">
          Add Payment Method
        </button>
      </div>
    </div>
    <div class="mt-6 p-4 d-flex align-items-center justify-content-center">
      <button type="button" class="btn btn-light me-5" @click="back">
        Back
      </button>
      <button
        type="submit"
        class="btn btn-primary ms-5"
        :disabled="cardValidation"
        @click="updateCardDetails"
      >
        Continue
      </button>
    </div>
    <app-delete
      message="Do you really want to delete this payment method?"
      subMessage="This process cannot be undone."
      @cancel="cancelDelete"
      @delete="deleteCard"
      v-if="showDeleteModel"
    />
  </template>
</template>
<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { Prop, Watch } from "vue-property-decorator";

import { useStore } from "vuex";

import ACH from "@/components/controls/ACH.vue";
import AppDelete from "@/components/Models/AppDelete.vue";

import { cardDetailsResponsetModel } from "@/model";

@Options({
  components: {
    ACH,
    AppDelete,
  },
})
export default class PickACH extends Vue {
  @Prop() cards: Array<cardDetailsResponsetModel>;
  @Prop() showPaymentMethod: boolean;

  public store = useStore();
  public addNewPayment: boolean = false;
  public showDeleteModel: boolean = false;

  private selectedCard: cardDetailsResponsetModel =
    new cardDetailsResponsetModel();

  created() {
    this.addNewPayment = this.showPaymentMethod;
  }

  @Watch("showPaymentMethod")
  update() {
    this.addNewPayment = this.showPaymentMethod;
  }

  public back() {
    if (this.cards.length >= 0) this.addNewPayment = false;
    this.$emit("back");
  }

  public addPayment() {
    this.addNewPayment = true;
    this.$emit("addNewPayment");
  }
  public onPayNow() {
    this.$emit("payNow");
  }

  public confirmation(card: cardDetailsResponsetModel) {
    this.selectedCard = card;
    this.showDeleteModel = true;
  }

  public cancelDelete() {
    this.showDeleteModel = false;
    this.selectedCard = new cardDetailsResponsetModel();
  }

  public deleteCard() {
    this.showDeleteModel = false;
    this.$emit("deleteCard", this.selectedCard);
  }

  public makePrimary(card: cardDetailsResponsetModel) {
    this.$emit("makePrimary", card.token);
  }

  public updateCardDetails() {
    this.store.dispatch("updatePaymentType", "ACH");
    let selectedCard =
      this.cards.find((item) => {
        return item.default;
      }) || null;

    let ach = {
      number: selectedCard.cardNumber,
      name: selectedCard.cardHolderName,
    };

    this.store.dispatch("updateACH", ach);
    this.$emit("next");
  }

  get cardValidation() {
    let valid: boolean = false,
      selectedCard =
        this.cards.find((item) => {
          return item.default;
        }) || null;
    selectedCard ? (valid = false) : (valid = true);
    return valid;
  }
}
</script>   