<template>
  <div class="d-flex align-items-center justify-content-between">
    <bread-crumb />
    <button class="btn btn-primary" type="button" @click="addBranch">
      Add Branch
    </button>
  </div>
  <div class="card p-4 mt-4 position-relative">
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
            @input="applyFilter($event.target.value)"
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
              BRANCH CODE
            </th>
            <th
              class="
                fw-bold
                text-gray-secondary
                border-bottom-2 border-dashed border-light
                p-6
              "
            >
              BRANCH NAME
            </th>
            <th
              class="
                fw-bold
                text-gray-secondary
                border-bottom-2 border-dashed border-light
                p-6
              "
            >
              ASSIGNED REP CODES
            </th>

            <th
              class="
                fw-bold
                text-gray-secondary
                border-bottom-2 border-dashed border-light
                p-6
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
                border-bottom-2 border-dashed border-light
                p-6
              "
              :class="{
                'bg-warning-opacity':
                  item.recordStatus == 'new' || item.recordStatus == 'update',
              }"
              style="width: 20%"
              @click="viewBranch('View Branch', item)"
            >
              {{ item.branchCode }}
            </td>
            <td
              class="
                fw-bold
                text-dark-gray
                border-bottom-2 border-dashed border-light
                p-6
              "
              :class="{
                'bg-warning-opacity':
                  item.recordStatus == 'new' || item.recordStatus == 'update',
              }"
              style="width: 25%"
              @click="viewBranch('View Branch', item)"
            >
              {{ item.branchName }}
            </td>
            <td
              class="
                fw-bold
                text-dark-gray
                border-bottom-2 border-dashed border-light
                p-6
              "
              :class="{
                'bg-warning-opacity':
                  item.recordStatus == 'new' || item.recordStatus == 'update',
              }"
              style="width: 40%"
            >
              <span v-for="(code, i) of item.repCodes" :key="i">
                <span v-if="i < 2">
                  {{ code.repCode
                  }}<span v-if="i + 1 < item.repCodes.length">, </span>
                </span>
              </span>

              <span
                class="badge rounded-circle bg-primary text-white p-4 ms-4"
                v-if="item.repCodes.length > 2"
              >
                +{{ item.repCodes.length - 2 }}
              </span>
            </td>
            <td
              class="border-bottom-2 border-dashed border-light p-6"
              style="width: 15%"
              :class="{
                'bg-warning-opacity':
                  item.recordStatus == 'new' || item.recordStatus == 'update',
              }"
            >
              <div class="d-flex align-items-center p-4">
                <i
                  class="fa fa-pen text-dark-gray edit-row fa-primary-hover"
                  @click="viewBranch('Edit Branchs', item)"
                ></i>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <add-branch
        @close="addBranchModel = false"
        @newBranch="updateBranch"
        v-if="addBranchModel"
      />
      <view-branches
        :type="type"
        :branch="selectedBranch"
        @branchUpdated="updateBranch"
        @close="showBranchModel = false"
        v-if="showBranchModel"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { Options } from "vue-class-component";
import { Inject } from "vue-property-decorator";

import BaseComponent from "@/components/base/BaseComponent.vue";
import BreadCrumb from "@/components/layout/BreadCrumb.vue";

import { useStore } from "vuex";

import { IBranchesService } from "@/service";
import { branchesResponseModel } from "@/model";

import AddBranch from "./compontents/AddBranch.vue";
import ViewBranches from "./compontents/ViewBranches.vue";

@Options({
  components: {
    AddBranch,
    ViewBranches,
    BreadCrumb,
  },
})
export default class Branches extends BaseComponent {
  @Inject("branchesService") service: IBranchesService;

  public store = useStore();

  public response: Array<branchesResponseModel> = [];
  public dataResource: Array<branchesResponseModel> = [];
  public selectedBranch: branchesResponseModel = new branchesResponseModel();
  public addBranchModel: boolean = false;
  public showBranchModel: boolean = false;

  public type: string = "";

  created() {
    this.getBranches();
  }

  private getBranches() {
    this.service
      .getBranches()
      .then((response) => {
        this.response = response;
        this.dataResource = response;
        this.applyStatus();
      })
      .catch((err) => {
        if (err.response.status == 500)
          this.alert(
            "Oops, sorry!",
            "Somthing went wrong, Please contact administration"
          );
        else if (err.response.status == 400)
          this.alert("Oops, sorry!", err.response.data.message);
      });
  }

  public addBranch() {
    this.addBranchModel = true;
  }

  public viewBranch(type: string, item: branchesResponseModel) {
    this.type = type;
    this.selectedBranch = item;
    this.showBranchModel = true;
  }

  public updateBranch() {
    this.addBranchModel = false;
    this.showBranchModel = false;
    this.getBranches();
  }

  public applyFilter(searchValue: string) {
    this.response = this.dataResource.filter(
      (item) =>
        (item.branchCode &&
          item.branchCode.toLowerCase().includes(searchValue.toLowerCase())) ||
        (item.branchName &&
          item.branchName.toLowerCase().includes(searchValue.toLowerCase())) ||
        item.repCodes.some(
          (code) =>
            code.repCode &&
            code.repCode.toLowerCase().includes(searchValue.toLowerCase())
        )
    );
  }

  public applyStatus() {
    for (let i in this.response) {
      this.response[i].recordStatus = this.create(
        this.response[i].createdTime,
        this.response[i].updatedTime
      );
    }

    setTimeout(() => {
      this.removeStatus();
    }, 10000)
  }

  public removeStatus() {
    this.response.forEach((item) => {
      item.recordStatus = null;
    })
  }
}
</script>