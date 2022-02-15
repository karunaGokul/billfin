<template>
  <div class="modal fade show d-block">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="modal-header p-4 pt-6 pb-6">
          <h5 class="modal-title fs-4 fw-bolder">
            <span v-if="modelType == 'Edit Branch'"
              >Edit</span
            >
            {{ request.repCode }} - {{ request.branch }}

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
            {{ request.repCode }} - {{ request.branch }}
          </h5>
          <div
            class="d-flex align-items-center"
            v-if="modelType == 'Edit Branch'"
          >
            <text-input
              formFieldType="inputBlock"
              label=""
              :controls="v$.request.repCode"
              :validation="['required']"
            />
            <div class="ms-8">
              <select
                class="form-select form-select-solid mb-4"
                v-model="v$.request.branchName"
              >
                <option
                  v-for="(item, i) in unassignedBranchs"
                  :key="i"
                  :value="item"
                >
                  {{ item.branchName }}
                </option>
              </select>
            </div>
          </div>
          <div class="d-flex justify-content-between p-4">
            <div class="fs-4 fw-bolder">
              Advisors({{ request.advisors.length }})

              <button
                type="button"
                class="btn btn-primary btn-sm p-2 ps-3 ms-4"
                :disabled="!allowAdvisor"
                v-if="modelType == 'Edit Branch'"
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
                    v-if="modelType == 'Edit Branch'"
                  ></th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, index) of request.advisors"
                  :key="'repcode-table' + index"
                >
                  <td
                    class="
                      fw-bold
                      text-dark-gray
                      border-bottom border-dashed border-light
                      p-6
                    "
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
                          v-for="(advisor, index) in unassignedAdvisors"
                          :key="index"
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
                      border-bottom border-dashed border-light
                      p-6
                    "
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
                    class="border-bottom border-dashed border-light p-4"
                    v-if="modelType == 'Edit Branch'"
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

          <!-- <add-advisor
            pageType="RepCodes"
            type="Add Advisor"
            @advisorAdded="getAdvisors"
            @close="showAdvisorModel = false"
            v-if="showAdvisorModel"
          /> -->
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
            v-if="modelType == 'Edit RepCodes'"
          >
            <div>
              <button
                type="button"
                class="btn btn-primary"
                @click="showRepCodeModel = true"
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
                Close
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

import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";

import AddRepCode from "@/components/Models/AddRepCode.vue";

import TextInput from "@/components/controls/TextInput.vue";
import SelectBox from "@/components/controls/SelectBox.vue";

import {
  advisorsodel,
  advisorsResponseModel,
  assignRepCodesResponseModel,
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
      repCode: { required },
      branchName: {},
    },
  },
})
export default class ViewBranches extends Vue {
  @Inject("repCodesService") repCodesService: IRepCodesService;
  @Inject("branchesService") branchesService: IBranchesService;
  @Inject("advisorsService") service: IAdvisorsService;

  @Prop() selectedRepCode: assignRepCodesResponseModel;
  @Prop() selectedBranch: string;

  @Prop() pageType: string;
  @Prop() type: string;

  public modelType: string = "";
  public showAdvisorModel: boolean = false;

  public request: viewBranchsResponseModel = new viewBranchsResponseModel();

  public unassignedAdvisors: Array<advisorsResponseModel> = [];
  public selectedAdvisor: advisorsResponseModel = new advisorsResponseModel();

  public unassignedRepCodes: Array<unassignedRepCodesResponseModel> = [];

  public allowAdvisor: boolean = true;

  public v$: any = setup(() => this.validate());

  private validate() {
    return useVuelidate();
  }

  created() {
    this.modelType = this.type;

   /* this.request.repCode = this.selectedRepCode.repCode;
    this.request.branchName = this.selectedBranch;*/

    this.viewBranch();

    if (this.modelType == "Edit Branch") {
      this.getUnassignedRepCodes();
    }
  }

  private viewBranch() {
    this.repCodesService
      .viewRepCode(this.selectedRepCode.repId)
      .then((response) => {
       /* this.request = response;
        this.request.advisors.forEach((advisor) => {
          advisor.status = "view";
          advisor.edit = false;
        });*/
      });
  }

  private getUnassignedRepCodes() {
    this.repCodesService
      .unassignedRepCodes()
      .then((response) => {
        this.unassignedRepCodes = response;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  public close() {
    this.$emit("close");
  }

  public editRepCodes() {
    this.modelType = "Edit Branch";
    this.getUnassignedRepCodes();
  }

  public addNewRow() {
   /* for (let i = 0; i < this.request.advisors.length; i++) {
      this.request.advisors[i].status = "view";
      this.request.advisors[i].edit = false;
    }

    this.allowAdvisor = false;

    this.request.advisors.unshift({
      firstName: "",
      lastName: "",
      middleName: "",
      displayName: "Jaxson Arcand",
      status: "edit",
      edit: true,
      emailAddress: "",
      contactPhone: "",
      repCodes: null,
      branch: "",
      advisorIdentifier: "",
      advisorId: 0,
    });*/
  }

  public updateRow(item: advisorsodel) {
    /*item.status = "view";
    this.allowAdvisor = true;
    item.firstName = this.selectedAdvisor.firstName;
    item.lastName = this.selectedAdvisor.lastName;
    item.middleName = this.selectedAdvisor.middleName;*/
  }

  public removeRow(index: number) {
    //this.request.advisors.splice(index, 1);
  }

  public saveRepCodes() {
    console.log(this.request);
    //console.log(this.request.advisors.filter((item) => item.status == "view"));
  }
}
</script>