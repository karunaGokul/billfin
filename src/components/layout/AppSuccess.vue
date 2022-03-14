<template>
  <div class="modal fade show d-block" v-if="dialog">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header justify-content-end border-0">
          <i class="fa fa-times" @click="close"></i>
        </div>
        <div class="modal-body pt-0 pb-0">
          <div class="text-center p-4">
            <i class="fa fa-solid fa-check-circle fa-6x text-success"></i>
          </div>
          <p class="fs-4 fw-bolder text-center text-dark-black-secondary">
            {{ message }}
          </p>
        </div>
        <div class="modal-footer justify-content-center border-0">
          <button type="button" class="btn btn-primary ms-4" @click="close">
            Okay
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue } from "vue-class-component";

export default class AppSuccess extends Vue {
  public dialog: boolean = false;

  public message: string = "";
  public title: string = "";

  show(title: string, message: string) {
    this.dialog = true;
    this.title = title;
    this.message = message;
  }

  public close() {
    this.dialog = false;
  }
}
</script>