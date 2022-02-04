<template>
  <div class="modal fade show d-block" v-if="dialog">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-body">
          <div class="text-center p-4">
            <i class="fa fa-exclamation-triangle fa-6x text-pink"></i>
          </div>
          <p
            class="
              fs-3
              fw-bolder
              text-center
              mb-0
              text-dark-black-secondary
              p-4
            "
            v-if="title"
          >
            {{ title }}
          </p>
          <p class="fs-5 fw-bold text-center mb-0 text-gray p-4">{{ message }}</p>
        </div>
        <div class="modal-footer justify-content-center border-0">
          <button type="button" class="btn btn-primary" @click="close">
            Back
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import { useStore } from "vuex";

export default class AppAlert extends Vue {
  public store = useStore();
  public dialog: boolean = false;

  mounted() {
    this.store.subscribe((mutation, type) => {
      if (mutation.type == "onShowAlert") {
        this.dialog = true;
      }
    });
  }

  public close() {
    this.dialog = false;
  }

  get message() {
    return this.store.getters.message;
  }

  get title() {
    return this.store.getters.title;
  }
}
</script>