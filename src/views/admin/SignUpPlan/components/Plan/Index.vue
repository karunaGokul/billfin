<template>
  <AumSubscriptionPlan
    v-for="(item, index) in products"
    :key="index"
    :product="item"
  />
  <div class="text-center m-4">
    <button class="btn btn-light me-5" @click="back">Back</button>
    <button class="btn btn-primary ms-5" @click="next">Continue</button>
  </div>
</template>
<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { Inject } from "vue-property-decorator";

import { useStore } from "vuex";

import { ISubscripeService } from "@/service";

import { planRequestModel, planResponseModel, CommitmentTerm } from "@/model";

import AumSubscriptionPlan from "./component/AumSubscriptionPlan.vue";

@Options({
  components: {
    AumSubscriptionPlan,
  },
})
export default class Index extends Vue {
  public selectedBilling: string = "";

  @Inject("subscripeService") service: ISubscripeService;

  public store = useStore();
  public commitmentTerm: string = "Annual";
  public selectedPlan: planResponseModel = new planResponseModel();
  public plans: Array<planResponseModel> = [];

  private Annual = [
    {
      planName: "Launch",
      description: "Essentials for the starting to small RIA",
      planType: "Yr",
      extraInfo: "($100/month)",
      planDetails: [
        {
          planInfo: "Up to 2 administrator users",
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
      extraInfo: "($200/month)",
      planDetails: [
        {
          planInfo: "Everything from Launch Plan",
          access: true,
        },
        {
          planInfo: "+ 1 adminstrator user, for a total of 3",
          access: true,
        },
        {
          planInfo: "+ 200 clients, for a total of 350",
          access: true,
        },
        {
          planInfo: "Average Daily Balanaces",
          access: true,
        },
        {
          planInfo: "Flow Billing Calculdations",
          access: true,
        },
        {
          planInfo: "+ 1 custodian connector, for a total of 2",
          access: true,
        },
        {
          planInfo: "Unlimited email/phone support",
          access: true,
        },
      ],
    },
    {
      planName: "Elite",
      description: "For medium to large-sized RIAs",
      planType: "Yr",
      extraInfo: "($400/month)",
      planDetails: [
        {
          planInfo: "Everything from Professional Plan",
          access: true,
        },
        {
          planInfo: "+ 2 adminstrator users, for a total of 5",
          access: true,
        },
        {
          planInfo: "+ 150 clients, for a total of 500",
          access: true,
        },
        {
          planInfo: "Multi-Fee Billing Calculations",
          access: true,
        },
        {
          planInfo: "Product Categorization",
          access: true,
        },
        {
          planInfo: "+ 1 custodian connector, for a total of 3",
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
          planInfo: "Everything from Elite Plan",
          access: true,
        },
        {
          planInfo: "Unlimited adminstrator users",
          access: true,
        },
        {
          planInfo: "Unlimited AUM & clients",
          access: true,
        },
        {
          planInfo: "Unlimited connector",
          access: true,
        },
        {
          planInfo: "Advisor portal access",
          access: true,
        },

        {
          planInfo: "Priority email/phone support",
          access: true,
        },
        {
          planInfo: "Custom SLAs",
          access: true,
        },
      ],
    },
  ];

  private Monthly = [
    {
      planName: "Launch",
      description: "Essentials for the starting to small RIA",
      planType: "Mo",
      extraInfo: "(Save $25 per month with an annual term  )",
      planDetails: [
        {
          planInfo: "Up to 2 administrator users",
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
      extraInfo: "(Save $50 per month with an annual term)",
      planDetails: [
        {
          planInfo: "Everything from Launch Plan",
          access: true,
        },
        {
          planInfo: "+ 1 adminstrator user, for a total of 3",
          access: true,
        },
        {
          planInfo: "+ 200 clients, for a total of 350",
          access: true,
        },
        {
          planInfo: "Average Daily Balanaces",
          access: true,
        },
        {
          planInfo: "Flow Billing Calculdations",
          access: true,
        },
        {
          planInfo: "+ 1 custodian connector, for a total of 2",
          access: true,
        },
        {
          planInfo: "Unlimited email/phone support",
          access: true,
        },
      ],
    },
    {
      planName: "Elite",
      description: "For medium to large-sized RIAs",
      planType: "Mo",
      extraInfo: "(Save $100 per month with an annual term)",
      planDetails: [
        {
          planInfo: "Everything from Professional Plan",
          access: true,
        },
        {
          planInfo: "+ 2 adminstrator users, for a total of 5",
          access: true,
        },
        {
          planInfo: "+ 150 clients, for a total of 500",
          access: true,
        },
        {
          planInfo: "Multi-Fee Billing Calculations",
          access: true,
        },
        {
          planInfo: "Product Categorization",
          access: true,
        },
        {
          planInfo: "+ 1 custodian connector, for a total of 3",
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
          planInfo: "Everything from Elite Plan",
          access: true,
        },
        {
          planInfo: "Unlimited adminstrator users",
          access: true,
        },
        {
          planInfo: "Unlimited AUM & clients",
          access: true,
        },
        {
          planInfo: "Unlimited connector",
          access: true,
        },
        {
          planInfo: "Advisor portal access",
          access: true,
        },

        {
          planInfo: "Priority email/phone support",
          access: true,
        },
        {
          planInfo: "Custom SLAs",
          access: true,
        },
      ],
    },
  ];

  created() {
    /*this.products.forEach((item) => {
      if (item == "AUM") this.getAumBilling(item);
    });*/
  }

  private getAumBilling(products: string) {
    const request: planRequestModel = new planRequestModel();
    request.termPlanType =
      CommitmentTerm[this.commitmentTerm as keyof typeof CommitmentTerm];
    this.service
      .getPlans(request)
      .then((response) => {
        /*this.bindPlans(
          response,
          this.commitmentTerm == "Annual" ? this.Annual : this.Monthly
        );*/
      })
      .catch((err) => {
        console.log(err);
      });
  }

  /*private bindPlans(response: Array<planResponseModel>, selectedTerm: any) {
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
  }*/

  public updateCommitmentTerm(plan: string) {
    this.commitmentTerm = plan;
    //this.getPlans();
  }

  public updatePlan(plan: any) {
    this.selectedPlan = plan;
  }

  public next() {
    this.store.dispatch("updateTerm", this.commitmentTerm);
    this.store.dispatch("updatePlan", this.selectedPlan);
    this.$emit("next");
  }

  public back() {
    this.$emit("back");
  }

  get products() {
    let products: Array<string> = [];
    products = this.store.getters.getProducts;
    return products;
  }
}
</script>