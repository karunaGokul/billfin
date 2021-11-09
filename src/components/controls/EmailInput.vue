<template>
  <div class="position-relative mb-8">
    <label :for="label" class="form-label fw-bolder">
      {{ label }}
    </label>

    <div class="input-group input-group-solid mb-2">
      <input
        type="text"
        class="form-control text-start"
        :id="label"
        v-model="controls.$model"
        @blur="emitEvent()"
      />
    </div>
    <div
      class="invalid-feedback position-absolute m-0"
      v-if="errorMessage != null"
    >
      {{ errorMessage }}
      <a
        href="#"
        class="border-bottom border-primary"
        v-if="
          controls.domain &&
          !controls.required.$invalid &&
          !controls.email.$invalid &&
          controls.domain.$invalid
        "
      >
        Contact us
      </a>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";
import ValidationService from "@/components/validation/validation.service";

export default class EmailInput extends Vue {
  @Prop() label: string | any;
  @Prop() controls: any;
  @Prop() validation: Array<string> | any;

  public emitEvent() {
    this.$emit("validateEmail");
  }

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