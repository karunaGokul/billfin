<template>
  <div class="card p-4 mt-4 position-relative">
    <button
      class="
        btn btn-primary
        position-absolute
        translate-middle
        dropdown dropdown-primary
      "
      type="button"
      style="top: -40px; right: -85px"
      v-click-outside="clickOutSideFee"
      @click="toggleAddFeeSchdule = !toggleAddFeeSchdule"
    >
      Add Fee Schedules
      <i
        class="fa fa-solid ms-2"
        :class="{
          'fa-chevron-up': toggleAddFeeSchdule,
          'fa-chevron-down': !toggleAddFeeSchdule,
        }"
      ></i>
      <ul
        class="dropdown-menu overflow-auto p-2"
        :class="{ show: toggleAddFeeSchdule }"
        style="right: 0; top: 50px"
      >
        <li
          class="dropdown-item pt-2 pb-2"
          @click="showAddFeeScheduleModel = true"
        >
          Single fee schedule
        </li>
        <li class="dropdown-item pt-2 pb-2">Bulk load fee schedules</li>
      </ul>
    </button>
    <div class="card-body pt-0">
      <table
        class="
          table table-hover
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
                text-gray-secondary
                border-bottom-2 border-dashed border-light
                p-6
              "
            >
              NAME
            </th>
            <th
              class="
                fw-bold
                text-gray-secondary
                border-bottom-2 border-dashed border-light
                p-6
              "
            >
              TYPE
            </th>
            <th
              class="
                fw-bold
                text-gray-secondary
                border-bottom-2 border-dashed border-light
                p-6
              "
            >
              CURRENCY
            </th>
            <th
              class="
                fw-bold
                text-gray-secondary
                border-bottom-2 border-dashed border-light
                p-6
              "
            >
              # OF ASSIGNMENTS
            </th>
            <th
              class="
                fw-bold
                text-gray-secondary
                border-bottom-2 border-dashed border-light
                p-6
              "
            >
              STATUS
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in response"
            :key="'user-table' + index"
          >
            <td
              class="
                fw-bold
                text-dark-gray
                border-bottom-2 border-dashed border-light
                p-6
              "
            >
              {{ item.name }}
            </td>
            <td
              class="
                fw-bold
                text-dark-gray
                border-bottom-2 border-dashed border-light
                p-6
              "
            >
              {{ item.tierType }}
            </td>
            <td
              class="
                fw-bold
                text-dark-gray
                border-bottom-2 border-dashed border-light
                p-6
              "
            >
              {{ item.currencyCode }}
            </td>
            <td
              class="
                fw-bold
                text-dark-gray
                border-bottom-2 border-dashed border-light
                p-6
              "
            >
              {{ item.assignments }}
            </td>
            <td
              class="
                fw-bold
                text-dark-gray
                border-bottom-2 border-dashed border-light
                p-6
              "
            >
              <span
                class="badge fs-7 ms-2"
                :class="{
                  'bg-success-alpha text-success': item.status == 'ACTIVE',
                  'bg-dander-alpha text-danger': item.status == 'INACTIVE',
                }"
              >
                {{ item.status == "ACTIVE" ? "Active" : "Inactive" }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
      <add-fee-schedule
        @close="showAddFeeScheduleModel = false"
        v-if="showAddFeeScheduleModel"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { Inject } from "vue-property-decorator";

import { IFeeSchedulesService } from "@/service";

import {
  FeeSchedulesResponseModel,
} from "@/model";

import AddFeeSchedule from "./components/AddFeeSchedule.vue";

@Options({
  components: {
    AddFeeSchedule,
  },
})
export default class FeeSchedules extends Vue {
  @Inject("feeSchedulesService") service: IFeeSchedulesService;

  public response: Array<FeeSchedulesResponseModel> = [];

  public toggleAddFeeSchdule: boolean = false;

  public showAddFeeScheduleModel: boolean = false;

  created() {
    this.getFeeSchedules();
  }

  public getFeeSchedules() {
    this.service
      .getFeeSchedules()
      .then((response) => {
        this.response = response;
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  public controlWithPagination() {
    console.log("pagination");
  }

  public feesStatus(status: string) {
    return status == "active" ? "Active" : "In Active";
  }

  public clickOutSideFee() {
    this.toggleAddFeeSchdule = false;
  }
}
</script>