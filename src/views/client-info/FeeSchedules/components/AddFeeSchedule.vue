<template>
  <div class="modal fade show d-block">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="modal-header p-4 pt-6 pb-6">
          <h5 class="modal-title fs-4 fw-bolder">Add Fee Schedule</h5>
          <button type="button" class="btn-close" @click="close">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="modal-body ms-4 me-4 mt-4 mb-4 p-4">
          <div class="row">
            <div class="col-6">
              <text-input
                formFieldType="inputBlock"
                label="Name"
                :controls="v$.request.name"
                :validation="['required']"
              />
            </div>
            <div class="col-6">
              <select-box
                label="Currency"
                :data="['USD', 'CAD']"
                :controls="v$.request.currency"
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
                  v-model="request.type"
                  @change="resetForm"
                />
                <label class="form-check-label" for="Flat">Flat</label>
              </div>
              <div class="form-check form-check-inline form-check-success">
                <input
                  class="form-check-input"
                  type="radio"
                  name="Tiered"
                  value="Tiered"
                  v-model="request.type"
                  @change="resetForm"
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
                v-if="request.type == 'Tiered'"
              >
                <input
                  class="form-check-input"
                  type="checkbox"
                  v-model="request.tierType"
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

          <div class="m-8 ms-0 position-relative" v-if="request.type == 'Flat'">
            <div class="row">
              <div class="col-8">
                <div class="d-flex align-items-center">
                  <text-input
                    formFieldType="inputBlock"
                    label="BPS"
                    :controls="v$.request.bps"
                    @updateEvent="flatInputValidation"
                    :validation="['numeric']"
                  />
                  <div class="mt-0 ms-6 me-6">+</div>
                  <text-input
                    formFieldType="inputBlock"
                    label="Amount"
                    :controls="v$.request.amount"
                    :validation="['numeric']"
                    @updateInput="flatInputValidation"
                  />
                </div>
              </div>
            </div>
            <div
              class="position-absolute bottom-0 text-danger"
              v-if="request.touched && !request.formValid"
            >
              BPS or Amount is required
            </div>
          </div>

          <div class="m-4 ms-0" v-if="request.type == 'Tiered'">
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
                      {{ $filters.currencyDisplay(item.fromValue) }}
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
                                  item.touched &&
                                  item.invalid &&
                                  item.field == 'toValue',
                              }"
                              :title="
                                item.touched && item.invalid ? item.message : ''
                              "
                              v-model="item.toValue"
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
                                item.touched &&
                                item.invalid &&
                                item.field == 'bps',
                            }"
                            :title="
                              item.touched && item.invalid ? item.message : ''
                            "
                            v-model="item.bps"
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
                                item.touched &&
                                item.invalid &&
                                item.field == 'amount',
                            }"
                            v-model="item.amount"
                            :title="
                              item.touched && item.invalid ? item.message : ''
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

          <!--<div class="form-check form-switch m-8 ms-0">
            <input
              class="form-check-input"
              type="checkbox"
              v-model="v$.request.isActive.$model"
            />
            <label class="form-check-label" for="Activate User">Activate</label>
          </div> -->
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

import { required, numeric } from "@vuelidate/validators";

import {
  AddFeeScheduleRequestModel,
  tierFormModel,
  CurrencyCode,
  TierType,
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
      currency: { required },
      bps: { numeric },
      amount: { numeric },
      isActive: {},
    },
  },
})
export default class AddFeeSchedule extends Vue {
  @Inject("feeSchedulesService") service: IFeeSchedulesService;

  public v$: any = setup(() => this.validate());
  public request: AddFeeScheduleRequestModel = new AddFeeScheduleRequestModel();

  public showBPSError: boolean = false;
  public showBlenedModel: boolean = false;

  public tiers: Array<tierFormModel> = [];

  public validate() {
    return useVuelidate();
  }

  created() {
    let tier = new tierFormModel();
    tier.fromValue = 0;
    tier.toValue = this.updateCurrency(50000);
    tier.touched = false;
    tier.invalid = true;
    tier.field = "bps";
    tier.message = "This rate point cannot be blank!";

    this.tiers.push(tier);

    tier = new tierFormModel();

    tier.fromValue = 50000;
    tier.toValue = 0;
    tier.touched = false;
    tier.invalid = true;
    tier.field = "bps";
    tier.message = "This rate point cannot be blank!";

    this.tiers.push(tier);
  }

  mounted() {
    this.request.type = "Flat";
  }

  public clickOutSideBlended() {
    this.showBlenedModel = false;
  }

