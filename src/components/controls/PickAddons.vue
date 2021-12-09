<template>
  <div class="accordion accordion-flush mb-10">
    <div class="accordion-item">
      <h2 class="accordion-header">
        <button
          class="accordion-button fw-bolder fs-4 text-dark-gray"
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
            <div
              v-for="(plan, i) in getPlanList"
              :key="i"
              class="col-xl-6 col-lg-12"
            >
              <div
                v-for="(item, index) in addons.slice(
                  i * itemsPerRow,
                  (i + 1) * itemsPerRow
                )"
                :key="index"
                class="
                  tab-plan
                  position-relative
                  mx-auto
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
                  'bg-primary text-white': item.selected,
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
                        :checked="item.selected"
                        :disabled="item.isPreInclueded"
                        @change="updateAddons(item)"
                      />
                    </div>
                  </div>
                  <div class="col-7 d-flex justify-content-center flex-column">
                    <div class="fs-3 fw-bolder">
                      {{ item.addOnName }}
                    </div>
                    <div
                      :class="{
                        'text-white': item.selected,
                        'text-gray': !item.selected,
                      }"
                      v-if="item.addOnName != 'Admin User License'"
                    >
                      {{ item.description }}
                    </div>
                    <div v-if="item.addOnName == 'Admin User License'">
                      <div class="row g-0">
                        <div class="fw-bolder col-7" style="line-height: 3">
                          Add more users?
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
                    </div>
                    <div
                      v-if="item.addOnName == 'Multi-Connector Integrations'"
                    >
                      <div class="row g-0">
                        <div class="fw-bolder col-7" style="line-height: 3">
                          Add more connectors?
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
                    </div>
                  </div>
                  <div class="col-4">
                    <div class="text-center">
                      <span class="fs-7">$</span>
                      <span class="fa-3x fw-bolder">
                        {{
                          $filters.currencyDisplayWithoutSymbol(
                            item.planAddOnamount
                          )
                        }}</span
                      >
                      <span
                        class="fs-8 fw-light"
                        :class="{
                          'text-white': item.selected,
                          'text-gray-secondary': !item.selected,
                        }"
                        >/ {{ item.planType }}</span
                      >
                    </div>
                    <div
                      class="fs-7 text-center ms-5 fw-light"
                      :class="{
                        'text-white': item.selected,
                        'text-gray': !item.selected,
                      }"
                      v-if="item.extraInfo"
                    >
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
import {
  subscribeAddonsRequestModel,
  subscribeAddonsResponseModel,
} from "@/model";
export default class PickAddons extends Vue {
  @Prop() product: string;
  @Prop() termPlanId: number;

  @Inject("subscripeService") service: ISubscripeService;

  public itemsPerRow: number = 0;
  public store = useStore();
  public addons: Array<subscribeAddonsResponseModel> = [];

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
      addOnName: "Multi-Fee Billing",
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
      addOnName: "Multi-Connector Integrations",
      description: "Integrate with multiple custody sources",
      extraInfo: "Per Connector",
      quantity: "1",
      selected: false,
    },
    {
      addOnName: "Product Attribution",
      description: "Integrate with multiple custody sources",
      extraInfo: "$150/month",
      quantity: "1",
      selected: false,
    },
  ];

  mounted() {
    let addons: Array<subscribeAddonsResponseModel> = [];
    if (this.product == "AUM") {
      if (this.aumBilling.plan.preIncludedAddons.length > 0)
        addons = this.aumBilling.plan.preIncludedAddons;
      addons = addons.concat(this.aumBilling.addons);
    } else {
      if (this.subscriptionBilling.plan.preIncludedAddons.length > 0)
        addons = this.subscriptionBilling.plan.preIncludedAddons;
      addons = addons.concat(this.subscriptionBilling.addons);
    }

    if (addons.length > 0) {
      addons = addons.filter(
        (v, i, a) =>
          a.findIndex(
            (t) => t.addOnName === v.addOnName && t.addOnName === v.addOnName
          ) === i
      );
      this.filterAddons(addons);
    }

    this.getAddons();
  }

  private filterAddons(addons: Array<subscribeAddonsResponseModel>) {
    this.addonsList.forEach(
      (item: {
        addOnName: string;
        description: string;
        planType: string;
        extraInfo: string;
        selected: boolean;
        quantity: string;
        isPreInclueded: boolean;
      }) => {
        addons.forEach((selectedAddons: subscribeAddonsResponseModel) => {
          if (item.addOnName == selectedAddons.addOnName) {
            item.selected = true;
            if (selectedAddons.quantity)
              item.quantity = selectedAddons.quantity;
            if (selectedAddons.isPreInclueded) item.isPreInclueded = true;
          }
        });
      }
    );
  }

  private getAddons() {
    const request = new subscribeAddonsRequestModel();
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

  private bindAddons(response: Array<subscribeAddonsResponseModel>) {
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
          isPreInclueded: boolean;
        }) => {
          if (item.addOnName == addons.addOnName) {
            const addOns = {
              termPlanAddOnId: item.termPlanAddOnId,
              addOnName: item.addOnName,
              planAddOnamount: item.planAddOnamount,
              description: addons.description,
              planType: this.commitmentTerm == "Annual" ? "Yr" : "Mon",
              selected: addons.selected,
              quantity: addons.quantity,
              extraInfo: this.commitmentTerm == "Annual" ? addons.extraInfo : "",
              isPreInclueded: addons.isPreInclueded,
            };
            this.addons.push(this.$vuehelper.clone(addOns));
          }
        }
      );
    });
    this.itemsPerRow = Math.round(this.addons.length / 2);
    this.updateAddons();
  }

  public updateAddons(response?: subscribeAddonsResponseModel) {
    if (response) response.selected = !response.selected;
    let payload: any[] = [];
    payload = this.addons.filter((item) => item.selected);
    this.store.dispatch("updateAddons", {
      product: this.product,
      addons: payload,
    });
  }

  get aumBilling() {
    return this.store.getters.aumBilling;
  }

  get subscriptionBilling() {
    return this.store.getters.subscriptionBilling;
  }

  get getPlanList() {
    return Array.from(
      Array(Math.ceil(this.addons.length / this.itemsPerRow)).keys()
    );
  }

  get commitmentTerm() {
    return this.product == "AUM"
      ? this.aumBilling.commitmentTerm
      : this.subscriptionBilling.commitmentTerm;
  }
}
</script>