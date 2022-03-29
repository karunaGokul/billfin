<template>
  <div class="card" v-if="preAddedAddOns">
    <h3 class="p-4 border-bottom">{{ page }}</h3>
    <div class="w-50 mx-auto m-12">
      <div class="w-75 d-flex m-4 p-8 justify-content-between">
        <div>
          <div class="fs-3 fw-bolder text-dark-black-secondary">
            {{ preAddedAddOns.addOnName }}
          </div>
          <div class="text-gray">
            Current
            {{
              preAddedAddOns.addOnName == "Admin User License"
                ? "Users"
                : "Connectors"
            }}
            - {{ preAddedAddOns.quantity }}
          </div>
        </div>
        <div>
          <div class="fw-bolder fa-2x text-dark-black-secondary">
            <span class="fs-7">$</span>
            {{
              $filters.currencyDisplayWithoutSymbol(
                preAddedAddOns.paymentAmount / preAddedAddOns.quantity
              )
            }}
            <span class="fs-8 fw-light text-gray"
              >/{{
                preAddedAddOns.commitmentTerm == "ANNUAL" ? "Yr" : "Mo"
              }}</span
            >
          </div>
          <div class="fs-7 fw-light text-gray">
            (Per
            {{
              preAddedAddOns.addOnName == "Admin User License"
                ? "User"
                : "Connector"
            }})
          </div>
        </div>
      </div>

      <div
        class="
          w-75
          d-flex
          m-4
          p-8
          justify-content-between
          align-items-center
          border border-2
          rounded
          border-dashed
        "
        v-for="(item, index) in addOns"
        :key="index"
      >
        <div>
          <div class="fs-3 fw-bolder text-dark-black-secondary">
            {{
              item.addOnName == "Admin User License"
                ? "Add more users"
                : "Add more connectors"
            }}
          </div>
          <div class="p-2 ps-0">
            <select
              class="form-select form-select-solid"
              style="width: 100px"
              v-model="item.quantity"
            >
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>
        </div>
        <div>
          <div class="fw-bolder fa-2x text-dark-black-secondary">
            <span class="fs-7">$</span>
            {{ $filters.currencyDisplayWithoutSymbol(item.planAddOnAmount * item.quantity) }}
            <span class="fs-8 fw-light text-gray"
              >/{{
                item.commitmentTerm == "ANNUAL" ? "Yr" : "Mo"
              }}</span
            >
          </div>
        </div>
      </div>

      <div class="text-center mt-10">
        <button class="btn btn-light me-5" @click="back">Cancel</button>
        <button class="btn btn-primary ms-5" @click="next">Continue</button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { useStore } from "vuex";

import { addonsResponseModel } from "@/model";

export default class AddUserConnectors extends Vue {
  @Prop() page: string;

  public quantity: string = "1";
  public amount: number = 0;

  public addOns:Array<addonsResponseModel> = [];

  public store = useStore();

  mounted() {
    if (this.products != "") {
      if (this.products == "AUM") this.addOns = this.$vuehelper.clone(this.aumBilling.addons);
      else this.addOns = this.$vuehelper.clone(this.subscriptionBilling.addons);
    } else this.$router.push("/my-subscription");
  }

  public next() {

    this.store.dispatch("updateAddons", {
      product: this.products,
      addons: this.addOns,
    });

    console.log(this.addOns);

    this.$emit("next");
  }

  get preAddedAddOns() {
    let addOns: addonsResponseModel = new addonsResponseModel();
    if (this.products) {
      if (this.products == "AUM") addOns = this.aumBilling.addMoreAddOns;
      else addOns = this.subscriptionBilling.addMoreAddOns;
    }
    return addOns;
  }

  public back() {
    this.$router.push("/my-subscription");
  }

  get aumBilling() {
    return this.store.getters.aumBilling;
  }

  get subscriptionBilling() {
    return this.store.getters.subscriptionBilling;
  }

  get products() {
    return this.store.getters.products.toString();
  }
}
</script>