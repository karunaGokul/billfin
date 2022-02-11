<template>
  <div class="modal fade show d-block">
    <div class="modal-dialog modal-dialog-centered modal-md">
      <div class="modal-content">
        <div class="modal-header p-4 pt-6 pb-6">
          <h5 class="modal-title fs-4 fw-bolder">
            <span v-if="modelType == 'View Advisor'"
              >{{ request.displayName }}
              <i
                class="fa fa-pen text-gray ms-4"
                style="cursor: pointer"
                @click="editAdvisor"
              ></i
            ></span>
            <span v-else>{{ modelType }}</span>
          </h5>
          <button type="button" class="btn-close" @click="close('close')">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="modal-body ms-8 me-8 mt-4 mb-4 p-4">
          <template
            v-if="modelType == 'Add Advisor' || modelType == 'Edit Advisors'"
          >
            <div class="row">
              <div class="col-4">
                <text-input
                  formFieldType="inputBlock"
                  label="First Name"
                  :controls="v$.request.firstName"
                  :validation="['required']"
                />
              </div>
              <div class="col-4">
                <text-input
                  formFieldType="inputBlock"
                  label="Middle Name"
                  :controls="v$.request.middleName"
                  :validation="[]"
                />
              </div>
              <div class="col-4">
                <text-input
                  formFieldType="inputBlock"
                  label="Last Name"
                  :controls="v$.request.lastName"
                  :validation="['required']"
                />
              </div>
            </div>
            <div class="row">
              <div class="col-6">
                <text-input
                  formFieldType="inputBlock"
                  label="Display Name"
                  :controls="v$.request.displayName"
                  :validation="['required']"
                />
              </div>
              <div class="col-6">
                <phone-input
                  label="Phone number"
                  :controls="v$.request.contactPhone"
                  formFieldType="inputBlock"
                  :validation="[
                    'required',
                    'phone',
                    'minLength',
                    'phoneLength',
                  ]"
                />
              </div>
            </div>
            <div class="position-relative pb-1">
              <email-input
                label="Email ID"
                :controls="v$.request.emailAddress"
                :validation="['required', 'email']"
                @validateEmail="
                  !v$.request.emailAddress.$invalid ? validateEmail() : ''
                "
              />
              <div class="position-absolute bottom-0 m-4 ms-0">
                <div class="invalid-feedback" v-if="emailErrorMessage">
                  {{ emailErrorMessage }}
                </div>
              </div>
            </div>
            <div>
              <text-input
                formFieldType="inputBlock"
                label="ID (Optional)"
                :controls="v$.request.advisorIdentifier"
                :validation="['required']"
              />
            </div>
            <div v-if="pageType == 'Advisor'">
              <select-box-with-delete
                label="Assign Rep Codes"
                :response="repCodes"
                @updateValue="updateRepCodes"
              />
            </div>
          </template>
          <template v-else>
            <div class="row g-0 mt-2 mb-2">
              <div class="col">
                <div class="fw-bold text-gray-secondary p-2">First Name</div>
                <div class="text-dark-gray p-2">{{ request.firstName }}</div>
              </div>
              <div class="col">
                <div class="text-gray-secondary p-2">Middle Name</div>
                <div class="text-dark-gray p-2">{{ request.middleName }}</div>
              </div>
              <div class="col">
                <div class="text-gray-secondary p-2">Last Name</div>
                <div class="text-dark-gray p-2">{{ request.lastName }}</div>
              </div>
            </div>
            <div class="row g-0 mt-2 mb-2">
              <div class="col">
                <div class="text-gray-secondary p-2">Display Name</div>
                <div class="text-dark-gray p-2">{{ request.displayName }}</div>
              </div>
              <div class="col">
                <div class="text-gray-secondary p-2">Phone Number</div>
                <div class="text-dark-gray p-2">{{ request.contactPhone }}</div>
              </div>
              <div class="col"></div>
            </div>
            <div class="row g-0 mt-2 mb-2">
              <div class="col-8">
                <div class="text-gray-secondary p-2">Email ID</div>
                <div class="text-dark-gray p-2">{{ request.emailAddress }}</div>
              </div>
              <div class="col-4">
                <div class="text-gray-secondary p-2">ID (Optional)</div>
                <div class="text-dark-gray p-2">{{ request.id }}</div>
              </div>
            </div>
            <div class="mt-2 mb-2">
              <div class="text-gray-secondary p-2">Rep Codes</div>
              <a
                href="#"
                class="border-bottom border-primary me-2 ms-2 pt-2"
                v-for="(code, index) of request.repCode"
                :key="'advisor-rep-code' + index"
              >
                {{ code }},
              </a>
            </div>
          </template>
        </div>

        <div class="modal-footer justify-content-center border-0 p-4">
          <button
            type="button"
            class="btn btn-link text-gray"
            @click="close('close')"
            v-if="modelType == 'Add Advisor' || modelType == 'Edit Advisors'"
          >
            Cancel
          </button>
          <button
            type="button"
            class="btn btn-primary ms-8"
            @click="addAdvisor"
            v-if="modelType == 'Add Advisor' || modelType == 'Edit Advisors'"
          >
            Save
          </button>
          <button
            type="button"
            class="btn btn-primary ms-4"
            v-if="modelType == 'View Advisor'"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Options, setup } from "vue-class-component";
