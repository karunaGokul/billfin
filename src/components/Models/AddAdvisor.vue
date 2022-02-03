<template>
  <div class="modal fade show d-block">
    <div class="modal-dialog modal-dialog-centered modal-md">
      <div class="modal-content">
        <div class="modal-header p-4 pt-6 pb-6">
          <h5 class="modal-title fs-4 fw-bolder">Add Advisor</h5>
          <button type="button" class="btn-close" @click="close('close')">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="modal-body m-8 p-4">
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
          <div>
            <text-input
              formFieldType="inputBlock"
              label="Display Name"
              :controls="v$.request.displayName"
              :validation="['required']"
            />
          </div>
          <div>
            <phone-input
              label="Phone number"
              :controls="v$.request.contactPhone"
              formFieldType="inputBlock"
              :validation="['required', 'phone', 'minLength', 'phoneLength']"
            />
          </div>
          <div>
            <email-input
              label="Email ID"
              :controls="v$.request.emailAddress"
              :validation="['required', 'email', 'domain']"
              @validateEmail="!v$.request.emailAddress.$invalid ? validateEmail() : ''"
            />
          </div>
          <div>
            <text-input
              formFieldType="inputBlock"
              label="ID (Optional)"
              :controls="v$.request.id"
              :validation="['required']"
            />
          </div>
          <div>
            <select-box-with-delete
              label="Assign Rep Codes"
              :response="repCodes"
            />
          </div>
        </div>

        <div class="modal-footer justify-content-center border-0">
          <button
            type="button"
            class="btn btn-link text-gray"
            @click="close('close')"
          >
            Cancel
          </button>
          <button type="button" class="btn btn-primary ms-4">Add</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Options, setup } from "vue-class-component";

import { Prop, Inject } from "vue-property-decorator";

import useVuelidate from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";

import TextInput from "../controls/TextInput.vue";
import PhoneInput from "@/components/controls/PhoneInput.vue";
import EmailInput from "@/components/controls/EmailInput.vue";
import SelectBoxWithDelete from "@/components/controls/SelectBoxWithDelete.vue";

import { addAdvisorReqeustModel, validateAdvisorRequestModel, ListItem } from "@/model";
import { IAdvisorsService } from "@/service";

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
        domain: (value: string) => {
          const validation =
            value.indexOf("gmail") == -1 &&
            value.indexOf("yahoo") == -1 &&
            value.indexOf("hotmail") == -1 &&
            value.indexOf("aol") == -1 &&
            value.indexOf("outlook") == -1 &&
            value.indexOf("protonmail") == -1 &&
            value.indexOf("icloud") == -1;
          return validation;
        },
      },
      id: {},
    },
  },
})
export default class AddAdvisor extends Vue {
  @Inject("advisorsService") service: IAdvisorsService;

  //@Prop() pageType: string;

  public v$: any = setup(() => this.validate());
  public request: addAdvisorReqeustModel = new addAdvisorReqeustModel();

  public repCodes: Array<ListItem> = [];

  private validate() {
    return useVuelidate();
  }

  created() {
    this.listOfRepCodes();
  }

  public close(action: string) {
    this.$emit(action);
  }

  public validateEmail() {
    let request = new validateAdvisorRequestModel();
    request.emailAddress = this.request.emailAddress;
    this.service.validateAdvisor(request).then((response) => {
      console.log(response);
    })
  }

  private listOfRepCodes() {
    this.service.listOfRepCodes().then((response) => {
      response.forEach((item) => {
        let repCode = new ListItem(item.repCode);
        repCode.data = item.repId;

        this.repCodes.push(repCode);
      });
    });
  }
}
</script>