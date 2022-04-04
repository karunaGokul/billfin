<template>
  <div class="modal fade show d-block">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="modal-header p-4 pt-6 pb-6">
          <h5 class="modal-title fs-4 fw-bolder">{{ modelType }}</h5>
          <button type="button" class="btn-close" @click="close">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div
          class="modal-body ms-4 me-4 mt-4 mb-4 p-4 overflow-auto"
          style="max-height: 450px"
        >
          <div class="row">
            <div class="col-6">
              <text-input
                formFieldType="inputBlock"
                label="Name"
                :controls="v$.request.name"
                :validation="['required']"
                :readonly="modelType == 'Edit Fee Schedule'"
              />
            </div>
            <div class="col-6">
              <select-box
                label="Currency"
                :data="['USD', 'CAD']"
                :controls="v$.request.currencyCode"
                formFieldType="inputBlock"
                :validation="['required']"
              />
            </div>
          </div>

          <div class="row">
            <div class="col-6">
              <div class="form-label fw-bolder mb-4">Type</div>
              <div class="form-check form-check-inline form-check-success">
                <input
                  class="form-check-input"
                  type="radio"
                  name="Flat"
                  value="Flat"
                  v-model="feeValidation.type"
                  @change="resetForm()"
                />
                <label class="form-check-label" for="Flat">Flat</label>
              </div>
              <div class="form-check form-check-inline form-check-success">
                <input
                  class="form-check-input"
                  type="radio"
                  name="Tiered"
                  value="Tiered"
                  v-model="feeValidation.type"
                  @change="resetForm()"
                />
                <label class="form-check-label" for="Tiered">Tiered</label>
              </div>
            </div>
            <div class="col-6">
              <div
                class="
                  form-check form-switch
                  m-8
                  ms-0
                  dropdown dropdown-primary
                "
                v-click-outside="clickOutSideBlended"
                v-if="feeValidation.type == 'Tiered'"
              >
                <input
                  class="form-check-input"
                  type="checkbox"
                  v-model="feeValidation.blended"
                />
                <label class="form-check-label" for="Activate User"
                  >Blended

                  <span
                    class="badge rounded-pill bg-orange-alpha text-orange ms-2"
                    @click="showBlenedModel = true"
                    >!</span
                  >
                </label>
                <div
                  class="dropdown-menu overflow-auto"
                  :class="{ show: showBlenedModel }"
                  style="right: -291px"
                >
                  <div class="card" style="width: 700px">
                    <div class="fw-bold p-4 border-bottom">
                      Blended vs Unblended
                    </div>
                    <div class="card-body pt-4">
                      <div class="fw-bold fs-4 mb-2">Blended</div>
                      <div class="mb-4">on a $3,000,000.00 billable amount</div>

                      <div class="d-flex">
                        <div
                          class="
                            bg-primary-alpha
                            border-dashed border-primary
                            rounded-2
                            p-4
                          "
                        >
                          <table class="table mb-0">
                            <tr>
                              <td class="text-end p-1">0</td>
                              <td class="p-1">-</td>
                              <td class="p-1">$500,000.00</td>
                              <td class="p-1">@</td>
                              <td class="p-1">1.00%</td>
                            </tr>
                            <tr>
                              <td class="text-end p-1">$500,000.00</td>
                              <td class="p-1">-</td>
                              <td class="p-1">$1,000,000.00</td>
                              <td class="p-1">@</td>
                              <td class="p-1">0.75%</td>
                            </tr>
                            <tr>
                              <td class="text-end p-1">$1,000,000.00</td>
                              <td class="p-1">-</td>
                              <td class="p-1">$5,000,000.00</td>
                              <td class="p-1">@</td>
                              <td class="p-1">0.50%</td>
                            </tr>
                            <tr>
                              <td class="text-end p-1">$5,000,000.00</td>
                              <td class="p-1">-</td>
                              <td class="p-1">Above</td>
                              <td class="p-1">@</td>
                              <td class="p-1">0.25%</td>
                            </tr>
                          </table>
                        </div>
                        <div
                          class="
                            w-100
                            ms-4
                            bg-secondary
                            d-flex
                            align-items-center
                            p-4
                            rounded-2
                          "
                        >
                          <table class="table mb-0">
                            <tr>
                              <td class="text-end p-1">$500,000.00</td>
                              <td class="p-1">@</td>
                              <td class="p-1">1.00%</td>
                            </tr>
                            <tr>
                              <td class="text-end p-1">$1,000,000.00</td>
                              <td class="p-1">@</td>
                              <td class="p-1">0.75%</td>
                            </tr>
                            <tr>
                              <td class="text-end p-1">$5,000,000.00</td>
                              <td class="p-1">@</td>
                              <td class="p-1">0.50%</td>
                            </tr>
                          </table>
                        </div>
                      </div>

                      <div class="fw-bold fs-4 mb-2 mt-4">Unblended</div>
                      <div class="mb-4">on a $3,000,000.00 billable amount</div>

                      <div class="d-flex">
                        <div
                          class="
                            bg-primary-alpha
                            border-dashed border-primary
                            rounded-2
                            p-4
                          "
                        >
                          <table class="table mb-0">
                            <tr>
                              <td class="text-end p-1">0</td>
                              <td class="p-1">-</td>
                              <td class="p-1">$500,000.00</td>
                              <td class="p-1">@</td>
                              <td class="p-1">1.00%</td>
                            </tr>
                            <tr>
                              <td class="text-end p-1">$500,000.00</td>
                              <td class="p-1">-</td>
                              <td class="p-1">$1,000,000.00</td>
                              <td class="p-1">@</td>
                              <td class="p-1">0.75%</td>
                            </tr>
                            <tr>
                              <td class="text-end p-1">$1,000,000.00</td>
                              <td class="p-1">-</td>
                              <td class="p-1">$5,000,000.00</td>
                              <td class="p-1">@</td>
                              <td class="p-1">0.50%</td>
                            </tr>
                            <tr>
                              <td class="text-end p-1">$5,000,000.00</td>
                              <td class="p-1">-</td>
                              <td class="p-1">Above</td>
                              <td class="p-1">@</td>
                              <td class="p-1">0.25%</td>
                            </tr>
                          </table>
                        </div>
                        <div
                          class="
                            w-100
                            ms-4
                            bg-secondary
                            d-flex
                            align-items-center
                            p-4
                            rounded-2
                          "
                        >
                          <table class="table mb-0">
                            <tr>
                              <td class="text-end p-1">$1,000,000.00</td>
                              <td class="p-1">@</td>
                              <td class="p-1">0.75%</td>
                            </tr>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            class="m-8 ms-0 position-relative"
            v-if="feeValidation.type == 'Flat'"
          >
            <div class="row">
              <div class="col-10">
                <div class="d-flex align-items-center">
                  <div class="w-25">
                    <label for="BPS" class="form-label fw-bolder"> BPS </label>
                    <div class="input-group input-group-solid">
                      <input
                        type="text"
                        class="form-control text-start"
                        :class="{
                          'border-danger':
                            feeValidation.bps.touched &&
                            feeValidation.bps.invalid,
                        }"
                        :title="
                          feeValidation.bps.touched && feeValidation.bps.invalid
                            ? feeValidation.bps.message
                            : ''
                        "
                        v-model="feeValidation.bps.value"
                        @input="flatInputValidation"
                      />
                    </div>
                  </div>
                  <div class="mt-8 ms-6 me-6">+</div>
                  <div class="w-50">
                    <label for="Amount" class="form-label fw-bolder">
                      Amount
                    </label>
                    <div class="input-group input-group-solid w-75">
                      <input
                        type="text"
                        class="form-control text-start"
                        :class="{
                          'border-danger':
                            feeValidation.amount.touched &&
                            feeValidation.amount.invalid,
                        }"
                        :title="
                          feeValidation.amount.touched &&
                          feeValidation.amount.invalid
                            ? feeValidation.amount.message
                            : ''
                        "
                        v-model="feeValidation.amount.value"
                        @input="flatInputValidation"
                        @blur="updateFlatAmount"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="m-4 ms-0" v-if="feeValidation.type == 'Tiered'">
            <div class="fw-bold">Define your tiers</div>

            <div>
              <table
                class="
                  table
                  fs-6
                  border-top-0
                  border-start-0
                  border-end-0
                  border-bottom-2
                  border-dashed
                  border-light
                "
              >
                <thead>
                  <tr>
                    <th
                      class="
                        fw-bold
                        border-bottom-2 border-dashed border-light
                        p-2
                      "
                    ></th>
                    <th
                      class="
                        fw-bold
                        border-bottom-2 border-dashed border-light
                        p-2
                      "
                    ></th>
                    <th
                      class="
                        fw-bold
                        border-bottom-2 border-dashed border-light
                        p-2
                      "
                    ></th>
                    <th
                      class="
                        fw-bold
                        text-gray-secondary
                        border-bottom-2 border-dashed border-light
                        p-2
                      "
                    >
                      BPS
                    </th>
                    <th
                      class="
                        fw-bold
                        text-gray-secondary
                        border-bottom-2 border-dashed border-light
                        p-2
                      "
                    ></th>
                    <th
                      class="
                        fw-bold
                        text-gray-secondary
                        border-bottom-2 border-dashed border-light
                        p-2
                      "
                    >
                      Amount
                    </th>
                    <th
                      class="
                        fw-bold
                        border-bottom-2 border-dashed border-light
                        p-2
                      "
                    ></th>
                    <th
                      class="
                        fw-bold
                        border-bottom-2 border-dashed border-light
                        p-2
                      "
                    ></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in tiers" :key="index">
                    <td
                      class="
                        fw-bold
                        text-dark-gray
                        border-bottom-2 border-dashed border-light
                        pt-6
                        pb-6
                        ps-2
                        pe-2
                      "
                      style="line-height: 3"
                    >
                      {{ $filters.currencyDisplay(item.fromValue.value) }}
                    </td>
                    <td
                      class="
                        fw-bold
                        text-dark-gray
                        border-bottom-2 border-dashed border-light
                        pt-6
                        pb-6
                        ps-2
                        pe-2
                      "
                      style="line-height: 3"
                    >
                      <div v-if="index + 1 == tiers.length">and above</div>
                      <div v-else>
                        <div class="d-flex align-items-center">
                          <span class="me-2">$</span>
                          <div class="input-group input-group-solid">
                            <input
                              type="text"
                              class="form-control text-start"
                              :class="{
                                'border-danger':
                                  item.toValue.touched && item.toValue.invalid,
                              }"
                              :title="
                                item.toValue.touched && item.toValue.invalid
                                  ? item.toValue.message
                                  : ''
                              "
                              v-model="item.toValue.value"
                              @input="updateInput(item, index)"
                              @blur="convertDollar(item, 'toValue')"
                            />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td
                      class="
                        fw-bold
                        text-dark-gray
                        border-bottom-2 border-dashed border-light
                        pt-6
                        pb-6
                        ps-2
                        pe-2
                      "
                      style="line-height: 3"
                    >
                      =
                    </td>
                    <td
                      class="
                        fw-bold
                        text-dark-gray
                        border-bottom-2 border-dashed border-light
                        pt-6
                        pb-6
                        ps-2
                        pe-2
                      "
                      style="line-height: 3"
                    >
                      <div class="d-flex align-items-center">
                        <div class="input-group input-group-solid">
                          <input
                            type="text"
                            class="form-control text-start"
                            :class="{
                              'border-danger':
                                item.bps.touched && item.bps.invalid,
                            }"
                            :title="
                              item.bps.touched && item.bps.invalid
                                ? item.bps.message
                                : ''
                            "
                            v-model="item.bps.value"
                            @input="validation(item, index)"
                          />
                        </div>
                      </div>
                    </td>
                    <td
                      class="
                        fw-bold
                        text-dark-gray
                        border-bottom-2 border-dashed border-light
                        pt-6
                        pb-6
                        ps-2
                        pe-2
                      "
                      style="line-height: 3"
                    >
                      +
                    </td>
                    <td
                      class="
                        fw-bold
                        text-dark-gray
                        border-bottom-2 border-dashed border-light
                        pt-6
                        pb-6
                        ps-2
                        pe-2
                      "
                      style="line-height: 3"
                    >
                      <div class="d-flex align-items-center">
                        <span class="me-2">$</span>
                        <div class="input-group input-group-solid">
                          <input
                            type="text"
                            class="form-control text-start"
                            :class="{
                              'border-danger':
                                item.amount.touched && item.amount.invalid,
                            }"
                            v-model="item.amount.value"
                            :title="
                              item.amount.touched && item.amount.invalid
                                ? item.amount.message
                                : ''
                            "
                            @input="validation(item, index)"
                            @blur="convertDollar(item, 'amount')"
                          />
                        </div>
                      </div>
                    </td>
                    <td
                      class="
                        fw-bold
                        text-dark-gray
                        border-bottom-2 border-dashed border-light
                        pt-6
                        pb-6
                        ps-2
                        pe-2
                      "
                      style="line-height: 3"
                    >
                      <button
                        type="button"
                        class="btn btn-primary btn-sm p-2 ps-3"
                        @click="addItem(item, index)"
                        v-if="index + 1 != tiers.length"
                      >
                        <i class="fa fa-plus"></i>
                      </button>
                    </td>
                    <td
                      class="
                        fw-bold
                        text-dark-gray
                        border-bottom-2 border-dashed border-light
                        pt-6
                        pb-6
                        ps-2
                        pe-2
                      "
                      style="line-height: 3"
                    >
                      <button
                        type="button"
                        class="btn btn-secondary text-gray btn-sm p-2 ps-3"
                        @click="removeItem(index)"
                        v-if="index != 0 && index + 1 != tiers.length"
                      >
                        <i class="fa fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div
            class="form-check form-switch m-8 ms-0"
            v-if="modelType == 'Edit Fee Schedule'"
          >
            <input
              class="form-check-input"
              type="checkbox"
              v-model="v$.request.isActive.$model"
            />
            <label class="form-check-label" for="Activate User">Activate</label>
          </div>
        </div>
        <div class="modal-footer justify-content-center border-0 p-4">
          <button type="button" class="btn btn-link text-gray" @click="close">
            Cancel
          </button>
          <button
            type="button"
            class="btn ms-8 btn-primary"
            @click="formValidation"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Options, setup } from "vue-class-component";