  public addItem(item: tierFormModel, index: number) {
    this.validation(item, index);

    let tiers = new tierFormModel();

    tiers.fromValue = this.$currencyToNumber(item.toValue);

    tiers.toValue = this.updateCurrency(
      this.$currencyToNumber(item.toValue) * 2
    );

    tiers.invalid = true;
    tiers.touched = false;
    tiers.message = "bps";
    this.request.formValid = false;

    this.tiers.splice(index + 1, 0, tiers);

    this.tiers[index + 2].fromValue = this.$currencyToNumber(tiers.toValue);
  }

  public convertDollar(item: any, type: string) {
    item[type] = this.updateCurrency(item[type]);
  }

  public removeItem(index: number) {
    this.tiers.splice(index, 1);
    this.tiers[index].fromValue = this.$currencyToNumber(
      this.tiers[index - 1].toValue
    );
  }

  public updateInput(item: tierFormModel, index: number) {
    this.tiers[index + 1].fromValue = this.$currencyToNumber(item.toValue);
    this.validation(item, index);
  }

  public validation(item: tierFormModel, index: number) {
    item.touched = true;
    if (
      (item.bps && !isNaN(item.bps)) ||
      (item.amount && !isNaN(item.amount))
    ) {
      if (index + 1 != this.tiers.length) {
        if (item.toValue) {
          item.invalid = false;
          item.field = null;
          item.message = null;
        } else {
          item.invalid = true;
          item.field = "toValue";
          item.message = "This break point cannot be blank!";
        }
        if (item.fromValue <= this.$currencyToNumber(item.toValue)) {
          item.invalid = false;
          item.field = null;
          item.message = null;
        } else {
          item.invalid = true;
          item.field = "toValue";
          item.message =
            "This break point cannot be less than the break point of the tier below!";
        }
      } else {
        item.invalid = false;
        item.field = null;
      }
    } else {
      if (index + 1 != this.tiers.length && !item.toValue) {
        item.invalid = true;
        item.field = "toValue";
        item.message = "This break point cannot be blank!";
        this.request.formValid = false;
      } else if (!item.bps) {
        item.invalid = true;
        item.field = "bps";
        item.message = "This rate point cannot be blank!";
        this.request.formValid = false;
      } else if (isNaN(item.bps)) {
        item.invalid = true;
        item.field = "bps";
        item.message = "Please enter value rate";
        this.request.formValid = false;
      } else if (!item.amount) {
        item.invalid = true;
        item.field = "amount";
        item.message = "This amount point cannot be blank!";
        this.request.formValid = false;
      } else if (isNaN(item.amount)) {
        item.invalid = true;
        item.field = "amount";
        item.message = "Please enter value amount";
        this.request.formValid = false;
      }
    }

    let formValid = this.tiers.filter((item) => item.invalid);
    if (formValid.length == 0) this.request.formValid = true;
    else this.request.formValid = false;
  }

  public flatInputValidation() {
    this.request.touched = true;
    if (
      (this.request.bps && !this.v$.request.bps.numeric.$invalid) ||
      (this.request.amount && !this.v$.request.amount.numeric.$invalid)
    ) {
      this.request.formValid = true;
    } else this.request.formValid = false;
  }

  public formValidation() {
    this.v$.request.$touch();
    if (this.request.formValid) {
      if (!this.v$.request.$invalid) this.addFeeSchedule();
    } else {
      if (this.request.type == "Tiered") this.validRow();
      else this.request.touched = true;
    }
  }

  public validRow() {
    for (let i = 0; i < this.tiers.length; i++) {
      this.tiers[i].touched = true;
    }
  }

  public resetForm() {
    this.request.formValid = false;

    if (this.request.type == "Flat") {
      this.request.touched = false;
    } else if (this.request.type == "Tiered") {
      for (let i = 0; i < this.tiers.length; i++) {
        this.tiers[i].touched = false;
      }
    }
  }

  public addFeeSchedule() {
    let request = new AddFeeScheduleRequestModel();

    request.name = this.request.name;
    request.currency =
      CurrencyCode[this.request.currency as keyof typeof CurrencyCode];

    if (this.request.type == "Flat") {
      request.tierType = TierType[this.request.type as keyof typeof TierType];
      request.bps = +this.request.bps;
      request.amount = this.$currencyToNumber(this.request.amount);
    } else {
      request.tierType = TierType[this.tierType as keyof typeof TierType];
      request.tier = this.tiers.map(({ fromValue, toValue, bps, amount }) => ({
        fromValue,
        toValue,
        bps,
        amount,
      }));

      request.tier.forEach((item) => {
        item.fromValue = this.$currencyToNumber(item.fromValue);
        item.toValue = this.$currencyToNumber(item.toValue);
        item.bps = +item.bps;
        item.amount = +item.amount;
      });

    }

    this.service
      .addFeeSchedule(request)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  public close() {
    this.$emit("close");
  }

  public updateFlatAmount() {
    this.request.amount = this.updateCurrency(this.request.amount);
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
    return this.request.tierType ? "Tierd Blended" : "Tierd Unblended";
  }
}
</script>