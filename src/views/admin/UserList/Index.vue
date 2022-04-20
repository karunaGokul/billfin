<template>
  <div class="d-flex align-items-center justify-content-between">
    <bread-crumb :additionalName="`(${response.length})`" />
    <div class="d-flex align-items-center justify-content-end w-50">
      <button
        class="btn btn-primary me-4"
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
  </div>

  <data-table
    :headers="dataTable.headers"
    :items="dataTable.items"
    :styles="dataTable.styles"
  >
    <template v-slot:name="slotProps">
      <img
        :src="$vuehelper.getImageUrl(slotProps.item.profilePhoto)"
        alt="Profile image"
        width="30"
        height="30"
        class="rounded-circle"
        v-if="slotProps.item.profilePhoto"
      />
      <span
        class="w-25 h-25 p-3 ps-5 pe-5 bg-primary rounded-circle text-white"
        v-if="!slotProps.item.profilePhoto"
        >{{ slotProps.item.firstName.charAt(0).toUpperCase() }}</span
      >
      <span class="ms-4"
        >{{ slotProps.item.firstName }} {{ slotProps.item.lastName }}</span
      >
    </template>
    <template v-slot:status="slotProps">
      <span
        class="badge fs-7 ms-2"
        :class="{
          'bg-success-alpha text-success': slotProps.item.status == 'ACTIVE',
          'bg-dander-alpha text-danger': slotProps.item.status == 'INACTIVE',
        }"
      >
        {{ slotProps.item.status == "ACTIVE" ? "Active" : "Inactive" }}
      </span>
    </template>
    <template v-slot:action="slotProps">
      <div
        class="d-flex justify-content-around align-items-center p-6 edit-row"
      >
        <i
          class="fa fa-solid fa-pen fs-4 fa-primary-hover"
          @click="addUser('Edit User', slotProps.item)"
        ></i>
        <i
          class="fa fa-solid fa-trash fs-4 fa-danger-hover"
          @click="confirmationToDelete(slotProps.item)"
        ></i>
        <span
          class="
            badge
            bg-white
            border border-dashed
            text-primary
            border-primary
            record-status
          "
          v-if="
            slotProps.item.recordStatus == 'new' ||
            slotProps.item.recordStatus == 'update'
          "
          >{{ slotProps.item.recordStatus == "new" ? "New" : "Edit" }}</span
        >
      </div>
    </template>
  </data-table>

  <add-user
    :modelType="modelType"
    :response="selectedUser"
    @newUser="updateUser"
    @close="showAddUserModel = false"
    v-if="showAddUserModel"
  />
  <app-delete
    message="Are you sure you want to delete this user?"
    @delete="deteleUser"
    @cancel="showDeleteModel = false"
    v-if="showDeleteModel"
  />

  <!--<div class="card p-4 mt-4 position-relative">
    <div class="card-body pt-0">
      <table
        class="
          table table-hover
          fs-6
          border-top-0
          border-start-0
          border-end-0
          border-bottom-1
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
                border-bottom-1 border-dashed border-light
                p-6
              "
            >
              NAME
            </th>
            <th
              class="
                fw-bold
                text-gray-secondary
                border-bottom-1 border-dashed border-light
                p-6
              "
            >
              EMAIL
            </th>
            <th
              class="
                fw-bold
                text-gray-secondary
                border-bottom-1 border-dashed border-light
                p-6
              "
            >
              ROLE
            </th>
            <th
              class="
                fw-bold
                text-gray-secondary
                border-bottom-1 border-dashed border-light
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
                border-bottom-1 border-dashed border-light
                p-6
              "
            ></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in response" :key="'user-table' + index">
            <td
              class="fw-bold border-bottom-1 border-dashed border-light p-6"
              :class="{
                'text-gray-secondary': item.status == 'INACTIVE',
                'text-dark-gray': item.status == 'ACTIVE',
                'bg-warning-opacity':
                  item.recordStatus == 'new' || item.recordStatus == 'update',
              }"
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
              class="fw-bold border-bottom-1 border-dashed border-light p-6"
              :class="{
                'text-gray-secondary': item.status == 'INACTIVE',
                'text-dark-gray': item.status == 'ACTIVE',
                'bg-warning-opacity':
                  item.recordStatus == 'new' || item.recordStatus == 'update',
              }"
            >
              {{ item.email }}
            </td>
            <td
              class="fw-bold border-bottom-1 border-dashed border-light p-6"
              :class="{
                'text-gray-secondary': item.status == 'INACTIVE',
                'text-dark-gray': item.status == 'ACTIVE',
                'bg-warning-opacity':
                  item.recordStatus == 'new' || item.recordStatus == 'update',
              }"
            >
              {{ item.roleName }}
            </td>
            <td
              class="
                fw-bold
                border-bottom-1 border-dashed border-light
                ps-2
                pe-2
                pt-6
                pb-6
              "
              :class="{
                'text-gray-secondary': item.status == 'INACTIVE',
                'text-dark-gray': item.status == 'ACTIVE',
                'bg-warning-opacity':
                  item.recordStatus == 'new' || item.recordStatus == 'update',
              }"
            >
              <span
                class="badge fs-7 ms-2"
                :class="{
                  'bg-success-alpha text-success': item.status == 'ACTIVE',
                  'bg-dander-alpha text-danger': item.status == 'INACTIVE',
                }"
              >
                {{ item.status == "ACTIVE" ? "Active" : "Inactive" }}
              </span>
            </td>
            <td
              class="border-bottom-1 border-dashed border-light"
              :class="{
                'text-gray-secondary': item.status == 'INACTIVE',
                'text-dark-gray': item.status == 'ACTIVE',
                'bg-warning-opacity':
                  item.recordStatus == 'new' || item.recordStatus == 'update',
              }"
              style="width: 10%"
            >
              <div class="d-flex justify-content-around align-items-center p-6">
                <i
                  class="fa fa-solid fa-pen fs-4 edit-row fa-primary-hover"
                  @click="addUser('Edit User', item)"
                ></i>
                <i
                  class="fa fa-solid fa-trash fs-4 edit-row fa-danger-hover"
                  @click="confirmationToDelete(item)"
                ></i>
                <span
                  class="
                    badge
                    bg-white
                    border border-dashed
                    text-primary
                    border-primary
                    record-status
                  "
                  v-if="
                    item.recordStatus == 'new' || item.recordStatus == 'update'
                  "
                  >{{ item.recordStatus == "new" ? "New" : "Edit" }}</span
                >
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      
    </div>
  </div> -->
