<template>
  <div class="modal fade show d-block">
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content rounded-3">
        <div class="modal-header p-4 pt-6 pb-6">
          <h5 class="modal-title fs-4 fw-bolder">
            Switch to {{ newCommitmentTerm }} Commitment
          </h5>
          <button type="button" class="btn-close" @click="close('close')">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="modal-body p-6">
          <p class="fs-4 fw-bolder">
            {{ plan.planName }}
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
                      {{ currentCommitmentTerm }} Subscription
                    </td>
                  </tr>
                  <tr>
                    <td class="pt-3 pb-3 text-gray-tertiary fw-bold">
                      Current Term Start On
                    </td>
                    <td class="pt-3 pb-3 fw-bolder text-end">{{ plan.startDate }}</td>
                  </tr>
                  <tr>
                    <td class="pt-3 pb-3 text-gray-tertiary fw-bold">
                      Current Term End On
                    </td>
                    <td class="pt-3 pb-3 fw-bolder text-end">{{ plan.endDate }}</td>
                  </tr>
                  <tr>
                    <td class="pt-3 pb-3 text-gray-tertiary fw-bold">
                      Current Term Price
                    </td>
                    <td class="pt-3 pb-3 fw-bolder text-end">
                      {{ $filters.currencyDisplay(plan.termPlanAmount) }}
                      <span>/{{ currentCommitmentTerm == 'Annual' ? 'Yr' : 'Mon' }}</span>
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
                      {{ newCommitmentTerm }} Subscription
                    </td>
                  </tr>
                  <tr>
                    <td class="pt-3 pb-3 text-gray-tertiary fw-bold">
                      New Term Start On
                    </td>
                    <td class="pt-3 pb-3 fw-bolder text-end">{{ plan.startDate }}</td>
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
                      {{ $filters.currencyDisplay(250)}}
                      <span>/{{ newCommitmentTerm == 'Annual' ? 'Yr' : 'Mon' }}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <p class="fs-5 pt-4">
            All else will remain the same, except monthly pricing and payment
            terms apply once your switch becomes effective.
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
            @click="close('cancel')"
          >
            Switch Plan
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { Prop } from "vue-property-decorator";

import { manageSubscriptionResponseModel } from "@/model";

export default class ChangeCommitmentTerm extends Vue {
  @Prop() currentCommitmentTerm: string;
  @Prop() newCommitmentTerm: string;
  @Prop() plan: manageSubscriptionResponseModel;

  public close(option: string) {
    this.$emit(option);
  }
  
}
</script>