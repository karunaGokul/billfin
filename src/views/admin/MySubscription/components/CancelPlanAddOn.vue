<template>
  <div class="modal fade show d-block">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content rounded-3">
        <div class="modal-header p-4 pt-6 pb-6">
          <h5 class="modal-title fs-6 fw-bolder">Renew Subscription {{ title }}</h5>
          <button type="button" class="btn-close" @click="close('close')"></button>
        </div>
        <div class="modal-body p-4 pt-6 pb-6">
          <p class="fs-6 fw-bolder">
            Are you sure you want to cancel {{ subscription }}?
          </p>
          <div class="text-muted fs-6">{{ message }} will be canceled at the end of your current billing period, which ends on January 2, 2022</div>
        </div>
        <div class="modal-footer p-4">
          <button
            type="button"
            class="btn btn-secondary"
            @click="close('close')"
          >
            Close
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click="close('cancel')"
          >
            {{ title }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";

export default class CancelPlanAddOn extends Vue {
  @Prop() title: string;
  @Prop() name: string;
  @Prop() type: string;

  public close(option: string) {
    this.$emit(option);
  }

  get subscription() {
    return this.type == "plan" ? "your AUM Billing subscription" : this.name;
  }

  get message() {
    return this.type == "plan" ? `Your ${this.name} and its associated add-ons` : this.name;
  }
}
</script>