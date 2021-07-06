<template>
  <div class="mb-5 row">
    <label :for="label" class="col-sm-4 col-form-label fw-bolder">{{
      label
    }}</label>
    <div class="col-sm-8">
      <select class="form-select form-select-solid" v-model="controls.$model">
        <option selected value=""></option>
        <option v-for="(item, i) in data" :key="i" :value="item">
          {{ item }}
        </option>
      </select>
      <div class="invalid-feedback" v-if="errorMessage != null">
        {{ errorMessage }}
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";
import ValidationService from "@/components/validation/validation.service";

export default class SelectBox extends Vue {
  @Prop() label!: string;
  @Prop() data: any;
  @Prop() controls: any;
  @Prop() validation: Array<string> | any;

  get errorMessage() {
    if (this.controls.$dirty && this.controls.$invalid) {
      for (const error in this.validation) {
        if (this.controls[this.validation[error]].$invalid) {
          return ValidationService.getValidatorErrorMessage(
            this.validation[error],
            this.label,
            this.controls[this.validation[error]].$params
          );
        }
      }
    }
    return null;
  }
}
</script> 