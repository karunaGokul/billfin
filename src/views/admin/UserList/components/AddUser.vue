<template>
  <div class="modal fade show d-block">
    <div class="modal-dialog modal-dialog-centered modal-md">
      <div class="modal-content">
        <div class="modal-header p-4 pt-6 pb-6">
          <h5 class="modal-title fs-4 fw-bolder">{{ modelType }}</h5>
          <button type="button" class="btn-close" @click="close">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="modal-body ms-8 me-8 mt-4 mb-4 p-4">
          <div class="fw-bolder">Profile Picture</div>

          <div class="w-25 h-50 mt-4 mb-4 position-relative">
            <div
              class="
                position-absolute
                top-0
                start-100
                translate-middle
                bg-white
                w-25
                h-25
                rounded-circle
                p-4
                pt-1
                ps-3
                mt-2
                text-center
                lh-lg
              "
            >
              <i
                class="fa fa-solid fa-pen fs-7"
                style="cursor: pointer"
                @click.stop="openProfileUpload()"
              ></i>
              <input
                type="file"
                ref="profileUpload"
                @change="uploadProfile"
                class="d-none"
              />
            </div>
            <div
              class="
                position-absolute
                top-100
                start-100
                translate-middle
                bg-white
                w-25
                h-25
                rounded-circle
                p-4
                pt-1
                ps-3
                mt-2
                text-center
                lh-lg
              "
              v-if="profilePhoto"
            >
              <i
                class="fa fa-solid fa-times fs-7"
                style="cursor: pointer"
                @click="removeProfile"
              ></i>
            </div>
            <img
              :src="viewImage"
              alt="Profile image"
              width="120"
              height="130"
              v-if="profilePhoto"
            />
            <div
              class="
                p-6
                d-flex
                align-items-center
                justify-content-center
                bg-gray-secondary
              "
              v-if="!profilePhoto"
            >
              <i class="fa fa-solid fa-user fa-7x"></i>
            </div>
          </div>

          <div class="row">
            <div class="col-6">
              <text-input
                formFieldType="inputBlock"
                label="First Name"
                :controls="v$.request.firstName"
                :validation="['required']"
              />
            </div>
            <div class="col-6">
              <text-input
                formFieldType="inputBlock"
                label="Last Name"
                :controls="v$.request.lastName"
                :validation="['required']"
              />
            </div>
          </div>
          <email-input
            label="Email ID"
            :controls="v$.request.email"
            :validation="['required', 'email']"
            :readonly="modelType == 'Edit User'"
          />

          <label for="Role" class="form-label fw-bolder"> Role </label>
          <select
            class="form-select form-select-solid mb-8"
            v-model="v$.request.roleId.$model"
          >
            <option v-for="(item, i) in roles" :key="i" :value="item.roleId">
              {{ item.roleName }}
            </option>
          </select>

          <div class="form-check form-switch">
            <input
              class="form-check-input"
              type="checkbox"
              v-model="v$.request.isActive.$model"
            />
            <label class="form-check-label" for="Activate User"
              >Activate User</label
            >
          </div>
        </div>
        <div class="modal-footer justify-content-center border-0 p-4">
          <button type="button" class="btn btn-link text-gray" @click="close">
            Cancel
          </button>
          <button type="button" class="btn btn-primary ms-8" @click="addUser">
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Options, setup } from "vue-class-component";
import { Prop, Inject } from "vue-property-decorator";

import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";

import {
  AddUserRequestModel,
  RolesResponseModel,
  UserResponseModel,
} from "@/model";

import TextInput from "@/components/controls/TextInput.vue";
import SelectBox from "@/components/controls/SelectBox.vue";
import EmailInput from "@/components/controls/EmailInput.vue";
import { IUserListService } from "@/service";
import { useStore } from "vuex";

@Options({
  components: {
    TextInput,
    EmailInput,
    SelectBox,
  },
  validations: {
    request: {
      firstName: { required },
      lastName: { required },
      email: {
        required,
        email: (value: string) => {
          const validation =
            value.indexOf("@") != -1 && value.lastIndexOf(".com") != -1;
          return validation;
        },
      },
      roleId: { required },
      isActive: {},
    },
  },
})
export default class AddUser extends Vue {
  @Inject("userService") service: IUserListService;

  @Prop() modelType: string;
  @Prop() response: UserResponseModel;

  public v$: any = setup(() => this.validate());
  public request: AddUserRequestModel = new AddUserRequestModel();

  public profilePhoto: any = null;

  public store = useStore();

  public roles: Array<RolesResponseModel> = [];

  public validate() {
    return useVuelidate();
  }

  created() {
    this.getRoles();
    if (this.modelType == "Edit User") {
      this.request.firstName = this.response.firstName;
      this.request.lastName = this.response.lastName;
      this.request.email = this.response.email;
      this.request.roleId = this.response.roleId;
      this.request.isActive = this.response.isActive;
      this.request.uuid = this.response.uuid;

      //this.profilePhoto = this.response.profilePhoto;
    }
  }

  public getRoles() {
    this.service
      .getRoles()
      .then((response) => {
        this.roles = response;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  public openProfileUpload() {
    let file: any = this.$refs.profileUpload;

    file.click();
  }

  public uploadProfile(event: any) {
    let file: File = event.target.files[0];
    if (!file) return;

    this.profilePhoto = file;
    console.log(this.profilePhoto);
  }

  public removeProfile() {
    this.profilePhoto = null;
  }

  public addUser() {
    this.v$.$touch();

    if (!this.v$.$invalid && this.profilePhoto) {
      this.service
        .addUser(this.request)
        .then((response) => {
          if (response.status == "SUCCESS") this.processAvatar(response.uuid);
        })
        .catch((err) => {
          if (err.response.status == 500)
            this.store.dispatch("showAlert", {
              message: "Somthing went wrong, Please contact administration",
              title: "Oops, sorry!",
            });
          else if (err.response.status == 400) {
            this.store.dispatch("showAlert", {
              message: err.response.data.message,
              title: "Oops, sorry!",
            });
          }
        });
    }
  }

  private processAvatar(uuid: string) {
    this.service
      .uploadPhoto(this.profilePhoto, uuid)
      .then((response) => {
        this.$emit("userAdd");
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

  public close() {
    this.$emit("close");
  }

  get viewImage() {
    return this.profilePhoto
      ? window.URL.createObjectURL(this.profilePhoto)
      : null;
  }
}
</script>