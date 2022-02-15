<template>
  <div class="position-relative">
    <label :for="label" class="form-label fw-bolder">
      {{ label }}
    </label>

    <div
      class="d-flex align-items-center mb-4 mt-4"
      v-for="(data, i) in item"
      :key="i"
    >
      <div class="input-group input-group-solid">
        <input
          type="text"
          class="form-control text-start"
          :value="data.text"
        />
      </div>
      <button
        type="button"
        class="btn btn-secondary text-gray btn-sm p-2 ps-3 ms-4"
        @click="removeItem(i, data)"
      >
        <i class="fa fa-trash"></i>
      </button>
    </div>

    <div class="d-flex align-items-center">
      <select class="form-select form-select-solid" v-model="selectedItem">
        <option v-for="(item, i) in response" :key="i" :value="item">
          {{ item.text }}
        </option>
      </select>
      <button
        type="button"
        class="btn btn-primary btn-sm p-2 ps-3 ms-4"
        @click="response.length > 0 ? addItem() : ''"
      >
        <i class="fa fa-plus"></i>
      </button>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue } from "vue-class-component";
import { Prop, Watch } from "vue-property-decorator";

import { ListItem } from "@/model";

export default class SelectBoxWithDelete extends Vue {
  @Prop() label: string;
  @Prop() preData: Array<ListItem>;
  @Prop() response: Array<ListItem>;

  public selectedItem: ListItem = null;
  public item: Array<ListItem> = [];

  created() {
    if(this.preData) this.item = this.preData;
  }

  mounted() {
    setTimeout(() => {
      this.selectedItem = this.response[0];
    }, 1000);
  }

  public addItem() {
    this.item.push(this.selectedItem);
    let index = this.response.findIndex((item) => item == this.selectedItem);
    this.response.splice(index, 1);
    this.selectedItem = this.response[0];
    this.updateItem();
  }

  public removeItem(index: number, data: ListItem) {
    this.item.splice(index, 1);
    this.response.push(data);
    this.selectedItem = this.response[0];
    this.updateItem();
  }

  private updateItem() {
    this.$emit('updateValue', this.item);
  }

}
</script> 