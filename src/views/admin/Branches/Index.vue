<template>
  <div class="card p-4 mt-4 position-relative">
    <button
      class="btn btn-primary position-absolute translate-middle"
      type="button"
      style="top: -40px; right: -58px"
      @click="addBranch"
    >
      Add Branch
    </button>
    <div class="d-flex justify-content-between p-4">
      <div class="fs-4 fw-bolder">Branches</div>
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
              BRANCH CODE
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
              ASSIGNED REP CODES
            </th>

            <th
              class="
                fw-bold
                text-gray-secondary
                border-bottom border-dashed border-light
                p-4
              "
            ></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) of response" :key="'advisors-table' + index">
            <td
              class="
                fw-bold
                text-dark-gray
                border-bottom border-dashed border-light
                p-6
              "
              @click="viewRepCodes('View RepCode', item)"
            >
              {{ item.branchCode }}
            </td>
            <td
              class="
                fw-bold
                text-dark-gray
                border-bottom border-dashed border-light
                p-6
              "
            >
              {{ item.branchName }}
            </td>
            <td
              class="
                fw-bold
                text-dark-gray
                border-bottom border-dashed border-light
                p-6
              "
            >
              <span v-for="(repCode, i) of item.repCodes" :key="i">
                {{ repCode.repCode }}
              </span>
            </td>
            <td class="border-bottom border-dashed border-light p-6">
              <i
                class="fa fa-pen text-dark-gray edit-row"
                @click="viewBranches('Edit Branches', item)"
              ></i>
            </td>
          </tr>
        </tbody>
      </table>

      <add-branch
        @close="addBranchModel = false"
        @branchAdded="updateBranch"
        v-if="addBranchModel"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Options } from "vue-class-component";

import { Inject } from "vue-property-decorator";

import { IBranchesService } from "@/service";
import { branchesResponseModel } from "@/model";

import AddBranch from "./compontents/AddBranch.vue";
import ViewBranches from "./compontents/ViewBranches.vue";

@Options({
  components: {
    AddBranch,
    ViewBranches,
  },
})
export default class Branches extends Vue {
  @Inject("branchesService") service: IBranchesService;

  public response: Array<branchesResponseModel> = [];
  public addBranchModel: boolean = false;

  created() {
    this.getBranches();
  }

  private getBranches() {
    this.service.getBranches().then((response) => {
      this.response = response;
    });
  }

  public addBranch() {
    this.addBranchModel = true;
  }

  public updateBranch() {
    this.addBranchModel = false;
    this.getBranches();
  }
}
</script>