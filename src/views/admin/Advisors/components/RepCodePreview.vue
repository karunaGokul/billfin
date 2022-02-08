<template>
  <div class="modal fade show d-block">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="modal-header p-4 pt-6 pb-6">
          <h5 class="modal-title fs-4 fw-bolder">
            UEW66 - New York City Office
          </h5>
          <button type="button" class="btn-close" @click="close">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="modal-body m-4 p-4">
          <div class="d-flex justify-content-between p-4">
            <div class="fs-4 fw-bolder">Advisors({{ response.length }})</div>
            <div>
              <div class="input-group input-group-solid">
                <span class="input-group-text">
                  <img src="@/assets/search.svg" alt="Search Icon" />
                </span>
                <input
                  class="form-control"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
              </div>
            </div>
          </div>
          <table
            class="
              table
              fs-6
              border-top-0
              border-start-0
              border-end-0
              border-bottom
              border-dashed
              border-light
            "
          >
            <thead>
              <tr>
                <th
                  class="
                    fw-bold
                    text-gray-secondary
                    border-bottom border-dashed border-light
                    p-4
                  "
                >
                  LAST
                </th>
                <th
                  class="
                    fw-bold
                    text-gray-secondary
                    border-bottom border-dashed border-light
                    p-4
                  "
                >
                  FIRST
                </th>
                <th
                  class="
                    fw-bold
                    text-gray-secondary
                    border-bottom border-dashed border-light
                    p-4
                  "
                >
                  MIDDLE
                </th>
                <th
                  class="
                    fw-bold
                    text-gray-secondary
                    border-bottom border-dashed border-light
                    p-4
                  "
                >
                  DISPLAY AS
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, index) of response"
                :key="'advisors-table' + index"
              >
                <td
                  class="
                    fw-bold
                    text-dark-gray
                    border-bottom border-dashed border-light
                    p-6
                  "
                >
                  {{ item.lastName }}
                </td>
                <td
                  class="
                    fw-bold
                    text-dark-gray
                    border-bottom border-dashed border-light
                    p-6
                  "
                >
                  {{ item.firstName }}
                </td>
                <td
                  class="
                    fw-bold
                    text-dark-gray
                    border-bottom border-dashed border-light
                    p-6
                  "
                >
                  {{ item.middleName }}
                </td>
                <td
                  class="
                    fw-bold
                    text-dark-gray
                    border-bottom border-dashed border-light
                    p-6
                  "
                >
                  {{ item.displayName }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="modal-footer justify-content-center border-0 p-4">
          <button type="button" class="btn btn-primary ms-4" @click="close">
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";

export default class RepCodePerview extends Vue {
  /*@Prop() repCode: string;
  @Prop() branch: string;*/

  public response: Array<any> = [
    {
      firstName: "Jaxson",
      lastName: "Arcand",
      middleName: "Passaquindici",
      displayName: "Jaxson Passaquindici Arcand",
    },
    {
      firstName: "Cristofer",
      lastName: "Dias",
      middleName: "",
      displayName: "Cristofer Dias",
    },
    {
      firstName: "Madelyn",
      lastName: "Korsgaard",
      middleName: "",
      displayName: "Madelyn Korsgaard",
    },
    {
      firstName: "Carla",
      lastName: "Lubin",
      middleName: "",
      displayName: "Carla Lubin",
    },
  ];

  public close() {
    this.$emit("close");
  }
}
</script>