import { Prop, Inject } from "vue-property-decorator";

import useVuelidate from "@vuelidate/core";

import { required } from "@vuelidate/validators";

import {
  AddFeeScheduleRequestModel,
  TierFormModel,
  CurrencyCode,
  TierType,
  FeeSchedulesResponseModel,
  AddFeeScheduleValidationModel,
  TierModel,
} from "@/model";

import TextInput from "@/components/controls/TextInput.vue";
import SelectBox from "@/components/controls/SelectBox.vue";

import { IFeeSchedulesService } from "@/service";

@Options({
  components: {
    TextInput,
    SelectBox,
  },
  validations: {
    request: {
      name: { required },
      currencyCode: { required },
      isActive: {},
    },
  },
})
export default class AddFeeSchedule extends Vue {
  @Inject("feeSchedulesService") service: IFeeSchedulesService;
  @Prop() modelType: string;
  @Prop() selectedFees: FeeSchedulesResponseModel;

  public v$: any = setup(() => this.validate());
  public request: AddFeeScheduleRequestModel = new AddFeeScheduleRequestModel();

  public feeValidation: AddFeeScheduleValidationModel =
    new AddFeeScheduleValidationModel();

  public showBPSError: boolean = false;
  public showBlenedModel: boolean = false;

  public tiers: Array<TierFormModel> = [];

