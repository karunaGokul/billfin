<template>
  <div class="position-relative">
    <label :for="label" class="form-label fw-bolder">
      {{ label }}
    </label>

    <div
      class="d-flex align-items-center mb-4 mt-4"
      v-for="(data, i) in selectItem"
      :key="i"
    >
      <div class="input-group input-group-solid">
        <input
          type="text"
          class="form-control text-start"
          :value="data.text"
          readonly
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
      <select
        class="form-select form-select-solid"
        v-model="selectedItem"
        @change="addItem"
      >
        <option v-for="(item, i) in response" :key="i" :value="item">
          {{ item.text }}
        </option>
      </select>
      <button
        type="button"
        class="btn btn-primary btn-sm p-2 ps-3 ms-4"
        @click="selectedItem ? nextItem() : ''"
      >
        <i class="fa fa-plus"></i>
      </button>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";

import { ListItem } from "@/model";

export default class SelectBoxWithDelete extends Vue {
  @Prop() label: string;
  @Prop() preSelected: Array<ListItem>;
  @Prop() response: Array<ListItem>;

  public selectedItem: ListItem = null;
  public item: Array<ListItem> = [];

  created() {
    if (this.preSelected) this.item = this.preSelected;
  }

  public addItem() {
    if (this.item.length > 0) {
      for (let i in this.item) {
        if (!this.item[i].selected) this.item.splice(+i, 1);
      }
    }
    this.item.push(this.selectedItem);
    this.updateItem();
  }

  public nextItem() {
    let i = this.response.findIndex((item) => item == this.selectedItem);
    this.response.splice(i, 1);

    let index = this.item.findIndex((item) => item == this.selectedItem);
    this.item[index].selected = true;
    this.selectedItem = null;
  }

  public removeItem(index: number, data: ListItem) {
    this.item.splice(index, 1);
    data.selected = false;
    this.response.push(data);
    this.updateItem();
    this.selectedItem = null;
  }

  private updateItem() {
    this.$emit("updateValue", this.item);
  }

  get selectItem() {
    return this.item.filter((value) => value.selected);
  }
}
</script> 