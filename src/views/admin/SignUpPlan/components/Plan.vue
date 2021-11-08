<template>
  <div class="m-4">
    <div class="row">
      <div class="col-6 mt-4">
        <div class="fw-bold me-4 text-end">Commitment term</div>
      </div>
      <div class="col-6">
        <div class="btn-group border rounded p-1">
          <button
            type="button"
            class="btn rounded"
            :class="{
              'btn-success': commitmentTerm == 'Annual',
              'text-muted': commitmentTerm != 'Annual',
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
              'text-muted': commitmentTerm != 'Monthly',
            }"
            @click="updateCommitmentTerm('Monthly')"
          >
            Monthly
          </button>
        </div>
        <div class="text-start text-success p-2 fw-bold">
          {{ planOffer }}
        </div>
      </div>
    </div>

    <div class="row g-0 mt-6" v-if="plans.length > 0">
      <div class="col-6">
        <div v-for="(item, index) in plans" :key="index">
          <div
            class="tab-plan border rounded mb-4 position-relative"
            :class="{
              'tab-plan-active': item.planName == selectedPlan.planName,
              'border-dashed': item.planName != selectedPlan.planName,
            }"
          >
            <div class="row g-0 pt-6 pb-6 h-100">
              <div
                class="col-2 d-flex align-items-center justify-content-center"
              >
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    @change="updatePlan(item)"
                    :checked="item.planName == selectedPlan.planName"
                  />
                </div>
              </div>
              <div class="col-6">
                <div class="tab-plan-name fw-bolder">{{ item.planName }}</div>
                <div class="tab-plan-msg">{{ item.description }}</div>
              </div>
              <div class="col-4">
                <template v-if="item.planName != 'Enterprise'">
                  <div class="tab-plan-price fw-bolder text-center">
                    <span class="fs-7">$</span>
                    {{ item.termPlanAmount }}
                    <span class="fs-8 fw-normal">/ {{ item.planType }}</span>
                  </div>
                  <div
                    class="tab-plan-extra fs-9 text-center"
                    v-if="commitmentTerm == 'Annual'"
                  >
                    {{ item.extraInfo }}
                  </div>
                </template>
                <template v-else>
                  <div class="text-center lh-5">
                    <button type="button" class="btn btn-warning btn-sm">
                      Contact Us
                    </button>
                  </div>
                </template>
              </div>
            </div>
            <div
              class="
                tab-plan-extra
                fs-8
                text-end
                position-absolute
                bottom-0
                end-0
                me-4
              "
              v-if="commitmentTerm == 'Monthly'"
            >
              {{ item.extraInfo }}
            </div>
          </div>
        </div>
      </div>
      <div class="col-1"></div>
      <div class="col-5">
        <div class="card bg-light p-8">
          <div class="fs-2 fw-bolder">
            What’s in the {{ selectedPlan.product }} Plan?
          </div>
          <div class="text-muted mt-3">
            Designed for the starting to small RIA
          </div>

          <div
            v-for="(data, i) in selectedPlan.planDetails"
            :key="i"
            class="mt-7 fw-bold text-dark"
          >
            <div class="row g-0">
              <div class="col-10">
                {{ data.planInfo }}
              </div>
              <div class="col-2">
                <i
                  class="fas fa-check-circle text-success"
                  v-if="data.access"
                ></i>
                <i class="far fa-times-circle text-danger" v-else></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="text-center mt-10" v-if="plans.length > 0">
      <button class="btn btn-light me-5">Cancel</button>
      <button class="btn btn-primary ms-5" @click="next">Continue</button>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue } from "vue-class-component";
import { Inject } from "vue-property-decorator";

import { useStore } from "vuex";

import { ISubscripeService } from "@/service";

import { planRequestModel, planResponseModel, CommitmentTerm } from "@/model";

export default class Plan extends Vue {
  @Inject("subscripeService") service: ISubscripeService;

  public store = useStore();
  public commitmentTerm: string = "Annual";
  public selectedPlan: planResponseModel = new planResponseModel();
  public plans: Array<planResponseModel> = [];

  private Annual = [
    {
      planName: "Standard",
      description: "Essentials for the starting to small RIA",
      planType: "Yr",
      extraInfo: "($99/month)",
      planDetails: [
        {
          planInfo: "Up to 3 administrator users",
          access: true,
        },
        {
          planInfo: "Up to 150 clients",
          access: true,
        },
        {
          planInfo: "Up to $500M in AUM",
          access: true,
        },
        {
          planInfo: "Unlimited fee schedules",
          access: true,
        },
        {
          planInfo: "Unlimited invoices",
          access: true,
        },

        {
          planInfo: "Single custodian connector",
          access: true,
        },
        {
          planInfo: "Unlimited email/phone support",
          access: true,
        },
      ],
    },
    {
      planName: "Professional",
      description: "For small to medium-sized RIAs",
      planType: "Yr",
      extraInfo: "($199/month)",
      planDetails: [
        {
          planInfo: "Up to 3 administrator users",
          access: true,
        },
        {
          planInfo: "Up to 150 clients",
          access: true,
        },
        {
          planInfo: "Up to $500M in AUM",
          access: true,
        },
        {
          planInfo: "Unlimited fee schedules",
          access: true,
        },
        {
          planInfo: "Unlimited invoices",
          access: true,
        },

        {
          planInfo: "Single custodian connector",
          access: true,
        },
        {
          planInfo: "Unlimited email/phone support",
          access: true,
        },
      ],
    },
    {
      planName: "Ultimate",
      description: "For medium to large-sized RIAs",
      planType: "Yr",
      extraInfo: "($399/month)",
      planDetails: [
        {
          planInfo: "Up to 3 administrator users",
          access: true,
        },
        {
          planInfo: "Up to 150 clients",
          access: true,
        },
        {
          planInfo: "Up to $500M in AUM",
          access: true,
        },
        {
          planInfo: "Unlimited fee schedules",
          access: true,
        },
        {
          planInfo: "Unlimited invoices",
          access: true,
        },

        {
          planInfo: "Single custodian connector",
          access: true,
        },
        {
          planInfo: "Unlimited email/phone support",
          access: true,
        },
      ],
    },
    {
      planName: "Enterprise",
      description: "For large RIAs requiring custom license",
      planType: "Yr",
      extraInfo: "",
      planDetails: [
        {
          planInfo: "Up to 3 administrator users",
          access: true,
        },
        {
          planInfo: "Up to 150 clients",
          access: true,
        },
        {
          planInfo: "Up to $500M in AUM",
          access: true,
        },
        {
          planInfo: "Unlimited fee schedules",
          access: true,
        },
        {
          planInfo: "Unlimited invoices",
          access: true,
        },

        {
          planInfo: "Single custodian connector",
          access: true,
        },
        {
          planInfo: "Unlimited email/phone support",
          access: true,
        },
      ],
    },
  ];

