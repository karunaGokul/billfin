<template>
  <div class="modal fade show d-block">
    <div class="modal-dialog modal-dialog-centered modal-md">
      <div class="modal-content">
        <div class="modal-header p-4 pt-6 pb-6">
          <h5 class="modal-title fs-4 fw-bolder">Add Rep Code</h5>
          <button type="button" class="btn-close" @click="close('close')">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="modal-body m-8 p-4">
          <div>
            <text-input
              formFieldType="inputBlock"
              label="Rep Code"
              :controls="v$.request.repCode"
              :maxLength="60"
              :validation="['required']"
            />
          </div>
          <div
            v-if="pageType != 'Edit Branches' && pageType != 'Add Branches'"
            class="mb-10"
          >
            <label for="Branch" class="form-label fw-bolder"> Branch </label>
            <select
              class="form-select form-select-solid mb-2"
              v-model="selectedBranch"
            >
              <option v-for="(item, i) in branch" :key="i" :value="item">
                {{ item.branchName }}
              </option>
            </select>
          </div>
          <div>
            <select-box-with-delete
              label="Assign Advisors"
              :response="advisors"
              @updateValue="updateAdvisor"
            />
          </div>
          <add-advisor
            pageType="RepCodes"
            type="Add Advisor"
            @advisorAdded="updateUnassinedAdvisors"
            @close="showAdvisorModel = false"
            v-if="showAdvisorModel"
          />
        </div>

        <div class="modal-footer justify-content-between border-0">
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
              class="btn btn-link text-gray"
              @click="close('close')"
            >
              Cancel
            </button>
            <button
              type="button"
              class="btn btn-primary ms-4"
              @click="addRepCode"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, setup } from "vue-class-component";

import { Prop, Inject } from "vue-property-decorator";

import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";

import TextInput from "../controls/TextInput.vue";
import SelectBox from "../controls/SelectBox.vue";
import AddAdvisor from "../Models/AddAdvisor.vue";
import SelectBoxWithDelete from "../controls/SelectBoxWithDelete.vue";

import {
  addRepCodeRequestModel,
  advisorsResponseModel,
  ListItem,
  branchesResponseModel,
} from "@/model";
import {
  IAdvisorsService,
  IBranchesService,
  IRepCodesService,
} from "@/service";

import BaseComponent from "@/components/base/BaseComponent.vue";

@Options({
  components: { TextInput, SelectBox, SelectBoxWithDelete, AddAdvisor },
  validations: {
    request: {
      repCode: { required },
      branchName: {},
    },
  },
})
export default class AddRepCode extends BaseComponent {
  @Inject("repCodesService") service: IRepCodesService;
  @Inject("advisorsService") advisorsService: IAdvisorsService;
  @Inject("branchesService") branchesService: IBranchesService;

  @Prop() pageType: string;
  @Prop() branches: branchesResponseModel;

  public v$: any = setup(() => this.validate());
  public request: addRepCodeRequestModel = new addRepCodeRequestModel();

  public advisors: Array<ListItem> = [];
  public branch: Array<branchesResponseModel> = [];
  public selectedBranch: addRepCodeRequestModel = new addRepCodeRequestModel();

  public showAdvisorModel: boolean = false;

  private validate() {
    return useVuelidate();
  }

  created() {
    this.getUnassignedAdvisors();
    this.getBranch();

    if (this.pageType == "Edit Branches") {
      this.selectedBranch.branchName = this.branches.branchName;
      this.selectedBranch.branchCode = this.branches.branchCode;
      this.selectedBranch.branchId = this.branches.branchId;
    }
  }

  public close(action: string) {
    this.$emit(action);
  }

  private getUnassignedAdvisors() {
    this.advisorsService
      .unassignedAdvisors()
      .then((response) => {
        this.advisors = [];
        response.forEach((item) => {
          let advisors = new ListItem(item.displayName);
          advisors.data = item.advisorId;

          this.advisors.push(advisors);
        });
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

  public updateUnassinedAdvisors() {
    this.showAdvisorModel = false;
    this.getUnassignedAdvisors();
  }

  private getBranch() {
    this.branchesService
      .getBranches()
      .then((response) => {
        this.branch = response;
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

  public updateAdvisor(advisors: Array<ListItem>) {
    advisors.forEach((item: ListItem) => {
      let advisors: advisorsResponseModel = new advisorsResponseModel();
      advisors.advisorId = item.data;
      advisors.displayName = item.text;
      this.request.advisors.push(advisors);
    });
  }

  public addRepCode() {
    this.v$.$touch();
    if (!this.v$.$invalid) {
      this.request.advisors.length == 0 ? null : this.request.advisors;

      this.request.branchName = this.selectedBranch.branchName;
      this.request.branchCode = this.selectedBranch.branchCode;
      this.request.branchId = this.selectedBranch.branchId;

      this.service
        .addRepCode(this.request)
        .then((response) => {
          this.$emit("repCodeAdded");
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
  }
}
</script>