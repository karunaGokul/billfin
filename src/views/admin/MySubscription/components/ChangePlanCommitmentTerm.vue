<template>
  <div class="modal fade show d-block">
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content rounded-3">
        <div class="modal-header p-4 pt-6 pb-6">
          <h5 class="modal-title fs-4 fw-bolder">
            Switch Plan Subscription to {{ newTerm }} Commitment
          </h5>
          <button type="button" class="btn-close" @click="close('close')">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="modal-body p-6">
          <p class="fs-4 fw-bolder">
            {{ plan.planName }} Plan
          </p>
          <div class="row g-0">
            <div class="col-6">
              <table class="w-100">
                <tbody class="fs-5">
                  <tr>
                    <td class="pt-3 pb-3 text-gray-tertiary fw-bold">
                      Current Term Type
                    </td>
                    <td class="pt-3 pb-3 fw-bolder text-end">
                      {{ currentTerm }} Subscription
                    </td>
                  </tr>
                  <tr>
                    <td class="pt-3 pb-3 text-gray-tertiary fw-bold">
                      Current Term Start On
                    </td>
                    <td class="pt-3 pb-3 fw-bolder text-end">
                      {{ plan.startDate }}
                    </td>
                  </tr>
                  <tr>
                    <td class="pt-3 pb-3 text-gray-tertiary fw-bold">
                      Current Term End On
                    </td>
                    <td class="pt-3 pb-3 fw-bolder text-end">
                      {{ plan.renewDate }}
                    </td>
                  </tr>
                  <tr>
                    <td class="pt-3 pb-3 text-gray-tertiary fw-bold">
                      Current Term Price
                    </td>
                    <td class="pt-3 pb-3 fw-bolder text-end">
                      {{ $filters.currencyDisplay(plan.amount) }}
                      <span>/{{ currentTerm == "Annual" ? "Yr" : "Mon" }}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="col-1 position-relative">
              <div class="position-absolute h-100 start-50 border-start"></div>
            </div>
            <div class="col-5">
              <table class="w-100">
                <tbody class="fs-5">
                  <tr>
                    <td class="pt-3 pb-3 text-gray-tertiary fw-bold">
                      New Term Type
                    </td>
                    <td class="pt-3 pb-3 fw-bolder text-end">
                      {{ newTerm }} Subscription
                    </td>
                  </tr>
                  <tr>
                    <td class="pt-3 pb-3 text-gray-tertiary fw-bold">
                      New Term Start On
                    </td>
                    <td class="pt-3 pb-3 fw-bolder text-end">
                      {{ newTermStartDate }}
                    </td>
                  </tr>
                  <tr>
                    <td class="pt-3 pb-3 text-gray-tertiary fw-bold">
                      New Term End On
                    </td>
                    <td class="pt-3 pb-3 fw-bolder text-end">Auto-renews</td>
                  </tr>
                  <tr>
                    <td class="pt-3 pb-3 text-gray-tertiary fw-bold">
                      New Term Price
                    </td>
                    <td class="pt-3 pb-3 fw-bolder text-end">
                      {{ $filters.currencyDisplay(response.termPlanAmount) }}
                      <span>/{{ newTerm == "Annual" ? "Yr" : "Mon" }}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <p class="fs-5 pt-4">
            Note that all your add-ons will automatically convert to monthly
            subscriptions along with your plan subscription. All else will
            remain the same, except monthly pricing and payment terms apply once
            your switch becomes effective, which will be {{ newTermStartDate }}.
          </p>
        </div>
        <div class="modal-footer p-4">
          <button
            type="button"
            class="btn btn-secondary text-gray me-2"
            @click="close('close')"
          >
            Exit
          </button>
          <button type="button" class="btn btn-primary" @click="changeTerm">
            Switch Plan
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue } from "vue-class-component";
import { Prop, Inject } from "vue-property-decorator";

import moment from "moment";

import {
  subscriptionResponseModel,
  termPlanAmountReqeustModel,
  termPlanAmountResponseModel,
  CommitmentTerm,
  changePlanTermRequestModel,
} from "@/model";

import { IManageSubscription } from "@/service";

export default class ChangePlanCommitmentTerm extends Vue {
  @Inject("manageSubscripeService") service: IManageSubscription;

  @Prop() plan: subscriptionResponseModel;
  @Prop() currentTerm: string;

  public response: termPlanAmountResponseModel =
    new termPlanAmountResponseModel();

  created() {
    this.getTermPlanAmount();
  }

  private getTermPlanAmount() {
    let request: termPlanAmountReqeustModel = new termPlanAmountReqeustModel();
    request.termPlanType =
      CommitmentTerm[this.newTerm as keyof typeof CommitmentTerm];
    request.planId = this.plan.planId;
    this.service
      .getTermPlanAmount(request)
      .then((response) => {
        this.response = response;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  private changeTerm() {
    let request: changePlanTermRequestModel = new changePlanTermRequestModel();
    request.eventType = "TERM_CHANGE";
    request.subscriptionPlanId = this.plan.subscriptionPlanId;
    request.term = CommitmentTerm[this.newTerm as keyof typeof CommitmentTerm];
    request.termPlanId = this.plan.termPlanId;

    this.service
      .changePlan(request)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  public close(option: string) {
    this.$emit(option);
  }

  get newTerm() {
    return this.currentTerm == "Annual" ? "Monthly" : "Annual";
  }

  get newTermStartDate() {
    let currentDate = new Date(this.plan.renewDate);
    let date = new Date(currentDate);
    if (this.newTerm == "Monthly") {
      date.setMonth(currentDate.getMonth() + 1);
      date.setDate(currentDate.getDate() + 1);
    } else {
      date.setFullYear(currentDate.getFullYear() + 1);
      date.setDate(currentDate.getDate() + 1);
    }

    return moment(String(date)).format("MM/DD/YYYY");
  }
}
</script>