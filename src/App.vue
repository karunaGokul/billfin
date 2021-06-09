<template>
  <div>
    <router-view></router-view>
  </div>
</template>
<script lang="ts">
import { Vue, Options } from 'vue-class-component';

import { DIContainer } from "./dicontainer";

export default class App extends DIContainer {
}
</script>