<template>
  <div class="d-flex align-items-center justify-content-between">
    <div>
      Showing {{ pageSize * (page - 1) + 1 }} to
      {{ pageSize * (page - 1) + showPage }} of {{ totalResults }} entries
    </div>
    <nav>
      <ul class="pagination">
        <li class="page-item">
          <button class="btn p-4 pt-2 pb-2" :disabled="page == 1" @click="prev">
            <i class="fa fa-chevron-left"></i>
          </button>
        </li>
        <li class="page-item" v-for="(count, index) in totalPages" :key="index">
          <button class="btn p-4 pt-2 pb-2" :class="{ 'btn-primary': page == count }" @click="page = count">
            {{ count }}
          </button>
        </li>

        <li class="page-item">
          <button class="btn p-4 pt-2 pb-2" :disabled="totalPages == page" @click="next">
            <i class="fa fa-chevron-right"></i>
          </button>
        </li>
      </ul>
    </nav>
  </div>
</template>
<script lang="ts">
import { Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";

export default class Pagination extends Vue {
  @Prop() totalResults: number;
  @Prop() showPage: number;
  @Prop() totalPages: number;

  public page: number = 1;
  public pageSizeOptions: Array<number> = [10, 25, 50];
  public pageSize: number = 10;
  public triggerAutocomplete: boolean = false;

  public updatePagination(pageSize: number) {
    this.triggerAutocomplete = false;
    this.pageSize = pageSize;
    this.onChange();
  }

  public prev() {
    this.page = this.page - 1;
    this.onChange();
  }

  public next() {
    this.page = this.page + 1;
    this.onChange();
  }

  onChange() {
    this.$emit("applyPagination", this.page, this.pageSize);
  }
}
</script>