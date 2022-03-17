<template>
  <div v-if="formFieldType == 'inputBlock'" class="position-relative mb-8">
    <label :for="label" class="form-label fw-bolder">
      {{ label }}
    </label>

    <div class="input-group input-group-solid mb-2">
      <input
        type="text"
        class="form-control text-start"
        :id="label"
        v-model="controls.$model"
        :readonly="readonly"
        @blur="updateInput"
        @input="updateEvent"
        :maxlength="maxLength"
      />
    </div>
    <error-message
      :label="label"
      :controls="controls"
      :validation="validation"
    />
  </div>

  <div
    class="mb-5 row position-relative mb-8"
    v-if="formFieldType == 'inputInline'"
  >
    <label :for="label" class="col-sm-4 col-form-label fw-bolder">
      {{ label }}
    </label>
    <div class="col-sm-8">
      <div class="input-group input-group-solid">
        <input
          type="text"
          class="form-control"
          v-model="controls.$model"
          :readonly="readonly"
        />
      </div>
      <error-message
        :label="label"
        :controls="controls"
        :validation="validation"
      />
    </div>
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
export default class TextInput extends Vue {
  @Prop() formFieldType: string;
  @Prop() label: string;
  @Prop() controls: any;
  @Prop() validation: Array<string>;
  @Prop() readonly: boolean;
  @Prop() maxLength?: number = 255;

  updateInput() {
    this.$emit("updateInput");
  }
  updateEvent() {
    this.$emit("updateEvent");
  }
}
</script>