<template>
  <div class="m-4">
    <div class="text-center fs-4 fw-bolder mt-10">Choose your Add-ons</div>

    <div class="row mt-10">
      <div v-for="(plan, i) in getPlanList" :key="i" class="col-6">
        <div
          v-for="(item, index) in addons.slice(
            i * itemsPerRow,
            (i + 1) * itemsPerRow
          )"
          :key="index"
          class="
            tab-plan
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
          <div class="row g-0">
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
              <div class="tab-plan-name fw-bolder">{{ item.product }}</div>
              <div class="tab-plan-msg">{{ item.description }}</div>
            </div>
            <div class="col-3">
              <div class="tab-plan-price fw-bolder text-center">
                <span class="fs-7">$</span>
                {{ item.rate }}
                <span class="fs-8 fw-normal">/ {{ item.planType }}</span>
              </div>
              <div class="tab-plan-extra fs-9 text-left ms-5">
                {{ item.extraMsg }}
              </div>
            </div>
          </div>
          <div v-if="item.planName == 'Admin User License'">
            <div class="row g-0 mt-6">
              <div class="col-2"></div>
              <div class="fw-bolder col-7" style="line-height: 3;">Number of admin user licenses?</div>
              <div class="col-3">
                <select
                  class="form-select form-select-solid"
                  style="width: 100px"
                  v-model="item.noOfAdminUserLicenses"
                >
                  <option selected value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="text-center mt-10">
      <button class="btn btn-light me-5" @click="back">Cancel</button>
      <button class="btn btn-primary ms-5" @click="next">Continue</button>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue } from "vue-class-component";

import { useStore } from "vuex";

export default class AddOns extends Vue {

  public itemsPerRow: number = 3;
  public addons: any[] = [];

  public store = useStore();

  mounted() {
    this.addons = this.planList[this.commitmentTerm].plans;
  }

  public planList: any = {
    Annual: {
      plans: [
        {
          id: 6,
          product: "Average Daily Balances",
          rate: "120",
          description: "Support ADB calculations and reporting",
          planType: "Yr",
          extraMsg: "",
          selected: true,
        },
        {
          id: 7,
          product: "Flow Billing",
          rate: "480",
          description: "Adjust billing for intra-period flows",
          planType: "Yr",
          extraMsg: "",
          selected: false,
        },
        {
          id: 8,
          product: "Admin User License",
          rate: "240",
          description: "Additional admin user access license",
          planType: "Yr",
          extraMsg: "per user",
          selected: true,
          noOfAdminUserLicenses: '1',
        },
        {
          id: 9,
          product: "Multi-Fee Accounts",
          rate: "480",
          description: "Multiple fee calculations per account",
          planType: "Yr",
          extraMsg: "",
          selected: false,
        },
        {
          id: 10,
          product: "Revenue Sharing",
          rate: "480",
          description: "Flexible revenue sharing and fee splitting",
          planType: "Yr",
          extraMsg: "",
          selected: true,
        },
        {
          id: 11,
          product: "Multiple Connectors",
          rate: "240",
          description: "Connect BillFin to multiple custody sources",
          planType: "Yr",
          extraMsg: "per connector",
          selected: false,
        },
      ],
    },
    Monthly: {
      plans: [
        {
          id: 0,
          product: "Average Daily Balances",
          rate: "12",
          description: "Support ADB calculations and reporting",
          planType: "Mon",
          extraMsg: "",
          selected: true,
        },
        {
          id: 0,
          product: "Flow Billing",
          rate: "50",
          description: "Adjust billing for intra-period flows",
          planType: "Mon",
          extraMsg: "",
          selected: false,
        },
        {
          id: 0,
          product: "Admin User License",
          rate: "25",
          description: "Additional admin user access license",
          planType: "Mon",
          extraMsg: "per user",
          selected: true,
        },
        {
          product: "Multi-Fee Accounts",
          rate: "50",
          description: "Multiple fee calculations per account",
          planType: "Mon",
          extraMsg: "",
          selected: false,
        },
        {
          id: 0,
          product: "Revenue Sharing",
          rate: "50",
          description: "Flexible revenue sharing and fee splitting",
          planType: "Mon",
          extraMsg: "",
          selected: true,
        },
        {
          id: 0,
          product: "Multiple Connectors",
          rate: "25",
          description: "Connect BillFin to multiple custody sources",
          planType: "Mon",
          extraMsg: "per connector",
          selected: false,
        },
      ],
    },
  };

  public next() {
    let payload: any[] = [];
    payload = this.addons.filter((item) => item.selected);
    this.store.dispatch('updateAddons', payload);
    this.$emit("next");
  }

  public back() {
    this.$emit("back");
  }

  get getPlanList() {
    return Array.from(
      Array(Math.ceil(this.addons.length / this.itemsPerRow)).keys()
    );
  }

  get commitmentTerm() {
    return this.store.getters.getCommitmentTerm;
  }
}
</script>