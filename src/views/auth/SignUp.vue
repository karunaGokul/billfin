<template>
  <div class="signup-container">
    <div class="row g-0">
      <div class="col-xl-7 col-lg-7 col-sm-6">
        <div class="mx-auto w-75 mt-20">
          <img src="@/assets/billfin.svg" alt="Logo" />
          <p class="fs-1 mt-2 fw-bolder">Thanks for your interest in BillFin</p>
          <p
            class="fs-5 w-75 text-muted lh-base"
            style="padding-right: 10.5rem"
          >
            Powerful billing and invoicing for the modern RIA and financial
            advisor, designed to be ridiculously simple to use.
          </p>
          <img
            src="@/assets/signup.png"
            class="w-75 mt-8"
            alt="Sign up image"
          />
        </div>
      </div>
      <div class="col-xl-5 col-lg-5 col-sm-6">
        <div class="card mt-20" style="max-width: 450px">
          <p class="fs-1 mt-2 fw-bolder mb-0 text-center">14 Days Free Trial</p>
          <p class="fs-7 text-muted text-center">
            Have questions? <a href="#" class="fw-bolder">Chat with sales</a>
          </p>
          <form @submit.prevent="signUp">
            <div class="row mt-10 mb-2">
              <div class="col-6">
                <TextInput
                  label="First name"
                  :controls="v$.request.firstName"
                  inputType="text"
                  formFieldType ="inputBlock"
                  :validation="['required']"
                />
              </div>
              <div class="col-6">
                <TextInput
                  label="Last name"
                  :controls="v$.request.lastName"
                  inputType="text"
                  formFieldType ="inputBlock"
                  :validation="['required']"
                />
              </div>
            </div>

            <TextInput
              label="Company"
              :controls="v$.request.companyName"
              inputType="text"
              formFieldType ="inputBlock"
              :validation="['required']"
            />

            <div class="row mt-6 mb-2">
              <div class="col-6">
                <TextInput
                  label="Phone number"
                  :controls="v$.request.phoneNumber"
                  inputType="text"
                  formFieldType ="inputBlock"
                  :validation="[
                    'required',
                    'phone',
                    'minLength',
                    'phoneLength',
                  ]"
                />
              </div>
              <div class="col-6">
                <label for="aum" class="form-label fw-bolder"> AUM </label>
                <select
                  class="form-select form-select-solid"
                  v-model="v$.request.aumRange.$model"
                >
                  <option selected value="">$</option>
                  <option v-for="(item, i) in aum" :key="i" :value="item">
                    {{ item }}
                  </option>
                </select>
                <div
                  class="invalid-feedback"
                  v-if="
                    v$.request.aumRange.$dirty && v$.request.aumRange.$invalid
                  "
                >
                  AUM is required
                </div>
              </div>
            </div>

            <label for="company" class="form-label fw-bolder mt-4 mb-4">
              Where do you custody?
              <span class="text-muted">Check all that apply</span>
            </label>
            <div
              class="
                d-flex
                justify-content-between
                align-items-center
                flex-wrap
                mb-2
              "
            >
              <div
                class="
                  form-check form-check-solid form-check-inline
                  mb-3
                  me-0
                  flex-fill-basic
                "
                v-for="(item, i) in custodian"
                :key="i"
              >
                <input
                  class="form-check-input"
                  type="checkbox"
                  v-model="request.custodians"
                  :value="item.custodianId"
                />
                <label class="fs-7 form-check-label" v-bind:for="item">
                  {{ item.custodianName }}
                </label>
              </div>
            </div>
            <div
              class="invalid-feedback mb-4"
              v-if="v$.request.custodians.$dirty && v$.request.custodians.$invalid"
            >
              Custodian selection is required
            </div>

            <TextInput
              label="Work email"
              :controls="v$.request.email"
              inputType="text"
              formFieldType ="inputBlock"
              :validation="['required', 'email', 'domain']"
              @validateEmail="validateEmail"
            />

            <div
              class="invalid-feedback"
              v-if="
                !v$.request.email.$invalid && validateEmailResponse.userRegistered
              "
            >
              An account with this email address already exists
              <a href="#" class="border-bottom border-primary"> Contact us </a>
            </div>

            <div
              class="invalid-feedback"
              v-if="
                !v$.request.email.$invalid && validateEmailResponse.firmRegistered
              "
            >
              The {{ request.email.split("@")[1] }} domain already exists
              <a href="#" class="border-bottom border-primary"> Contact us </a>
            </div>

            <TextInput
              label="Password"
              inputType="password"
              formFieldType ="inputBlock"
              :controls="v$.request.password"
              :validation="[
                'required',
                'letter',
                'number',
                'special',
                'minLength',
              ]"
            />

            <div class="d-flex mt-2 mb-2">
              <div
                class="card w-25 h-25 p-1 me-4"
                :class="{
                  'bg-secondary': !request.password,
                  'bg-danger': request.password && request.password.length <= 4,
                  'bg-warning':
                    request.password && request.password.length <= 8,
                  'bg-primary':
                    request.password && request.password.length <= 12,
                  'bg-success':
                    request.password && request.password.length > 12,
                }"
              ></div>
              <div
                class="card w-25 h-25 p-1 me-4"
                :class="{
                  'bg-secondary':
                    !request.password ||
                    (request.password && request.password.length <= 4),
                  'bg-warning':
                    request.password &&
                    request.password.length > 4 &&
                    request.password.length <= 8,
                  'bg-primary':
                    request.password &&
                    request.password.length > 8 &&
                    request.password.length <= 12,
                  'bg-success':
                    request.password && request.password.length > 12,
                }"
              ></div>
              <div
                class="card w-25 h-25 p-1 me-4"
                :class="{
                  'bg-secondary':
                    !request.password ||
                    (request.password && request.password.length <= 8),
                  'bg-primary':
                    request.password &&
                    request.password.length > 8 &&
                    request.password.length <= 12,
                  'bg-success':
                    request.password && request.password.length > 12,
                }"
              ></div>
              <div
                class="card w-25 h-25 p-1 me-4"
                :class="{
                  'bg-secondary':
                    !request.password ||
                    (request.password && request.password.length <= 12),
                  'bg-success':
                    request.password && request.password.length > 12,
                }"
              ></div>
            </div>
            <p class="fs-8 text-muted">
              Use 8 or more characters with a mix of letters, numbers & symbols.
            </p>

            <TextInput
              label="Confirm password"
              inputType="password"
              formFieldType ="inputBlock"
              :controls="v$.request.confirmPassword"
              :validation="['required']"
              @validatePassword="validatePassword"
            />
            <div
              class="invalid-feedback"
              v-if="
              !v$.request.confirmPassword.$invalid &&
              showPasswordError"
            >
              Password and Confirmation password does't match.
            </div>

            <p
              class="
                form-check form-check-solid form-check-inline
                fs-5
                text-muted text-center
                mt-6
              "
            >
              <input
                class="form-check-input"
                type="checkbox"
                v-model="v$.request.hasAgreed.$model"
              />
              I agree to the BillFin
              <a
                href="https://www.redi2.com/billfin/terms"
                target="_blank"
                class="fw-bolder"
              >
                Terms
              </a>
              and
              <a
                href="https://www.redi2.com/billfin/terms"
                target="_blank"
                class="fw-bolder"
              >
                Conditions
              </a> policy
            </p>
            <p
              class="invalid-feedback"
              v-if="v$.request.$dirty && !v$.request.hasAgreed.$model"
            >
              You must agree to terms and conditions to create an account.
            </p>

            <div class="text-center mt-6 mb-6">
              <button 
                type="submit" 
                class="btn btn-primary"
              >
                Create Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <information
      :status="response.status"
      :message="response.errorMessage"
      @closeInformationModel="showInfomationModel = false"
      v-if="showInfomationModel"
    />
  </div>
