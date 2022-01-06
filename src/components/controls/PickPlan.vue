<template>
  <div class="accordion accordion-flush mb-10">
    <div class="accordion-item">
      <h2 class="accordion-header">
        <button
          class="accordion-button fw-bolder fs-4 text-dark-gray border-bottom"
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

          <div class="d-flex justify-content-evenly mt-4 mb-4 m-2">
            <div
              class="ms-4 me-4 p-4 pt-12 pb-12 rounded position-relative"
              :class="{
                'border border-primary bg-primary-alpha':
                  item.planName == selectedPlan.planName &&
                  item.planName != 'Enterprise',
                'bg-light':
                  item.planName == 'Enterprise' ||
                  item.planName != selectedPlan.planName,
                'border border-danger bg-danger-light-alpha':
                  item.planName == currentPlan.planName &&
                  item.termPlanId == currentPlan.termPlanId,
              }"
              style="width: 260px"
              @click="updatePlan(item)"
              v-for="(item, index) in plans"
              :key="index"
            >
              <span
                class="
                  badge
                  bg-danger
                  position-absolute
                  start-50
                  translate-middle
                  p-3
                "
                v-if="
                  item.planName == currentPlan.planName &&
                  item.termPlanId == currentPlan.termPlanId
                "
                >Current Plan</span
              >
              <span
                class="
                  badge
                  bg-primary
                  position-absolute
                  start-50
                  translate-middle
                  p-3
                "
                v-if="
                  item.planName == selectedPlan.planName &&
                  item.planName != 'Enterprise'
                "
                >Selected Plan</span
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
                <span class="fs-8 fw-light text-gray"
                  >/ {{ item.planType }}</span
                >
              </div>

              <div class="w-100 mx-auto text-center text-gray p-3">
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
                {{ item.connector }}
              </div>
              <div class="fs-4 text-center text-light-gray pb-4">
                {{ item.planName == "Launch" ? "Connector" : "Connectors" }}
              </div>
              <ul class="mt-6">
                <li
                  v-for="(addOnName, i) in item.planDetails"
                  :key="i"
                  class="fw-bolder text-light-gray pt-2 pb-2"
                >
                  {{ addOnName }}
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
import {
  plansListResponseModel,
  subscribePlanRequestModel,
  subscribePlanResponseModel,
  CommitmentTerm,
} from "@/model";

export default class PickPlan extends Vue {
  @Inject("subscripeService") service: ISubscripeService;

  @Prop() product: string;
  @Prop() planType: string;

  public toggleAccordion: boolean = true;
  public commitmentTerm: string = "Annual";

  public store = useStore();

  public selectedPlan: subscribePlanResponseModel =
    new subscribePlanResponseModel();
  public plans: Array<subscribePlanResponseModel> = [];
  public currentPlan: subscribePlanResponseModel =
    new subscribePlanResponseModel();

  private planInfo: Array<plansListResponseModel> = [];

  created() {
    this.planInfo = this.store.getters.planList;
    if (this.product == "AUM") {
      if (this.aumBilling.commitmentTerm)
        this.commitmentTerm = this.aumBilling.commitmentTerm;
      this.selectedPlan = this.aumBilling.plan;
      this.currentPlan = this.aumBilling.currentPlan;
    } else {
      if (this.subscriptionBilling.commitmentTerm)
        this.commitmentTerm = this.subscriptionBilling.commitmentTerm;
      this.selectedPlan = this.subscriptionBilling.plan;
      this.currentPlan = this.subscriptionBilling.currentPlan;
    }
  }

  mounted() {
    this.getPlans();
  }

  private getPlans() {
    const request: subscribePlanRequestModel = new subscribePlanRequestModel();
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

  private bindPlans(response: Array<subscribePlanResponseModel>) {
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
          planDetails: Array<string>;
          preIncludedAddons: Array<any>;
        }) => {
          if (item.planName == plan.planName) {
            this.plans.push({
              termPlanId: item.termPlanId,
              planId: item.planId,
              planName: item.planName,
              termPlanAmount: item.termPlanAmount,
              description: plan.description,
              planType: this.commitmentTerm == "Annual" ? "Yr" : "Mon",
              aumLevel: plan.aumLevel,
              adminUsers: plan.adminUsers,
              clients: plan.clients,
              connector: plan.connector,
              planDetails: plan.planDetails,
              preIncludedAddons: plan.preIncludedAddons,
            });
          }
        }
      );
    });
    if (
      Object.keys(this.selectedPlan).length == 0 &&
      Object.keys(this.currentPlan).length == 0
    )
      this.updatePlan(this.plans[0]);
    else this.sortPlan();
  }

  private sortPlan() {
    let plans: Array<subscribePlanResponseModel> = [];

    this.plans.forEach((plan: subscribePlanResponseModel) => {
      if (
        plan.planName == this.currentPlan.planName &&
        plan.termPlanId == this.currentPlan.termPlanId
      ) {
        plans[0] = plan;
      }
    });

    if (plans.length > 0) {
      this.plans.forEach((plan: subscribePlanResponseModel) => {
        if (plan.planName != this.currentPlan.planName) {
          plans.push(plan);
        }
      });

      this.plans = plans;
    }
  }

  public updateCommitmentTerm(commitmentTerm: string) {
    this.commitmentTerm = commitmentTerm;
    this.selectedPlan = new subscribePlanResponseModel();
    this.getPlans();
  }

  public updatePlan(plan: subscribePlanResponseModel) {
    if (plan.termPlanId != this.currentPlan.termPlanId) {
      if (this.planType == "Change Plan")
        this.store.dispatch(
          "updatePlanAction",
          plan.termPlanAmount > this.currentPlan.paymentAmount
            ? "UPGRADE"
            : "DOWNGRADE"
        );
      this.selectedPlan = plan;
      this.$emit("update", {
        product: this.product,
        plan: plan,
        addons: [],
        currentPlan: this.currentPlan,
        commitmentTerm: this.commitmentTerm,
      });
    }
  }

  get aumBilling() {
    return this.store.getters.aumBilling;
  }

  get subscriptionBilling() {
    return this.store.getters.subscriptionBilling;
  }
}
</script>