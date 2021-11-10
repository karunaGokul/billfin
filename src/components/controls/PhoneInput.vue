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
        @input="acceptNumber()"
      />
    </div>
    <error-message
      :label="label"
      :controls="controls"
      :validation="validation"
    />
  </div>

  <div class="mb-5 row position-relative mb-8" v-if="formFieldType == 'inputInline'">
    <label :for="label" class="col-sm-4 col-form-label fw-bolder">
      {{ label }}
    </label>
    <div class="col-sm-8">
      <div class="input-group input-group-solid">
        <input
          type="text"
          class="form-control text-start"
          :id="label"
          v-model="controls.$model"
          @input="acceptNumber()"
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
export default class PhoneInput extends Vue {
  @Prop() formFieldType: string | any;
  @Prop() label: string | any;
  @Prop() controls: any;
  @Prop() validation: Array<string> | any;

  public acceptNumber() {
    const value = this.controls.$model
      .replace(/\D/g, "")
      .match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
    this.controls.$model = !value[2]
      ? value[1]
      : value[1] + "-" + value[2] + (value[3] ? "-" + value[3] : "");
  }
}
</script>