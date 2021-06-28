<template>
    <div class="w-50 mx-auto h-100 text-center">  
        <img src="@/assets/billfin.svg" alt="Logo" class="p-10" />
        <h3 class="fs-1">Almost there!</h3>
        <p class="m-0 fs-3 text-muted mt-5">We've sent you an email at</p>
        <p class="m-0 fs-3 text-muted fw-bolder">aubree@keenadvisors.com</p>
        <p class="mt-5 fs-4 text-muted">Please follow the instructions in the email.</p>
        <div class="mt-10 mb-10">
            <button type="button" class="btn btn-primary">Resend Verification Email</button>
        </div>
        <img src="@/assets/email-verification.png" alt="email-verification-image" class="mt-10">
    </div>
</template>
<script lang="ts">
import { Vue } from 'vue-class-component';

export default class EmailVerification extends Vue {

} 
</script>
