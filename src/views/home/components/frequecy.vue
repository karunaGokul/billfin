<template>
  <div class="tab-content pb-5 border-bottom">
    <div class="tab-group mt-10">
      <div class="tab-header position-relative">
        <div class="tab-header__title position-absolute fw-bolder fs-4">
          Frequecy & Timing
        </div>
        <ul class="tab-label-group justify-content-center border-bottom">
          <li
            class="tab-label pb-4"
            :class="{ 'tab-active-border-bottom': frequencyTab == 1 }"
            @click="frequencyTab = 1"
          >
            AUM Advisory
          </li>
          <li
            class="tab-label pb-4"
            :class="{ 'tab-active-border-bottom': frequencyTab == 2 }"
            @click="frequencyTab = 2"
          >
            Subscription
          </li>
        </ul>
      </div>
      <div class="tab-content-group m-0">
        <div
          class="tab-content tab-content-lg__scroll mt-10"
          v-if="frequencyTab == 1"
        >
          <div class="d-flex fs-7">
            <div class="fw-bolder">
              How frequently do you bill your AUM advisory fees?
            </div>
            <div class="text-muted ms-4 fs-8">Check all that apply</div>
            <div class="ms-5">
              <i class="fa fa-question-circle fs-4 text-dark"></i>
            </div>
          </div>
          <div class="mt-6 ms-6">
            <div
              class="form-check form-check-solid form-check-inline fs-7"
              v-for="(item, index) in aumAdvisoryBill"
              :key="index"
            >
              <input
                class="form-check-input"
                type="checkbox"
                v-model="request.aumAdvisoryBill"
                :value="item"
              />
              {{ item }}
            </div>
          </div>

          <div class="d-flex fs-7 mt-10">
            <div class="fw-bolder">
              What frequency do you want to default for new accounts?
            </div>
            <div class="ms-5">
              <i class="fa fa-question-circle fs-4 text-dark"></i>
            </div>
          </div>
          <div class="mt-6 ms-6">
            <div
              class="form-check form-check-solid form-check-inline fs-7"
              v-for="(item, index) in request.aumAdvisoryBill"
              :key="index"
            >
              <input
                class="form-check-input"
                type="checkbox"
                v-model="request.aumAdvisoryAccount"
                :value="item"
              />
              {{ item }}
            </div>
            <div class="form-check form-check-solid form-check-inline fs-7">
              <input
                class="form-check-input"
                type="checkbox"
                v-model="request.aumAdvisoryAccount"
                value="Don't default"
              />
              Don't default
            </div>
          </div>

          <div class="d-flex fs-7 mt-10">
            <div class="fw-bolder">
              Do you bill your AUM advisory fees in advance or in arrears?
            </div>
            <div class="text-muted ms-4 fs-8">Check all that apply</div>
            <div class="ms-5">
              <i class="fa fa-question-circle fs-4 text-dark"></i>
            </div>
          </div>

          <div class="mt-6 ms-6">
            <div
              class="form-check form-check-solid form-check-inline fs-7"
              v-for="(item, index) in aumArrears"
              :key="index"
            >
              <input
                class="form-check-input"
                type="checkbox"
                v-model="request.aumArrears"
                :value="item"
              />
              {{ item }}
            </div>
          </div>

          <div class="d-flex fs-7 mt-10">
            <div class="fw-bolder">
              What billing timing do you want to default for new accounts?
            </div>
            <div class="ms-5">
              <i class="fa fa-question-circle fs-4 text-dark"></i>
            </div>
          </div>
          <div class="mt-6 ms-6">
            <div
              class="form-check form-check-solid form-check-inline fs-7"
              v-for="(item, index) in request.aumArrears"
              :key="index"
            >
              <input
                class="form-check-input"
                type="checkbox"
                v-model="request.newAccounts"
                :value="item"
              />
              {{ item }}
            </div>
            <div class="form-check form-check-solid form-check-inline fs-7">
              <input class="form-check-input" type="checkbox" />
              Don't default
            </div>
          </div>

          <template v-if="isQuarterlySelected">
            <div class="d-flex fs-7 mt-10">
              <div class="fw-bolder">
                Do you bill any quarterly clients during off-cycle months?
              </div>
              <div class="ms-5">
                <i class="fa fa-question-circle fs-4 text-dark"></i>
              </div>
            </div>
            <div class="mt-6 ms-6">
              <div class="form-check form-check-solid form-switch">
                <input
                  class="form-check-input"
                  type="checkbox"
                  v-model="request.quarterltyClients"
                />
                <label
                  class="fs-8 text-muted form-check-label"
                  for="flexSwitchCheckChecked"
                  >Yes, I bill quarterly on off-cycle months</label
                >
              </div>
            </div>
          </template>

          <template v-if="request.quarterltyClients">
            <div class="d-flex fs-7 mt-10">
              <div class="fw-bolder">What’s your default quarterly cycle?</div>
              <div class="ms-5">
                <i class="fa fa-question-circle fs-4 text-dark"></i>
              </div>
            </div>
            <div class="mt-6 ms-6">
              <div class="form-check form-check-solid form-check-inline fs-7">
                <input
                  class="form-check-input"
                  type="checkbox"
                  v-model="request.quarterltyCycle"
                  value="Jan-Apr-Jul-Oct"
                />
                Jan-Apr-Jul-Oct
              </div>
              <div class="form-check form-check-solid form-check-inline fs-7">
                <input
                  class="form-check-input"
                  type="checkbox"
                  v-model="request.quarterltyCycle"
                  value="Feb-May-Aug-Nov"
                />
                Feb-May-Aug-Nov
              </div>
              <div class="form-check form-check-solid form-check-inline fs-7">
                <input
                  class="form-check-input"
                  type="checkbox"
                  v-model="request.quarterltyCycle"
                  value="Mar-Jun-Seb-Dec"
                />
                Mar-Jun-Seb-Dec
              </div>
              <div class="form-check form-check-solid form-check-inline fs-7">
                <input
                  class="form-check-input"
                  type="checkbox"
                  v-model="request.quarterltyCycle"
                  value="Don't default"
                />
                Don't default
              </div>
            </div>
          </template>

          <div class="d-flex justify-content-between mt-10">
            <button class="btn btn-secondary" @click="prev">Back</button>
            <button class="btn btn-primary me-10" @click="next">
              Continue
            </button>
          </div>
        </div>
        <div class="tab-content" v-if="frequencyTab == 2">
          {{ frequencyTab }}
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue } from "vue-class-component";

import { frequencyModel } from "@/model";
export default class Frequecy extends Vue {
  public frequencyTab: number = 1;

  public request = new frequencyModel();

  public aumAdvisoryBill: Array<string> = [
    "Monthly",
    "Quarterly",
    "Semi-Annually",
    "Annually",
  ];

  public aumArrears: Array<string> = ["Advance", "Arrears"];

  prev() {
    this.$emit("prev");
  }

  next() {
    console.log(this.request);
    this.$emit("next");
  }

  get isQuarterlySelected() {
    return this.request.aumAdvisoryBill.includes('Quarterly');
  }
}
</script>