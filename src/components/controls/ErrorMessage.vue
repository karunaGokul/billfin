<template>
  <div
    class="invalid-feedback position-absolute m-0"
    v-if="errorMessage != null"
  >
    {{ errorMessage }}
  </div>
</template>
<script lang="ts">
import { Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";
import ValidationService from "@/components/validation/validation.service";

export default class ErrorMessage extends Vue {
  @Prop() label: string | any;
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