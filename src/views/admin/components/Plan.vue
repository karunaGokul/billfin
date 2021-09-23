<template>
  <div class="m-4">
    <div class="d-flex justify-content-center align-items-center">
      <div class="fw-bold me-4">Commitment term</div>
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
    </div>
    <div class="text-center text-success p-2">
      {{ selectedCommitment.offerMsg }}
    </div>
    <div class="row g-0 mt-6">
      <div class="col-6">
        <div v-for="(item, index) in selectedCommitment.plans" :key="index">
          <div
            class="tab-plan border rounded mt-4 position-relative"
            :class="{
              'tab-plan-active': item.planName == selectedPlan.planName,
              'border-dashed': item.planName != selectedPlan.planName,
            }"
          >
            <div class="row g-0 pt-6 pb-6">
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
                <div class="tab-plan-msg">{{ item.planMsg }}</div>
              </div>
              <div class="col-4">
                <template v-if="item.planName != 'Enterprise'">
                  <div class="tab-plan-price fw-bolder text-center">
                    <sub class="fs-8 fw-normal">$</sub>
                    {{ item.planPrice }}
                    <sub class="fs-9 fw-normal">/ {{ item.planType }}</sub>
                  </div>
                  <div
                    class="tab-plan-extra fs-9 text-center"
                    v-if="commitmentTerm == 'Annual'"
                  >
                    {{ item.extraMsg }}
                  </div>
                </template>
                <template v-else>
                  <div class="text-center">
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
                fs-7
                text-end
                position-absolute
                bottom-0
                end-0
                me-4
              "
              v-if="commitmentTerm == 'Monthly'"
            >
              {{ item.extraMsg }}
            </div>
          </div>
        </div>
      </div>
      <div class="col-1"></div>
      <div class="col-5">
        <div class="card bg-light h-100 p-8">
          <div class="fs-2 fw-bolder">
            What’s in the {{ selectedPlan.planName }} Plan?
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
                {{ data.msg }}
              </div>
              <div class="col-2">
                <i
                  class="fas fa-check-circle text-success"
                  v-if="data.permission"
                ></i>
                <i class="far fa-times-circle text-danger" v-else></i>
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

export default class Plan extends Vue {
  public commitmentTerm: string = "Annual";

  public selectedCommitment: any = {
    offerMsg: "",
    plans: [],
  };

  public selectedPlan: any = {};

  created() {
    this.selectedCommitment = this.planList[this.commitmentTerm];
    this.selectedPlan = this.selectedCommitment.plans[0];
  }

  updateCommitmentTerm(plan: string) {
    this.commitmentTerm = plan;
    this.selectedCommitment = this.planList[plan];
    this.selectedPlan = this.selectedCommitment.plans[0];
  }

  updatePlan(plan: any) {
    this.selectedPlan = plan;
  }

