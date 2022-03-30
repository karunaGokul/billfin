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

          <div class="row">
            <div class="col-6">
              <select-box
                label="Proration Method"
                :data="['Standard', 'Actual']"
                :controls="v$.request.assignedFeeSchedule.prorationMethod"
                :validation="[]"
                formFieldType="inputBlock"
              />
            </div>
            <div class="col-6">
              <select-box
                label="Asset Level"
                :data="['Account', 'Household']"
                :controls="v$.request.assignedFeeSchedule.assetLevel"
                :validation="[]"
                formFieldType="inputBlock"
              />
            </div>
          </div>

          <div class="fw-bolder mb-8">Fee Schedules</div>

          <multi-select-box-with-delete
            feeType="Fee Type"
            feeSchedule="Fee Schedule"
            :feeTypeResponse="feeTypeResponse"
            :feeScheduleResponse="feeScheduleResponse"
            @updateValue="updateFeeTypes"
          />
        </div>
        <div class="modal-footer justify-content-center border-0 p-4">
          <button type="button" class="btn btn-link text-gray" @click="close">
            Cancel
          </button>
          <button
            type="button"
            class="btn ms-8 btn-primary"
            @click="addProduct"
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

import useVuelidate from "@vuelidate/core";

import { required } from "@vuelidate/validators";

import {
  ProductsResponseModel,
  AddProductRequestModel,
  ListItem,
  ProrationMethod,
  AssetLevel,
  FeeSchedulesModel,
} from "@/model";

import TextInput from "@/components/controls/TextInput.vue";
import SelectBox from "@/components/controls/SelectBox.vue";

import MultiSelectBoxWithDelete from "@/components/controls/MultiSelectBoxWithDelete.vue";

import { IFeeSchedulesService, ProductsService } from "@/service";

@Options({
  components: {
    TextInput,
    SelectBox,
    MultiSelectBoxWithDelete,
  },
  validations: {
    request: {
      productCode: { required },
      productName: { required },
      assignedFeeSchedule: {
        prorationMethod: {},
        assetLevel: {},
      },
    },
  },
})
export default class AddProduct extends Vue {
  @Inject("productsService") service: ProductsService;
  @Inject("feeSchedulesService") feeSchedulesService: IFeeSchedulesService;

  @Prop() modelType: string;
  @Prop() selectedProduct?: ProductsResponseModel;

  public v$: any = setup(() => this.validate());
  public request: AddProductRequestModel = new AddProductRequestModel();

  public feeTypeResponse: Array<ListItem> = [];
  public feeScheduleResponse: Array<ListItem> = [];

  public validate() {
    return useVuelidate();
  }

  created() {
    this.getFeeTypes();
    this.getFeeSchedules();
  }

  public getFeeTypes() {
    this.feeSchedulesService
      .getFeeTypes()
      .then((response) => {
        response.forEach((item) => {
          let feeType = new ListItem(item.feeTypeName, item.feeTypeCode);
          feeType.data = item.feeTypeId;
          this.feeTypeResponse.push(feeType);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  public getFeeSchedules() {
    this.feeSchedulesService
      .getFeeSchedules()
      .then((response) => {
        response.forEach((item) => {
          let fees = new ListItem(item.name);
          fees.data = item.feeScheduleId;
          this.feeScheduleResponse.push(fees);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  public updateFeeTypes(feeTypes: Array<FeeSchedulesModel>) {
    this.request.assignedFeeSchedule.feeTypes = feeTypes;

    console.log(this.request.assignedFeeSchedule.feeTypes);
  }

  public addProduct() {
    this.v$.$touch();

    if (!this.v$.$invalid) {
      let request: AddProductRequestModel = new AddProductRequestModel();

      request.productCode = this.request.productCode;
      request.productId = this.request.productId;
      request.productName = this.request.productName;
      request.assignedFeeSchedule.prorationMethod =
        ProrationMethod[
          this.request.assignedFeeSchedule
            .prorationMethod as keyof typeof ProrationMethod
        ];
      request.assignedFeeSchedule.assetLevel =
        AssetLevel[
          this.request.assignedFeeSchedule.assetLevel as keyof typeof AssetLevel
        ];

      request.assignedFeeSchedule.feeTypes = this.request.assignedFeeSchedule.feeTypes;
      this.service
        .addProduct(this.request)
        .then((response) => {
          this.$emit("newProduct");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  public close() {
    this.$emit("close");
  }
}
</script>