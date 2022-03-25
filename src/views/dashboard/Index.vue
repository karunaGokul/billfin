<template>
  <bread-crumb/>
  <p>Dashboard</p>
</template>
<script lang="ts">
import { Vue, Options } from "vue-class-component";

import BreadCrumb from "@/components/layout/BreadCrumb.vue";

@Options({
  components: {
    BreadCrumb,
  },
})
export default class Dashboard extends Vue {}
</script>