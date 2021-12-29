<template>
  <div class="card">
    <div class="w-75 mx-auto pt-10">
      <h3 class="text-center mt-8">BillFin Licence Terms & Conditions</h3>
      <p class="text-dark-black text-left mt-8">
        By accessing this web site, you are agreeing to be bound by these web
        site Terms and Conditions of Use, all applicable laws and regulations,
        and agree that you are responsible for compliance with any applicable
        local laws. If you do not agree with any of these terms, you are
        prohibited from using or accessing this site. The materials contained in
        this web site are protected by applicable copyright and trade mark law.
      </p>
      <p class="text-dark-black text-left mt-8">
        The materials on Redi2 Technologies’s web site are provided “as is”.
        Redi2 Technologies makes no warranties, expressed or implied, and hereby
        disclaims and negates all other warranties, including without
        limitation, implied warranties or conditions of merchantability, fitness
        for a particular purpose, or non-infringement of intellectual property
        or other violation of rights. Further, Redi2 Technologies does not
        warrant or make any representations concerning the accuracy, likely
        results, or reliability of the use of the materials on its Internet web
        site or otherwise relating to such materials or on any sites linked to
        this site.
      </p>
      <p class="text-dark-black text-left mt-8">
        In no event shall Redi2 Technologies or its suppliers be liable for any
        damages (including, without limitation, damages for loss of data or
        profit, or due to business interruption,) arising out of the use or
        inability to use the materials on Redi2 Technologies’s Internet site,
        even if Redi2 Technologies or a Redi2 Technologies authorized
        representative has been notified orally or in writing of the possibility
        of such damage. Because some jurisdictions do not allow limitations on
        implied warranties, or limitations of liability for consequential or
        incidental damages, these limitations may not apply to you. Redi2
        Technologies has not reviewed all of the sites linked to its Internet
        web site and is not responsible for the contents of any such linked
        site.
      </p>

      <p
        class="
          form-check form-check-solid form-check-inline
          fs-6
          text-light-gray text-center
          mt-8
        "
      >
        <input class="form-check-input" type="checkbox" v-model="isAgreed" />
        I agree to these terms and conditions
      </p>

      <div class="text-center mt-8 mb-8">
        <button class="btn btn-light me-5" @click="back">Back</button>
        <button
          class="btn btn-primary ms-5"
          :disabled="!isAgreed"
        >
          Subscribe
        </button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue } from "vue-class-component";
import { useStore } from "vuex";

import moment from "moment";

import { Inject } from "vue-property-decorator";

import {
  addOnsModel,
  CommitmentTerm,
  addMoreSubscriptionRequestModel,
} from "@/model";

import { IManageSubscription } from "@/service";

export default class Subscribe extends Vue {
  @Inject("manageSubscripeService") service: IManageSubscription;

  public store = useStore();
  public isAgreed: boolean = false;

  public back() {
    this.$emit("back");
  }

  public subscribe() {
    let request: addMoreSubscriptionRequestModel =
      new addMoreSubscriptionRequestModel();

    request.eventType = "SUBSCRIBE";
    request.firmId = this.store.getters.selectedFirmId;

    if (this.showAumBilling) {
      request.term = CommitmentTerm[this.aumBilling.commitmentTerm as keyof typeof CommitmentTerm];
      request.termPlanId = this.aumBilling.plan.termPlanId;
      request.addOns = this.getAddons(this.aumBilling.addons);
    }
    if (this.showSubscription) {
      request.term = CommitmentTerm[this.subscriptionBilling.commitmentTerm as keyof typeof CommitmentTerm];
      request.termPlanId = this.subscriptionBilling.plan.termPlanId;
      request.addOns = this.getAddons(this.subscriptionBilling.addons);
    }

    this.service
      .subscribeAddOns(request)
      .then((response) => {
        if (response.status == "SUCCESS") {
          this.$emit("next");
          //this.store.dispatch("clearSubscription");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getAddons(value: any) {
    let addons: Array<addOnsModel> = [];

    value.forEach((item: { termPlanAddOnId: number; quantity: string }) => {
      addons.push({
        termAddOnId: item.termPlanAddOnId,
        quantity: item.quantity,
        startDate: this.startDate,
      });
    });
    return addons;
  }

  get products() {
    return this.store.getters.products;
  }

  get showAumBilling() {
    return this.products.includes("AUM");
  }

  get showSubscription() {
    return this.products.includes("SUBSCRIPTION");
  }

  get aumBilling() {
    return this.store.getters.aumBilling;
  }

  get subscriptionBilling() {
    return this.store.getters.subscriptionBilling;
  }

  get startDate() {
    return moment(String(new Date())).format("DD/MM/YYYY");
  }
}
</script>