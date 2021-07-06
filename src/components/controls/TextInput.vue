<template>
  <div v-if="formFieldType == 'inputBlock'">
    <label :for="label" class="form-label fw-bolder">
      {{ label }}
    </label>

    <div class="input-group input-group-solid mb-2">
      <input
        :type="showPassword ? 'text' : inputType"
        class="form-control text-start"
        :id="label"
        v-model="controls.$model"
        @blur="label == 'Work email' && !controls.$invalid ? verifyEmail() : ''"
      />
      <span class="input-group-text">
        <i
          class="fa"
          :class="{
            'fa-eye': showPassword,
            'fa-eye-slash': !showPassword,
          }"
          v-if="inputType == 'password'"
          style="cursor: pointer"
          @click="showPassword = !showPassword"
        >
        </i>
      </span>
    </div>
    <div class="invalid-feedback" v-if="errorMessage != null">
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

  <div class="mb-5 row" v-if="formFieldType == 'inputInline'">
    <label :for="label" class="col-sm-4 col-form-label fw-bolder">
      {{ label }}
    </label>
    <div class="col-sm-8">
      <div class="input-group input-group-solid">
        <input type="text" class="form-control" v-model="controls.$model" />
      </div>
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

export default class TextInput extends Vue {
  @Prop() formFieldType: string | any;
  @Prop() label: string | any;
  @Prop() controls: any;
  @Prop() inputType: string | any;
  @Prop() validation: Array<string> | any;

  public showPassword: boolean = false;

  public verifyEmail() {
    this.$emit("verifyEmail");
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