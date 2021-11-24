<template>
  <div class="modal fade show d-block">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content rounded-3">
        <div class="modal-header p-4 pt-6 pb-6">
          <h5 class="modal-title fs-6 fw-bolder">
            Renew Subscription {{ title }}
          </h5>
          <button type="button" class="btn-close" @click="close('close')">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="modal-body p-4 pt-6 pb-6">
          <p class="fs-6 fw-bolder">
            Want to renew your AUM Billng {{ name }}? Great!
          </p>
          <div class="text-muted fs-6">
            You are currently on the {{ name }}. If you want to renew with the
            same plan, add-ons, and payment method, then click “Renew Plan”
            below and we’ll take care of the rest. If you want to renew with a
            different plan, add-ons, and/or payment method, then click “Custom
            Renewal”.
          </div>
        </div>
        <div class="modal-footer p-4">
          <button
            type="button"
            class="btn btn-secondary"
            @click="close('custom')"
          >
            Custom Renewal
          </button>
          <button type="button" class="btn btn-primary" @click="close('renew')">
            Renew {{ title }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";

export default class RenewPlanAddOn extends Vue {
  @Prop() title: string;
  @Prop() name: string;
  @Prop() type: string;

  public close(option: string) {
    this.$emit(option);
  }
}
</script>