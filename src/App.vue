<template>
  <div>
    <router-view
      v-if="
        store.getters.firms && store.getters.firms.length
      "
    ></router-view>
  </div>
</template>
<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { DIContainer } from "./dicontainer";

import { useStore } from "vuex";

export default class App extends DIContainer {
  public store = useStore();
}
</script>