<template>
  <bread-crumb/>
  <p>Reports</p>
</template>
<script lang="ts">
import { Vue, Options } from "vue-class-component";

import BreadCrumb from "@/components/layout/BreadCrumb.vue";

@Options({
  components: {
    BreadCrumb,
  },
})
export default class Reports extends Vue {
  
}
</script>