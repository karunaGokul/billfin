<template>
  <div class="accordion accordion-flush mb-10">
    <div class="accordion-item">
      <h2 class="accordion-header">
        <button
          class="accordion-button fw-bolder fs-4"
          type="button"
          :class="{
            collapsed: !toggleAccordion,
          }"
          @click="toggleAccordion = !toggleAccordion"
        >
          {{ product == "AUM" ? "AUM Billing" : "Subscription Billing" }}
        </button>
      </h2>
      <div
        class="accordion-collapse collapse"
        :class="{ show: toggleAccordion }"
      >
        <div class="card accordion-body">
          <div class="text-center fs-4 fw-bolder mt-2">Choose your Add-ons</div>

          <div class="row mt-2" v-if="addons.length > 0">
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
                  mt-4
                  ps-4
                  pe-4
                  pt-6
                  pb-6
                  border
                  rounded
                "
                :class="{
                  'tab-plan-active': item.selected,
                  'border-dashed': !item.selected,
                }"
              >
                <div class="row g-0">
                  <div
                    class="
                      col-1
                      d-flex
                      align-items-center
                      justify-content-center
                    "
                  >
                    <div class="form-check form-check-success">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        :value="item"
                        @change="updateAddons(item)"
                      />
                    </div>
                  </div>
                  <div class="col-7 d-flex justify-content-center flex-column">
                    <div class="tab-plan-name fw-bolder">
                      {{ item.addOnName }}
                    </div>
                    <div
                      class="tab-plan-msg"
                      v-if="item.addOnName != 'Admin User License'"
                    >
                      {{ item.description }}
                    </div>
                    <div v-if="item.addOnName == 'Admin User License'">
                      <div class="row g-0">
                        <div class="fw-bolder col-7" style="line-height: 3">
                          Number of users?
                        </div>
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
                    <div
                      v-if="
                        item.addOnName == 'Multiple Connectors Integrations'
                      "
                    >
                      <div class="row g-0">
                        <div class="fw-bolder col-7" style="line-height: 3">
                          Number of connectors?
                        </div>
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
                  <div class="col-4">
                    <div class="tab-plan-price fw-bolder text-center">
                      <span class="fs-7">$</span>
                      {{
                        $filters.currencyDisplayWithoutSymbol(
                          item.planAddOnamount
                        )
                      }}
                      <span class="fs-8 fw-light">/ {{ item.planType }}</span>
                    </div>
                    <div class="tab-plan-extra fs-7 text-center ms-5 fw-light">
                      ({{ item.extraInfo }})
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue } from "vue-class-component";
import { Prop, Inject } from "vue-property-decorator";

import { useStore } from "vuex";

import { ISubscripeService } from "@/service";
import { addonsRequestModel, addonsResponseModel } from "@/model";
export default class AumSubscriptionAddon extends Vue {
  @Prop() product: string;
  @Prop() termPlanId: number;

  @Inject("subscripeService") service: ISubscripeService;

  public itemsPerRow: number = 0;
  public store = useStore();
  public addons: Array<addonsResponseModel> = [];

  public toggleAccordion: boolean = true;

  public addonsList: any = [
    {
      addOnName: "Average Daily Balances",
      description: "Support ADB calculations and reporting",
      extraInfo: "$125/month",
      selected: false,
      quantity: "1",
    },
    {
      addOnName: "Flow Billing",
      description: "Adjust billing for intra-period flows",
      extraInfo: "$250/month",
      selected: false,
      quantity: "1",
    },
    {
      addOnName: "Admin User License",
      description: "Additional admin user access license",
      extraInfo: "Per User",
      selected: false,
      quantity: "1",
    },
    {
      addOnName: "Multi-Fee Accounts",
      description: "Multiple fee calculations per account",
      extraInfo: "$150/month",
      selected: false,
      quantity: "1",
    },
    {
      addOnName: "Revenue Sharing",
      description: "Flexible revenue sharing and fee splitting",
      extraInfo: "$500/month",
      quantity: "1",
      selected: false,
    },
    {
      addOnName: "Multiple Connectors Integrations",
      description: "Integrate with multiple custody sources",
      extraInfo: "Per Connector",
      quantity: "1",
      selected: false,
    },
  ];

  created() {
    this.getAddons();
  }

  private getAddons() {
    const request = new addonsRequestModel();
    request.termPlanId = this.termPlanId;
    this.service
      .getAddons(request)
      .then((response) => {
        this.bindAddons(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  private bindAddons(response: Array<addonsResponseModel>) {
    this.addons = [];
    response.forEach((item) => {
      this.addonsList.forEach(
        (addons: {
          addOnName: string;
          description: string;
          planType: string;
          extraInfo: string;
          selected: boolean;
          quantity: string;
        }) => {
          if (item.addOnName == addons.addOnName) {
            this.addons.push({
              termPlanAddOnId: item.termPlanAddOnId,
              addOnName: item.addOnName,
              planAddOnamount: item.planAddOnamount,
              description: addons.description,
              planType: this.commitmentTerm == "Annual" ? "Yr" : "Mon",
              selected: addons.selected,
              quantity: addons.quantity,
              extraInfo: addons.extraInfo,
            });
          }
        }
      );
    });
    this.itemsPerRow = Math.round(this.addons.length / 2);
  }

  public updateAddons(response: addonsResponseModel) {
    response.selected = !response.selected;
    let payload: any[] = [];
    payload = this.addons.filter((item) => item.selected);
    this.store.dispatch("updateAddons", {
      product: this.product,
      addons: payload,
    });
  }

  get getPlanList() {
    return Array.from(
      Array(Math.ceil(this.addons.length / this.itemsPerRow)).keys()
    );
  }

  get commitmentTerm() {
    let commitmentTerm: string = "";
    if (this.product == "AUM")
      commitmentTerm = this.store.getters.getAumBilling.commitmentTerm;
    else
      commitmentTerm = this.store.getters.getSubscriptionBilling.commitmentTerm;
    return commitmentTerm;
  }
}
</script>