<template>
  <div class="card p-4 mt-4 position-relative">
    <div
      class="
        d-flex
        align-items-center
        justify-content-between
        position-absolute
        translate-middle
      "
      style="top: -50px; right: -218px"
    >
      <button class="btn text-primary bg-white" type="button">
        <i class="fa fa-solid fa-filter text-primary"></i> Filter
      </button>
      <button class="btn btn-primary" type="button" @click="addUser">
        Add User
      </button>
      <div class="input-group input-group-solid bg-white w-50 p-1">
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
    <div class="card-body pt-0">
      <table
        class="
          table table-hover
          fs-6
          border-top-0
          border-start-0
          border-end-0
          border-bottom-2
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
                border-bottom-2 border-dashed border-light
                p-6
              "
            >
              NAME
            </th>
            <th
              class="
                fw-bold
                text-gray-secondary
                border-bottom-2 border-dashed border-light
                p-6
              "
            >
              EMAIL
            </th>
            <th
              class="
                fw-bold
                text-gray-secondary
                border-bottom-2 border-dashed border-light
                p-6
              "
            >
              ROLE
            </th>
            <th
              class="
                fw-bold
                text-gray-secondary
                border-bottom-2 border-dashed border-light
                p-6
              "
            >
              STATUS
            </th>
            <th
              class="
                fw-bold
                text-gray-secondary
                border-bottom-2 border-dashed border-light
                p-6
              "
            ></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in response.data"
            :key="'user-table' + index"
          >
            <td
              class="
                fw-bold
                text-dark-gray
                border-bottom-2 border-dashed border-light
                p-6
              "
            >
              <img
                :src="$vuehelper.getImageUrl(item.imgUrl)"
                alt="Profile image"
                width="30"
                height="30"
                class="rounded-circle"
              />
              <span class="ms-4">{{ item.name }}</span>
            </td>
            <td
              class="
                fw-bold
                text-dark-gray
                border-bottom-2 border-dashed border-light
                p-6
              "
            >
              {{ item.email }}
            </td>
            <td
              class="
                fw-bold
                text-dark-gray
                border-bottom-2 border-dashed border-light
                p-6
              "
            >
              {{ item.roleName }}
            </td>
            <td
              class="
                fw-bold
                text-dark-gray
                border-bottom-2 border-dashed border-light
                p-6
              "
            >
              <span
                class="badge fs-7 ms-2"
                :class="{
                  'bg-success-alpha text-success': item.status == 'active',
                  'bg-warning-alpha text-warning':
                    item.status == 'not-registered',
                  'bg-dander-alpha text-danger': item.status == 'in-active',
                }"
              >
                {{ userStatus(item.status) }}
              </span>
            </td>
            <td class="border-bottom-2 border-dashed border-light p-6">
              <template v-if="item.status == 'not-registered'">
                <div class="d-flex justify-content-between">
                  <i class="fa fa-solid fa-paper-plane edit-row"></i>
                  <i class="fa fa-solid fa-ban edit-row"></i>
                  <div
                    class="dropdown dropdown-primary"
                    @mouseleave="clickOutSideUser"
                    v-click-outside="clickOutSideUser"
                  >
                    <i
                      class="fa fa-solid fa-ellipsis-v fs-4 edit-row"
                      @click="toggleUser = true"
                    ></i>
                    <ul
                      class="dropdown-menu overflow-auto p-2"
                      :class="{ show: toggleUser }"
                      style="right: 0"
                    >
                      <li class="dropdown-item pt-2 pb-2">Delete</li>
                    </ul>
                  </div>
                </div>
              </template>
              <template v-if="item.status == 'active'">
                <div class="d-flex justify-content-between">
                  <i class="fa fa-solid fa-ban fs-4 edit-row"></i>
                  <i class="fa fa-solid fa-pen fs-4 edit-row"></i>
                  <div
                    class="dropdown dropdown-primary"
                    @mouseleave="clickOutSideUser"
                    v-click-outside="clickOutSideUser"
                  >
                    <i
                      class="fa fa-solid fa-ellipsis-v fs-4 edit-row"
                      @click="toggleUser = true"
                    ></i>
                    <ul
                      class="dropdown-menu overflow-auto p-2"
                      :class="{ show: toggleUser }"
                      style="right: 0"
                    >
                      <li class="dropdown-item pt-2 pb-2">Delete</li>
                    </ul>
                  </div>
                </div>
              </template>
              <template v-if="item.status == 'in-active'">
                <div class="d-flex justify-content-between">
                  <i class="fa fa-solid fa-check-circle edit-row"></i>
                  <i class="fa fa-solid fa-pen edit-row"></i>
                  <div
                    class="dropdown dropdown-primary"
                    @mouseleave="clickOutSideUser"
                    v-click-outside="clickOutSideUser"
                  >
                    <i
                      class="fa fa-solid fa-ellipsis-v fs-4 edit-row"
                      @click="toggleUser = true"
                    ></i>
                    <ul
                      class="dropdown-menu overflow-auto p-2"
                      :class="{ show: toggleUser }"
                      style="right: 0"
                    >
                      <li class="dropdown-item pt-2 pb-2">Delete</li>
                    </ul>
                  </div>
                </div>
              </template>
            </td>
          </tr>
        </tbody>
      </table>
      <Pagination
        :totalResults="response.pageInfo.totalResults"
        :totalPages="response.pageInfo.totalPages"
        :showPage="response.data.length"
        v-if="response"
        @applyPagination="controlWithPagination"
      />
      <add-user @close="showAddUserModel = false" v-if="showAddUserModel" />
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { Inject } from "vue-property-decorator";

import { UserRequestModel, UserResponseModel, DataResponse } from "@/model";

import { IUserListService } from "@/service";

import Pagination from "@/components/controls/Pagination.vue";
import AddUser from "./components/AddUser.vue";

@Options({
  components: {
    Pagination,
    AddUser,
  },
})
export default class UserList extends Vue {
  @Inject("userService") service: IUserListService;

  public request: UserRequestModel = new UserRequestModel();
  public response: DataResponse<UserResponseModel> = new DataResponse();

  public showAddUserModel: boolean = false;
  public toggleUser: boolean = false;

  created() {
    this.getUserList();
  }

  public getUserList() {
    this.service
      .getUserList(this.request)
      .then((response) => {
        this.response = response;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  public clickOutSideUser() {
    this.toggleUser = false;
  }

  public addUser() {
    this.showAddUserModel = true;
  }

  public controlWithPagination() {
    console.log("pagination");
  }

  public userStatus(status: string) {
    return status == "active"
      ? "Active"
      : status == "in-active"
      ? "In Active"
      : status == "not-registered"
      ? "Not Registered"
      : status;
  }
}
</script> 