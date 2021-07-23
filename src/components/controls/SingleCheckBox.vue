<template>
  <div
    class="form-check form-check-solid form-check-inline fs-7"
    v-for="(item, index) in data"
    :key="index"
  >
    <input
      class="form-check-input"
      type="checkbox"
      :value="item"
      v-model="selectedData"
      @change="update"
    />
    {{ item }}
  </div>
</template>
<script lang="ts">
import { Vue } from "vue-class-component";
import { Prop, Watch } from "vue-property-decorator";

export default class SingleCheckBox extends Vue {
  @Prop() data: Array<any> | any;
  @Prop() value?: string | any;

  public selectedData: Array<any> = [];

  mounted() {
    this.selectedData = [];
    this.selectedData.push(this.value);
  }

  @Watch('value')
  create() {
    this.selectedData = [];
    this.selectedData.push(this.value);
  }

  update(e: any) { 
    this.selectedData = [];
    if (e.target.checked) this.selectedData.push(e.target.value);
    this.$emit("update", this.selectedData[0]);
  }
}
</script>