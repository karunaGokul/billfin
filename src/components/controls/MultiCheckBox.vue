<template>
  <div
    class="form-check form-check-solid form-check-inline fs-7"
    v-for="(item, index) in data"
    :key="index"
  >
    <input
      class="form-check-input"
      type="checkbox"
      v-model="item.selected"
      :value="item"
      @change="update"
    />
    {{ item.text }}
  </div>
</template>
<script lang="ts">
import { Vue } from "vue-class-component";
import { Prop, Watch } from "vue-property-decorator";

export default class MultiCheckBox extends Vue {
  @Prop() data: Array<any> | any;
  
  update() {
    this.$emit("update", this.data);
  }

}
</script>