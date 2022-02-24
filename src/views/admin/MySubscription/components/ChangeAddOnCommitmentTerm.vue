<template>
  <div class="modal fade show d-block">
    <div class="modal-dialog modal-dialog-centered" style="max-width: 940px">
      <div class="modal-content rounded-3">
        <div class="modal-header p-4 pt-6 pb-6">
          <h5 class="modal-title fs-4 fw-bolder">
            Switch Add-on Subscription to {{ newTerm }} Commitment
          </h5>
          <button type="button" class="btn-close" @click="close('close')">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="modal-body p-6">
          <p class="fs-4 fw-bolder">
            {{ addons.addOnName }}
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
                      Current Term Started On
                    </td>
                    <td class="pt-3 pb-3 fw-bolder text-end">
                      {{
                        $datehelper.changeDateFormatWithSlash(addons.startDate)
                      }}
                    </td>
                  </tr>
                  <tr>
                    <td class="pt-3 pb-3 text-gray-tertiary fw-bold">
                      Current Term Ends On
                    </td>
                    <td class="pt-3 pb-3 fw-bolder text-end">
                      {{
                        $datehelper.changeDateFormatWithSlash(addons.renewDate)
                      }}
                    </td>
                  </tr>
                  <tr>
                    <td class="pt-3 pb-3 text-gray-tertiary fw-bold">
                      Current Term Price
                    </td>
                    <td class="pt-3 pb-3 fw-bolder text-end">
                      {{ $filters.currencyDisplay(addons.paymentAmount) }}
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
                      New Term Starts On
                    </td>
                    <td class="pt-3 pb-3 fw-bolder text-end">
                      {{ newTermStartDate }}
                    </td>
                  </tr>
                  <tr>
                    <td class="pt-3 pb-3 text-gray-tertiary fw-bold">
                      New Term Ends On
                    </td>
                    <td class="pt-3 pb-3 fw-bolder text-end">
                      Auto-renews on {{ newEndDate }}
                    </td>
                  </tr>
                  <tr>
                    <td class="pt-3 pb-3 text-gray-tertiary fw-bold">
                      New Term Price
                    </td>
                    <td class="pt-3 pb-3 fw-bolder text-end">
                      {{ $filters.currencyDisplay(response.planAddOnAmount) }}
                      <span>/{{ newTerm == "Annual" ? "Yr" : "Mon" }}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <p class="fs-5 pt-4">
            All else will remain unchanged, except annual pricing and payment
            terms apply once your switch becomes effective, which will be
            {{ newTermStartDate }}.
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
          <button
            type="button"
            class="btn btn-primary"
            @click="changeAddOnTerm"
          >
            Switch Add-on
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
  addonsResponseModel,
  termAddOnDetailsRequestModel,
  termAddOnDetailsResponseModel,
  CommitmentTerm,
  changeAddOnTermRequestModel,
} from "@/model";

import { IManageSubscription } from "@/service";

export default class ChangeAddOnCommitmentTerm extends Vue {
  @Inject("manageSubscripeService") service: IManageSubscription;

  @Prop() addons: addonsResponseModel;
  @Prop() currentTerm: string;

  public response: termAddOnDetailsResponseModel =
    new termAddOnDetailsResponseModel();

  public store = useStore();

  created() {
    this.getTermAddOnDetails();
  }

  private getTermAddOnDetails() {
    let request: termAddOnDetailsRequestModel =
      new termAddOnDetailsRequestModel();
    request.termPlanType =
      CommitmentTerm[this.newTerm as keyof typeof CommitmentTerm];
    request.planId = this.addons.planId;
    request.addOnName = this.addons.addOnName;

    this.service
      .getTermAddOnDetails(request)
      .then((response) => {
        this.response = response;
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

  public changeAddOnTerm() {
    let request: changeAddOnTermRequestModel =
      new changeAddOnTermRequestModel();
    request.eventType = "TERM_CHANGE";
    request.subscriptionAddOnId = this.addons.subscriptionAddOnId;
    request.term = CommitmentTerm[this.newTerm as keyof typeof CommitmentTerm];
    request.termAddOnId = this.addons.termAddOnId;

    this.service
      .changeAddOnTerm(request)
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
    this.$emit(option);
  }

  get newTerm() {
    return this.currentTerm == "Annual" ? "Monthly" : "Annual";
  }

  get newTermStartDate() {
    let date = new Date(this.addons.renewDate);

    if (this.newTerm == "Monthly") date.setDate(date.getDate() + 1);
    else date.setFullYear(date.getFullYear() + 1);

    return moment(String(date)).format("MM/DD/YYYY");
  }

  get newEndDate() {
    let date = new Date(this.newTermStartDate);

    if (this.newTerm == "Monthly") date.setMonth(date.getMonth() + 1);
    else date.setFullYear(date.getFullYear() + 1);

    return moment(String(date)).format("MM/DD/YYYY");
  }
}
</script>