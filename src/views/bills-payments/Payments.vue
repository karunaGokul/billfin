<template>
  <bread-crumb/>
  <p>Payments</p>
</template>
<script lang="ts">
import { Vue, Options } from "vue-class-component";

import BreadCrumb from "@/components/layout/BreadCrumb.vue";

@Options({
  components: {
    BreadCrumb,
  },
})
export default class Payments extends Vue {
  
}
</script>