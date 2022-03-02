<template>
  <div class="modal fade show d-block">
    <div class="modal-dialog modal-dialog-centered modal-md">
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
                :data="['USD']"
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
                <input class="form-check-input" type="checkbox" />
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

          <div class="m-8 ms-0" v-if="request.type == 'Flat'">
            <div class="form-label fw-bolder mb-4">BPS</div>

            <div class="d-flex align-items-center">
              <div class="input-group input-group-solid mb-2 w-25 me-8">
                <input type="text" class="form-control text-start" id="bps" />
              </div>
              <div>+</div>
              <div class="input-group input-group-solid mb-2 w-25 ms-8">
                <input
                  type="text"
                  class="form-control text-start"
                  id="amount"
                />
              </div>
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
                    >
                      <div v-if="item.status == 'firstRow'">
                        ${{ item.fromValue }}
                      </div>
                      <div v-else>
                        <div class="d-flex align-items-center">
                          <span class="me-4">$</span>
                          <div class="input-group input-group-solid">
                            <input
                              type="text"
                              class="form-control text-start"
                              v-model="item.fromValue"
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
                    >
                      <div v-if="item.status == 'lastRow'">
                        {{ item.toValue }}
                      </div>
                      <div v-else>
                        <div class="d-flex align-items-center">
                          <span class="me-4">$</span>
                          <div class="input-group input-group-solid">
                            <input
                              type="text"
                              class="form-control text-start"
                              v-model="item.toValue"
                              @input="updateInput(item, index)"
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
                    >
                      <div class="d-flex align-items-center">
                        <div class="input-group input-group-solid">
                          <input
                            type="text"
                            class="form-control text-start"
                            v-model="item.bps"
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
                    >
                      <div class="d-flex align-items-center">
                        <span class="me-4">$</span>
                        <div class="input-group input-group-solid">
                          <input
                            type="text"
                            class="form-control text-start"
                            v-model="item.amount"
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
                    >
                      <button
                        type="button"
                        class="btn btn-primary btn-sm p-2 ps-3"
                        @click="addItem(index)"
                        v-if="item.status != 'lastRow'"
                      >
                        <i class="fa fa-plus"></i>
                      </button>
                      <button
                        type="button"
                        class="btn btn-secondary text-gray btn-sm p-2 ps-3 ms-4"
                        @click="removeItem(index)"
                        v-if="
                          item.status != 'firstRow' && item.status != 'lastRow'
                        "
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
            class="btn btn-primary ms-8"
            @click="addFeeSchedule"
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

import { AddFeeScheduleRequestModel } from "@/model";

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
      isActive: {},
    },
  },
})
export default class AddFeeSchedule extends Vue {
  @Inject("feeSchedulesService") service: IFeeSchedulesService;

  public v$: any = setup(() => this.validate());
  public request: AddFeeScheduleRequestModel = new AddFeeScheduleRequestModel();

  public showBlenedModel: boolean = false;

  public tiers: Array<any> = [
    {
      fromValue: "0.00",
      toValue: "50000",
      bps: "",
      amount: "",
      status: "firstRow",
    },
    {
      fromValue: "50000",
      toValue: "and above",
      bps: "",
      amount: "",
      status: "lastRow",
    },
  ];

  public validate() {
    return useVuelidate();
  }

  mounted() {
    this.request.type = "Tiered";
  }

  public clickOutSideBlended() {
    this.showBlenedModel = false;
  }

  public addItem(index: number) {
    let tiers = {
      fromValue: "",
      toValue: "",
      bps: "",
      amount: "",
      status: "new",
    };
    console.log(index);
    this.tiers.splice(1, index, tiers);
  }

  public removeItem(index: number) {
    this.tiers.splice(index, 1);
  }

  public updateInput(item: any, index: number) {
    console.log("index", index);
    this.tiers[index + 1].fromValue = item.toValue;
  }

  public addFeeSchedule() {
    this.v$.$touch();

    if (!this.v$.$invalid) {
      console.log(this.request);
    }
  }

  public close() {
    this.$emit("close");
  }
}
</script>