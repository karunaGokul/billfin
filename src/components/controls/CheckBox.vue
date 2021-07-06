<template>
  <div class="form-check form-check-solid form-check-inline fs-7">
    <input
      class="form-check-input"
      type="checkbox"
      v-model="controls"
      :value="value"
    />
    {{ label }}
  </div>
</template>
<script lang="ts">
import { Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";

export default class CheckBox extends Vue {
  @Prop() label: string | any;
  @Prop() controls: any;
  @Prop() value: string | any;
}
</script>