  public validate() {
    return useVuelidate();
  }

  mounted() {
    if (this.modelType == "Add Fee Schedule") this.feeValidation.type = "Flat";
    else
      this.feeValidation.type =
        this.selectedFees.tierType == "FLAT" ? "Flat" : "Tiered";

    this.resetForm();
  }

  public resetForm() {
    this.feeValidation.formValid = false;

    if (this.feeValidation.type == "Flat") this.resetFlat();
    else this.resetTiered();

    if (this.modelType == "Edit Fee Schedule") this.updateForm();
  }

  public resetFlat() {
    this.feeValidation.bps.touched = false;
    this.feeValidation.bps.value = null;
    this.feeValidation.bps.invalid = true;
    this.feeValidation.bps.message = "This rate point cannot be blank!";

    this.feeValidation.amount.touched = false;
    this.feeValidation.amount.value = null;
    this.feeValidation.amount.invalid = true;
    this.feeValidation.amount.message = "This amount point cannot be blank!";
  }

  public resetTiered() {
    this.tiers = [];
    let tier = new TierFormModel();
    tier.fromValue.value = 0;
    tier.fromValue.touched = false;
    tier.fromValue.invalid = false;
    tier.fromValue.message = "This break point cannot be blank!";

    tier.toValue.value = this.updateCurrency(50000);
    tier.toValue.touched = false;
    tier.toValue.invalid = false;
    tier.toValue.message = "This break point cannot be blank!";

    tier.bps.value = null;
    tier.bps.touched = false;
    tier.bps.invalid = true;
    tier.bps.message = "This rate point cannot be blank!";

    tier.amount.value = null;
    tier.amount.touched = false;
    tier.amount.invalid = true;
    tier.amount.message = "This amount point cannot be blank!";

    this.tiers.push(tier);

    tier = new TierFormModel();
    tier.fromValue.value = 50000;
    tier.fromValue.touched = false;
    tier.fromValue.invalid = false;
    tier.fromValue.message = "This break point cannot be blank!";

    tier.toValue.value = 0;
    tier.toValue.touched = false;
    tier.toValue.invalid = false;
    tier.toValue.message = "This break point cannot be blank!";

    tier.bps.value = null;
    tier.bps.touched = false;
    tier.bps.invalid = true;
    tier.bps.message = "This rate point cannot be blank!";

    tier.amount.value = null;
    tier.amount.touched = false;
    tier.amount.invalid = true;
    tier.amount.message = "This amount point cannot be blank!";

    this.tiers.push(tier);
  }

