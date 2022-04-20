<template>
  <div class="card p-4 mt-4 position-relative">
    <div class="card-body pt-0">
      <table :class="styles.tableClass">
        <thead>
          <tr>
            <th
              v-for="(header, i) in headers"
              :key="'data-table-header-' + i"
              :class="styles.theadClass"
            >
              {{ header.text }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in items" :key="index">
            <td
              v-for="(header, i) in headers"
              :key="'data-table-body-' + i"
              :class="[
                header.class,
                {
                  'text-gray-secondary': item.status == 'INACTIVE',
                  'text-dark-gray': item.status == 'ACTIVE',
                  'bg-warning-opacity':
                    item.recordStatus == 'new' || item.recordStatus == 'update',
                },
              ]"
            >
              <slot :name="header.value" :item="item">
                {{ item[header.value] }}
              </slot>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { DataTableModel, HeadersModel, ItemsModel, StylesModel } from "@/model";

export default class DataTable extends Vue {
  @Prop() styles: StylesModel;
  @Prop() headers: Array<HeadersModel>;
  @Prop() items: Array<ItemsModel>;

  addUser() {
    console.log('its called');
  }
}
</script>