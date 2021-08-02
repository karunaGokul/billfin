<template>
  <div
    class="form-check form-check-solid form-check-inline fs-7"
    v-for="(item, index) in selectedData"
    :key="index"
  >
    <input
      class="form-check-input"
      type="checkbox"
      :value="item"
      v-model="item.selected"
      @change="update(item.value)"
    />
    {{ item.text }}
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
    this.selectedData = this.data;
  }

  @Watch('data') 
  create() {
    this.selectedData = this.data;
  }

  update(value: string) { 
    for(var i in this.selectedData) {
      if(this.selectedData[i].value == value) this.selectedData[i].selected = true;
      else this.selectedData[i].selected = false;
    }
    this.$emit("update", value);
  }
}
</script>