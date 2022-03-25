<template>
  <bread-crumb/>
  <p>Clients</p>
</template>
<script lang="ts">
import { Vue, Options } from "vue-class-component";

import BreadCrumb from "@/components/layout/BreadCrumb.vue";

@Options({
  components: {
    BreadCrumb,
  },
})
export default class Clients extends Vue {
  
}
</script>