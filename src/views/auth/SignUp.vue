<template>
    <div class="row g-0">
    <div class="col-xl-8 col-lg-8 col-sm-6">
        <div class="mx-auto w-50 mt-20">
            <img src="@/assets/billfin.svg" alt="Logo" />
            <p class="fs-1 mt-2 fw-bolder">Thanks for your interest in BillFin</p>
            <p class="fs-5 w-75 pe-5 text-muted lh-base">Powerful billing and invoicing for the modern RIA and financial advisor, designed to be ridiculously simple to use.</p>
            <img src="@/assets/signup.png" class="w-75 mt-8" alt="Sign up image">
        </div>
    </div>
    <div class="col-xl-4 col-lg-4 col-sm-6">
        <div class="w-75 mt-20">
            <p class="fs-1 mt-2 fw-bolder mb-0 text-center">14 Days Fre Trial</p>
            <p class="fs-7 text-muted text-center">Have questions? <a href="#">Chat with sales</a></p>
            <form>

                <div class="row mt-10">
                    <div class="col-6">
                        <label for="firstname" class="form-label">Firstname</label>
                        <div class="input-group input-group-solid mb-3">
                            <input type="text" class="form-control text-start" id="firstname">
                        </div>
                    </div>
                    <div class="col-6">
                        <label for="lastname" class="form-label">Lastname</label>
                        <div class="input-group input-group-solid mb-3">
                            <input type="text" class="form-control text-start" id="lastname">
                        </div>
                    </div>
                </div>

                <label for="company" class="form-label">Company</label>
                <div class="input-group input-group-solid mb-3">
                    <input type="text" class="form-control text-start" id="company">
                </div>

                <div class="row">
                    <div class="col-6">
                        <label for="phoneNo" class="form-label">Phone number</label>
                        <div class="input-group input-group-solid mb-3">
                            <input type="text" class="form-control text-start" id="phoneNo">
                        </div>
                    </div>
                    <div class="col-6">
                        <label for="aum" class="form-label">AUM</label>
                        <select class="form-select form-select-solid" aria-label="Default select example">
                            <option selected>$</option>
                            <option value="1">One</option>
                        </select>                        
                    </div>
                </div>

                <label for="company" class="form-label mb-3">Where do you custody? <span class="text-muted">Check all that apply</span></label>
                <div class="d-flex justify-content-between align-items-center flex-wrap">
                    <div class="form-check form-check-solid form-check-inline mb-3 me-0 flex-fill">
                        <input class="form-check-input" type="checkbox" id="Fidelity" value="Fidelity">
                        <label class="fs-7 form-check-label" for="Fidelity">Fidelity</label>
                    </div>
                    <div class="form-check form-check-solid form-check-inline mb-3 me-0 flex-fill">
                        <input class="form-check-input" type="checkbox" id="LPL" value="LPL">
                        <label class="fs-7 form-check-label" for="LPL">LPL</label>
                    </div>
                    <div class="form-check form-check-solid form-check-inline mb-3 me-0 flex-fill">
                        <input class="form-check-input" type="checkbox" id="Schwab/TD" value="Schwab/TD">
                        <label class="fs-7 form-check-label" for="Schwab/TD">Schwab/TD</label>
                    </div>
                    <div class="form-check form-check-solid form-check-inline mb-3 me-0 flex-fill">
                        <input class="form-check-input" type="checkbox" id="Folio/Goldman" value="Folio/Goldman">
                        <label class="fs-7 form-check-label" for="Folio/Goldman">Folio/Goldman</label>
                    </div>
                    <div class="form-check form-check-solid form-check-inline mb-3 me-0 flex-fill">
                        <input class="form-check-input" type="checkbox" id="Pershing" value="Pershing">
                        <label class="fs-7 form-check-label" for="Pershing">Pershing</label>
                    </div>
                    <div class="form-check form-check-solid form-check-inline mb-3 me-0 flex-fill">
                        <input class="form-check-input" type="checkbox" id="SSG" value="SSG">
                        <label class="fs-7 form-check-label" for="SSG">SSG</label>
                    </div>
                    <div class="form-check form-check-solid form-check-inline mb-3 me-0 flex-fill">
                        <input class="form-check-input" type="checkbox" id="Interactive Brokers" value="Interactive Brokers">
                        <label class="fs-7 form-check-label" for="Interactive Brokers">Interactive Brokers</label>
                    </div>
                    <div class="form-check form-check-solid form-check-inline mb-3 me-0 flex-fill">
                        <input class="form-check-input" type="checkbox" id="Raymond James" value="Raymond James">
                        <label class="fs-7 form-check-label" for="Raymond James">Raymond James</label>
                    </div>
                    <div class="form-check form-check-solid form-check-inline mb-3 me-0 flex-fill">
                        <input class="form-check-input" type="checkbox" id="Other" value="Other">
                        <label class="fs-7 form-check-label" for="Other">Other</label>
                    </div>
                </div>

                <label for="company" class="form-label">Work email</label>
                <div class="input-group input-group-solid mb-3">
                    <input type="text" class="form-control text-start" id="work-email">
                </div>

                <label for="company" class="form-label">Password</label>
                <div class="input-group input-group-solid mb-3">
                    <input type="password" class="form-control text-start" id="password">
                    <span class="input-group-text">
                        <i class="fa fa-eye-slash"></i>
                    </span>
                </div>

                <label for="company" class="form-label">Confirm password</label>
                <div class="input-group input-group-solid mb-3">
                    <input type="password" class="form-control text-start" id="confirm-password">
                </div>

                <p class="fs-5 text-muted text-center mt-10">I Agree to the BillFin <a href="#">Terms & Conditions</a></p>

                <div class="text-center mt-10 mb-10">
                    <button type="button" class="btn btn-primary">Create Account</button>
                </div>

            </form>
        </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue } from 'vue-class-component';

export default class SignUp extends Vue {

}
</script>