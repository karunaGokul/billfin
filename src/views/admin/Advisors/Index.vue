<template>
  <div class="card p-4 mt-4 position-relative">
    <button
      class="btn btn-primary position-absolute translate-middle"
      type="button"
      style="top: -40px; right: -58px"
      @click="addAdvisor('Add Advisor')"
    >
      Add Advisor
    </button>
    <div class="d-flex justify-content-between p-4">
      <div class="fs-4 fw-bolder">Advisors</div>
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
            @input="applyFilter($event.target.value)"
          />
        </div>
      </div>
    </div>
    <div class="card-body pt-0">
      <table
        class="
          table table-hover
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
              DISPLAY NAME
            </th>
            <th
              class="
                fw-bold
                text-gray-secondary
                border-bottom border-dashed border-light
                p-4
              "
            >
              EMAIL
            </th>
            <th
              class="
                fw-bold
                text-gray-secondary
                border-bottom border-dashed border-light
                p-4
              "
            >
              REP CODE
            </th>
            <th
              class="
                fw-bold
                text-gray-secondary
                border-bottom border-dashed border-light
                p-4
              "
            >
              BRANCH
            </th>
            <th
              class="
                fw-bold
                text-gray-secondary
                border-bottom border-dashed border-light
                p-4
              "
            ></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in response" :key="'advisors-table' + index">
            <td
              class="
                fw-bold
                text-dark-gray
                border-bottom border-dashed border-light
                p-6
              "
              @click="addAdvisor('View Advisor', item)"
            >
              {{ item.displayName }}
            </td>
            <td
              class="
                fw-bold
                text-dark-gray
                border-bottom border-dashed border-light
                p-6
              "
              @click="addAdvisor('View Advisor', item)"
            >
              {{ item.emailAddress }}
            </td>
            <td
              class="
                fw-bold
                text-dark-gray
                border-bottom border-dashed border-light
                p-6
              "
            >
              <a
                href="#"
                class="border-bottom border-primary me-2"
                v-for="(code, index) of item.repCodes"
                :key="'advisor-rep-code' + index"
                @click="openRepCodePreview(item, code)"
              >
                {{ code.repCode }},
              </a>
            </td>
            <td
              class="
                fw-bold
                text-dark-gray
                border-bottom border-dashed border-light
                p-6
              "
              @click="addAdvisor('View Advisor', item)"
            >
              {{ item.branch }}
            </td>
            <td class="border-bottom border-dashed border-light p-6">
              <i
                class="fa fa-pen text-dark-gray edit-row"
                @click="addAdvisor('Edit Advisors', item)"
              ></i>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <add-advisor
    pageType="Advisor"
    :type="type"
    @advisorAdded="onUpdateAdvisor"
    :selectedAdvisor="selectedAdvisor"
    @close="showAdvisorModel = false"
    v-if="showAdvisorModel"
  />
  <rep-code-preview
    pageType="Advisor"
    type="View RepCode"
    :selectedRepCode="selectedRepCode"
    @close="showRepCodePreviewModel = false"
    v-if="showRepCodePreviewModel"
  />
</template>
<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { Inject } from "vue-property-decorator";

import { useStore } from "vuex";

import AddAdvisor from "@/components/Models/AddAdvisor.vue";
import RepCodePreview from "@/components/Models/RepCodePreview.vue";

import { IAdvisorsService } from "@/service";
import { advisorsResponseModel, assignRepCodesResponseModel } from "@/model";

@Options({
  components: {
    AddAdvisor,
    RepCodePreview,
  },
})
export default class Advisors extends Vue {
  @Inject("advisorsService") service: IAdvisorsService;

  public store = useStore();

  public response: Array<advisorsResponseModel> = [];
  public dataResource: Array<advisorsResponseModel> = [];

  public selectedAdvisor: advisorsResponseModel = new advisorsResponseModel();
  public selectedRepCode: assignRepCodesResponseModel =
    new assignRepCodesResponseModel();
  public showAdvisorModel: boolean = false;

  public showRepCodePreviewModel: boolean = false;

  public type: string = "Add Advisor";

  created() {
    this.getAdvisors();
  }

  private getAdvisors() {
    this.service
      .getAdvisors()
      .then((response) => {
        this.response = response;
        this.dataResource = response;
      })
      .catch((err) => {
        if (err.response.status == 500)
          this.store.dispatch("showAlert", {
            message: "Somthing went wrong, Please contact administration",
            title: "Oops, sorry!",
          });
        else if (err.response.status == 400)
          this.store.dispatch("showAlert", {
            message: err.response.message,
            title: "Oops, sorry!",
          });
      });
  }

  public addAdvisor(type: string, advisor?: advisorsResponseModel) {
    this.type = type;
    this.selectedAdvisor = new advisorsResponseModel();
    if (advisor) this.selectedAdvisor = advisor;
    this.showAdvisorModel = true;
  }

  public onUpdateAdvisor() {
    this.showAdvisorModel = false;
    this.selectedAdvisor = new advisorsResponseModel();
    this.getAdvisors();
  }

  public openRepCodePreview(
    advisor: advisorsResponseModel,
    repCodes: assignRepCodesResponseModel
  ) {
    this.selectedRepCode = repCodes;
    this.selectedAdvisor = advisor;
    this.showRepCodePreviewModel = true;
  }

  public applyFilter(searchValue: string) {
    this.response = this.dataResource.filter(
      (item) =>
        (item.displayName &&
          item.displayName.toLowerCase().includes(searchValue.toLowerCase())) ||
        (item.emailAddress &&
          item.emailAddress
            .toLowerCase()
            .includes(searchValue.toLowerCase())) ||
        item.repCodes.some(
          (code) =>
            code.repCode &&
            code.repCode.toLowerCase().includes(searchValue.toLowerCase())
        )
    );
  }
}
</script>


