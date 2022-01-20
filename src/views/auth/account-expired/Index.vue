<template>
  <div class="card text-center m-8 p-8">
    <div class="p-8">
      <img src="@/assets/billfin.svg" alt="Logo" />
    </div>
    <h3 class="fs-1">Your account is deactivated</h3>

    <div class="mt-4 fs-3 text-muted">
      Apologies, expired trials disable access to BillFin.
    </div>

    <div class="mb-4 fs-3 text-muted">
      You’ll need to subscribe to regain access.
    </div>

    <div class="m-4">
      <router-link
        :to="{ name: 'Reactivate Account', params: { type: 'Reactivate' }}"
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