  public flatInputValidation() {
    this.feeValidation.bps.touched = true;
    this.feeValidation.amount.touched = true;

    if (
      (this.feeValidation.bps.value &&
        !isNaN(this.$currencyToNumber(this.feeValidation.bps.value))) ||
      (this.feeValidation.amount.value &&
        !isNaN(this.$currencyToNumber(this.feeValidation.amount.value)))
    ) {
      this.feeValidation.formValid = true;

      this.feeValidation.bps.invalid = false;
      this.feeValidation.bps.message = null;

      this.feeValidation.amount.invalid = false;
      this.feeValidation.amount.message = null;
    } else if (isNaN(this.$currencyToNumber(this.feeValidation.bps.value))) {
      this.feeValidation.formValid = false;

      this.feeValidation.bps.invalid = true;
      this.feeValidation.bps.message = "Please enter value rate";

      this.feeValidation.amount.touched = false;
      this.feeValidation.amount.invalid = true;
      this.feeValidation.amount.message = null;
    } else if (isNaN(this.$currencyToNumber(this.feeValidation.amount.value))) {
      this.feeValidation.formValid = false;

      this.feeValidation.amount.invalid = true;
      this.feeValidation.amount.message = "Please enter value amount";

      this.feeValidation.bps.touched = false;
      this.feeValidation.bps.invalid = true;
      this.feeValidation.bps.message = null;
    } else {
      this.feeValidation.formValid = false;

      this.feeValidation.bps.invalid = true;
      this.feeValidation.bps.message = "This rate point cannot be blank!";

      this.feeValidation.amount.invalid = true;
      this.feeValidation.amount.message = "This amount point cannot be blank!";
    }
  }

