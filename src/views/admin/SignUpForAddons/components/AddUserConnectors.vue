<template>
  <div class="card" v-if="addOns">
    <h3 class="p-4 border-bottom">{{ page }}</h3>
    <div class="w-50 mx-auto m-12">
      <div class="w-75 d-flex m-4 p-8 justify-content-between">
        <div>
          <div class="fs-3 fw-bolder text-dark-black-secondary">{{ addOns.addOnName }}</div>
          <div class="text-gray">
            Current
            {{
              addOns.addOnName == "Admin User License" ? "Users" : "Connectors"
            }}
            - {{ addOns.quantity }}
          </div>
        </div>
        <div>
          <div class="fw-bolder fa-2x text-dark-black-secondary">
            <span class="fs-7">$</span>
            {{ $filters.currencyDisplayWithoutSymbol(addOns.paymentAmount) }}
            <span class="fs-8 fw-light text-gray"
              >/{{ addOns.commitmentTerm == "ANNUAL" ? "Yr" : "Mo" }}</span
            >
          </div>
          <div class="fs-7 fw-light text-gray">
            (Per
            {{
              addOns.addOnName == "Admin User License" ? "User" : "Connector"
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
      >
        <div>
          <div class="fs-3 fw-bolder text-dark-black-secondary">
            {{
              addOns.addOnName == "Admin User License"
                ? "Add more users"
                : "Add more connectors"
            }}
          </div>
          <div class="p-2 ps-0">
            <select
              class="form-select form-select-solid"
              style="width: 100px"
              v-model="addOns.quantity"
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
            {{ $filters.currencyDisplayWithoutSymbol(addOns.paymentAmount) }}
            <span class="fs-8 fw-light text-gray"
              >/{{ addOns.commitmentTerm == "ANNUAL" ? "Yr" : "Mo" }}</span
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

  public store = useStore();

  created() {
    if (!this.products) this.$router.push("/my-subscription");
  }

  public next() {
    let addOns:any = null;
    addOns = this.addOns;
    addOns.planAddOnAmount = this.addOns.paymentAmount;
    console.log(addOns);
    this.$emit("next");
  }

  get addOns() {
    let addOnName: string =
        this.page == "Add Users"
          ? "Admin User License"
          : "Multi-Connector Integrations",
      addOns: Array<addonsResponseModel> = null,
      value: addonsResponseModel = null;

    if (this.products) {
      if (this.products == "AUM") addOns = this.aumBilling.addons;
      else if (this.products == "SUBSCRIPTION")
        addOns = this.subscriptionBilling.addons;

      value = addOns.find((item) => {
        return item.addOnName == addOnName;
      });
    }

    console.log(value);

    return value;
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