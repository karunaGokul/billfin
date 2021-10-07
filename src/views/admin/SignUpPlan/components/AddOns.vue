<template>
  <div class="m-4">
    <div class="text-center fs-4 fw-bolder mt-10">Choose your Add-ons</div>

    <div class="row mt-10">
      <div v-for="(plan, i) in getPlanList" :key="i" class="col-6">
        <div
          v-for="(item, index) in plans.slice(
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
          <div v-if="item.planName == 'Admin User License'">
            <div class="row g-0 mt-6">
              <div class="col-2"></div>
              <div class="fw-bolder col-7" style="line-height: 3;">Number of admin user licenses?</div>
              <div class="col-3">
                <select
                  class="form-select form-select-solid"
                  style="width: 100px"
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
import { Prop } from "vue-property-decorator";

export default class AddOns extends Vue {
  @Prop() planType: string;

  public itemsPerRow: number = 3;
  public plans: any[] = [];

  mounted() {
    this.plans = this.planList[this.planType].plans;
  }

  public planList: any = {
    Annual: {
      plans: [
        {
          planName: "Average Daily Balances",
          planPrice: "120",
          planMsg: "Support ADB calculations and reporting",
          planType: "Yr",
          extraMsg: "",
          selected: true,
        },
        {
          planName: "Flow Billing",
          planPrice: "480",
          planMsg: "Adjust billing for intra-period flows",
          planType: "Yr",
          extraMsg: "",
          selected: false,
        },
        {
          planName: "Admin User License",
          planPrice: "240",
          planMsg: "Additional admin user access license",
          planType: "Yr",
          extraMsg: "per user",
          selected: true,
        },
        {
          planName: "Multi-Fee Accounts",
          planPrice: "480",
          planMsg: "Multiple fee calculations per account",
          planType: "Yr",
          extraMsg: "",
          selected: false,
        },
        {
          planName: "Revenue Sharing",
          planPrice: "480",
          planMsg: "Flexible revenue sharing and fee splitting",
          planType: "Yr",
          extraMsg: "",
          selected: true,
        },
        {
          planName: "Multiple Connectors",
          planPrice: "240",
          planMsg: "Connect BillFin to multiple custody sources",
          planType: "Yr",
          extraMsg: "per connector",
          selected: false,
        },
      ],
    },
    Monthly: {
      plans: [
        {
          planName: "Average Daily Balances",
          planPrice: "12",
          planMsg: "Support ADB calculations and reporting",
          planType: "Mon",
          extraMsg: "",
          selected: true,
        },
        {
          planName: "Flow Billing",
          planPrice: "50",
          planMsg: "Adjust billing for intra-period flows",
          planType: "Mon",
          extraMsg: "",
          selected: false,
        },
        {
          planName: "Admin User License",
          planPrice: "25",
          planMsg: "Additional admin user access license",
          planType: "Mon",
          extraMsg: "per user",
          selected: true,
        },
        {
          planName: "Multi-Fee Accounts",
          planPrice: "50",
          planMsg: "Multiple fee calculations per account",
          planType: "Mon",
          extraMsg: "",
          selected: false,
        },
        {
          planName: "Revenue Sharing",
          planPrice: "50",
          planMsg: "Flexible revenue sharing and fee splitting",
          planType: "Mon",
          extraMsg: "",
          selected: true,
        },
        {
          planName: "Multiple Connectors",
          planPrice: "25",
          planMsg: "Connect BillFin to multiple custody sources",
          planType: "Mon",
          extraMsg: "per connector",
          selected: false,
        },
      ],
    },
  };

  public next() {
    this.$emit("next");
  }

  public back() {
    this.$emit("back");
  }

  get getPlanList() {
    return Array.from(
      Array(Math.ceil(this.plans.length / this.itemsPerRow)).keys()
    );
  }
}
</script>