<template>
  <div class="m-4">
    <div class="text-center fs-4 fw-bolder mt-10">Choose your Add-ons</div>

    <div class="row mt-10" v-if="addons.length > 0">
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
              <div class="tab-plan-name fw-bolder">{{ item.addOnName }}</div>
              <div class="tab-plan-msg">{{ item.description }}</div>
            </div>
            <div class="col-3">
              <div class="tab-plan-price fw-bolder text-center">
                <span class="fs-7">$</span>
                {{ item.planAddOnamount }}
                <span class="fs-8 fw-normal">/ {{ item.planType }}</span>
              </div>
              <div class="tab-plan-extra fs-9 text-left ms-5">
                {{ item.extraInfo }}
              </div>
            </div>
          </div>
          <div v-if="item.addOnName == 'Admin User License'">
            <div class="row g-0 mt-6">
              <div class="col-2"></div>
              <div class="fw-bolder col-7" style="line-height: 3;">Number of admin user licenses?</div>
              <div class="col-3">
                <select
                  class="form-select form-select-solid"
                  style="width: 100px"
                  v-model="item.quantity"
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
import { Inject } from "vue-property-decorator";

import { useStore } from "vuex";

import { ISubscripeService } from "@/service";
import { addonsRequestModel, addonsResponseModel } from "@/model";

export default class AddOns extends Vue {
  @Inject("subscripeService") service: ISubscripeService;

  public itemsPerRow: number = 3;
  public store = useStore();
  public addons: Array<addonsResponseModel> = [];

   public Annual: any = [
    {
      addOnName: "Average Daily Balances",
      description: "Support ADB calculations and reporting",
      planType: "Yr",
      extraInfo: "",
      selected: true,
      quantity: '1',
    },
    {
      addOnName: "Flow Billing",
      description: "Adjust billing for intra-period flows",
      planType: "Yr",
      extraInfo: "",
      selected: false,
      quantity: '1',
    },
    {
      addOnName: "Admin User License",
      description: "Additional admin user access license",
      planType: "Yr",
      extraInfo: "per user",
      selected: false,
      quantity: '1',
    },
    {
      addOnName: "Multi-Fee Accounts",
      description: "ultiple fee calculations per account",
      planType: "Yr",
      extraInfo: "",
      selected: false,
      quantity: '1',
    },
    {
      addOnName: "Revenue Sharing",
      description: "Flexible revenue sharing and fee splitting",
      planType: "Yr",
      extraInfo: "",
      quantity: '1',
      selected: false,
    },
    {
      addOnName: "Multiple Connectors",
      description: "Connect BillFin to multiple custody sources",
      planType: "Yr",
      extraInfo: "per connector",
      quantity: '1',
      selected: false,
    }
  ];

  public Monthly: any = [
   {
      addOnName: "Average Daily Balances",
      description: "Support ADB calculations and reporting",
      planType: "Mon",
      extraInfo: "",
      selected: true,
      quantity: '1',
    },
    {
      addOnName: "Flow Billing",
      description: "Adjust billing for intra-period flows",
      planType: "Mon",
      extraInfo: "",
      selected: false,
      quantity: '1',
    },
    {
      addOnName: "Admin User License",
      description: "Additional admin user access license",
      planType: "Mon",
      extraInfo: "per user",
      selected: false,
      quantity: '1',
    },
    {
      addOnName: "Multi-Fee Accounts",
      description: "ultiple fee calculations per account",
      planType: "Mon",
      extraInfo: "",
      selected: false,
      quantity: '1',
    },
    {
      addOnName: "Revenue Sharing",
      description: "Flexible revenue sharing and fee splitting",
      planType: "Mon",
      extraInfo: "",
      quantity: '1',
      selected: false,
    },
    {
      addOnName: "Multiple Connectors",
      description: "Connect BillFin to multiple custody sources",
      planType: "Yr",
      extraInfo: "per connector",
      quantity: '1',
      selected: false,
    }
  ];
  

  created() {
    this.getAddons();
  }

  private getAddons() {
    const request = new addonsRequestModel();
    request.termPlanId = this.store.getters.getPlan.termPlanId;
    this.service.getAddons(request).then((response) => {
      this.bindAddons(response, this.commitmentTerm == "Annual" ? this.Annual: this.Monthly);
    }).catch((err) =>{
      console.log(err);
    })
  }

  private bindAddons(response: Array<addonsResponseModel>, selectedTerm: any) {
    this.addons = [];
    response.forEach((item) => {
        selectedTerm.forEach((addons: { addOnName: string; description: string; planType: string; extraInfo: string; selected: boolean; quantity: string; }) => {
          if (item.addOnName == addons.addOnName) {
            this.addons.push({
              termPlanAddOnId: item.termPlanAddOnId,
              addOnName: item.addOnName,
              planAddOnamount: item.planAddOnamount,
              description: addons.description,
              planType: addons.planType,
              extraInfo: addons.extraInfo,
              selected: addons.selected,
              quantity: addons.quantity
            });
          }
        });
    });
  }

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