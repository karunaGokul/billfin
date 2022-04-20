<template>
  <div class="modal fade show d-block">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="modal-header p-4 pt-6 pb-6">
          <h5 class="modal-title fs-4 fw-bolder">
            <span v-if="modelType == 'Edit Branchs'">Edit</span>
            {{ branch.branchCode }} - {{ branch.branchName }}

            <i
              class="fa fa-pen text-gray ms-4"
              style="cursor: pointer"
              v-if="modelType == 'View Branch'"
              @click="editBranch"
            ></i>
          </h5>
          <button type="button" class="btn-close" @click="close">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="modal-body m-4 p-4">
          <h5
            class="modal-title fs-4 fw-bolder"
            v-if="modelType == 'View Branch'"
          >
            {{ branch.branchCode }} &nbsp;&nbsp; {{ branch.branchName }}
          </h5>
          <div
            class="d-flex align-items-center"
            v-if="modelType == 'Edit Branchs'"
          >
            <div class="row">
              <div class="col-4">
                <text-input
                  formFieldType="inputBlock"
                  label=""
                  :controls="v$.request.branchCode"
                  :validation="['required']"
                  readonly
                />
              </div>
              <div class="col-8">
                <div class="w-75">
                  <text-input
                    formFieldType="inputBlock"
                    label=""
                    :controls="v$.request.branchName"
                    :validation="['required']"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="d-flex justify-content-between p-4 ps-0">
            <div class="fs-4 fw-bolder">
              Rep Codes ({{ request.repCodes.length }})

              <button
                type="button"
                class="btn btn-primary btn-sm p-2 ps-3 ms-4"
                :disabled="!allowRepCode"
                v-if="modelType == 'Edit Branchs'"
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
                    ADVISOR
                  </th>
                  <th
                    class="
                      fw-bold
                      text-gray-secondary
                      border-bottom border-dashed border-light
                      p-4
                    "
                    v-if="modelType == 'Edit Branchs'"
                  ></th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, index) of request.repCodes"
                  :key="'repcode-table' + index"
                >
                  <td
                    class="
                      fw-bold
                      text-dark-gray
                      border-bottom border-dashed border-light
                      p-4
                      pt-6
                      pb-6
                      w-25
                    "
                  >
                    <div v-if="item.status == 'view' && !item.edit">
                      {{ item.repCode }}
                    </div>
                    <div v-else>
                      <select
                        class="form-select form-select-solid mb-2"
                        v-model="selectedRepCode"
                        @change="updateRow(item)"
                      >
                        <option
                          v-for="(rep, index) in unassignedRepCode"
                          :key="index"
                          :value="rep"
                        >
                          {{ rep.repCode }}
                        </option>
                      </select>
                    </div>
                  </td>
                  <td
                    class="
                      fw-bold
                      text-dark-gray
                      border-bottom border-dashed border-light
                      p-4
                      pt-6
                      pb-6
                    "
                  >
                    <div v-if="item.status == 'view' && !item.edit">
                      <span v-for="(data, i) in item.advisors" :key="i"
                        >{{ data.displayName
                        }}<span v-if="i + 1 < item.advisors.length">, </span>
                      </span>
                    </div>
                    <div v-else>
                      <div class="input-group input-group-solid mb-2">
                        <input
                          type="text"
                          class="form-control text-start"
                          :value="displayName(item.advisors)"
                          readonly
                        />
                      </div>
                    </div>
                  </td>

                  <td
                    class="
                      border-bottom border-dashed border-light
                      p-4
                      pt-6
                      pb-6
                    "
                    v-if="modelType == 'Edit Branchs'"
                  >
                    <button
                      type="button"
                      class="btn btn-secondary btn-sm p-2 ps-3"
                      @click="removeRow(index)"
                    >
                      <i class="fa fa-trash text-dark-gray edit-row"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <add-rep-code
            pageType="Edit Branches"
            :selectedBranch="branch"
            @repCodeAdded="onUpdateRepCode"
            @close="addRepCodeModel = false"
            v-if="addRepCodeModel"
          />
        </div>

        <div
          class="modal-footer border-0 p-4"
          :class="{
            'justify-content-center': modelType == 'View Branch',
            'justify-content-between': modelType != 'View Branch',
          }"
        >
          <button
            type="button"
            class="btn btn-primary ms-4"
            @click="close"
            v-if="modelType == 'View Branch'"
          >
            Close
          </button>
          <template v-if="modelType == 'Edit Branchs'">
            <div>
              <button
                type="button"
                class="btn btn-primary"
                @click="addRepCodeModel = true"
              >
                Add New Rep Code
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
                @click="saveBranch"
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
import { Vue, Options, setup } from "vue-class-component";
import { Inject, Prop } from "vue-property-decorator";

import BaseComponent from "@/components/base/BaseComponent.vue";

