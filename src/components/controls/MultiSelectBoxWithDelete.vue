<template>
  <div class="row">
    <div class="col-4">
      <label :for="label" class="form-label fw-bolder">
        {{ label }}
      </label>
      <select
        class="form-select form-select-solid"
        v-model="selectedItem"
        @change="addItem"
      >
        <option v-for="(item, i) in response" :key="i" :value="item">
          {{ item.text }}
        </option>
      </select>
    </div>
    <div class="col-6">
      <label :for="inputLabel" class="form-label fw-bolder">
        {{ inputLabel }}
      </label>
      <select
        class="form-select form-select-solid"
        v-model="selectedItem"
        @change="addItem"
      >
        <option v-for="(item, i) in response" :key="i" :value="item">
          {{ item.text }}
        </option>
      </select>
    </div>
    <div class="col-2 mt-6 d-flex align-items-center">
      <button
        type="button"
        class="btn btn-primary btn-sm p-2 ps-3 ms-4"
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

export default class MultiSelectBoxWithDelete extends Vue {
  @Prop() label: string;
  @Prop() inputLabel: string;
  @Prop() preSelected: Array<ListItem>;
  @Prop() response: Array<ListItem>;

  public selectedItem: ListItem = null;
  public item: Array<ListItem> = [];

  public addItem() {
    console.log("addItem");
  }
}
</script>