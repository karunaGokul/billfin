<template>
  <div class="w-50 mx-auto h-100 text-center">
    <img src="@/assets/billfin.svg" alt="Logo" class="p-10" />
    <h3 class="fs-1">Almost there!</h3>
    <p class="m-0 fs-3 text-muted mt-5">We've sent you an email at</p>
    <p class="m-0 fs-3 text-muted fw-bolder">{{request.email}}</p>
    <p class="mt-5 fs-4 text-muted">
      Please follow the instructions in the email.
    </p>
    <div class="mt-10 mb-10">
      <button 
        type="button" 
        class="btn btn-primary"
        @click="resend"
      >
        Resend Verification Email
      </button>
    </div>
    <img
      src="@/assets/email-verification.png"
      alt="email-verification-image"
      class="mt-10"
    />
  </div>
</template>
<script lang="ts">
import { Vue } from "vue-class-component";
import { Inject } from "vue-property-decorator";

import { ISignUpService } from "@/service";
import { resentEmailRequestModel } from "@/model";

export default class EmailVerification extends Vue {
  @Inject("signUpService") service: ISignUpService | undefined;

  public request = new resentEmailRequestModel();

  mounted() {
    this.request.email = localStorage.getItem("email");
  }

  resend() {
    this.request.uuid = localStorage.getItem("uuid");
    this.service?.resendEmail(this.request).then((response) => {
      console.log(response);
    }).catch((err) => {
      console.log(err);
    })
  }

}
</script>
