<template>
  <div class="modal fade show d-block">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="modal-header p-4 pt-6 pb-6">
          <h5 class="modal-title fs-4 fw-bolder">
            <span v-if="pageType == 'RepCodes' && modelType == 'Edit RepCodes'"
              >Edit</span
            >
            {{ selectedRepCode.repCode }}
            <span v-if="selectedRepCode.branchName">-</span>
            {{ selectedRepCode.branchName }}

            <i
              class="fa fa-pen text-gray ms-4"
              style="cursor: pointer"
              v-if="pageType == 'RepCodes' && modelType == 'View RepCode'"
              @click="editRepCodes"
            ></i>
          </h5>
          <button type="button" class="btn-close" @click="close">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="modal-body m-4 p-4">
          <h5
            class="modal-title fs-4 fw-bolder"
            v-if="pageType == 'RepCodes' && modelType == 'View RepCode'"
          >
            {{ selectedRepCode.repCode }} &nbsp;&nbsp;
            {{ selectedRepCode.branchName }}
          </h5>
          <div
            class="row"
            v-if="pageType == 'RepCodes' && modelType == 'Edit RepCodes'"
          >
            <div class="col-2">
              <div class="input-group input-group-solid mb-2">
                <input
                  type="text"
                  class="form-control text-start"
                  v-model="request.repCode"
                  readonly
                />
              </div>
            </div>
            <div class="col-10">
              <select
                class="form-select form-select-solid mb-4 w-50"
                v-model="selectedBranch"
              >
                <option v-for="(item, i) in branchs" :key="i" :value="item">
                  {{ item.branchName }}
                </option>
              </select>
            </div>
          </div>
          <div class="d-flex justify-content-between p-4 ps-0">
            <div class="fs-4 fw-bolder">
              Advisors ({{ totalAdvisors }})

              <button
                type="button"
                class="btn btn-primary btn-sm p-2 ps-3 ms-4"
                :disabled="!allowAddAdvisor"
                v-if="pageType == 'RepCodes' && modelType == 'Edit RepCodes'"
                @click="addNewRow"
              >
                <i class="fa fa-plus"></i>
              </button>
            </div>
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

          <div class="overflow-auto" style="max-height: 300px">
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
                      text-gray-secondary
                      border-bottom-2 border-dashed border-light
                      p-4
                    "
                  >
                    DISPLAY NAME
                  </th>

                  <th
                    class="
                      fw-bold
                      text-gray-secondary
                      border-bottom-2 border-dashed border-light
                      p-4
                    "
                  >
                    LAST
                  </th>
                  <th
                    class="
                      fw-bold
                      text-gray-secondary
                      border-bottom-2 border-dashed border-light
                      p-4
                    "
                  >
                    FIRST
                  </th>
                  <th
                    class="
                      fw-bold
                      text-gray-secondary
                      border-bottom-2 border-dashed border-light
                      p-4
                    "
                  >
                    MIDDLE
                  </th>
                  <th
                    class="
                      fw-bold
                      text-gray-secondary
                      border-bottom-2 border-dashed border-light
                      p-4
                    "
                  ></th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, index) of request.advisors"
                  :key="'advisors-table' + index"
                >
                  <td
                    class="
                      fw-bold
                      text-dark-gray
                      border-bottom-2 border-dashed border-light
                      p-4
                      pt-6
                      pb-6
                    "
                    :class="{
                      'bg-warning-opacity':
                        item.recordStatus == 'new' ||
                        item.recordStatus == 'update',
                    }"
                  >
                    <div v-if="item.status == 'view' && !item.edit">
                      {{ item.displayName }}
                    </div>
                    <div v-else>
                      <select
                        class="form-select form-select-solid mb-2"
                        v-model="selectedAdvisor"
                        @change="updateRow(item)"
                      >
                        <option
                          v-for="(advisor, i) in unassignedAdvisors"
                          :key="i"
                          :value="advisor"
                        >
                          {{ advisor.displayName }}
                        </option>
                      </select>
                    </div>
                  </td>
                  <td
                    class="
                      fw-bold
                      text-dark-gray
                      border-bottom-2 border-dashed border-light
                      p-4
                      pt-6
                      pb-6
                    "
                    :class="{
                      'bg-warning-opacity':
                        item.recordStatus == 'new' ||
                        item.recordStatus == 'update',
                    }"
                  >
                    <div v-if="item.status == 'view' && !item.edit">
                      {{ item.lastName }}
                    </div>
                    <div v-else>
                      <div class="input-group input-group-solid mb-2">
                        <input
                          type="text"
                          class="form-control text-start"
                          v-model="item.lastName"
                          readonly
                        />
                      </div>
                    </div>
                  </td>
                  <td
                    class="
                      fw-bold
                      text-dark-gray
                      border-bottom-2 border-dashed border-light
                      p-4
                      pt-6
                      pb-6
                    "
                    :class="{
                      'bg-warning-opacity':
                        item.recordStatus == 'new' ||
                        item.recordStatus == 'update',
                    }"
                  >
                    <div v-if="item.status == 'view' && !item.edit">
                      {{ item.firstName }}
                    </div>
                    <div v-else>
                      <div class="input-group input-group-solid mb-2">
                        <input
                          type="text"
                          class="form-control text-start"
                          v-model="item.firstName"
                          readonly
                        />
                      </div>
                    </div>
                  </td>
                  <td
                    class="
                      fw-bold
                      text-dark-gray
                      border-bottom-2 border-dashed border-light
                      p-4
                      pt-6
                      pb-6
                    "
                    :class="{
                      'bg-warning-opacity':
                        item.recordStatus == 'new' ||
                        item.recordStatus == 'update',
                    }"
                  >
                    <div v-if="item.status == 'view' && !item.edit">
                      {{ item.middleName }}
                    </div>
                    <div v-else>
                      <div class="input-group input-group-solid mb-2">
                        <input
                          type="text"
                          class="form-control text-start"
                          v-model="item.middleName"
                          readonly
                        />
                      </div>
                    </div>
                  </td>

                  <td
                    class="border-bottom-2 border-dashed border-light p-4"
                    :class="{
                      'bg-warning-opacity':
                        item.recordStatus == 'new' ||
                        item.recordStatus == 'update',
                    }"
                  >
                    <button
                      type="button"
                      class="btn btn-secondary btn-sm p-2 ps-3"
                      @click="removeRow(index)"
                      v-if="
                        pageType == 'RepCodes' && modelType == 'Edit RepCodes'
                      "
                    >
                      <i class="fa fa-trash text-dark-gray edit-row"></i>
                    </button>
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
                        item.recordStatus == 'new' ||
                        item.recordStatus == 'update'
                      "
                      >{{ item.recordStatus == "new" ? "New" : "Edit" }}</span
                    >
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <add-advisor
            pageType="RepCodes"
            type="Add Advisor"
            :selectedRepCode="selectedRepCode"
            @advisorAdded="viewRepCode"
            @close="showAdvisorModel = false"
            v-if="showAdvisorModel"
          />
        </div>

        <div
          class="modal-footer border-0 p-4"
          :class="{
            'justify-content-center': modelType == 'View RepCode',
            'justify-content-between': modelType != 'View RepCode',
          }"
        >
          <button
            type="button"
            class="btn btn-primary ms-4"
            @click="close"
            v-if="modelType == 'View RepCode'"
          >
            Close
          </button>
          <template
            v-if="pageType == 'RepCodes' && modelType == 'Edit RepCodes'"
          >
            <div>
              <button
                type="button"
                class="btn btn-primary"
                @click="showAdvisorModel = true"
              >
                Add New Advisor
              </button>
            </div>
            <div>
              <button
                type="button"
                class="btn btn-secondary ms-4"
                @click="close"
              >
                Cancel
              </button>
              <button
                type="button"
                class="btn btn-primary ms-4"
                @click="saveRepCodes"
              >
                Save
              </button>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Options } from "vue-class-component";
