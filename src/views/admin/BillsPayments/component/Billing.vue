<template>
  <div class="card mt-2 mb-4">
    <table class="w-100">
      <thead>
        <tr>
          <th class="p-4 border-bottom border-light-gray">Item</th>
          <th class="p-4 border-bottom border-light-gray">Product</th>
          <th class="p-4 border-bottom border-light-gray">Term</th>
          <th class="p-4 border-bottom border-light-gray text-end">Amount</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) of plans" :key="index">
          <td class="p-4 border-bottom border-light-gray">
            <div class="fw-bolder">{{ item.planName }}</div>
            <div class="text-gray">{{ item.description }}</div>
          </td>
          <td class="p-4 fw-bolder border-bottom border-light-gray">{{ item.product }}</td>
          <td class="p-4 fw-bolder border-bottom border-light-gray">{{ item.commitmentTerm }}</td>
          <td class="p-4 fw-bolder border-bottom text-end border-light-gray">{{ item.termPlanAmount }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script lang="ts">
import { Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";

export default class Billng extends Vue {
  @Prop() plans: any;
}
</script>