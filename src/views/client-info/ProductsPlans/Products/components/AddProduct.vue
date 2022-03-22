<template>
  <div class="modal fade show d-block">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="modal-header p-4 pt-6 pb-6">
          <h5 class="modal-title fs-4 fw-bolder">{{ modelType }}</h5>
          <button type="button" class="btn-close" @click="close">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="modal-body ms-4 me-4 mt-4 mb-4 p-4">

          <div class="row">
            <div class="col-4">
              <text-input
                formFieldType="inputBlock"
                label="Product Code"
                :controls="v$.request.productCode"
                :validation="['required']"
                :readonly="modelType == 'Edit Product'"
              />
            </div>
            <div class="col-8">
              <text-input
                formFieldType="inputBlock"
                label="Product Name"
                :controls="v$.request.productName"
                :validation="['required']"
              />
            </div>
          </div>

          <div class="fw-bolder">Fee Schedules</div>

          <multi-select-box-with-delete />

        </div>
        <div class="modal-footer justify-content-center border-0 p-4">
          <button type="button" class="btn btn-link text-gray" @click="close">
            Cancel
          </button>
          <button type="button" class="btn ms-8 btn-primary">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Options, setup } from "vue-class-component";
import { Prop, Inject } from "vue-property-decorator";

import useVuelidate from "@vuelidate/core";

import { required } from "@vuelidate/validators";

import { ProductsResponseModel, AddProductRequestModel } from "@/model";

import TextInput from "@/components/controls/TextInput.vue";
import MultiSelectBoxWithDelete from "@/components/controls/MultiSelectBoxWithDelete.vue";

import { IFeeSchedulesService } from "@/service";

@Options({
  components: {
    TextInput,
    MultiSelectBoxWithDelete,
  },
  validations: {
    request: {
      productCode: { required },
      productName: { required },
    },
  },
})
export default class AddProduct extends Vue {
  @Inject("feeSchedulesService") service: IFeeSchedulesService;
  @Prop() modelType: string;
  @Prop() selectedProduct?: ProductsResponseModel;

  public v$: any = setup(() => this.validate());
  public request: AddProductRequestModel = new AddProductRequestModel();

  public validate() {
    return useVuelidate();
  }

  mounted() {}
}
</script>