</template>
<script lang="ts">
import { Vue, Options, setup } from "vue-class-component";
import { Inject } from "vue-property-decorator";

import useVuelidate from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";

import TextInput from "@/components/controls/TextInput.vue";
import Information from "@/components/Models/Information.vue";

import {
  signUpRequest,
  signUpResponse,
  custodianResponseModel,
  validateEmailRequestModel,
  validateEmailResponseModel,
} from "@/model";

import { ISignUpService } from "@/service";

@Options({
  components: {
    TextInput,
    Information,
  },
  validations: {
    request: {
      firstName: { required },
      lastName: { required },
      companyName: { required },
      phoneNumber: {
        required,
        phone: (value: any) => {
          let validation = false;
          if (value && value != "" && /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/.test(value)) validation = true;
          else if(value && value != "" && /^[0-9]*\d$/.test(value)) validation = true;
          return validation;
        },
        minLength: minLength(10),
        phoneLength: (value: any) => {
          let validation = false;
          if(value && value != '' && value.length == 10 || value.length == 12) validation = true;
          return validation;
        },
      },
      aumRange: { required },
      custodians: { required },
      email: {
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
      password: {
        required,
        minLength: minLength(8),
        letter: (value: any) => {
          let validation = false;
          if (value && value != "") validation = /^(?=.*?[A-Za-z])/.test(value);
          return validation;
        },
        number: (value: any) => {
          let validation = false;
          if (value && value != "") validation = /[0-9]/.test(value);
          return validation;
        },
        special: (value: any) => {
          let validation = false;
          if (value && value != "") validation = /[!@#$%^&*()_+={};':"\\|,.<>]/.test(value);
          return validation;
        },
      },
      confirmPassword: {
        required,
      },
      hasAgreed: {
        required
      },
    },
  },
})
export default class SignUp extends Vue {
  @Inject("signUpService") service: ISignUpService | undefined;

  public request = new signUpRequest();
  public response = new signUpResponse();

  public validateEmailResponse = new validateEmailResponseModel();

  public showPassword: boolean = false;
  public showConfirmPassword: boolean = false;
  public showInfomationModel: boolean = false;
  public showPasswordError: boolean = false;

  public aum: Array<string> = [
    "Under $25M",
    "$26M - $50M",
    "$51M - $100M",
    "$101M - $250M",
    "$251M - $500M",
    "Above $500M",
  ];
  public custodian: Array<custodianResponseModel> = [];

  public v$ = setup(() => this.validate());

  validate() {
    return useVuelidate();
  }

  mounted() {
    this.getCustodian();
  }

  private getCustodian() {
    this.service?.getCustodian().then((response) => {
      this.custodian = response;
    });
  }

  public validateEmail() {
    const request = new validateEmailRequestModel();
    request.email = this.request.email;
    this.service
      ?.verifyEmail(request)
      .then((response) => {
        this.validateEmailResponse = response;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  public validatePassword() {
    if(this.request.password != this.request.confirmPassword) this.showPasswordError = true;
  }

  public signUp() {
    this.v$.$touch();
    if (
      !this.v$.$invalid &&
      this.request.password == this.request.confirmPassword &&
      this.request.hasAgreed &&
      !this.validateEmailResponse.userRegistered &&
      !this.validateEmailResponse.firmRegistered
    ) {
      this.service
        ?.createAccount(this.request)
        .then((response) => {
          this.response = response;
          if (response.status == "Failed") this.showInfomationModel = true;
          else if(response.status == "SUCCESS") {
            this.$router.push("/verification-email");
            localStorage.setItem("email", response.email);
            localStorage.setItem("uuid", response.uuid)
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
}
</script>