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
import { Prop, Watch } from "vue-property-decorator";

export default class MultiCheckBox extends Vue {
  @Prop() data: Array<any> | any;
  @Prop() value?: Array<any> | any;

  public selectedData: Array<any> = [];

  @Watch('value')
  create() {
    this.selectedData = this.value;
  }
  
  update() {
    this.$emit("update", this.selectedData);
  }

}
</script>