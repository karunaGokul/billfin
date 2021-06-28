<template>
    <div class="modal fade show d-block vh-100">
        <div class="modal-dialog modal-dialog-centered modal-xl">
            <div class="modal-content">
                <div class="modal-header justify-content-start p-5">
                    <h5 class="modal-title">Welcome to BillFin</h5>
                    <h6 class="text-muted ms-10">Let's you get onboarded quickly and easily!</h6>
                </div>
                <div class="modal-body d-flex justify-content-center w-100">
                    <div class="tabs" style="height: 80vh">
                        <div class="tab" @click="activeTab = 1">
                            <input type="radio" id="tab-1" name="tab-group-1" :checked="activeTab == 1">
                            <label for="tab-1">General</label>
                            <div class="tab-content" style="height: calc(80vh - 70px);overflow: auto;">  
                                <div class="w-75 mx-auto">
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
                                        <button type="button" class="btn btn-primary">Continue</button>
                                    </div>
                                    <div class="d-flex align-items-center justify-content-center mt-5">
                                        <a href="#" class="fs-5 text-muted fw-bold pe-4">Terms</a>
                                        <a href="#" class="fs-5 text-muted fw-bold pe-4">Plans</a>
                                        <a href="#" class="fs-5 text-muted fw-bold pe-4">Contact us</a>
                                    </div>
                                </div>       
                            </div> 
                        </div>
    
                        <div class="tab" @click="activeTab = 2">
                            <input type="radio" id="tab-2" name="tab-group-1" :checked="activeTab == 2">
                            <label for="tab-2">Frequecy & Timing</label>
                            <div class="tab-content">
                                2
                            </div> 
                        </div>
    
                        <div class="tab"  @click="activeTab = 3">
                            <input type="radio" id="tab-3" name="tab-group-1" :checked="activeTab == 3">
                            <label for="tab-3">Methodologies</label>     
                            <div class="tab-content">
                                3
                            </div> 
                        </div>

                        <div class="tab"  @click="activeTab = 4">
                            <input type="radio" id="tab-4" name="tab-group-1" :checked="activeTab == 4">
                            <label for="tab-4">Adjustments</label>     
                            <div class="tab-content">
                                4
                            </div> 
                        </div>

                        <div class="tab"  @click="activeTab = 5">
                            <input type="radio" id="tab-5" name="tab-group-1" :checked="activeTab == 5">
                            <label for="tab-5">Review & Confirm</label>     
                            <div class="tab-content">
                                5
                            </div> 
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Options } from 'vue-class-component';

import TextInputInline from "@/components/controls/TextInputInline.vue";
import SelectBoxInline from "@/components/controls/SelectBoxInline.vue";

@Options({
    components:{
        TextInputInline,
        SelectBoxInline
    }
})
export default class Welcome extends Vue {

    public activeTab:number = 1;

    public states: Array<string> = ["Alabama", "Alaska", "American Samoa", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "District Of Columbia", "Federated States Of Micronesia", "Florida",  "Georgia", "Guam", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Marshall Islands", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Northern Mariana Islands", "Ohio", "Oklahoma", "Oregon", "Palau", "Pennsylvania", "Puerto Rico", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virgin Islands", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"];

}
</script>