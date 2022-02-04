<template>
  <div class="modal fade show d-block">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header justify-content-end border-0">
          <i class="fa fa-times" @click="close('cancel')"></i>
        </div>
        <div class="modal-body pt-0 pb-0">
          <div class="text-center p-4">
            <i class="fa fa-question-circle fa-6x text-pink"></i>
          </div>
          <p class="fs-4 fw-bolder text-center text-dark-black-secondary">
            Are you sure?
          </p>
          <p class="fw-bold text-center mb-0 text-gray">{{ message }}</p>
          <p class="fw-bold text-center text-gray">{{ subMessage }}</p>
        </div>
        <div class="modal-footer justify-content-center border-0">
          <button
            type="button"
            class="btn btn-link text-gray-secondary"
            @click="close('cancel')"
          >
            Cancel
          </button>
          <button
            type="button"
            class="btn btn-primary ms-4"
            @click="close('delete')"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";

export default class AppDelete extends Vue {
  @Prop() message: string;
  @Prop() subMessage: string;

  public close(action: string) {
    this.$emit(action);
  }
}
</script>