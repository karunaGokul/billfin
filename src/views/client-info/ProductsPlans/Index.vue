<template>
  <ul class="nav nav-tabs">
    <li
      class="nav-item p-4"
      :class="{ 'fw-bold border-bottom border-2 border-primary': page == 'Products' }"
      @click="page = 'Products'"
    >
      Products
    </li>
    <li
      class="nav-item p-4"
      :class="{ 'fw-bold border-bottom border-2 border-primary': page == 'Plans' }"
      @click="page = 'Plans'"
    >
      Plans
    </li>
  </ul>

  <products v-if="page == 'Products'" />
  <plans v-else />
  
</template>
<script lang="ts">
import { Vue, Options } from "vue-class-component";

import Products from "./Products/Index.vue";
import Plans from "./Plans/Index.vue";

@Options({
  components: {
    Products,
    Plans,
  },
})
export default class ProductsPlans extends Vue {
  public page: string = "Products";
}
</script>