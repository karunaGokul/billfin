<template>
  <div class="modal fade show d-block">
    <div class="modal-dialog modal-md modal-dialog-centered">
      <div class="modal-content rounded-3">
        <div class="modal-header p-4 pt-6 pb-6">
          <h5 class="modal-title fs-4 fw-bolder">{{ title }}</h5>
          <button type="button" class="btn-close" @click="close('close')">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="modal-body p-6">
          <p class="fs-4 fw-bolder">
            Are you sure you want to cancel {{ subscription }}?
          </p>
          <div class="text-gray-secondary fs-4 fw-bold">
            {{ message }}
          </div>
        </div>
        <div class="modal-footer p-4">
          <button
            type="button"
            class="btn btn-secondary text-gray"
            @click="close('close')"
          >
            Exit
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click="type == 'plan' ? cancelPlan() : cancelAddOn()"
          >
            {{ title }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue } from "vue-class-component";
import { Prop, Inject } from "vue-property-decorator";

import { IManageSubscription } from "@/service";

import { cancelPlanAddOnRequestModel } from "@/model";

import { useStore } from "vuex";

export default class CancelPlanAddOn extends Vue {
  @Inject("manageSubscripeService") service: IManageSubscription;

  @Prop() product?: string;
  @Prop() title: string;
  @Prop() name: string;
  @Prop() type: string;
  @Prop() endDate: string;
  @Prop() quantity?: string;
  @Prop() subscriptionPlanId?: number;
  @Prop() subscriptionAddOnId?: number;

  public store = useStore();

  public close(option: string) {
    this.$emit(option);
  }

  public cancelPlan() {
    let request = new cancelPlanAddOnRequestModel();
    request.eventType = "CANCEL_PLAN";
    request.subscriptionPlanId = this.subscriptionPlanId;
    this.service
      .cancelPlanAddOn(request, "cancelPlan")
      .then((response) => {
        this.$emit("cancelled");
      })
      .catch((err) => {
        if (err.response.status == 500)
          this.store.dispatch("showAlert", {
            message: "Somthing went wrong, Please contact administration",
            title: "Oops, sorry!",
          });
        else if (err.response.status == 400)
          this.store.dispatch("showAlert", {
            message: err.response.message,
            title: "Oops, sorry!",
          });
      });
  }

  public cancelAddOn() {
    let request = new cancelPlanAddOnRequestModel();
    request.eventType = "CANCEL_ADDON";
    request.subscriptionAddOnId = this.subscriptionAddOnId;

    this.service
      .cancelPlanAddOn(request, "cancelAddOn")
      .then((response) => {
        this.$emit("cancelled");
      })
      .catch((err) => {
        if (err.response.status == 500)
          this.store.dispatch("showAlert", {
            message: "Somthing went wrong, Please contact administration",
            title: "Oops, sorry!",
          });
        else if (err.response.status == 400)
          this.store.dispatch("showAlert", {
            message: err.response.message,
            title: "Oops, sorry!",
          });
      });
  }

  get subscription() {
    return this.type == "plan"
      ? `your ${this.product} Billing subscription`
      : this.name;
  }

  get message() {
    let value: string[] = [
      "zero",
      "one",
      "two",
      "three",
      "four",
      "five",
      "six",
      "seven",
      "eight",
      "nine",
      "ten",
    ];
    return this.type == "plan"
      ? `Your ${this.name} Plan and all associated add-ons will be 
canceled at the end of the plan’s current billing period, which ends 
on ${this.$datehelper.changeMonthFormat(this.endDate)}`
      : this.name == "Admin User License" ||
        this.name == "Multi-Connector Integrations"
      ? `All ${value[+this.quantity]} of your ${
          this.name == "Admin User License"
            ? "admin user licenses"
            : "multi-connector integrations"
        } will be canceled at the end of your current billing period, which ends on ${this.$datehelper.changeMonthFormat(
          this.endDate
        )}`
      : `${
          this.name
        } will be canceled at the end of your current billing period, which ends on ${this.$datehelper.changeMonthFormat(
          this.endDate
        )}`;
  }
}
</script>