<template>
  <div class="card text-center m-8 p-8">
    <div class="d-flex justify-content-center align-items-center p-8">
      <img src="@/assets/billfin.svg" alt="Logo" />
      <span class="text-primary fa-3x ms-2"> BILLFIN </span>
    </div>
    <h3 class="fs-1">Your account is deactivated</h3>

    <div class="mt-4 fs-3 text-muted fw-bold">
      We are sorry your trial expired please click here to
    </div>

    <div class="mb-4 fs-3 text-muted fw-bold">
      sign up or contact support team.
    </div>

    <div class="m-4">
      <router-link
        :to="{
          name: 'Sign Up',
          params: { type: 'Reactivate', redirectPage: '/account-expired' },
        }"
        tag="button"
        class="btn btn-primary"
      >
        Subscribe to Reactivate
      </router-link>
    </div>

    <div>
      <img
        src="@/assets/calender-with-both.svg"
        alt="Calender with both"
        class="p-10"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { Vue } from "vue-class-component";

export default class AccountExpired extends Vue {}
</script>