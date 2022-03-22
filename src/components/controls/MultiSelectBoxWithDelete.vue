<template>
  <div class="row">
    <div class="col-4">
      <label :for="feeType" class="form-label fw-bolder">
        {{ feeType }}
      </label>
    </div>
    <div class="col-6">
      <label :for="feeSchedule" class="form-label fw-bolder">
        {{ feeSchedule }}
      </label>
    </div>
  </div>
  <div class="row">
    <div class="col-4">
      <select class="form-select form-select-solid" v-model="selectedFeeType">
        <option v-for="(item, i) in feeTypeResponse" :key="i" :value="item">
          {{ item.text }}
        </option>
      </select>
    </div>
    <div class="col-6">
      <select
        class="form-select form-select-solid"
        v-model="selectedFeeSchedule"
        @change="addItem"
        :disabled="!selectedFeeType"
      >
        <option v-for="(item, i) in feeScheduleResponse" :key="i" :value="item">
          {{ item.text }}
        </option>
      </select>
    </div>
    <div class="col-2 mt-6 d-flex align-items-center">
      <button
        type="button"
        class="btn btn-primary btn-sm p-2 ps-3 ms-4"
        @click="nextItem"
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
  @Prop() feeType: string;
  @Prop() feeSchedule: string;
  @Prop() feeTypeResponse: Array<ListItem>;
  @Prop() feeScheduleResponse: Array<ListItem>;

  //@Prop() preSelected: Array<ListItem>;

  public selectedFeeType: ListItem = null;
  public selectedFeeSchedule: ListItem = null;

  public feeTypeItem: Array<ListItem> = [];
  public feeScheduleItem: Array<ListItem> = [];

  public addItem() {
    this.feeTypeItem.push(this.selectedFeeType);
    this.feeScheduleItem.push(this.selectedFeeSchedule);
  }

  public nextItem() {
    let i = this.feeTypeResponse.findIndex(
      (item) => item == this.selectedFeeType
    );
    this.feeTypeResponse.splice(i, 1);

    let feeType = this.feeTypeItem.findIndex(
      (item) => item == this.selectedFeeType
    );
    this.feeTypeItem[feeType].selected = true;

    this.selectedFeeType = null;

    let index = this.feeScheduleResponse.findIndex(
      (item) => item == this.selectedFeeSchedule
    );
    this.feeScheduleResponse.splice(index, 1);

    let feeSchedule = this.feeScheduleItem.findIndex(
      (item) => item == this.selectedFeeSchedule
    );
    this.feeScheduleItem[feeSchedule].selected = true;

    this.selectedFeeSchedule = null;
  }

  get selectFeeType() {
    return this.feeTypeItem.filter((value) => value.selected);
  }

  get selectFeeSchedule() {
    return this.feeScheduleResponse.filter((value) => value.selected);
  }
}
</script>