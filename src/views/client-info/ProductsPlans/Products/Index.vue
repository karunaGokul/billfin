<template>
  <div class="card p-4 mt-4 position-relative">
    <button
      class="btn btn-primary position-absolute translate-middle"
      type="button"
      style="top: -40px; right: -85px"
      @click="addProduct('Add New Product')"
    >
      Add New Product
    </button>
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
              PRODUCT CODE
            </th>
            <th
              class="
                fw-bold
                text-gray-secondary
                border-bottom-2 border-dashed border-light
                p-6
              "
            >
              PRODUCT NAME
            </th>
            <th
              class="
                fw-bold
                text-gray-secondary
                border-bottom-2 border-dashed border-light
                p-6
              "
            >
              FEE SCHEDULE & PLAN
            </th>
            <th
              class="
                fw-bold
                text-gray-secondary
                border-bottom-2 border-dashed border-light
                p-6
              "
            >
              # OF ASSCOUNTS
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
          <tr v-for="(item, index) in response" :key="'user-table' + index">
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
            >
              {{ item.productCode }}
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
            >
              {{ item.productName }}
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
            >
              <div
                v-for="(fees, i) in item.assignedFeeSchedule.feeTypes"
                :key="'feeSchedule-table' + i"
              >
                <span class="fw-bolder">{{ fees.feeTypeName }}:</span>
                <span class="ms-2 text-gray">{{ fees.feeScheduleName }}</span>
              </div>
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
            >
              {{ item.noOfAccounts }}
            </td>
            <td
              class="
                text-dark-gray
                border-bottom-2 border-dashed border-light
                p-6
              "
              :class="{
                'bg-warning-opacity':
                  item.recordStatus == 'new' || item.recordStatus == 'update',
              }"
              style="width: 10%"
            >
              <i
                class="fa fa-solid fa-pen fs-4 edit-row fa-primary-hover"
                @click="addProduct('Edit Product', item)"
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
            </td>
          </tr>
        </tbody>
      </table>
      <add-product
        :modelType="modelType"
        :selectedProduct="selectedProduct"
        @newProduct="updateProduct"
        @close="showProduct = false"
        v-if="showProduct"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Inject } from "vue-property-decorator";

import { ProductsService } from "@/service";
import { ProductsResponseModel } from "@/model";

import AddProduct from "./components/AddProduct.vue";
import BaseComponent from "@/components/base/BaseComponent.vue";

@Options({
  components: {
    AddProduct,
  },
})
export default class Products extends BaseComponent {
  @Inject("productsService") service: ProductsService;

  public response: Array<ProductsResponseModel> = [];
  public selectedProduct: ProductsResponseModel = new ProductsResponseModel();
  public modelType = "Add New Product";

  public showProduct: boolean = false;

  created() {
    this.getProducts();
  }

  public getProducts() {
    this.service
      .getProducts()
      .then((response) => {
        this.response = response;
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

  public addProduct(modelType: string, product: ProductsResponseModel) {
    this.modelType = modelType;
    if (product) this.selectedProduct = product;
    this.showProduct = true;
  }

  public updateProduct() {
    this.showProduct = false;
    this.getProducts();
    this.selectedProduct = new ProductsResponseModel();
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