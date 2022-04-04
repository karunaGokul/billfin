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
  <div
    class="row mt-6 mb-6"
    v-for="(item, index) in getFeeSchedule"
    :key="index"
  >
    <div class="col-4">
      <div class="input-group input-group-solid">
        <input
          type="text"
          class="form-control text-start"
          :value="item.feeTypeName"
          readonly
        />
      </div>
    </div>
    <div class="col-6">
      <div class="input-group input-group-solid">
        <input
          type="text"
          class="form-control text-start"
          :value="item.name"
          readonly
        />
      </div>
    </div>
    <div class="col-2 d-flex align-items-center">
      <button
        type="button"
        class="btn btn-secondary text-gray btn-sm p-2 ps-3 ms-4"
        @click="removeItem(index, item)"
      >
        <i class="fa fa-trash"></i>
      </button>
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
    <div class="col-2 d-flex align-items-center">
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

import { ListItem, FeeSchedulesModel } from "@/model";

export default class MultiSelectBoxWithDelete extends Vue {
  @Prop() feeType: string;
  @Prop() feeSchedule: string;
  @Prop() feeTypeResponse: Array<ListItem>;
  @Prop() feeScheduleResponse: Array<ListItem>;

  @Prop() preSelected?: Array<any>;

  public selectedFeeType: ListItem = null;
  public selectedFeeSchedule: ListItem = null;

  public feeSchedules: Array<FeeSchedulesModel> = [];

  created() {
    if(this.preSelected) this.feeSchedules = this.preSelected;
  }

  public addItem() {
    if (this.feeSchedules.length > 0) {
      for (let i = 0; i <= this.feeSchedules.length; i++) {
        if (!this.feeSchedules[i].selected) this.feeSchedules.splice(i, 1);
      }
    }

    let fees: FeeSchedulesModel = new FeeSchedulesModel();
    fees.feeTypeName = this.selectedFeeType.text;
    fees.feeTypeCode = this.selectedFeeType.value;
    fees.feeTypeId = this.selectedFeeType.data;

    fees.name = this.selectedFeeSchedule.text;
    fees.feeScheduleId = this.selectedFeeSchedule.data;

    fees.selected = false;

    this.feeSchedules.push(fees);
    this.updateItem();
  }

  public removeItem(index: number, item: FeeSchedulesModel) {
    this.feeSchedules.splice(index, 1);

    let feeType = new ListItem(item.feeTypeName, item.feeTypeCode);
    feeType.data = item.feeTypeId;
    this.feeTypeResponse.push(feeType);

    let feeSchedules = new ListItem(item.name);
    feeSchedules.data = item.feeScheduleId;
    this.feeScheduleResponse.push(feeSchedules);

    this.updateItem();
  }

  public nextItem() {
    if (this.selectedFeeType && this.selectedFeeSchedule) {
      let i = this.feeTypeResponse.findIndex(
        (item) => item == this.selectedFeeType
      );
      this.feeTypeResponse.splice(i, 1);

      let feeType = this.feeSchedules.findIndex(
        (item) => item.feeTypeName == this.selectedFeeType.text
      );
      this.feeSchedules[feeType].selected = true;

      this.selectedFeeType = null;

      let index = this.feeScheduleResponse.findIndex(
        (item) => item == this.selectedFeeSchedule
      );
      this.feeScheduleResponse.splice(index, 1);

      this.selectedFeeSchedule = null;
    }
  }

  private updateItem() {
    this.$emit("updateValue", this.feeSchedules);
  }

  get getFeeSchedule() {
    return this.feeSchedules.filter((value) => value.selected);
  }
}
</script>