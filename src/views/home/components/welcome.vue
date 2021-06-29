<template>
    <div class="modal fade show d-block vh-100">
        <div class="modal-dialog modal-dialog-centered modal-xl">
            <div class="modal-content">
                <div class="modal-header justify-content-start p-5">
                    <h5 class="modal-title">Welcome to BillFin</h5>
                    <h6 class="text-muted ms-10">Let's you get onboarded quickly and easily!</h6>
                </div>
                <div class="modal-body mx-auto" style="width: 85%">
                    <div class="tab-group">
                        <div class="tab-header">
                            <ul class="tab-label-group">
                                <li class="tab-label" :class="{'tab-active': activeTab == 1}"  @click="activeTab = 1">General</li>
                                <li class="tab-label" :class="{'tab-active': activeTab == 2}"  @click="activeTab = 2">Frequecy & Timing</li>
                                <li class="tab-label" :class="{'tab-active': activeTab == 3}"  @click="activeTab = 3">Methodologies</li>
                                <li class="tab-label" :class="{'tab-active': activeTab == 4}"  @click="activeTab = 4">Adjustments</li>
                                <li class="tab-label" :class="{'tab-active': activeTab == 5}"  @click="activeTab = 5">Review & Confirm</li>
                            </ul>
                        </div>
                        <div class="tab-content-group">
                            <div class="tab-content" v-if="activeTab == 1">
                                <div class="w-75 mx-auto mt-10">
                                    <p class="fs-3 fw-bolder mt-5 pb-3 mb-5 border-bottom">
                                        General Information
                                        <i class="fa fa-question-circle fs-3 text-dark float-end"></i>
                                    </p>
                                    <TextInputInline 
                                        label="Company"
                                    />
                                    <TextInputInline 
                                        label="Company Phone"
                                    />
                                    <TextInputInline 
                                        label="Company Site"
                                    />  
                                    <TextInputInline 
                                        label="Company Address"
                                    />
                                    <TextInputInline 
                                        label="City"
                                    />
                                    <SelectBoxInline 
                                        label="State"
                                        value="Massachusetts"
                                        :data="states"
                                    />
                                    <TextInputInline 
                                        label="Postal Code"
                                    />
                                    <div class="mb-5 row align-items-center">
                                        <label :for="label" class="col-sm-4 col-form-label fw-bolder">Which fees do you bill?</label>
                                        <div class="col-sm-8">
                                            <div class="form-check form-check-solid form-check-inline fs-7">
                                                <input 
                                                    class="form-check-input" 
                                                    type="checkbox" 
                                                />
                                                AUM Advisory
                                            </div>
                                            <div class="form-check form-check-solid form-check-inline fs-7">
                                                <input 
                                                    class="form-check-input" 
                                                    type="checkbox" 
                                                />
                                                One Time
                                            </div>
                                            <div class="form-check form-check-solid form-check-inline fs-7">
                                                <input 
                                                    class="form-check-input" 
                                                    type="checkbox" 
                                                />
                                                Subscription
                                            </div>
                                        </div>
                                    </div>
                                    <div class="d-flex align-items-center justify-content-end pb-5 border-bottom">
                                        <button type="button" class="btn btn-primary" @click="activeTab = 2">Continue</button>
                                    </div>
                                </div>
                            </div>
                            <div class="tab-content" v-if="activeTab == 2">
                                <div class="tab-group mt-10">
                                    <div class="tab-header position-relative">
                                        <div class="tab-header__title position-absolute fw-bolder fs-4">Frequecy & Timing</div>
                                        <ul class="tab-label-group justify-content-center border-bottom">
                                            <li class="tab-label pb-4" :class="{'tab-active-border-bottom': frequencyTab == 1}"  @click="frequencyTab = 1">AUM Advisory</li>
                                            <li class="tab-label pb-4" :class="{'tab-active-border-bottom': frequencyTab == 2}"  @click="frequencyTab = 2">Subscription</li>
                                        </ul>
                                    </div>
                                    <div class="tab-content-group m-0">
                                        <div class="tab-content mt-10" v-if="frequencyTab == 1">
                                            <div class="row g-0 mt-10">
                                                <div class="col-5">
                                                    <p class="fs-7 mb-0 fw-bolder">How frequently do you bill your AUM advisory fees?</p>
                                                    <p class="mt-0 mb-0 text-muted">Check all that apply</p>
                                                </div>
                                                <div class="col-6">
                                                    <div class="form-check form-check-solid form-check-inline fs-7">
                                                        <input 
                                                            class="form-check-input" 
                                                            type="checkbox" 
                                                        />
                                                        Monthly
                                                    </div>
                                                    <div class="form-check form-check-solid form-check-inline fs-7">
                                                        <input 
                                                            class="form-check-input" 
                                                            type="checkbox" 
                                                        />
                                                        Quarterly
                                                    </div>
                                                    <div class="form-check form-check-solid form-check-inline fs-7">
                                                        <input 
                                                            class="form-check-input" 
                                                            type="checkbox" 
                                                        />
                                                        Semi-Annually
                                                    </div>
                                                    <div class="form-check form-check-solid form-check-inline fs-7">
                                                        <input 
                                                            class="form-check-input" 
                                                            type="checkbox" 
                                                        />
                                                        Annually
                                                    </div>
                                                </div>
                                                <div class="col-1">
                                                    <i class="fa fa-question-circle fs-3 text-dark"></i>
                                                </div>
                                            </div>
                                            <div class="row g-0 mt-10">
                                                <div class="col-6">
                                                    <p class="fs-7 mb-0 fw-bolder">What billing frequency do you want to default for new accounts?</p>
                                                </div>
                                                <div class="col-5">
                                                    <div class="form-check form-check-solid form-check-inline fs-7">
                                                        <input 
                                                            class="form-check-input" 
                                                            type="checkbox" 
                                                        />
                                                        Quarterly
                                                    </div>
                                                    <div class="form-check form-check-solid form-check-inline fs-7">
                                                        <input 
                                                            class="form-check-input" 
                                                            type="checkbox" 
                                                        />
                                                        Annually
                                                    </div>
                                                    <div class="form-check form-check-solid form-check-inline fs-7">
                                                        <input 
                                                            class="form-check-input" 
                                                            type="checkbox" 
                                                        />
                                                        Don't default
                                                    </div>
                                                </div>
                                                <div class="col-1">
                                                    <i class="fa fa-question-circle fs-3 text-dark"></i>
                                                </div>
                                            </div>
                                            <div class="row g-0 mt-10">
                                                <div class="col-6">
                                                    <p class="fs-7 mb-0 fw-bolder">Do you bill your AUM advisory fees in advance or in arrears?</p>
                                                    <p class="mt-0 mb-0 text-muted">Check all that apply</p>
                                                </div>
                                                <div class="col-5">
                                                    <div class="form-check form-check-solid form-check-inline fs-7">
                                                        <input 
                                                            class="form-check-input" 
                                                            type="checkbox" 
                                                        />
                                                        Advance
                                                    </div>
                                                    <div class="form-check form-check-solid form-check-inline fs-7">
                                                        <input 
                                                            class="form-check-input" 
                                                            type="checkbox" 
                                                        />
                                                        Arrears
                                                    </div>
                                                </div>
                                                <div class="col-1">
                                                    <i class="fa fa-question-circle fs-3 text-dark"></i>
                                                </div>
                                            </div>
                                            <div class="row g-0 mt-10">
                                                <div class="col-6">
                                                    <p class="fs-7 mb-0 fw-bolder">What billing timing do you want to default for new accounts?</p>
                                                </div>
                                                <div class="col-5">
                                                    <div class="form-check form-check-solid form-check-inline fs-7">
                                                        <input 
                                                            class="form-check-input" 
                                                            type="checkbox" 
                                                        />
                                                        Advance
                                                    </div>
                                                    <div class="form-check form-check-solid form-check-inline fs-7">
                                                        <input 
                                                            class="form-check-input" 
                                                            type="checkbox" 
                                                        />
                                                        Arrears
                                                    </div>
                                                    <div class="form-check form-check-solid form-check-inline fs-7">
                                                        <input 
                                                            class="form-check-input" 
                                                            type="checkbox" 
                                                        />
                                                        Don't default
                                                    </div>
                                                </div>
                                                <div class="col-1">
                                                    <i class="fa fa-question-circle fs-3 text-dark"></i>
                                                </div>
                                            </div>
                                            <div class="row g-0 mt-10">
                                                <div class="col-7">
                                                    <p class="fs-7 mb-0 fw-bolder">Do you bill some or all of your quarterly clients during off-cycle months?</p>
                                                    <p class="fs-8 mt-0 mb-0 text-muted">Off-cycle months are considered Feb, Mar, May, Jun, Aug, Sep, Nov, and Decy</p>
                                                </div>
                                                <div class="col-4">
                                                    <div class="form-check form-switch">
                                                        <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked>
                                                        <label class="fs-8 text-muted form-check-label" for="flexSwitchCheckChecked">Yes, I bill quarterly on off-cycle months</label>
                                                    </div>
                                                </div>
                                                <div class="col-1">
                                                    <i class="fa fa-question-circle fs-3 text-dark"></i>
                                                </div>
                                            </div>
                                            <div class="row g-0 mt-10">
                                                <div class="col-3">
                                                    <p class="fs-8 mb-0 fw-bolder">What’s your default quarterly cycle?</p>
                                                </div>
                                                <div class="col-8">
                                                    <div class="form-check form-check-solid form-check-inline fs-7">
                                                        <input 
                                                            class="form-check-input" 
                                                            type="checkbox" 
                                                        />
                                                        Jan-Apr-jul-Oct
                                                    </div>
                                                    <div class="form-check form-check-solid form-check-inline fs-7">
                                                        <input 
                                                            class="form-check-input" 
                                                            type="checkbox" 
                                                        />
                                                        Feb-May-Aug-Nov
                                                    </div>
                                                    <div class="form-check form-check-solid form-check-inline fs-7">
                                                        <input 
                                                            class="form-check-input" 
                                                            type="checkbox" 
                                                        />
                                                        Mar-Jun-Seb-Dec
                                                    </div>
                                                    <div class="form-check form-check-solid form-check-inline fs-7">
                                                        <input 
                                                            class="form-check-input" 
                                                            type="checkbox" 
                                                        />
                                                        Don't default
                                                    </div>
                                                </div>
                                                <div class="col-1">
                                                    <i class="fa fa-question-circle fs-3 text-dark"></i>
                                                </div>
                                            </div>

                                            <div class="d-flex justify-content-between mt-10">
                                                <button class="btn btn-secondary" @click="activeTab = 1">Back</button>
                                                <button class="btn btn-primary me-10" @click="activeTab = 3">Continue</button>
                                            </div>
                                        </div>
                                        <div class="tab-content" v-if="frequencyTab == 2">
                                            {{frequencyTab}}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="tab-content" v-if="activeTab == 3">
                                <div class="tab-group mt-10">
                                    <div class="tab-header position-relative">
                                        <div class="tab-header__title position-absolute fw-bolder fs-4">Methodologies</div>
                                        <ul class="tab-label-group justify-content-center border-bottom">
                                            <li class="tab-label pb-4" :class="{'tab-active-border-bottom': methodologiesTab == 1}"  @click="methodologiesTab = 1">AUM Advisory</li>
                                            <li class="tab-label pb-4" :class="{'tab-active-border-bottom': methodologiesTab == 2}"  @click="methodologiesTab = 2">Subscription</li>
                                        </ul>
                                    </div>
                                    <div class="tab-content-group m-0">
                                        <div class="tab-content mt-10" v-if="methodologiesTab == 1">
                                            <div class="row g-0 mt-10">
                                                <div class="col-6">
                                                    <p class="fs-7 mb-0 fw-bolder">What valuation methodologies do you use for AUM advisory billing?</p>
                                                    <p class="mt-0 mb-0 text-muted">Check all that apply</p>
                                                </div>
                                                <div class="col-5">
                                                    <div class="form-check form-check-solid form-check-inline fs-7">
                                                        <input 
                                                            class="form-check-input" 
                                                            type="checkbox" 
                                                        />
                                                        Period End
                                                    </div>
                                                    <div class="form-check form-check-solid form-check-inline fs-7">
                                                        <input 
                                                            class="form-check-input" 
                                                            type="checkbox" 
                                                        />
                                                        Average Daily Balance
                                                    </div>
                                                </div>
                                                <div class="col-1">
                                                    <i class="fa fa-question-circle fs-3 text-dark"></i>
                                                </div>
                                            </div>
                                            <div class="row g-0 mt-10">
                                                <div class="col-5">
                                                    <p class="fs-7 mb-0 fw-bolder">What’s your default valuation methodology?</p>
                                                </div>
                                                <div class="col-6">
                                                    <div class="form-check form-check-solid form-check-inline fs-7">
                                                        <input 
                                                            class="form-check-input" 
                                                            type="checkbox" 
                                                        />
                                                        Period End
                                                    </div>
                                                    <div class="form-check form-check-solid form-check-inline fs-7">
                                                        <input 
                                                            class="form-check-input" 
                                                            type="checkbox" 
                                                        />
                                                        Average Daily Balance
                                                    </div>
                                                    <div class="form-check form-check-solid form-check-inline fs-7">
                                                        <input 
                                                            class="form-check-input" 
                                                            type="checkbox" 
                                                        />
                                                        Don't default
                                                    </div>
                                                </div>
                                                <div class="col-1">
                                                    <i class="fa fa-question-circle fs-3 text-dark"></i>
                                                </div>
                                            </div>
                                            <div class="row g-0 mt-10">
                                                <div class="col-6">
                                                    <p class="fs-7 mb-0 fw-bolder">What valuation date do you use for initial billing of advance fees?</p>
                                                </div>
                                                <div class="col-5">
                                                    <div class="form-check form-check-solid form-check-inline fs-7">
                                                        <input 
                                                            class="form-check-input" 
                                                            type="checkbox" 
                                                        />
                                                        Period End
                                                    </div>
                                                    <div class="form-check form-check-solid form-check-inline fs-7">
                                                        <input 
                                                            class="form-check-input" 
                                                            type="checkbox" 
                                                        />
                                                        Billing Start Date
                                                    </div>
                                                </div>
                                                <div class="col-1">
                                                    <i class="fa fa-question-circle fs-3 text-dark"></i>
                                                </div>
                                            </div>
                                            <div class="row g-0 mt-10">
                                                <div class="col-11">
                                                    <p class="fs-7 mb-0 fw-bolder">How do you prorate your annualized rates for the billing period?</p>
                                                </div>
                                                <div class="col-1">
                                                    <i class="fa fa-question-circle fs-3 text-dark"></i>
                                                </div>
                                            </div>
                                            <div class="mt-5 ms-5">
                                                <div class="form-check form-check-solid form-check-inline fs-7">
                                                    <input 
                                                        class="form-check-input" 
                                                        type="checkbox" 
                                                    />
                                                    Actual days in period over actual days in year
                                                </div>
                                                <div class="form-check form-check-solid form-check-inline fs-7">
                                                    <input 
                                                        class="form-check-input" 
                                                        type="checkbox" 
                                                    />
                                                    Divide by the number of billing periods in the year
                                                </div>
                                            </div>
                                            <div class="row g-0 mt-10">
                                                <div class="col-6">
                                                    <p class="fs-7 mb-0 fw-bolder">How would you like to express your billing rates?</p>
                                                </div>
                                                <div class="col-5">
                                                    <div class="form-check form-check-solid form-check-inline fs-7">
                                                        <input 
                                                            class="form-check-input" 
                                                            type="checkbox" 
                                                        />
                                                        Percentages
                                                    </div>
                                                    <div class="form-check form-check-solid form-check-inline fs-7">
                                                        <input 
                                                            class="form-check-input" 
                                                            type="checkbox" 
                                                        />
                                                        Basic points
                                                    </div>
                                                </div>
                                                <div class="col-1">
                                                    <i class="fa fa-question-circle fs-3 text-dark"></i>
                                                </div>
                                            </div>

                                            <div class="d-flex justify-content-between mt-10">
                                                <button class="btn btn-secondary" @click="activeTab = 2">Back</button>
                                                <button class="btn btn-primary me-10" @click="activeTab = 4">Continue</button>
                                            </div>
                                        </div>
                                        <div class="tab-content" v-if="methodologiesTab == 2">
                                            {{methodologiesTab}}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="tab-content" v-if="activeTab == 4">
                                <div class="tab-group mt-10">
                                    <div class="tab-header position-relative">
                                        <div class="tab-header__title position-absolute fw-bolder fs-4">Adjustments</div>
                                        <ul class="tab-label-group justify-content-center border-bottom">
                                            <li class="tab-label pb-4" :class="{'tab-active-border-bottom': adjustmentsTab == 1}"  @click="adjustmentsTab = 1">AUM Advisory</li>
                                            <li class="tab-label pb-4" :class="{'tab-active-border-bottom': adjustmentsTab == 2}"  @click="adjustmentsTab = 2">Subscription</li>
                                        </ul>
                                    </div>
                                    <div class="tab-content-group m-0">
                                        <div class="tab-content mt-10" v-if="adjustmentsTab == 1">
                                            <div class="row g-0 mt-10">
                                                <div class="col-5">
                                                    <p class="fs-7 mb-0 fw-bolder">Do you charge a firm-wide standard minimum fee?</p>
                                                </div>
                                                <div class="col-6">
                                                    <div class="form-check form-switch">
                                                        <input class="form-check-input" type="checkbox">
                                                        <label class="fs-7 text-muted form-check-label">No firm-wide minimum fees</label>
                                                    </div>
                                                </div>                
                                                <div class="col-1">
                                                    <i class="fa fa-question-circle fs-3 text-dark"></i>
                                                </div>
                                            </div>
                                            <div class="row g-0 mt-10">
                                                <div class="col-5">
                                                    <p class="fs-7 mb-0 fw-bolder">Do you limit fees to a firm-wide maximum fee?</p>
                                                </div>
                                                <div class="col-6">
                                                    <div class="form-check form-switch">
                                                        <input class="form-check-input" type="checkbox">
                                                        <label class="fs-7 text-muted form-check-label">No firm-wide minimum fees</label>
                                                    </div>
                                                </div>                
                                                <div class="col-1">
                                                    <i class="fa fa-question-circle fs-3 text-dark"></i>
                                                </div>
                                            </div>
                                            <div class="row g-0 mt-10">
                                                <div class="col-5">
                                                    <p class="fs-7 mb-0 fw-bolder">Do you adjust billing for deposits and withdrawls?</p>
                                                </div>
                                                <div class="col-6">
                                                    <div class="form-check form-switch">
                                                        <input class="form-check-input" type="checkbox" checked>
                                                        <label class="fs-7 text-muted form-check-label">Yes, billing is adjusted for flows</label>
                                                    </div>
                                                </div>                
                                                <div class="col-1">
                                                    <i class="fa fa-question-circle fs-3 text-dark"></i>
                                                </div>
                                            </div>
                                            <div class="row g-0 mt-10">
                                                <div class="col-5">
                                                    <p class="fs-7 mb-0 fw-bolder">Indicate whether you apply a threshold to flows.</p>
                                                </div>
                                                <div class="col-6">
                                                    <div class="form-check form-check-solid form-check-inline fs-7">
                                                        <input 
                                                            class="form-check-input" 
                                                            type="checkbox" 
                                                        />
                                                        Dollar amount
                                                    </div>
                                                    <div class="form-check form-check-solid form-check-inline fs-7">
                                                        <input 
                                                            class="form-check-input" 
                                                            type="checkbox" 
                                                        />
                                                        % of AUM
                                                    </div>
                                                    <div class="form-check form-check-solid form-check-inline fs-7">
                                                        <input 
                                                            class="form-check-input" 
                                                            type="checkbox" 
                                                        />
                                                        None
                                                    </div>
                                                </div>                
                                                <div class="col-1">
                                                    <i class="fa fa-question-circle fs-3 text-dark"></i>
                                                </div>
                                            </div>
                                            <div class="row g-0 mt-10">
                                                <div class="col-5">
                                                    <p class="fs-7 mb-0 fw-bolder">Please enter the dollar amount of your threshold.</p>
                                                </div>
                                                <div class="col-6">
                                                    <div class="input-group input-group-solid w-75">
                                                        <input type="text" class="form-control text-start" />
                                                    </div>
                                                </div>                
                                                <div class="col-1 pt-4">
                                                    <i class="fa fa-question-circle fs-3 text-dark"></i>
                                                </div>
                                            </div>
                                            <div class="row g-0 mt-10">
                                                <div class="col-5">
                                                    <p class="fs-7 mb-0 fw-bolder">Do you round fees to avoid charging cents?</p>
                                                </div>
                                                <div class="col-6">
                                                    <div class="form-check form-switch">
                                                        <input class="form-check-input" type="checkbox">
                                                        <label class="fs-7 text-muted form-check-label">No, I charge exact amounts</label>
                                                    </div>
                                                </div>                
                                                <div class="col-1">
                                                    <i class="fa fa-question-circle fs-3 text-dark"></i>
                                                </div>
                                            </div>
                                            <div class="d-flex justify-content-between mt-10">
                                                <button class="btn btn-secondary" @click="activeTab = 3">Back</button>
                                                <button class="btn btn-primary me-10" @click="activeTab = 5">Continue</button>
                                            </div>
                                        </div>
                                        <div class="tab-content mt-10" v-if="adjustmentsTab == 2">
                                            2
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                            <div class="tab-content" v-if="activeTab == 5">
                                {{activeTab}}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer d-flex justify-content-center p-2 border-0">
                    <div class="d-flex align-items-center justify-content-center">
                        <a href="#" class="fs-5 text-muted fw-bold pe-10">Terms</a>
                        <a href="#" class="fs-5 text-muted fw-bold pe-10">Plans</a>
                        <a href="#" class="fs-5 text-muted fw-bold pe-10">Contact us</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Options } from 'vue-class-component';

import TextInput from "@/components/controls/TextInput.vue";
import TextInputInline from "@/components/controls/TextInputInline.vue";
import SelectBoxInline from "@/components/controls/SelectBoxInline.vue";
import TabGroup from "@/components/controls/TabGroup.vue";

@Options({
    components:{
        TextInput,
        TextInputInline,
        SelectBoxInline,
        TabGroup
    }
})
export default class Welcome extends Vue {

    public activeTab:number = 1;
    public frequencyTab:number = 1;
    public methodologiesTab: number = 1;
    public adjustmentsTab: number = 1;

    public states: Array<string> = ["Alabama", "Alaska", "American Samoa", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "District Of Columbia", "Federated States Of Micronesia", "Florida",  "Georgia", "Guam", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Marshall Islands", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Northern Mariana Islands", "Ohio", "Oklahoma", "Oregon", "Palau", "Pennsylvania", "Puerto Rico", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virgin Islands", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"];

}
</script>