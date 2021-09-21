<template>
  <div>
    <router-view></router-view>
  </div>
</template>
<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { DIContainer } from "./dicontainer";

import { useStore } from "vuex";

export default class App extends DIContainer {
  public store = useStore();

  created() {
    if (this.store.getters.isLoggedIn) this.store.dispatch("validateKeyCloak");
  }
}
</script>