</template>
<script lang="ts">
import { Options } from "vue-class-component";
import { Inject } from "vue-property-decorator";

import {
  AddUserRequestModel,
  DataTableModel,
  HeadersModel,
  UserResponseModel,
} from "@/model";

import { IUserListService } from "@/service";

import BaseComponent from "@/components/base/BaseComponent.vue";
import BreadCrumb from "@/components/layout/BreadCrumb.vue";

import AddUser from "./components/AddUser.vue";
import AppDelete from "@/components/layout/AppDelete.vue";

import DataTable from "@/components/controls/DataTable.vue";

@Options({
  components: {
    AddUser,
    AppDelete,
    DataTable,
    BreadCrumb,
  },
})
export default class UserList extends BaseComponent {
  @Inject("userService") service: IUserListService;

  public response: Array<UserResponseModel> = [];
  public dataResource: Array<UserResponseModel> = [];
  public selectedUser: UserResponseModel = new UserResponseModel();
  public modelType: string = "Add User";
  public showAddUserModel: boolean = false;
  public showDeleteModel: boolean = false;
  public toggle: Array<boolean> = [];

  public dataTable: DataTableModel = new DataTableModel();

  created() {
    this.getUserList();
  }

  mounted() {
    let headers: Array<HeadersModel> = [];
    headers.push({
      text: "NAME",
      value: "name",
      class: "fw-bold border-bottom-1 border-dashed border-light p-6",
    });
    headers.push({
      text: "EMAIL",
      value: "email",
      class: "fw-bold border-bottom-1 border-dashed border-light p-6",
    });
    headers.push({
      text: "ROLE",
      value: "roleName",
      class: "fw-bold border-bottom-1 border-dashed border-light p-6",
    });
    headers.push({
      text: "STATUS",
      value: "status",
      class: "fw-bold border-bottom-1 border-dashed border-light p-6",
    });
    headers.push({
      text: "",
      value: "action",
      class: "fw-bold border-bottom-1 border-dashed border-light p-0",
    });

    this.dataTable.headers = headers;

    this.dataTable.styles.tableClass =
      "table table-hover fs-6 border-top-0 border-start-0 border-end-0 border-bottom-1 border-dashed border-light";
    this.dataTable.styles.theadClass =
      "fw-bold text-gray-secondary border-bottom-1 border-dashed border-light p-6";
    this.dataTable.styles.tbodyClass =
      "fw-bold border-bottom-1 border-dashed border-light p-6";
  }

  public getUserList() {
    this.service
      .getUserList()
      .then((response) => {
        this.response = response;
        this.dataResource = response;
        
        this.toggle = [];
        this.applyStatus();
      })
      .catch((err) => {
        if (err.response.status == 500)
          this.alert(
            "Oops, sorry!",
            "Something went wrong, Please contact administration"
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

  public confirmationToDelete(response: UserResponseModel) {
    this.selectedUser = response;
    this.showDeleteModel = true;
  }

  public deteleUser() {
    let request: AddUserRequestModel = new AddUserRequestModel();
    request.firstName = this.selectedUser.firstName;
    request.lastName = this.selectedUser.lastName;
    request.email = this.selectedUser.email;
    request.roleId = this.selectedUser.roleId;
    request.active = this.selectedUser.status == "ACTIVE" ? true : false;
    request.uuid = this.selectedUser.uuid;
    request.deleteFlag = true;

    this.service
      .addUser(request)
      .then((response) => {
        this.showDeleteModel = false;
        this.getUserList();
        this.confirmation("", "User has been deleted successfully");
      })
      .catch((err) => {
        if (err.response.status == 500)
          this.alert(
            "Oops, sorry!",
            "Something went wrong, Please contact administration"
          );
        else if (err.response.status == 400)
          this.alert("Oops, sorry!", err.response.data.message);
      });
  }

  public applyFilter(searchValue: string) {
    this.dataTable.items = this.response.filter(
      (item) =>
        (item.firstName &&
          item.firstName.toLowerCase().includes(searchValue.toLowerCase())) ||
        (item.roleName &&
          item.roleName
            .toLocaleLowerCase()
            .includes(searchValue.toLowerCase())) ||
        (item.email &&
          item.email.toLowerCase().includes(searchValue.toLowerCase()))
    );
  }

  public applyStatus() {
    for (let i in this.response) {
      this.response[i].recordStatus = this.create(
        this.response[i].createdTime,
        this.response[i].updatedTime
      );
    }

    this.dataTable.items = this.response;

    setTimeout(() => {
      this.removeStatus();
    }, 10000);
  }

  public removeStatus() {
    this.response.forEach((item) => {
      item.recordStatus = null;
    });
  }
}
</script> 