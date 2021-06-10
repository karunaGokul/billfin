<template>
    <div class="signup-container">
        <div class="row g-0">
            <div class="col-xl-7 col-lg-7 col-sm-6">
                <div class="mx-auto w-75 mt-20">
                    <img src="@/assets/billfin.svg" alt="Logo" />
                    <p class="fs-1 mt-2 fw-bolder">Thanks for your interest in BillFin</p>
                    <p class="fs-5 w-75 text-muted lh-base" style="padding-right: 10.5rem">Powerful billing and invoicing for the modern RIA and financial advisor, designed to be ridiculously simple to use.</p>
                    <img src="@/assets/signup.png" class="w-75 mt-8" alt="Sign up image">
                </div>
            </div>
            <div class="col-xl-5 col-lg-5 col-sm-6">
                <div class="card mt-20" style="max-width: 450px;">
                    <p class="fs-1 mt-2 fw-bolder mb-0 text-center">14 Days Free Trial</p>
                    <p class="fs-7 text-muted text-center">Have questions? <a href="#" class="fw-bolder">Chat with sales</a></p>
                    <form @submit.prevent="signUp">

                        <div class="row mt-10 mb-2">
                            <div class="col-6">
                                <label 
                                    for="firstname" 
                                    class="form-label fw-bolder"
                                >
                                    First Name
                                </label>
                                <div class="input-group input-group-solid">
                                    <input 
                                        type="text" 
                                        class="form-control text-start" 
                                        id="firstname" 
                                        v-model="v$.request.firstName.$model"
                                    />
                                </div>
                                <div 
                                    class="invalid-feedback" 
                                    v-if="v$.request.firstName.$dirty && v$.request.firstName.$invalid"
                                >
                                    First name is required
                                </div>
                            </div>
                            <div class="col-6">
                                <label 
                                    for="lastname" 
                                    class="form-label fw-bolder"
                                >
                                    Lastname
                                </label>
                                <div class="input-group input-group-solid">
                                    <input 
                                        type="text" 
                                        class="form-control text-start" 
                                        id="lastname" 
                                        v-model="request.lastName"
                                    />
                                </div>
                                <div 
                                    class="invalid-feedback" 
                                    v-if="v$.request.lastName.$dirty && v$.request.lastName.$invalid"
                                >
                                    Last name is required
                                </div>
                            </div>
                        </div>

                        <label 
                            for="company" 
                            class="form-label fw-bolder mt-4"
                        >
                            Company
                        </label>
                        <div class="input-group input-group-solid mb-2">
                            <input 
                                type="text" 
                                class="form-control text-start" 
                                id="company" 
                                v-model="v$.request.companyName.$model"
                            >
                        </div>
                        <div 
                            class="invalid-feedback" 
                            v-if="v$.request.companyName.$dirty && v$.request.companyName.$invalid"
                        >
                            Company is required
                        </div>

                        <div class="row mt-6 mb-2">
                            <div class="col-6">
                                <label 
                                    for="phoneNo" 
                                    class="form-label fw-bolder"
                                >
                                    Phone number
                                </label>
                                <div class="input-group input-group-solid">
                                    <input 
                                        type="text" 
                                        class="form-control text-start" 
                                        id="phoneNo" 
                                        v-model="v$.request.phoneNumber.$model" 
                                        maxlength="10"
                                    >
                                </div>
                                <div 
                                    class="invalid-feedback" 
                                    v-if="v$.request.phoneNumber.$dirty && v$.request.phoneNumber.$invalid"
                                >
                                    Phone number is required
                                </div>
                            </div>
                            <div class="col-6">
                                <label 
                                    for="aum" 
                                    class="form-label fw-bolder"
                                >
                                    AUM
                                </label>
                                <select 
                                    class="form-select form-select-solid" 
                                    v-model="v$.request.aumRange.$model"
                                >
                                    <option selected value="">$</option>
                                    <option 
                                        v-for="(item, i) in aum" 
                                        :key="i" 
                                        :value="item"
                                    >
                                        {{item}}
                                    </option>
                                </select>                        
                                <div 
                                    class="invalid-feedback" 
                                    v-if="v$.request.aumRange.$dirty && v$.request.aumRange.$invalid"
                                >
                                    AUM is required
                                </div>
                            </div>
                        </div>

                        <label 
                            for="company" 
                            class="form-label fw-bolder mt-4 mb-4"
                        >
                            Where do you custody? 
                            <span class="text-muted">Check all that apply</span>
                        </label>
                        <div class="d-flex justify-content-between align-items-center flex-wrap">
                            <div 
                                class="form-check form-check-solid form-check-inline mb-3 me-0 flex-fill-basic"
                                v-for="(item, i) in custodian"
                                :key="i"
                            >
                                <input 
                                    class="form-check-input" 
                                    type="checkbox" 
                                    :value="item" 
                                    @change="updateCustodian(item.custodianId)"
                                >
                                <label 
                                    class="fs-7 form-check-label" 
                                    v-bind:for="item"
                                >
                                    {{item.custodianName}}
                                </label>
                            </div>
                        </div>
                        <div class="invalid-feedback" v-if="v$.request.$dirty && request.custodians.length == 0">Custodian selection is required</div>

                        <label 
                            for="company" 
                            class="form-label fw-bolder mt-4"
                        >
                            Work email
                        </label>
                        <div class="input-group input-group-solid mb-2">
                            <input 
                                type="text" 
                                class="form-control text-start" 
                                id="work-email" 
                                v-model="v$.request.email.$model" 
                                @blur="!v$.request.email.$invalid ? verifyEmailExists() : ''"
                            />
                        </div>
                        <div 
                            class="invalid-feedback" 
                            v-if="v$.request.email.$dirty && 
                                v$.request.email.required.$invalid"
                        >
                            Email is required
                        </div>
                        <div 
                            class="invalid-feedback" 
                            v-if="v$.request.email.$dirty && 
                                !v$.request.email.required.$invalid && 
                                v$.request.email.email.$invalid"
                        >
                            Please enter a valid email address
                        </div>
                        <div 
                            class="invalid-feedback" 
                            v-if="v$.request.email.$dirty && 
                                !v$.request.email.required.$invalid && 
                                !v$.request.email.email.$invalid && 
                                v$.request.email.gmail.$invalid"
                        >
                            Please enter your business email. Don't have one? 
                            <a 
                                href="#" 
                                class="border-bottom border-primary"
                            >
                                Contact us
                            </a>
                        </div>

                        <div 
                            class="invalid-feedback" 
                            v-if="emailVerification.userRegistered"
                        >
                            An account with this email address already exists
                            <a 
                                href="#" 
                                class="border-bottom border-primary"
                            > 
                                Contact us
                            </a>
                        </div>

                        <label 
                            for="Password" 
                            class="form-label fw-bolder mt-4"
                        >
                            Password
                        </label>
                        <div class="input-group input-group-solid mb-2">
                            <input 
                                :type="showPassword ? 'text' : 'password'" 
                                class="form-control text-start" 
                                id="password" 
                                v-model="v$.request.password.$model"
                            >
                            <span class="input-group-text">
                                <i 
                                    class="fa"
                                    :class="{
                                        'fa-eye': showPassword,
                                        'fa-eye-slash': !showPassword
                                    }" 
                                    style="cursor: pointer"
                                    @click="showPassword = !showPassword"
                                >
                                </i>
                            </span>
                        </div>
                        <div class="d-flex mt-2 mb-2">
                            <div 
                                class="card bg-secondary w-25 h-25 p-1 me-4"
                                :class="{
                                    'bg-success': v$.request.password.$dirty && 
                                        !v$.request.password.required.$invalid
                                }"
                            >
                            </div>
                            <div 
                                class="card bg-secondary w-25 h-25 p-1 me-4"
                                :class="{
                                    'bg-success': v$.request.password.$dirty && 
                                        !v$.request.password.uppercase.$invalid &&
                                        !v$.request.password.lowercase.$invalid &&
                                        !v$.request.password.number.$invalid
                                    }"
                            >
                            </div>
                            <div class="card bg-secondary w-25 h-25 p-1 me-4"></div>
                            <div class="card bg-secondary w-25 h-25 p-1"></div>
                        </div>
                        <p class="fs-8 text-muted">Use 8 or more characters with a mix of letters, numbers & symbols.</p>

                        <label for="company" class="form-label fw-bolder mt-4">Confirm password</label>
                        <div class="input-group input-group-solid mb-2">
                            <input 
                                :type="showConfirmPassword ? 'text' : 'password'" 
                                class="form-control text-start" 
                                id="confirm-password" 
                                v-model="v$.request.confirmPassword.$model"
                            >
                            <span class="input-group-text">
                                <i 
                                    class="fa"
                                    :class="{
                                        'fa-eye': showConfirmPassword,
                                        'fa-eye-slash': !showConfirmPassword
                                    }" 
                                    style="cursor: pointer"
                                    @click="showConfirmPassword = !showConfirmPassword"
                                >
                                </i>
                            </span>
                        </div>
                        <div 
                            class="invalid-feedback" 
                            v-if="v$.request.confirmPassword.$dirty && 
                                v$.request.password.$model != v$.request.confirmPassword.$model"
                        >
                            Password and Confirmation password does't match.
                        </div>

                        <p class="form-check form-check-solid form-check-inline fs-5 text-muted text-center mt-6">
                            <input 
                                class="form-check-input" 
                                type="checkbox" 
                                v-model="v$.request.hasAgreed.$model"
                            >
                            I Agree to the BillFin 
                            <a 
                                href="https://www.redi2.com/billfin/terms" 
                                target="_blank" 
                                class="fw-bolder"
                            >
                                Terms & Conditions
                            </a>
                        </p>

                        <p 
                            class="invalid-feedback" 
                            v-if="v$.request.$dirty && 
                                v$.request.hasAgreed.$invalid"
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
            @closeInformationModel="showInfomationModel = false;"
            v-if="showInfomationModel"
        />
    </div>
