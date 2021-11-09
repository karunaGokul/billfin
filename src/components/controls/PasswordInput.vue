<template>
  <div class="position-relative mb-8">
    <label :for="label" class="form-label fw-bolder">
      {{ label }}
    </label>

    <div class="input-group input-group-solid mb-2">
      <input
        :type="showPassword ? 'text' : 'password'"
        class="form-control text-start"
        :id="label"
        v-model="controls.$model"
        @blur="
          label == 'Confirm password' && !controls.$invalid ? emitEvent() : ''
        "
      />
      <span class="input-group-text">
        <i
          class="fa"
          :class="{
            'fa-eye': showPassword,
            'fa-eye-slash': !showPassword,
          }"
          style="cursor: pointer"
          @click="showPassword = !showPassword"
        >
        </i>
      </span>
    </div>
    <error-message
      :label="label"
      :controls="controls"
      :validation="validation"
    />
  </div>
</template>
<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { Prop } from "vue-property-decorator";

import ErrorMessage from "./ErrorMessage.vue";

@Options({
  components: {
    ErrorMessage,
  },
})
export default class PasswordInput extends Vue {
  @Prop() label: string | any;
  @Prop() controls: any;
  @Prop() validation: Array<string> | any;
  @Prop() readonly: boolean | any;

  public showPassword: boolean = false;

  public emitEvent() {
    this.$emit("validatePassword");
  }
}
</script>