import { Prop, Inject } from "vue-property-decorator";
import { useStore } from "vuex";

import useVuelidate from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";

import TextInput from "../controls/TextInput.vue";
import PhoneInput from "@/components/controls/PhoneInput.vue";
import EmailInput from "@/components/controls/EmailInput.vue";
import SelectBoxWithDelete from "@/components/controls/SelectBoxWithDelete.vue";

import {
  addAdvisorRequestModel,
  validateAdvisorRequestModel,
  assignRepCodesResponseModel,
  ListItem,
} from "@/model";
import { IAdvisorsService, IRepCodesService } from "@/service";

@Options({
  components: { TextInput, PhoneInput, EmailInput, SelectBoxWithDelete },
  validations: {
    request: {
      firstName: { required },
      middleName: {},
      lastName: { required },
      displayName: { required },
      contactPhone: {
        required,
        phone: (value: any) => {
          let validation = false;
          if (
            value &&
            value != "" &&
            /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/.test(value)
          )
            validation = true;
          return validation;
        },
        minLength: minLength(10),
        phoneLength: (value: any) => {
          let validation = false;
          if (
            (value && value != "" && value.length == 10) ||
            value.length == 12
          )
            validation = true;
          return validation;
        },
      },
      emailAddress: {
        required,
        email: (value: string) => {
          const validation =
            value.indexOf("@") != -1 && value.lastIndexOf(".com") != -1;
          return validation;
        },
      },
      advisorIdentifier: {},
    },
  },
})
export default class AddAdvisor extends Vue {
  @Inject("advisorsService") service: IAdvisorsService;
  @Inject("repCodesService") repCodesService: IRepCodesService;

  @Prop() pageType: string;
  @Prop() type: string;
  @Prop() selectedAdvisor?: addAdvisorRequestModel;

  public v$: any = setup(() => this.validate());
  public store = useStore();
  public request: addAdvisorRequestModel = new addAdvisorRequestModel();

  public modelType: string = "";
  public emailErrorMessage: string = null;

  public repCodes: Array<ListItem> = [];

  public validate() {
    return useVuelidate();
  }

  created() {
    this.modelType = this.type;
    if (this.modelType == "View Advisor" || this.modelType == "Edit Advisors")
      this.request = this.selectedAdvisor;
    this.unassignedRepCodes();
  }

  public close(action: string) {
    this.$emit(action);
  }

  public validateEmail() {
    let request = new validateAdvisorRequestModel();
    request.emailAddress = this.request.emailAddress;
    this.service
      .validateAdvisor(request)
      .then((response) => {
        this.emailErrorMessage = null;
      })
      .catch((err) => {
        if (err.response.status == 400) {
          this.emailErrorMessage = err.response.data.message;
        } else if (err.response.status == 500) {
          this.store.dispatch("showAlert", {
            message: "Something went wrong, Please try again!",
            title: "Oops, sorry!",
          });
        }
      });
  }

  private unassignedRepCodes() {
    this.repCodesService.unassignedRepCodes().then((response) => {
      response.forEach((item) => {
        let repCode = new ListItem(item.repCode);
        repCode.data = item.repId;

        this.repCodes.push(repCode);
      });
    });
  }

  public updateRepCodes(repCodes: Array<ListItem>) {
    repCodes.forEach((item: ListItem) => {
      let repCode: assignRepCodesResponseModel =
        new assignRepCodesResponseModel();
      repCode.repId = item.data;
      repCode.repCode = item.text;
      this.request.repCodes.push(repCode);
    });
  }

  public editAdvisor() {
    this.request = this.selectedAdvisor;
    this.modelType = "Edit Advisors";
  }

  public addAdvisor() {
    this.v$.$touch();
    if (!this.v$.$invalid && !this.emailErrorMessage) {
      this.request.middleName = this.valueCheck(this.request.middleName);
      this.request.advisorIdentifier = this.valueCheck(this.request.advisorIdentifier);
      this.request.advisorId = this.valueCheck(this.request.advisorId);
      this.request.repCodes =
        this.request.repCodes && this.request.repCodes.length > 0
          ? this.request.repCodes
          : null;

      this.service
        .addAdvisor(this.request)
        .then((response) => {
          this.$emit("advisorAdded");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  private valueCheck(value: any) {
    return !value ? null : value;
  }
}
</script>