  public clickOutSideBlended() {
    this.showBlenedModel = false;
  }

  private updateForm() {
    this.request.name = this.selectedFees.name;
    let currencyCode: any = this.selectedFees.currencyCode;
    this.request.currencyCode =
      Object.keys(CurrencyCode)[
        Object.values(CurrencyCode).indexOf(currencyCode)
      ];

    if (this.feeValidation.type == "Flat") {
      this.feeValidation.bps.value = this.selectedFees.flatRate;
      this.feeValidation.amount.value = this.selectedFees.flatAmount;
      this.updateFlatAmount();
      this.flatInputValidation();
    } else if (this.selectedFees.tier.length > 0) {
      this.feeValidation.blended =
        this.selectedFees.tierType == "TIERED_BLENDED" ? true : false;

      this.tiers = [];

      this.selectedFees.tier.forEach((item, index) => {
        let tier = new TierFormModel();

        tier.fromValue.value = item.fromValue;
        tier.toValue.value = item.toValue;
        tier.bps.value = item.bps;
        tier.amount.value = item.amount;

        tier.fromValue.invalid = false;
        tier.fromValue.touched = false;
        tier.fromValue.message = null;

        tier.toValue.invalid = false;
        tier.toValue.touched = false;
        tier.toValue.message = null;

        tier.bps.invalid = false;
        tier.bps.touched = false;
        tier.bps.message = null;

        tier.amount.invalid = false;
        tier.amount.touched = false;
        tier.amount.message = null;

        this.validation(tier, index);

        this.tiers.push(tier);
      });
    }
  }

