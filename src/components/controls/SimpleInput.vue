<template>
  <div v-if="formFieldType == 'inputBlock'" class="position-relative mb-8">
    <label :for="label" class="form-label fw-bolder">
      {{ label }}
    </label>

    <div class="input-group input-group-solid mb-2">
      <input
        type="text"
        class="form-control text-start"
        :readonly="readonly"
        @blur="updateInput"
        @input="updateEvent"
        :maxlength="maxLength"
      />
    </div>
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
          :readonly="readonly"
          @blur="updateInput"
          @input="updateEvent"
          :maxlength="maxLength"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";

export default class SimpleInput extends Vue {
  @Prop() formFieldType: string;
  @Prop() label?: string;
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