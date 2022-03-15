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
      style="top: -50px; right: -178px"
    >
      <button
        class="btn btn-primary"
        type="button"
        @click="addUser('Add User')"
      >
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
          @input="applyFilter($event.target.value)"
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
                ps-2
                pe-2
                pt-6
                pb-6
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
          <tr v-for="(item, index) in response" :key="'user-table' + index">
            <td
              class="
                fw-bold
                text-dark-gray
                border-bottom-2 border-dashed border-light
                p-6
              "
            >
              <img
                :src="$vuehelper.getImageUrl(item.profilePhoto)"
                alt="Profile image"
                width="30"
                height="30"
                class="rounded-circle"
                v-if="item.profilePhoto"
              />
              <span
                class="
                  w-25
                  h-25
                  p-3
                  ps-5
                  pe-5
                  bg-primary
                  rounded-circle
                  text-white
                "
                v-if="!item.profilePhoto"
                >{{ item.firstName.charAt(0).toUpperCase() }}</span
              >
              <span class="ms-4">{{ item.firstName }} {{ item.lastName }}</span>
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
                ps-2
                pe-2
                pt-6
                pb-6
              "
            >
              <span
                class="badge fs-7 ms-2"
                :class="{
                  'bg-success-alpha text-success': item.status == 'ACTIVE',
                  'bg-dander-alpha text-danger': item.status != 'ACTIVE',
                }"
              >
                {{ item.status == "ACTIVE" ? "Active" : "In Active" }}
              </span>
            </td>
            <td
              class="border-bottom-2 border-dashed border-light p-6"
              style="width: 10%"
            >
              <i
                class="fa fa-solid fa-pen fs-4 edit-row"
                @click="addUser('Edit User', item)"
              ></i>
            </td>
          </tr>
        </tbody>
      </table>
      <add-user
        :modelType="modelType"
        :response="selectedUser"
        @newUser="updateUser"
        @close="showAddUserModel = false"
        v-if="showAddUserModel"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { Inject } from "vue-property-decorator";

import { UserResponseModel } from "@/model";

import { IUserListService } from "@/service";

import BaseComponent from "@/components/base/BaseComponent.vue";

import AddUser from "./components/AddUser.vue";

@Options({
  components: {
    AddUser,
  },
})
export default class UserList extends BaseComponent {
  @Inject("userService") service: IUserListService;

  public response: Array<UserResponseModel> = [];
  public dataResource: Array<UserResponseModel> = [];
  public selectedUser: UserResponseModel = new UserResponseModel();
  public modelType: string = "Add User";
  public showAddUserModel: boolean = false;
  public toggle: Array<boolean> = [];

  created() {
    this.getUserList();
  }

  public getUserList() {
    this.service
      .getUserList()
      .then((response) => {
        this.response = response;
        this.dataResource = response;
        this.toggle = [];
      })
      .catch((err) => {
        if (err.response.status == 500)
          this.alert(
            "Oops, sorry!",
            "Somthing went wrong, Please contact administration"
          );
        else if (err.response.status == 400)
          this.alert("Oops, sorry!", err.response.data.message);
      });
  }

  public addUser(modelType: string, response?: UserResponseModel) {
    if (response) this.selectedUser = response;

    this.modelType = modelType;
    this.showAddUserModel = true;
  }

  public updateUser() {
    this.showAddUserModel = false;
    this.selectedUser = new UserResponseModel();
    this.getUserList();
  }

  public applyFilter(searchValue: string) {
    this.response = this.dataResource.filter(
      (item) =>
        (item.firstName &&
        item.firstName.toLowerCase().includes(searchValue.toLowerCase())) || 
        (item.roleName && item.roleName.toLocaleLowerCase().includes(searchValue.toLowerCase())) ||
        (item.email && item.email.toLowerCase().includes(searchValue.toLowerCase()))
    );
  }
}
</script> 