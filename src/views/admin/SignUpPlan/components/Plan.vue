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
          {{ selectedCommitment.offerMsg }}
        </div>
      </div>
    </div>

    <div class="row g-0 mt-6">
      <div class="col-6">
        <div v-for="(item, index) in selectedCommitment.plans" :key="index">
          <div
            class="tab-plan border rounded mb-4 position-relative"
            :class="{
              'tab-plan-active': item.product == selectedPlan.product,
              'border-dashed': item.product != selectedPlan.product,
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
                    :checked="item.product == selectedPlan.product"
                  />
                </div>
              </div>
              <div class="col-6">
                <div class="tab-plan-name fw-bolder">{{ item.product }}</div>
                <div class="tab-plan-msg">{{ item.description }}</div>
              </div>
              <div class="col-4">
                <template v-if="item.product != 'Enterprise'">
                  <div class="tab-plan-price fw-bolder text-center">
                    <span class="fs-7">$</span>
                    {{ item.rate }}
                    <span class="fs-8 fw-normal">/ {{ item.planType }}</span>
                  </div>
                  <div
                    class="tab-plan-extra fs-9 text-center"
                    v-if="commitmentTerm == 'Annual'"
                  >
                    {{ item.extraMsg }}
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
              {{ item.extraMsg }}
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

    <div class="text-center mt-10">
      <button class="btn btn-light me-5">Cancel</button>
      <button class="btn btn-primary ms-5" @click="next">Continue</button>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue } from "vue-class-component";

import { useStore } from "vuex";

export default class Plan extends Vue {

  public store = useStore();

  public commitmentTerm: string = "Annual";

  public selectedCommitment: any = {
    offerMsg: "",
    plans: [],
  };

  public selectedPlan: any = {};

  created() {
    this.selectedCommitment = this.planList[this.commitmentTerm];
    this.selectedPlan = this.selectedCommitment.plans[0];
    console.log(this.store.getters.userInfo);
  }

  updateCommitmentTerm(plan: string) {
    this.commitmentTerm = plan;
    this.selectedCommitment = this.planList[plan];
    this.selectedPlan = this.selectedCommitment.plans[0];
  }

  updatePlan(plan: any) {
    this.selectedPlan = plan;
  }

  public next() {
    this.store.dispatch('updateTerm', this.commitmentTerm);
    this.store.dispatch('updatePlan', this.selectedPlan);
    this.$emit('next');
  }

  public planList: any = {
    Annual: {
      offerMsg: "Hooray, you are saving 20% with a 1 year commitment!",
      plans: [
        {
          id: 3,
          product: "Standard",
          rate: "1,188",
          description: "Essentials for the starting to small RIA",
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
          id: 4,
          product: "Professional",
          rate: "2,388",
          description: "For small to medium-sized RIAs",
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
          id: 5,
          product: "Ultimate",
          rate: "4,788",
          description: "For medium to large-sized RIAs",
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
          product: "Enterprise",
          rate: "",
          description: "For large RIAs requiring custom license",
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
          product: "Standard",
          rate: "125",
          description: "Essentials for the starting to small RIA",
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
          product: "Professional",
          rate: "250",
          description: "For small to medium-sized RIAs",
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
          product: "Ultimate",
          rate: "500",
          description: "For medium to large-sized RIAs",
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
          product: "Enterprise",
          rate: "",
          description: "For large RIAs requiring custom license",
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