import { Inject, Prop } from "vue-property-decorator";

import BaseComponent from "@/components/base/BaseComponent.vue";

import AddAdvisor from "../Models/AddAdvisor.vue";

import TextInput from "../controls/TextInput.vue";
import SelectBox from "../controls/SelectBox.vue";

import {
  advisorsModel,
  advisorsResponseModel,
  branchesResponseModel,
  repCodesResponseModel,
  viewRepCodesResponseModel,
  addRepCodeRequestModel,
} from "@/model";
import {
  IAdvisorsService,
  IBranchesService,
  IRepCodesService,
} from "@/service";

@Options({
  components: {
    AddAdvisor,
    TextInput,
    SelectBox,
  },
})
export default class RepCodePreview extends BaseComponent {
  @Inject("repCodesService") repCodesService: IRepCodesService;
  @Inject("branchesService") branchesService: IBranchesService;
  @Inject("advisorsService") service: IAdvisorsService;

  @Prop() selectedRepCode: repCodesResponseModel;

  @Prop() pageType: string;
  @Prop() type: string;

  public modelType: string = "";
  public showAdvisorModel: boolean = false;

  public request: viewRepCodesResponseModel = new viewRepCodesResponseModel();
  public dataResource: Array<advisorsModel> = [];

  public unassignedAdvisors: Array<advisorsResponseModel> = [];
  public selectedAdvisor: advisorsResponseModel = new advisorsResponseModel();

  public branchs: Array<branchesResponseModel> = [];

  public allowAddAdvisor: boolean = true;
  public selectedBranch: branchesResponseModel = new branchesResponseModel();