  public planList: any = {
    Annual: {
      offerMsg: "Hooray, you are saving 20% with a 1 year commitment!",
      plans: [
        {
          planName: "Standard",
          planPrice: "1,188",
          planMsg: "Essentials for the starting to small RIA",
          planType: "Yr",
          extraMsg: "($99/month)",
          planDetails: [
            {
              msg: "Up to 3 administrator users",
              permission: true,
            },
            {
              msg: "Up to 150 clients",
              permission: true,
            },
            {
              msg: "Up to $500M in AUM",
              permission: true,
            },
            {
              msg: "Unlimited fee schedules",
              permission: true,
            },
            {
              msg: "Unlimited invoices",
              permission: true,
            },

            {
              msg: "Single custodian connector",
              permission: true,
            },
            {
              msg: "Unlimited email/phone support",
              permission: true,
            },
          ],
        },
        {
          planName: "Professional",
          planPrice: "2,388",
          planMsg: "For small to medium-sized RIAs",
          planType: "Yr",
          extraMsg: "($199/month)",
          planDetails: [
            {
              msg: "Up to 3 administrator users",
              permission: true,
            },
            {
              msg: "Up to 150 clients",
              permission: true,
            },
            {
              msg: "Up to $500M in AUM",
              permission: true,
            },
            {
              msg: "Unlimited fee schedules",
              permission: true,
            },
            {
              msg: "Unlimited invoices",
              permission: true,
            },

            {
              msg: "Single custodian connector",
              permission: true,
            },
            {
              msg: "Unlimited email/phone support",
              permission: true,
            },
          ],
        },
        {
          planName: "Ultimate",
          planPrice: "4,788",
          planMsg: "For medium to large-sized RIAs",
          planType: "Yr",
          extraMsg: "($399/month)",
          planDetails: [
            {
              msg: "Up to 3 administrator users",
              permission: true,
            },
            {
              msg: "Up to 150 clients",
              permission: true,
            },
            {
              msg: "Up to $500M in AUM",
              permission: true,
            },
            {
              msg: "Unlimited fee schedules",
              permission: true,
            },
            {
              msg: "Unlimited invoices",
              permission: true,
            },

            {
              msg: "Single custodian connector",
              permission: true,
            },
            {
              msg: "Unlimited email/phone support",
              permission: true,
            },
          ],
        },
        {
          planName: "Enterprise",
          planPrice: "",
          planMsg: "For large RIAs requiring custom license",
          planType: "Yr",
          extraMsg: "",
          planDetails: [
            {
              msg: "Up to 3 administrator users",
              permission: true,
            },
            {
              msg: "Up to 150 clients",
              permission: true,
            },
            {
              msg: "Up to $500M in AUM",
              permission: true,
            },
            {
              msg: "Unlimited fee schedules",
              permission: true,
            },
            {
              msg: "Unlimited invoices",
              permission: true,
            },

            {
              msg: "Single custodian connector",
              permission: true,
            },
            {
              msg: "Unlimited email/phone support",
              permission: true,
            },
          ],
        },
      ],
    },
    Monthly: {
      offerMsg: "Commit for a year and save up to 20%",
      plans: [
        {
          planName: "Standard",
          planPrice: "125",
          planMsg: "Essentials for the starting to small RIA",
          planType: "Mo",
          extraMsg: "(Save $25 per month with an annual term)",
          planDetails: [
            {
              msg: "Up to 3 administrator users",
              permission: true,
            },
            {
              msg: "Up to 150 clients",
              permission: true,
            },
            {
              msg: "Up to $500M in AUM",
              permission: true,
            },
            {
              msg: "Unlimited fee schedules",
              permission: true,
            },
            {
              msg: "Unlimited invoices",
              permission: true,
            },

            {
              msg: "Single custodian connector",
              permission: true,
            },
            {
              msg: "Unlimited email/phone support",
              permission: true,
            },
          ],
        },
        {
          planName: "Professional",
          planPrice: "250",
          planMsg: "For small to medium-sized RIAs",
          planType: "Mo",
          extraMsg: "(Save $51 per month with an annual term)",
          planDetails: [
            {
              msg: "Up to 3 administrator users",
              permission: true,
            },
            {
              msg: "Up to 150 clients",
              permission: true,
            },
            {
              msg: "Up to $500M in AUM",
              permission: true,
            },
            {
              msg: "Unlimited fee schedules",
              permission: true,
            },
            {
              msg: "Unlimited invoices",
              permission: true,
            },

            {
              msg: "Single custodian connector",
              permission: true,
            },
            {
              msg: "Unlimited email/phone support",
              permission: true,
            },
          ],
        },
        {
          planName: "Ultimate",
          planPrice: "500",
          planMsg: "For medium to large-sized RIAs",
          planType: "Mo",
          extraMsg: "(Save $101 per month with an annual term)",
          planDetails: [
            {
              msg: "Up to 3 administrator users",
              permission: true,
            },
            {
              msg: "Up to 150 clients",
              permission: true,
            },
            {
              msg: "Up to $500M in AUM",
              permission: true,
            },
            {
              msg: "Unlimited fee schedules",
              permission: true,
            },
            {
              msg: "Unlimited invoices",
              permission: true,
            },

            {
              msg: "Single custodian connector",
              permission: true,
            },
            {
              msg: "Unlimited email/phone support",
              permission: true,
            },
          ],
        },
        {
          planName: "Enterprise",
          planPrice: "",
          planMsg: "For large RIAs requiring custom license",
          planType: "Mo",
          extraMsg: "",
          planDetails: [
            {
              msg: "Up to 3 administrator users",
              permission: true,
            },
            {
              msg: "Up to 150 clients",
              permission: true,
            },
            {
              msg: "Up to $500M in AUM",
              permission: true,
            },
            {
              msg: "Unlimited fee schedules",
              permission: true,
            },
            {
              msg: "Unlimited invoices",
              permission: true,
            },

            {
              msg: "Single custodian connector",
              permission: true,
            },
            {
              msg: "Unlimited email/phone support",
              permission: true,
            },
          ],
        },
      ],
    },
  };
}
</script>