  public addItem(item: TierFormModel, index: number) {
    let tier = new TierFormModel();

    tier.fromValue.value = this.$currencyToNumber(item.toValue.value);

    tier.toValue.value = this.updateCurrency(
      this.$currencyToNumber(item.toValue.value) * 2
    );

    tier.fromValue.touched = false;
    tier.fromValue.invalid = true;
    tier.fromValue.message = "This break point cannot be blank!";

    if (tier.toValue.value) {
      tier.toValue.touched = false;
      tier.toValue.invalid = false;
      tier.toValue.message = null;
    } else {
      tier.toValue.touched = false;
      tier.toValue.invalid = true;
      tier.toValue.message = "This break point cannot be blank!";
    }

    tier.bps.touched = false;
    tier.bps.invalid = true;
    tier.bps.message = "This rate point cannot be blank!";

    tier.amount.touched = false;
    tier.amount.invalid = true;
    tier.amount.message = "This amount point cannot be blank!";

    this.feeValidation.formValid = false;

    this.tiers.splice(index + 1, 0, tier);
    this.tiers[index + 2].fromValue.value = this.$currencyToNumber(
      tier.toValue.value
    );

    for (let i in this.tiers) {
      this.validation(this.tiers[i], +i);
    }
  }

  public convertDollar(item: any, type: string) {
    item[type].value = this.updateCurrency(item[type].value);
  }

  public removeItem(index: number) {
    this.tiers.splice(index, 1);
    this.tiers[index].fromValue.value = this.$currencyToNumber(
      this.tiers[index - 1].toValue.value
    );
  }

  public updateInput(item: TierFormModel, index: number) {
    this.tiers[index + 1].fromValue.value = this.$currencyToNumber(
      item.toValue.value
    );
    this.validation(item, index);
    this.validation(this.tiers[index + 1], index + 1);
  }