  private Monthly = [
    {
      planName: "Standard",
      description: "Essentials for the starting to small RIA",
      planType: "Mo",
      extraInfo: "(Save $25 per month with an annual term)",
      planDetails: [
        {
          planInfo: "Up to 3 administrator users",
          access: true,
        },
        {
          planInfo: "Up to 150 clients",
          access: true,
        },
        {
          planInfo: "Up to $500M in AUM",
          access: true,
        },
        {
          planInfo: "Unlimited fee schedules",
          access: true,
        },
        {
          planInfo: "Unlimited invoices",
          access: true,
        },

        {
          planInfo: "Single custodian connector",
          access: true,
        },
        {
          planInfo: "Unlimited email/phone support",
          access: true,
        },
      ],
    },
    {
      planName: "Professional",
      description: "For small to medium-sized RIAs",
      planType: "Mo",
      extraInfo: "(Save $51 per month with an annual term)",
      planDetails: [
        {
          planInfo: "Up to 3 administrator users",
          access: true,
        },
        {
          planInfo: "Up to 150 clients",
          access: true,
        },
        {
          planInfo: "Up to $500M in AUM",
          access: true,
        },
        {
          planInfo: "Unlimited fee schedules",
          access: true,
        },
        {
          planInfo: "Unlimited invoices",
          access: true,
        },

        {
          planInfo: "Single custodian connector",
          access: true,
        },
        {
          planInfo: "Unlimited email/phone support",
          access: true,
        },
      ],
    },
    {
      planName: "Ultimate",
      description: "For medium to large-sized RIAs",
      planType: "Mo",
      extraInfo: "(Save $101 per month with an annual term)",
      planDetails: [
        {
          planInfo: "Up to 3 administrator users",
          access: true,
        },
        {
          planInfo: "Up to 150 clients",
          access: true,
        },
        {
          planInfo: "Up to $500M in AUM",
          access: true,
        },
        {
          planInfo: "Unlimited fee schedules",
          access: true,
        },
        {
          planInfo: "Unlimited invoices",
          access: true,
        },

        {
          planInfo: "Single custodian connector",
          access: true,
        },
        {
          planInfo: "Unlimited email/phone support",
          access: true,
        },
      ],
    },
    {
      planName: "Enterprise",
      description: "For large RIAs requiring custom license",
      planType: "Mo",
      extraInfo: "",
      planDetails: [
        {
          planInfo: "Up to 3 administrator users",
          access: true,
        },
        {
          planInfo: "Up to 150 clients",
          access: true,
        },
        {
          planInfo: "Up to $500M in AUM",
          access: true,
        },
        {
          planInfo: "Unlimited fee schedules",
          access: true,
        },
        {
          planInfo: "Unlimited invoices",
          access: true,
        },

        {
          planInfo: "Single custodian connector",
          access: true,
        },
        {
          planInfo: "Unlimited email/phone support",
          access: true,
        },
      ],
    },
  ];

  created() {
    this.getPlans();
  }

  private getPlans() {
    const request: planRequestModel = new planRequestModel();
    request.termPlanType = CommitmentTerm[this.commitmentTerm as keyof typeof CommitmentTerm];
    this.service
      .getPlans(request)
      .then((response) => {
        this.bindPlans(
          response,
          this.commitmentTerm == "Annual" ? this.Annual : this.Monthly
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  private bindPlans(response: Array<planResponseModel>, selectedTerm: any) {
    this.plans = [];
    response.forEach((item) => {
      selectedTerm.forEach(
        (plan: {
          planName: string;
          description: any;
          planType: any;
          extraInfo: any;
          planDetails: any;
        }) => {
          if (item.planName == plan.planName) {
            this.plans.push({
              termPlanId: item.termPlanId,
              planName: item.planName,
              termPlanAmount: item.termPlanAmount,
              description: plan.description,
              planType: plan.planType,
              extraInfo: plan.extraInfo,
              planDetails: plan.planDetails,
            });
          }
        }
      );
    });
    this.selectedPlan = this.plans[0];
  }

  public updateCommitmentTerm(plan: string) {
    this.commitmentTerm = plan;
    this.getPlans();
  }

  public updatePlan(plan: any) {
    this.selectedPlan = plan;
  }

  public next() {
    this.store.dispatch("updateTerm", this.commitmentTerm);
    this.store.dispatch("updatePlan", this.selectedPlan);
    this.$emit("next");
  }

  get planOffer() {
    return this.commitmentTerm
      ? "Hooray, you are saving 20% with a 1 year commitment!"
      : "Commit for a year and save up to 20%";
  }
}
</script>