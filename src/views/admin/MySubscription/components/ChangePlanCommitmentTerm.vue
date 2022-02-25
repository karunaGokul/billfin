<template>
  <div class="modal fade show d-block">
    <div class="modal-dialog modal-xl modal-dialog-centered">
      <div class="modal-content rounded-3">
        <div class="modal-header p-4">
          <h5 class="modal-title fs-4 fw-bolder">
            Switch to {{ newTerm }} Commitment
          </h5>
          <button type="button" class="btn-close" @click="close('close')">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="modal-body p-4 pb-0">
          <div class="row" style="max-height: 475px">
            <div class="col-6">
              <p class="m-2 fs-4 fw-bolder">Current Subscription</p>
              <div
                class="m-2 p-4 overflow-auto border rounded border-light"
                style="max-height: 400px"
              >
                <p class="fs-4 fw-bolder">{{ plan.planName }} Plan</p>
                <div
                  class="p-4 border border-2 border-dashed rounded border-light"
                >
                  <table class="w-100">
                    <thead>
                      <tr>
                        <th class="text-gray-tertiary ps-4 pe-4">Term</th>
                        <th class="text-gray-tertiary ps-4 pe-4">
                          Term Period
                        </th>
                        <th class="text-gray-tertiary ps-4 pe-4">Price</th>
                      </tr>
                    </thead>
                    <tbody class="fs-5">
                      <tr>
                        <td class="fw-bold ps-4 pe-4">
                          {{
                            plan.commitmentTerm == "ANNUAL"
                              ? "Annual"
                              : "Monthly"
                          }}
                        </td>
                        <td class="fw-bold ps-4 pe-4">
                          {{
                            $datehelper.changeDateFormatWithSlash(
                              plan.startDate
                            )
                          }}
                          -
                          {{
                            $datehelper.changeDateFormatWithSlash(
                              plan.renewDate
                            )
                          }}
                        </td>
                        <td class="ps-4 pe-4 fw-bold">
                          {{ $filters.currencyDisplay(plan.paymentAmount) }}
                          <span
                            >/{{ currentTerm == "Annual" ? "Yr" : "Mon" }}</span
                          >
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <template v-for="(item, index) of addons" :key="index">
                  <p class="mt-4 fs-4 fw-bolder">{{ item.addOnName }}</p>
                  <div
                    class="
                      p-4
                      border border-2 border-dashed
                      rounded
                      border-light
                    "
                  >
                    <table class="w-100">
                      <thead>
                        <tr>
                          <th class="text-gray-tertiary ps-4 pe-4">Term</th>
                          <th class="text-gray-tertiary ps-4 pe-4">
                            Term Period
                          </th>
                          <th class="text-gray-tertiary ps-4 pe-4">Price</th>
                        </tr>
                      </thead>
                      <tbody class="fs-5">
                        <tr>
                          <td class="fw-bold ps-4 pe-4">
                            {{
                              item.commitmentTerm == "ANNUAL"
                                ? "Annual"
                                : "Monthly"
                            }}
                          </td>
                          <td class="fw-bold ps-4 pe-4">
                            {{
                              $datehelper.changeDateFormatWithSlash(
                                item.startDate
                              )
                            }}
                            -
                            {{
                              $datehelper.changeDateFormatWithSlash(
                                item.renewDate
                              )
                            }}
                          </td>
                          <td class="ps-4 pe-4 fw-bold">
                            {{ $filters.currencyDisplay(item.paymentAmount) }}
                            <span
                              >/{{
                                item.commitmentTerm == "ANNUAL" ? "Yr" : "Mon"
                              }}</span
                            >
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </template>
              </div>
            </div>
            <div
              class="
                position-fixed
                start-50
                top-50
                translate-middle
                text-center
              "
            >
              <i class="fa fa-chevron-circle-right text-primary"></i>
            </div>
            <div class="col-6" v-if="response">
              <p class="m-2 fs-4 fw-bolder">
                New Subscription
                <span class="badge fs-7 text-success ms-2 bg-success-alpha"
                  >Save 20%</span
                >
              </p>
              <div
                class="
                  m-2
                  overflow-auto
                  p-4
                  border
                  rounded
                  border-primary
                  bg-primary-alpha
                "
                style="max-height: 400px"
              >
                <p class="fs-4 fw-bolder">{{ response.plan.planName }} Plan</p>
                <div
                  class="
                    p-4
                    border border-1 border-dashed
                    rounded
                    border-primary
                  "
                >
                  <table class="w-100">
                    <thead>
                      <tr>
                        <th class="text-gray-tertiary ps-4 pe-4">Term</th>
                        <th class="text-gray-tertiary ps-4 pe-4">
                          Term Period
                        </th>
                        <th class="text-gray-tertiary ps-4 pe-4">Price</th>
                      </tr>
                    </thead>
                    <tbody class="fs-5">
                      <tr>
                        <td class="fw-bold ps-4 pe-4">{{ newTerm }}</td>
                        <td class="fw-bold ps-4 pe-4">
                          {{ termPeriodDate }}
                        </td>
                        <td class="ps-4 pe-4 fw-bold">
                          {{
                            $filters.currencyDisplay(
                              response.plan.termPlanAmount
                            )
                          }}
                          <span>/{{ newTerm == "Annual" ? "Yr" : "Mon" }}</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <template v-for="(item, index) of response.addOns" :key="index">
                  <p class="mt-4 fs-4 fw-bolder">{{ item.addOnName }}</p>
                  <div
                    class="
                      p-4
                      border border-1 border-dashed
                      rounded
                      border-primary
                    "
                  >
                    <table class="w-100">
                      <thead>
                        <tr>
                          <th class="text-gray-tertiary ps-4 pe-4">Term</th>
                          <th class="text-gray-tertiary ps-4 pe-4">
                            Term Period
                          </th>
                          <th class="text-gray-tertiary ps-4 pe-4">Price</th>
                        </tr>
                      </thead>
                      <tbody class="fs-5">
                        <tr>
                          <td class="fw-bold ps-4 pe-4">{{ newTerm }}</td>
                          <td class="fw-bold ps-4 pe-4">
                            {{ termPeriodDate }}
                          </td>
                          <td class="ps-4 pe-4 fw-bold">
                            {{ $filters.currencyDisplay(item.planAddOnAmount) }}
                            <span
                              >/{{ newTerm == "Annual" ? "Yr" : "Mon" }}</span
                            >
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </template>
              </div>
            </div>
          </div>

          <p class="fs-5 p-4 mb-0">
            <span v-if="newTerm == 'Monthly'"
              >Note that all your add-ons will automatically convert to monthly
              subscriptions along with your plan subscription.
            </span>
            All else will remain unchanged, except
            {{ newTerm.toLowerCase() }} pricing and payment terms apply once
            your switch becomes effective, which will be {{ newTermStartDate }}.
          </p>
        </div>
        <div class="modal-footer p-4 border-0">
          <button
            type="button"
            class="btn btn-secondary text-gray me-2"
            @click="close('close')"
          >
            Cancel
          </button>
          <button type="button" class="btn btn-primary" @click="changePlanTerm">
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

