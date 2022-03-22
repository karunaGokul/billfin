<template>
  <div class="tab-content d-flex justify-content-center align-items-center">
    <div class="w-75 mt-10">
      <p class="fs-3 fw-bolder pb-3 mb-5 border-bottom">
        General Information
        <i class="fa fa-question-circle fs-4 text-dark ms-4"></i>
      </p>

      <div class="ps-4 pe-4 border-bottom tab-content__scroll overflow-auto">
        <form @submit.prevent="saveGeneral">
          <TextInput
            label="Company"
            formFieldType="inputInline"
            :controls="v$.request.company"
            :validation="['required']"
            :readonly="false"
          />
          <PhoneInput
            label="Company Phone"
            formFieldType="inputInline"
            :controls="v$.request.companyPhone"
            :validation="['required', 'phone', 'minLength', 'phoneLength']"
          />
          <TextInput
            label="Company Domain"
            formFieldType="inputInline"
            :controls="v$.request.companyDomain"
            :validation="['required']"
            :readonly="true"
          />
          <TextInput
            label="Company Address"
            formFieldType="inputInline"
            :controls="v$.request.companyAddress1"
            :validation="['required']"
            :readonly="false"
          />
          <TextInput
            label="City"
            formFieldType="inputInline"
            :controls="v$.request.city"
            :validation="['required']"
            :readonly="false"
          />
          <SelectBox
            label="State"
            :controls="v$.request.state"
            :data="states"
            :validation="['required']"
            formFieldType="inputInline"
          />
          <TextInput
            label="Postal Code"
            formFieldType="inputInline"
            :controls="v$.request.postalCode"
            :validation="['required', 'numeric']"
            :readonly="false"
          />

          <div class="d-flex align-items-center justify-content-end pb-5">
            <button
              type="submit"
              class="btn"
              :class="{
                'btn-secondary': v$.request.$invalid,
                'btn-primary': !v$.request.$invalid,
              }"
              :disabled="v$.request.$invalid"
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Options, setup } from "vue-class-component";
import { Inject } from "vue-property-decorator";

import BaseComponent from "@/components/base/BaseComponent.vue";

import useVuelidate from "@vuelidate/core";
import { required, numeric, minLength } from "@vuelidate/validators";

import { useStore } from "vuex";
import { IFirmService } from "@/service";

import TextInput from "@/components/controls/TextInput.vue";
import PhoneInput from "@/components/controls/PhoneInput.vue";
import SelectBox from "@/components/controls/SelectBox.vue";

import {
  generalBoardRequestModel,
  generalBoardResponseModel
} from "@/model";

@Options({
  components: {
    TextInput,
    PhoneInput,
    SelectBox,
  },
  validations: {
    request: {
      company: { required },
      companyPhone: {
        required,
        phone: (value: any) => {
          let validation = false;
          if (
            value &&
            value != "" &&
            /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/.test(value)
          )
            validation = true;
          //else if (value && value != "" && /^[0-9]*\d$/.test(value))  validation = true;
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
      companyDomain: { required },
      companyAddress1: { required },
      city: { required },
      state: { required },
      postalCode: { required, numeric },
    },
  },
})
export default class GeneralBoard extends BaseComponent {
  @Inject("firmService") service: IFirmService;

  public v$: any = setup(() => this.validate());
  public store = useStore();

  validate() {
    return useVuelidate();
  }

  public request = new generalBoardRequestModel();

  mounted() {
    this.request.state = "Massachusetts";
    this.getGeneralDetails();
  }

  public getGeneralDetails() {
    this.service
      .getGeneralDetails()
      .then((response) => {
        this.request = response;
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

  public saveGeneral() {
    this.v$.$touch();

    if (!this.v$.$invalid) {
      this.service
        ?.saveGeneral(this.request)
        .then((response: generalBoardResponseModel) => {
          if (response.status == "SUCCESS") {
            this.$emit("next");
          }
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
  }

  get firms() {
    return this.store.getters.firms;
  }

  get states() {
    return this.store.getters.states;
  }
}
</script>