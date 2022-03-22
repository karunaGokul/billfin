<template>
  <div class="modal fade show d-block">
    <div class="modal-dialog modal-dialog-centered modal-md">
      <div class="modal-content">
        <div class="modal-header p-4 pt-6 pb-6">
          <h5 class="modal-title fs-4 fw-bolder">{{ modelType }}</h5>
          <button type="button" class="btn-close" @click="close">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="modal-body ms-8 me-8 mt-4 mb-4 p-4">
          <text-input
            formFieldType="inputBlock"
            label="Custodian Code"
            :controls="v$.request.custodianIdentifier"
            :validation="['required']"
            :maxLength="255"
            :readonly="modelType == 'Edit Custodian'"
          />
          <text-input
            formFieldType="inputBlock"
            label="Custodian Name"
            :controls="v$.request.custodianName"
            :maxLength="255"
            :validation="['required']"
          />

          <div
            class="form-check form-switch"
            v-if="modelType == 'Edit Custodian'"
          >
            <input
              class="form-check-input"
              type="checkbox"
              v-model="v$.request.enabled.$model"
            />
            <label class="form-check-label" for="Enable Custodian"
              >Enabled</label
            >
          </div>
        </div>
        <div class="modal-footer justify-content-end border-0 p-4">
          <button type="button" class="btn btn-link text-gray" @click="close">
            Cancel
          </button>
          <button
            type="button"
            class="btn btn-primary ms-8"
            @click="addCustodian"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Options, setup } from "vue-class-component";
import { Prop, Inject } from "vue-property-decorator";

import BaseComponent from "@/components/base/BaseComponent.vue";

import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";

import { AddCustodianRequestModel, CustodiansResponseModel } from "@/model";

import TextInput from "@/components/controls/TextInput.vue";

import { ICustodiansService } from "@/service";
import { useStore } from "vuex";

@Options({
  components: {
    TextInput,
  },
  validations: {
    request: {
      custodianIdentifier: { required },
      custodianName: { required },
      enabled: {},
    },
  },
})
export default class AddCustodian extends BaseComponent {
  @Inject("custodiansService") service: ICustodiansService;

  @Prop() modelType: string;
  @Prop() custodian: CustodiansResponseModel;

  public v$: any = setup(() => this.validate());
  public request: AddCustodianRequestModel = new AddCustodianRequestModel();

  public store = useStore();

  public validate() {
    return useVuelidate();
  }

  created() {
    if (this.modelType == "Edit Custodian") {
      this.request = this.$vuehelper.clone(this.custodian);
    } else this.request.enabled = true;
  }

  public addCustodian() {
    this.v$.$touch();

    if (!this.v$.$invalid) {
      this.service
        .addCustodian(this.request)
        .then((response) => {
          this.confirmation("", "New custodian added successfully");
          this.$emit("custodianAdded");
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

  public close() {
    this.$emit("close");
  }
}
</script>