import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";

import AddRepCode from "@/components/Models/AddRepCode.vue";

import TextInput from "@/components/controls/TextInput.vue";
import SelectBox from "@/components/controls/SelectBox.vue";

import {
  addBranchRequestModel,
  addRepCodeResponseModel,
  branchesResponseModel,
  repCodesModel,
  unassignedRepCodesResponseModel,
  viewBranchsResponseModel,
} from "@/model";
import {
  IAdvisorsService,
  IBranchesService,
  IRepCodesService,
} from "@/service";

@Options({
  components: {
    AddRepCode,
    TextInput,
    SelectBox,
  },
  validations: {
    request: {
      branchCode: { required },
      branchName: { required },
    },
  },
})
export default class ViewBranches extends BaseComponent {
  @Inject("repCodesService") repCodesService: IRepCodesService;
  @Inject("branchesService") branchesService: IBranchesService;
  @Inject("advisorsService") service: IAdvisorsService;

  @Prop() branch: branchesResponseModel;
  @Prop() type: string;

  public modelType: string = "";

  public request: viewBranchsResponseModel = new viewBranchsResponseModel();
  public dataResource: Array<repCodesModel> = [];

  public selectedRepCode: unassignedRepCodesResponseModel =
    new unassignedRepCodesResponseModel();
  public unassignedRepCode: Array<unassignedRepCodesResponseModel> = [];

  public allowRepCode: boolean = true;
  public addRepCodeModel: boolean = false;

  public v$: any = setup(() => this.validate());

  private validate() {
    return useVuelidate();
  }

  created() {
    this.modelType = this.type;
    this.viewBranch();

    if (this.modelType == "Edit Branchs") this.unassignedRepCodes();
  }

  private viewBranch() {
    this.branchesService
      .viewBranch(this.branch.branchId)
      .then((response) => {
        this.request = response;
        this.request.repCodes.forEach((rep) => {
          rep.status = "view";
          rep.edit = false;
        });

        this.dataResource = this.request.repCodes;
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

  public unassignedRepCodes() {
    this.repCodesService
      .unassignedRepCodes()
      .then((response) => {
        this.unassignedRepCode = response;
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

  public editBranch() {
    this.modelType = "Edit Branchs";
    this.unassignedRepCodes();
  }

  public onUpdateRepCode() {
    this.viewBranch();
    this.addRepCodeModel = false;
  }

  public addNewRow() {
    for (let i = 0; i < this.request.repCodes.length; i++) {
      this.request.repCodes[i].status = "view";
      this.request.repCodes[i].edit = false;
    }

    if (this.allowRepCode) {
      let index: number = this.unassignedRepCode.findIndex(
        (item) => item.repId == this.selectedRepCode.repId
      );

      if (index >= 0) this.unassignedRepCode.splice(index, 1);
    }

    this.allowRepCode = false;

    this.request.repCodes.unshift({
      repId: 0,
      repCode: "",
      branchName: "",
      branchCode: "",
      branchId: 0,
      advisors: [],
      status: "edit",
      edit: true,
    });

    this.dataResource = this.request.repCodes;
  }

  public updateRow(item: repCodesModel) {
    item.status = "view";
    this.allowRepCode = true;
    item.repId = this.selectedRepCode.repId;
    item.repCode = this.selectedRepCode.repCode;
    item.advisors = this.selectedRepCode.advisors;

    this.dataResource = this.request.repCodes;
  }

  public removeRow(index: number) {
    this.request.repCodes.splice(index, 1);
    this.allowRepCode = true;
    this.dataResource = this.request.repCodes;
  }

  private displayName(advisors: Array<addRepCodeResponseModel>) {
    let displayName = advisors.map((item) => item.displayName);
    return displayName.join(" ,");
  }

  public applyFilter(searchValue: string) {
    this.request.repCodes = this.dataResource.filter(
      (item) =>
        (item.repCode &&
          item.repCode.toLowerCase().includes(searchValue.toLowerCase())) ||
        item.advisors.some(
          (advisor) =>
            advisor.displayName &&
            advisor.displayName
              .toLowerCase()
              .includes(searchValue.toLowerCase())
        )
    );
  }

  public saveBranch() {
    let request: addBranchRequestModel = new addBranchRequestModel();
    request.branchName = this.request.branchName;
    request.branchCode = this.request.branchCode;
    request.branchId = this.request.branchId;

    request.repCodes = this.request.repCodes
      .filter((item) => item.status == "view")
      .map(
        ({ repId, repCode, branchName, branchCode, branchId, advisors }) => ({
          repId,
          repCode,
          branchName,
          branchCode,
          branchId,
          advisors,
        })
      );

    this.branchesService
      .addBranch(this.request)
      .then((response) => {
        this.$emit("branchUpdated");
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
}
</script>