  created() {
    this.modelType = this.type;
    this.request.repCode = this.selectedRepCode.repCode;
    this.request.branchName = this.selectedRepCode.branchName;

    this.viewRepCode();

    if (this.modelType == "Edit RepCodes") {
      this.getBranch();
      this.getUnassignedAdvisors();
    }
  }

  private viewRepCode() {
    this.repCodesService
      .viewRepCode(this.selectedRepCode.repId)
      .then((response) => {
        this.showAdvisorModel = false;
        this.request = response;
        this.request.advisors.forEach((advisor) => {
          advisor.status = "view";
          advisor.edit = false;
        });
        this.dataResource = this.request.advisors;
        this.applyStatus();
      });
  }

  public applyStatus() {
    for (let i in this.request.advisors) {
      this.request.advisors[i].recordStatus = this.create(
        this.request.advisors[i].createdTime,
        this.request.advisors[i].updatedTime
      );
    }

    setTimeout(() => {
      this.removeStatus();
    }, 10000);
  }

  public removeStatus() {
    this.request.advisors.forEach((item) => {
      item.recordStatus = null;
    });
  }

  private getBranch() {
    this.branchesService
      .getBranches()
      .then((response) => {
        this.branchs = response;
        this.selectedBranch = this.branchs.find(
          (item) => item.branchName == this.selectedRepCode.branchName
        );
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

  private getUnassignedAdvisors() {
    this.service
      .unassignedAdvisors()
      .then((response) => {
        this.showAdvisorModel = false;
        this.unassignedAdvisors = response;
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

  public close() {
    this.$emit("close");
  }

  public editRepCodes() {
    this.modelType = "Edit RepCodes";
    this.getUnassignedAdvisors();
    this.getBranch();
  }

  public addNewRow() {
    for (let i = 0; i < this.request.advisors.length; i++) {
      this.request.advisors[i].status = "view";
      this.request.advisors[i].edit = false;
    }

    if (this.allowAddAdvisor) {
      let index = this.unassignedAdvisors.findIndex(
        (item) => item == this.selectedAdvisor
      );
      this.unassignedAdvisors.splice(index, 1);
    }

    this.allowAddAdvisor = false;

    this.request.advisors.unshift({
      firstName: "",
      lastName: "",
      middleName: "",
      displayName: "",
      status: "edit",
      edit: true,
      emailAddress: "",
      contactPhone: "",
      repCodes: null,
      branch: "",
      advisorIdentifier: "",
      advisorId: 0,
      createdTime: "",
      updatedTime: "",
      recordStatus: "",
    });

    this.dataResource = this.request.advisors;
  }

  public updateRow(item: advisorsModel) {
    item.status = "view";
    this.allowAddAdvisor = true;

    item.firstName = this.selectedAdvisor.firstName;
    item.lastName = this.selectedAdvisor.lastName;
    item.middleName = this.selectedAdvisor.middleName;
    item.displayName = this.selectedAdvisor.displayName;
    item.advisorId = this.selectedAdvisor.advisorId;

    this.dataResource = this.request.advisors;
  }

  public removeRow(index: number) {
    this.request.advisors.splice(index, 1);
    this.allowAddAdvisor = true;
    this.dataResource = this.request.advisors;
  }

  public saveRepCodes() {
    let request: addRepCodeRequestModel = new addRepCodeRequestModel();
    request.repId = this.request.repId;
    request.repCode = this.request.repCode;
    request.branchName = this.selectedBranch.branchName;
    request.branchCode = this.selectedBranch.branchCode;
    request.branchId = this.selectedBranch.branchId;

    request.advisors = this.request.advisors
      .filter((item) => item.status == "view")
      .map(
        ({
          advisorId,
          advisorIdentifier,
          contactPhone,
          firstName,
          lastName,
          middleName,
          displayName,
        }) => ({
          advisorId,
          advisorIdentifier,
          contactPhone,
          firstName,
          lastName,
          middleName,
          displayName,
        })
      );

    this.repCodesService
      .addRepCode(request)
      .then((response) => {
        //this.$emit("repCodeUpdated");
        this.modelType = "View RepCode";
        this.viewRepCode();
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

  public applyFilter(searchValue: string) {
    this.request.advisors = this.dataResource.filter(
      (item) =>
        (item.displayName &&
          item.displayName.toLowerCase().includes(searchValue.toLowerCase())) ||
        (item.firstName &&
          item.firstName.toLowerCase().includes(searchValue.toLowerCase())) ||
        (item.middleName &&
          item.middleName.toLowerCase().includes(searchValue.toLowerCase())) ||
        (item.lastName &&
          item.lastName.toLowerCase().includes(searchValue.toLowerCase()))
    );
  }

  get totalAdvisors() {
    return this.request.advisors.filter((item) => item.status == "view").length;
  }
}
</script>