<template>
  <div class="w-50 mx-auto h-100 text-center">
    login
  </div>
</template>
<script lang="ts">
import { Vue } from "vue-class-component";

export default class Login extends Vue {

  mounted() {
    this.$keycloak.login();
  }

}
</script>
