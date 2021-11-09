<template>
  <div v-if="formFieldType == 'inputBlock'" class="position-relative mb-8">
    <label :for="label" class="form-label fw-bolder">
      {{ label }}
    </label>
    <select
      class="form-select form-select-solid mb-2"
      v-model="controls.$model"
      @change="updateEvent"
    >
      <option v-for="(item, i) in data" :key="i" :value="item">
        {{ item }}
      </option>
    </select>
    <error-message
      :label="label"
      :controls="controls"
      :validation="validation"
    />
  </div>
  <div class="position-relative mb-8 row" v-if="formFieldType == 'inputInline'">
    <label :for="label" class="col-sm-4 col-form-label fw-bolder">{{
      label
    }}</label>
    <div class="col-sm-8">
      <select
        class="form-select form-select-solid mb-2"
        v-model="controls.$model"
        @change="updateEvent"
      >
        <option v-for="(item, i) in data" :key="i" :value="item">
          {{ item }}
        </option>
      </select>
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
export default class SelectBox extends Vue {
  @Prop() label!: string;
  @Prop() data: any;
  @Prop() controls: any;
  @Prop() validation: Array<string> | any;
  @Prop() formFieldType: string | any;

  updateEvent() {
    this.$emit("update");
  }
}
</script> 