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
          <div class="fs-4 fw-bolder text-center p-4">Choose your Plan</div>
          <div class="row">
            <div class="col-6 mt-4">
              <div class="fw-bolder me-4 text-end fs-5">Commitment term</div>
            </div>
            <div class="col-6">
              <div class="btn-group border rounded p-1">
                <button
                  type="button"
                  class="btn rounded"
                  :class="{
                    'btn-success': commitmentTerm == 'Annual',
                    'text-gray': commitmentTerm != 'Annual',
                  }"
                  @click="updateCommitmentTerm('Annual')"
                >
                  Annual
                </button>
                <button
                  type="button"
                  class="btn rounded"
                  :class="{
                    'btn-success': commitmentTerm == 'Monthly',
                    'text-gray': commitmentTerm != 'Monthly',
                  }"
                  @click="updateCommitmentTerm('Monthly')"
                >
                  Monthly
                </button>
              </div>
            </div>
          </div>
          <div class="text-center text-success p-2 fw-bold">
            {{
              commitmentTerm == "Annual"
                ? "Hooray, you are saving 20% with a 1 year commitment!"
                : "Commit for a year and save up to 20%"
            }}
          </div>

          <div class="d-flex justify-content-evenly mt-6 mb-6">
            <div
              class="w-25 ms-4 me-4 pt-12 pb-12 rounded"
              :class="{
                'border border-primary bg-primary-alpha':
                  item.planName == selectedPlan.planName,
                'bg-light': item.planName != selectedPlan.planName,
              }"
              @click="updatePlan(item)"
              v-for="(item, index) in plans"
              :key="index"
            >
              <div class="fw-bolder p-3 fs-3 text-center mt-4">
                {{ item.planName }}
              </div>
              <div class="p-3 text-center" v-if="item.planName == 'Enterprise'">
                <button type="button" class="btn btn-primary ps-20 pe-20">
                  Contact Us
                </button>
              </div>
              <div class="fa-2x fw-bolder text-center p-3" v-else>
                <span class="fs-7">$</span>
                {{ $filters.currencyDisplayWithoutSymbol(item.termPlanAmount) }}
                <span class="fs-8 fw-light text-gray">/ Yr</span>
              </div>

              <div class="w-75 mx-auto text-center text-gray p-3">
                {{ item.description }}
              </div>
              <div class="fs-4 text-center fw-bolder pt-4">
                {{ item.aumLevel }}
              </div>
              <div class="fs-4 text-center text-light-gray pb-4">AUM Level</div>
              <div class="fs-4 text-center fw-bolder pt-4">
                {{ item.adminUsers }}
              </div>
              <div class="fs-4 text-center text-light-gray pb-4">
                Admin Users
              </div>
              <div class="fs-4 text-center fw-bolder pt-4">
                {{ item.clients }}
              </div>
              <div class="fs-4 text-center text-light-gray pb-4">Clients</div>
              <div class="fs-4 text-center fw-bolder pt-4">
                {{ item.custodian }}
              </div>
              <div class="fs-4 text-center text-light-gray pb-4">Connector</div>
              <ul class="mt-6">
                <li
                  v-for="(details, i) in item.planDetails"
                  :key="i + 1"
                  class="fw-bolder text-light-gray pt-2 pb-2"
                >
                  {{ details }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue } from "vue-class-component";
import { Inject, Prop } from "vue-property-decorator";

import { useStore } from "vuex";

import { ISubscripeService } from "@/service";
import { planRequestModel, planResponseModel, CommitmentTerm } from "@/model";

export default class AumSubscriptionPlan extends Vue {
  @Inject("subscripeService") service: ISubscripeService;

  @Prop() product: string;

  public toggleAccordion: boolean = true;
  public commitmentTerm: string = "Annual";

  public selectedPlan: planResponseModel = new planResponseModel();
  public plans: Array<planResponseModel> = [];

  private planInfo = [
    {
      planName: "Launch",
      description: "Essentials for the starting to small RIA",
      aumLevel: "$500M",
      adminUsers: "2",
      clients: "150",
      connector: "1",
      planDetails: [
        "Unlimited fee schedules",
        "Unlimited invoices",
        "Unlimited email/phone support",
      ],
    },
    {
      planName: "Professional",
      description: "For small to medium-sized RIAs",
      aumLevel: "$500M",
      adminUsers: "3",
      clients: "350",
      connector: "2",
      planDetails: [
        "Everything from Launch Plan",
        "Average Daily Balanaces",
        "Flow Billing Calculdations",
      ],
    },
    {
      planName: "Elite",
      description: "For medium to large-sized RIAs",
      aumLevel: "$500M",
      adminUsers: "5",
      clients: "500",
      connector: "2",
      planDetails: [
        "Everything from Professional Plan",
        "Multi-Fee Billing Calculations",
        "Product Billing Add-on included",
      ],
    },
    {
      planName: "Enterprise",
      description: "For large RIAs requiring custom license",
      aumLevel: "Unlimited",
      adminUsers: "Unlimited",
      clients: "Unlimited",
      connector: "Unlimited",
      planDetails: [
        "Everything from Elite Plan",
        "Advisor Portal",
        "Custom SLAs",
      ],
    },
  ];

  created() {
    this.getPlans();
  }

  private getPlans() {
    const request: planRequestModel = new planRequestModel();
    request.productCode = this.product;
    request.termPlanType =
      CommitmentTerm[this.commitmentTerm as keyof typeof CommitmentTerm];
    this.service
      .getPlans(request)
      .then((response) => {
        this.bindPlans(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  private bindPlans(response: Array<planResponseModel>) {
    this.plans = [];
    response.forEach((item) => {
      this.planInfo.forEach(
        (plan: {
          planName: string;
          description: any;
          aumLevel: string;
          adminUsers: string;
          clients: string;
          connector: string;
          planDetails: any;
        }) => {
          if (item.planName == plan.planName) {
            this.plans.push({
              termPlanId: item.termPlanId,
              planName: item.planName,
              termPlanAmount: item.termPlanAmount,
              description: plan.description,
              planType: this.commitmentTerm == "Annual" ? "Yr" : "Mon",
              aumLevel: plan.aumLevel,
              adminUsers: plan.adminUsers,
              clients: plan.clients,
              connector: plan.connector,
              planDetails: plan.planDetails,
            });
          }
        }
      );
    });
    this.updatePlan(this.plans[0]);
  }

  public updateCommitmentTerm(plan: string) {
    this.commitmentTerm = plan;
    this.getPlans();
  }

  public updatePlan(plan: any) {
    this.selectedPlan = plan;
    this.$emit("update", { product: this.product, plan: plan, commitmentTerm: this.commitmentTerm });
  }
}
</script>