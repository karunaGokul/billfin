<template>
  <div
    class="form-check form-check-solid form-check-inline fs-7"
    v-for="(item, index) in data"
    :key="index"
  >
    <input
      class="form-check-input"
      type="checkbox"
      v-model="selectedData"
      :value="item"
      @change="update"
    />
    {{ item }}
  </div>
</template>
<script lang="ts">
import { Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";

export default class MultiSelectCheckBox extends Vue {
  @Prop() data: Array<any> | any;

  public selectedData: Array<any> = [];

  update() {
    this.$emit("update", this.selectedData);
  }

}
</script>