  public validation(item: TierFormModel, index: number) {
    item.fromValue.touched = true;
    item.toValue.touched = true;

    item.bps.touched = true;
    item.amount.touched = true;

    if (index != 0) {
      if (item.fromValue.value) {
        item.fromValue.invalid = false;
      } else {
        item.fromValue.invalid = true;
        item.fromValue.message = "This break point cannot be blank!";
      }
    }

    if (index + 1 != this.tiers.length) {
      if (item.toValue.value) {
        item.toValue.invalid = false;
        item.toValue.message = null;
      } else {
        item.toValue.invalid = true;
        item.toValue.message = "This break point cannot be blank!";
      }

      if (item.fromValue.value <= this.$currencyToNumber(item.toValue.value)) {
        item.toValue.invalid = false;
        item.toValue.message = null;
      } else {
        item.toValue.invalid = true;
        item.toValue.message =
          "This break point cannot be less than the break point of the tier below!";
      }
    }

    if (item.bps.value || item.amount.value) {
      item.bps.invalid = false;
      item.bps.message = null;
      item.amount.invalid = false;
      item.amount.message = null;
    } else {
      item.bps.invalid = true;
      item.bps.message = "This rate point cannot be blank!";
      item.amount.invalid = true;
      item.amount.message = "This amount point cannot be blank!";
    }

    if (item.bps.value && isNaN(item.bps.value)) {
      item.bps.invalid = true;
      item.bps.message = "Please enter value rate";
    }

    if (item.amount.value && isNaN(item.amount.value)) {
      item.amount.invalid = true;
      item.amount.message = "Please enter value rate";
    }

    let formValid = this.tiers.filter(
      (tier) =>
        tier.fromValue.invalid ||
        tier.toValue.invalid ||
        tier.bps.invalid ||
        tier.amount.invalid
    );

    if (formValid.length == 0) this.feeValidation.formValid = true;
    else this.feeValidation.formValid = false;
  }

  public formValidation() {
    this.v$.request.$touch();

    if (!this.v$.request.$invalid && this.feeValidation.formValid) {
      this.addFeeSchedule();
    } else {
      if (this.feeValidation.type == "Flat") {
        this.feeValidation.bps.touched = true;
        this.feeValidation.amount.touched = true;
      } else this.validTiered();
    }
  }

  public validTiered() {
    for (let i = 0; i < this.tiers.length; i++) {
      this.tiers[i].fromValue.touched = true;
      this.tiers[i].toValue.touched = true;
      this.tiers[i].bps.touched = true;
      this.tiers[i].amount.touched = true;
    }
  }

  public addFeeSchedule() {
    this.request.currencyCode =
      CurrencyCode[this.request.currencyCode as keyof typeof CurrencyCode];

    this.request.tierType = TierType[this.tierType as keyof typeof TierType];

    if (this.modelType == "Edit Fee Schedule")
      this.request.feeScheduleId = this.selectedFees.feeScheduleId;

    if (this.feeValidation.type == "Flat") {
      this.request.flatRate = +this.feeValidation.bps.value;
      this.request.flatAmount = this.$currencyToNumber(
        this.feeValidation.amount.value
      );
    } else {
      this.tiers.forEach((item, index) => {
        let tier = new TierModel();
        tier.id = index;

        tier.fromValue = +item.fromValue.value;
        tier.toValue = item.toValue.value
          ? this.$currencyToNumber(item.toValue.value)
          : null;
        tier.bps = item.bps.value ? +item.bps.value : null;
        tier.amount = item.amount.value
          ? this.$currencyToNumber(item.amount.value)
          : null;
        this.request.tier.push(tier);
      });
    }

    this.service
      .addFeeSchedule(this.request)
      .then((response) => {
        this.$emit("newFeeAdded");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  public close() {
    this.$emit("close");
  }

  public updateFlatAmount() {
    this.feeValidation.amount.value = this.updateCurrency(
      this.feeValidation.amount.value
    );
  }

  private updateCurrency(value: any) {
    value = this.$currencyToNumber(value);
    const numberOfDigits: number = 2,
      minDigits: number = 2;

    if (!value) return ``;

    if (isNaN(parseFloat(value))) return value;

    value = parseFloat(value);

    if (value >= 0)
      value = `${value.toLocaleString("en-US", {
        minimumFractionDigits: minDigits,
        maximumFractionDigits: numberOfDigits,
      })}`;
    else
      value = `(${Math.abs(value).toLocaleString("en-US", {
        minimumFractionDigits: minDigits,
        maximumFractionDigits: numberOfDigits,
      })})`;

    return value;
  }

  get tierType() {
    return this.feeValidation.type == "Flat"
      ? "Flat"
      : this.feeValidation.blended
      ? "Tierd Blended"
      : "Tierd Unblended";
  }
}
</script>