import { useStore } from "vuex";

import {
  subscriptionResponseModel,
  addonsResponseModel,
  termPlanDetailsReqeustModel,
  termPlanDetailsResponseModel,
  CommitmentTerm,
  changePlanTermRequestModel,
} from "@/model";

import { IManageSubscription } from "@/service";

export default class ChangePlanCommitmentTerm extends Vue {
  @Inject("manageSubscripeService") service: IManageSubscription;

  @Prop() plan: subscriptionResponseModel;
  @Prop() addons: Array<addonsResponseModel>;
  @Prop() currentTerm: string;

  public response: termPlanDetailsResponseModel = null;

  public store = useStore();

  created() {
    this.getTermPlanDetails();
  }

  private getTermPlanDetails() {
    let request: termPlanDetailsReqeustModel =
      new termPlanDetailsReqeustModel();
    request.termPlanType =
      CommitmentTerm[this.newTerm as keyof typeof CommitmentTerm];
    request.planId = this.plan.planId;
    request.planSubscriptionId = this.plan.subscriptionPlanId;
    this.service
      .getTermPlanDetails(request)
      .then((response) => {
        this.response = response;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  public changePlanTerm() {
    let request: changePlanTermRequestModel = new changePlanTermRequestModel();
    request.eventType = "TERM_CHANGE";
    request.subscriptionPlanId = this.plan.subscriptionPlanId;
    request.term = CommitmentTerm[this.newTerm as keyof typeof CommitmentTerm];
    request.termPlanId = this.plan.termPlanId;

    this.service
      .changePlanTerm(request)
      .then((response) => {
        this.$emit("done");
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

  public close(option: string) {
    console.log(option);
    this.$emit(option);
  }

  get newTerm() {
    return this.currentTerm == "Annual" ? "Monthly" : "Annual";
  }

  get termPeriodDate() {
    let value: string = "";
    if (this.newTerm == "Monthly") value = `Starts on ${this.newTermStartDate}`;
    else value = `${this.newTermStartDate} - ${this.newTermEndDate}`;
    return value;
  }

  get newTermStartDate() {
    let date = new Date(this.plan.renewDate);
    date.setDate(date.getDate() + 1);

    return moment(String(date)).format("MM/DD/YYYY");
  }

  get newTermEndDate() {
    let date = new Date(this.plan.renewDate);

    if (this.newTerm == "Monthly") date.setMonth(date.getMonth() + 1);
    else date.setFullYear(date.getFullYear() + 1);

    return moment(String(date)).format("MM/DD/YYYY");
  }
}
</script>