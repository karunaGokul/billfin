<template>
  <div class="m-4">
    <div class="text-center fs-4 fw-bolder mt-10">Choose your add-ons</div>

    <div class="row mt-10">
      <div v-for="(plan, i) in planList" :key="i" class="col-6">
        <div
          v-for="(item, index) in plans.slice(
            i * itemsPerRow,
            (i + 1) * itemsPerRow
          )"
          :key="index"
          class="
            tab-plan
            row
            g-0
            position-relative
            mb-4
            mt-12
            pt-6
            pb-6
            mb-6
            border
            rounded
          "
          :class="{
            'tab-plan-active': item.selected,
            'border-dashed': !item.selected,
          }"
        >
          <div class="col-2 d-flex align-items-center justify-content-center">
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                @click="item.selected = !item.selected"
                :checked="item.selected"
              />
            </div>
          </div>
          <div class="col-7">
            <div class="tab-plan-name fw-bolder">{{ item.planName }}</div>
            <div class="tab-plan-msg">{{ item.planMsg }}</div>
          </div>
          <div class="col-3">
            <div class="tab-plan-price fw-bolder text-center">
              <span class="fs-7">$</span>
              {{ item.planPrice }}
              <span class="fs-8 fw-normal">/ {{ item.planType }}</span>
            </div>
            <div class="tab-plan-extra fs-9 text-left ms-5">
              {{ item.extraMsg }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row mt-6">
      <div class="col-6">
        <div class="d-flex align-items-center justify-content-between">
          <div class="fw-bolder">Number of admin user licenses?</div>
          <div class="w-50">
            <select class="form-select form-select-solid">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <div class="text-center mt-10">
      <button class="btn btn-light me-5">Cancel</button>
      <button class="btn btn-primary ms-5" @click="next">Continue</button>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue } from "vue-class-component";

export default class AddOns extends Vue {
  public itemsPerRow: number = 3;
  public plans: any[] = [
    {
      planName: "Average Daily Balances",
      planPrice: "10",
      planMsg: "Support ADB calculations and reporting",
      planType: "Mon",
      extraMsg: "",
      selected: false,
    },
    {
      planName: "Flow Billing",
      planPrice: "40",
      planMsg: "Adjust billing for intra-period flows",
      planType: "Mon",
      extraMsg: "",
      selected: false,
    },
    {
      planName: "Admin User Licensetimate",
      planPrice: "20",
      planMsg: "Additional admin user access license",
      planType: "Mon",
      extraMsg: "per user",
      selected: false,
    },
    {
      planName: "Multi-Fee Accounts",
      planPrice: "40",
      planMsg: "Multiple fee calculations per account",
      planType: "Mon",
      extraMsg: "",
      selected: false,
    },
    {
      planName: "Revenue Sharing",
      planPrice: "40",
      planMsg: "Flexible revenue sharing and fee splitting",
      planType: "Mon",
      extraMsg: "",
      selected: false,
    },
    {
      planName: "Multiple Connectors",
      planPrice: "40",
      planMsg: "Connect BillFin to multiple custody sources",
      planType: "Mon",
      extraMsg: "per connector",
      selected: false,
    },
  ];

  public next() {
    this.$emit('next');
  }

  get planList() {
    return Array.from(
      Array(Math.ceil(this.plans.length / this.itemsPerRow)).keys()
    );
  }
}
</script>