</template>
<script lang="ts">
import { Vue, Options, setup } from 'vue-class-component';
import { Inject } from 'vue-property-decorator';

import useVuelidate from '@vuelidate/core';
import { 
    required, 
    numeric,
    minLength,
    maxLength 
} from '@vuelidate/validators';

import Information from '@/components/Models/Information.vue';

import { signUpRequest, signUpResponse, custodianResponseModel, emailVerificationResponseModel, emailVerificationRequestModel } from "@/model";
import { ISignUpService } from "@/service";

@Options({
    components: {
        Information
    },
    validations: {
        request: {
            firstName: { required },
            lastName: { required },
            companyName:  { required },
            phoneNumber:  { 
                required,
                numeric,
                minLength: minLength(10),
                maxLength: maxLength(10),
            },
            aumRange: { required },
            email: { 
                required,
                email: (value: string) => {
                    const validation = value.indexOf("@") != -1 && value.lastIndexOf(".com") != -1;
                    return validation;
                },
                gmail: (value: string) => {
                    const validation = value.indexOf("gmail") == -1 && 
                        value.indexOf("yahoo") == -1 && 
                        value.indexOf("hotmail") == -1 && 
                        value.indexOf("aol") == -1 && 
                        value.indexOf("outlook") == -1 && 
                        value.indexOf("protonmail") == -1 &&
                        value.indexOf("icloud") == -1;
                    return validation;
                }
            },
            password: { 
                required,
                minLength: (value: any) => {
                    let validation = false;
                    if(value && value != '' && value.length >= 8 )  validation = true;
                    return validation;
                },
                uppercase: (value: any) => {
                    let validation = false;
                    if(value && value != '')  validation = /^(?=.*?[A-Z])/.test(value);
                    return validation;
                },
                lowercase: (value: any) => {
                    let validation = false;
                    if(value && value != '')  validation = /^(?=.*?[a-z])/.test(value);
                    return validation;
                },
                number: (value: any) => {
                    let validation = false;
                    if(value && value != '')  validation = /[0-9]/.test(value);
                    return validation;
                },
                special: (value: any) => {
                    let validation = false;
                    if(value && value != '')  validation = /[#?!@$%^&*-]/.test(value);
                    return validation;
                }
            },
            confirmPassword: { 
                required
            },
            hasAgreed: {
                required
            }
        }
    }
})
export default class SignUp extends Vue {
    @Inject("signUpService") service: ISignUpService | undefined;

    public request = new signUpRequest();
    public response = new signUpResponse();

    public emailVerification = new emailVerificationResponseModel();

    public showPassword:boolean = false;
    public showConfirmPassword:boolean = false;
    public showInfomationModel:boolean = false;

    public aum: Array<string> = ['Under $25M', '$26M - $50M', '$51M - $100M', '$101M to $250M', '$251M to $500M', 'Above $500M'];
    public custodian: Array<custodianResponseModel> = [];

    public v$ = setup(() => this.validate());

    validate() { return useVuelidate(); }

    mounted() {
        this.getCustodian();
    }

    private getCustodian() {
        this.service?.getCustodian().then((response) => { this.custodian = response; })
    }

    public updateCustodian(value: number) {
        if (this.request.custodians.includes(value)) this.request.custodians.splice(this.request.custodians.indexOf(value), 1);
        else  this.request.custodians.push(value);
    }

    public verifyEmailExists() {
        const request = new emailVerificationRequestModel();
        request.email = this.request.email;
        this.service?.verifyEmail(request)
        .then((response) => {
            this.emailVerification = response;
        }).catch((err) => {
            console.log(err);
        })
    }
    
    public signUp() {
        this.v$.$touch();
        console.log(this.request);
        if (
            !this.v$.$invalid &&
            this.request.custodians.length > 0 &&
            this.request.password == this.request.confirmPassword &&
            this.request.hasAgreed &&
            !this.emailVerification.userRegistered
        ) {
            this.service?.createAccount(this.request)
            .then((response) => {
                this.response = response;
                this.showInfomationModel = true;
            }).catch((err) => {
                console.log(err);
            })
        }
    }

}
</script>