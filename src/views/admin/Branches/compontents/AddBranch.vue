<template>
  <div class="modal fade show d-block">
    <div class="modal-dialog modal-dialog-centered modal-md">
      <div class="modal-content">
        <div class="modal-header p-4 pt-6 pb-6">
          <h5 class="modal-title fs-4 fw-bolder">Add Branch</h5>
          <button type="button" class="btn-close" @click="close('close')">
            <i class="fas fa-times"></i>
          </button>
        </div>

        <div class="modal-body ms-8 me-8 mt-4 mb-4 p-4">
          <text-input
            formFieldType="inputBlock"
            label="Branch Code"
            :controls="v$.request.branchCode"
            :validation="['required']"
          />
          <text-input
            formFieldType="inputBlock"
            label="Branch Name"
            :controls="v$.request.branchName"
            :validation="['required']"
          />
          <select-box-with-delete
            label="Assign Rep Codes"
            :response="repCodes"
            @updateValue="updateRepCodes"
          />
        </div>

        <add-rep-code
          pageType="Branch"
          @repCodeAdded="onUpdateRepCode"
          @close="addRepCodeModel = false"
          v-if="addRepCodeModel"
        />

        <div class="modal-footer justify-content-between border-0 p-4">
          <button
            type="button"
            class="btn btn-primary"
            @click="addRepCodeModel = true"
          >
            Add New Rep Code
          </button>
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
              @click="addBranch"
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
import { Vue, Options, setup } from "vue-class-component";
import { Inject } from "vue-property-decorator";

import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";

import {
  ListItem,
  addBranchRequestModel,
  assignRepCodesResponseModel,
} from "@/model";

import { IRepCodesService, IBranchesService } from "@/service";

import AddRepCode from "@/components/Models/AddRepCode.vue";

import TextInput from "@/components/controls/TextInput.vue";
import SelectBoxWithDelete from "@/components/controls/SelectBoxWithDelete.vue";

@Options({
  components: { TextInput, SelectBoxWithDelete, AddRepCode },
  validations: {
    request: {
      branchCode: { required },
      branchName: { required },
    },
  },
})
export default class AddBranch extends Vue {
  @Inject("branchesService") service: IBranchesService;
  @Inject("repCodesService") repCodesService: IRepCodesService;

  public request: addBranchRequestModel = new addBranchRequestModel();
  public repCodes: Array<ListItem> = [];

  public addRepCodeModel = false;

  public v$: any = setup(() => this.validate());

  created() {
    this.unassignedRepCodes();
  }

  public validate() {
    return useVuelidate();
  }

  public close() {
    this.$emit("close");
  }

  private unassignedRepCodes() {
    this.repCodesService.unassignedRepCodes().then((response) => {
      response.forEach((item) => {
        let repCode = new ListItem(item.repCode);
        repCode.data = item.repId;

        this.repCodes.push(repCode);
      });
    });
  }

  public updateRepCodes(repCodes: Array<ListItem>) {
    repCodes.forEach((item: ListItem) => {
      let repCode: assignRepCodesResponseModel =
        new assignRepCodesResponseModel();
      repCode.repId = item.data;
      repCode.repCode = item.text;
      this.request.repCodes.push(repCode);
    });
  }

  public onUpdateRepCode() {
    this.unassignedRepCodes();
    this.addRepCodeModel = false;
  }

  public addBranch() {
    this.v$.$touch();
    if (!this.v$.invalid) {
      this.service
        .addBranch(this.request)
        .then((response) => {
          this.$emit("branchAdded");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
}
</script>