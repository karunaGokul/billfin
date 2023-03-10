<template>
  <div class="d-flex align-items-center justify-content-between">
    <bread-crumb />
    <button class="btn btn-primary" type="button" @click="addRepCode">
      Add Rep Code
    </button>
  </div>
  <div class="card p-4 mt-4 position-relative">
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
              REP CODE
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
              ASSIGNED ADVISORS
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
              style="width: 20%"
              :class="{
                'bg-warning-opacity':
                  item.recordStatus == 'new' || item.recordStatus == 'update',
              }"
              @click="viewRepCodes('View RepCode', item)"
            >
              {{ item.repCode }}
            </td>
            <td
              class="
                fw-bold
                text-dark-gray
                border-bottom-2 border-dashed border-light
                p-6
              "
              style="width: 20%"
              :class="{
                'bg-warning-opacity':
                  item.recordStatus == 'new' || item.recordStatus == 'update',
              }"
            >
              {{ item.branchName }}
              <span v-if="item.branchCode">({{ item.branchCode }})</span>
            </td>
            <td
              class="
                fw-bold
                text-dark-gray
                border-bottom-2 border-dashed border-light
                p-6
              "
              style="width: 45%"
              :class="{
                'bg-warning-opacity':
                  item.recordStatus == 'new' || item.recordStatus == 'update',
              }"
            >
              <span v-for="(advisor, i) of item.advisors" :key="i">
                {{ advisor.displayName
                }}<span v-if="i + 1 < item.advisors.length">, </span>
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
                  @click="viewRepCodes('Edit RepCodes', item)"
                ></i>
                <span
                  class="
                    badge
                    bg-white
                    border border-dashed
                    text-primary
                    border-primary
                    record-status
                  "
                  v-if="
                    item.recordStatus == 'new' || item.recordStatus == 'update'
                  "
                  >{{ item.recordStatus == "new" ? "New" : "Edit" }}</span
                >
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <add-rep-code
    pageType="RepCodes"
    @repCodeAdded="updateRepCodes"
    @close="addRepCodeModel = false"
    v-if="addRepCodeModel"
  />
  <rep-code-preview
    pageType="RepCodes"
    :type="type"
    :selectedRepCode="selectedRepCode"
    @repCodeUpdated="updateRepCodes"
    @close="showRepCodePreviewModel = false"
    v-if="showRepCodePreviewModel"
  />
</template>
<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { Inject } from "vue-property-decorator";

import { useStore } from "vuex";

import BreadCrumb from "@/components/layout/BreadCrumb.vue";

import BaseComponent from "@/components/base/BaseComponent.vue";

import AddRepCode from "@/components/Models/AddRepCode.vue";
import RepCodePreview from "@/components/Models/RepCodePreview.vue";

import { IRepCodesService } from "@/service";
import { repCodesResponseModel } from "@/model";

@Options({
  components: {
    AddRepCode,
    RepCodePreview,
    BreadCrumb,
  },
})
export default class RepCodes extends BaseComponent {
  @Inject("repCodesService") service: IRepCodesService;

  public store = useStore();

  public response: Array<repCodesResponseModel> = [];
  public dataResource: Array<repCodesResponseModel> = [];
  public selectedRepCode: repCodesResponseModel = new repCodesResponseModel();
  public addRepCodeModel: boolean = false;
  public showRepCodePreviewModel: boolean = false;

  public type: string = "";

  created() {
    this.getRepCodes();
  }

  private getRepCodes() {
    this.service
      .getRepCodes()
      .then((response) => {
        this.response = response;
        this.dataResource = response;
        this.applyStatus();
      })
      .catch((err) => {
        if (err.response.status == 500)
          this.alert(
            "Oops, sorry!",
            "Something went wrong, Please contact administration"
          );
        else if (err.response.status == 400)
          this.alert("Oops, sorry!", err.response.data.message);
      });
  }

  public addRepCode() {
    this.addRepCodeModel = true;
  }

  public updateRepCodes() {
    this.addRepCodeModel = false;
    this.showRepCodePreviewModel = false;
    this.getRepCodes();
  }

  public viewRepCodes(type: string, item: repCodesResponseModel) {
    this.type = type;
    this.selectedRepCode = item;
    this.showRepCodePreviewModel = true;
  }

  public applyFilter(searchValue: string) {
    this.response = this.dataResource.filter(
      (item) =>
        (item.repCode &&
          item.repCode.toLowerCase().includes(searchValue.toLowerCase())) ||
        (item.branchName &&
          item.branchName.toLowerCase().includes(searchValue.toLowerCase())) ||
        item.advisors.some(
          (advisor) =>
            advisor.displayName &&
            advisor.displayName
              .toLowerCase()
              .includes(searchValue.toLowerCase())
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
    }, 10000);
  }

  public removeStatus() {
    this.response.forEach((item) => {
      item.recordStatus = null;
    });
  }
}
</script>