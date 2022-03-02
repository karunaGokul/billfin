<template>
  <div class="card mt-2 mb-4 rounded">
    <table class="w-100 fs-5">
      <thead>
        <tr>
          <th class="p-5 text-dark-gray border-bottom border-light-gray">
            Item
          </th>
          <th class="p-5 text-dark-gray border-bottom border-light-gray">
            Product
          </th>
          <th class="p-5 text-dark-gray border-bottom border-light-gray">
            Term
          </th>
          <th
            class="p-5 text-dark-gray border-bottom border-light-gray text-end"
          >
            Amount
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) of invoices" :key="index">
          <td class="p-5 border-bottom border-light-gray">
            <div class="fw-bolder text-dark-gray">{{ item.planName }}</div>
            <div
              class="text-gray pt-2 pb-2"
              v-if="
                item.planName != 'Admin User License' &&
                item.planName != 'Multi-Connector Integrations'
              "
            >
              {{ description(item.type, item.planName) }}
            </div>
            <div class="text-gray pt-2 pb-2" v-if="item.planName == 'Admin User License'">
              Number of users: {{ item.quantity }}
            </div>
            <div class="text-gray pt-2 pb-2" v-if="item.planName == 'Multi-Connector Integrations'">
              Number of connectors: {{ item.quantity }}
            </div>
          </td>
          <td
            class="p-5 fw-bolder text-dark-gray border-bottom border-light-gray"
          >
            {{ item.product == "AUM" ? "AUM" : "Subscription" }} Billing
            {{ item.type == "Plan" ? "Plan" : "Add-on" }}
          </td>
          <td
            class="p-5 fw-bolder text-dark-gray border-bottom border-light-gray"
          >
            {{ item.planTerm == "ANNUAL" ? "Annual" : "Monthly" }}
          </td>
          <td
            class="
              fw-bolder
              fa-2x
              p-5
              fw-bolder
              text-dark-gray
              border-bottom
              text-end
              border-light-gray
            "
          >
            <span class="fs-7">$</span>
            {{ $filters.currencyDisplayWithoutSymbol(item.termPlanAmount) }}
            <span class="fs-8 fw-light"
              >/{{ item.planTerm == "ANNUAL" ? "Yr" : "Mo" }}</span
            >
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script lang="ts">
import { Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";

import { useStore } from "vuex";

import { invoicesResponseModel } from "@/model";

export default class Billng extends Vue {
  @Prop() products: Array<invoicesResponseModel>;

  public store = useStore();

  public description(type: string, planName: string) {
    if (type == "Plan")
      return this.planList.find((e: any) => e.planName == planName).description;
    else
      return this.addOnsList.find((e: any) => e.addOnName == planName)
        .description;
  }

  get planList() {
    return this.store.getters.planList;
  }

  get addOnsList() {
    return this.store.getters.addOnsList;
  }
}
</script>