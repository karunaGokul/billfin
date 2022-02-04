<template>
  <div class="card p-4 mt-4 position-relative">
    <button
      class="btn btn-primary position-absolute translate-middle"
      type="button"
      style="top: -40px; right: -58px"
      @click="addRepCode"
    >
      Add Rep Code
    </button>
    <div class="d-flex justify-content-between p-4">
      <div class="fs-4 fw-bolder">Rep Codes</div>
      <div>
        <div class="input-group input-group-solid">
          <span class="input-group-text">
            <img src="@/assets/search.svg" alt="Search Icon" />
          </span>
          <input
            class="form-control"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
        </div>
      </div>
    </div>
    <div class="card-body pt-0">
      <table
        class="
          table table-hover
          fs-6
          border-top-0
          border-start-0
          border-end-0
          border-bottom
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
                border-bottom border-dashed border-light
                p-4
              "
            >
              REP CODE
            </th>
            <th
              class="
                fw-bold
                text-gray-secondary
                border-bottom border-dashed border-light
                p-4
              "
            >
              BRANCH NAME
            </th>
            <th
              class="
                fw-bold
                text-gray-secondary
                border-bottom border-dashed border-light
                p-4
              "
            >
              ASSIGNED ADVISORS
            </th>

            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) of response" :key="'advisors-table' + index">
            <td
              class="
                fw-bold
                text-dark-gray
                border-bottom border-dashed border-light
                p-4
              "
            >
              {{ item.repCode }}
            </td>
            <td
              class="
                fw-bold
                text-dark-gray
                border-bottom border-dashed border-light
                p-4
              "
            >
              {{ item.branch.join(", ") }}
            </td>
            <td
              class="
                fw-bold
                text-dark-gray
                border-bottom border-dashed border-light
                p-4
              "
            >
              {{ item.assignedAdvisors.join(", ") }}
            </td>
            <td class="border-bottom border-dashed border-light p-4">
              <i
                class="fa fa-pen text-dark-gray edit-row"
              ></i>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <add-rep-code
    pageType="Advisor"
    @close="showRepCodeModel = false"
    v-if="showRepCodeModel"
  />
</template>
<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { Inject } from "vue-property-decorator";

import AddRepCode from "@/components/Models/AddRepCode.vue";

import { IRepCodesService } from "@/service";
import { repCodesResponseModel } from "@/model";

@Options({
  components: {
    AddRepCode,
  },
})
export default class RepCodes extends Vue {
  @Inject("repCodesService") service: IRepCodesService;

  public response: Array<repCodesResponseModel> = [];
  public showRepCodeModel: boolean = false;

  created() {
    this.getRepCodes();
  }

  private getRepCodes() {
    this.service.getRepCodes().then((response) => {
      this.response = response;
    });
  }

  public addRepCode() {
    this.showRepCodeModel = true;
  }

}
</script>


