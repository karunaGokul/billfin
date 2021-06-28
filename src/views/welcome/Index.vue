<template>
    <div class="row g-0">
        <div class="col-lg-5 bg-light">
            <div class="mx-auto w-75 mt-10 text-center">
                <img src="@/assets/billfin.svg" alt="Logo" height="80" width="80"/>
                <p class="fa-2x mt-2 fw-bolder mt-10">Welcome to BillFin!</p>
            </div>
        </div>
        <div class="col-lg-7 bg-white p-5">
            <p class="fs-2 fw-bolder ms-5 mt-10 mb-5">Firm Details</p>
            <div class="border-top border-bottom p-5">
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
            </div>
            <div class="d-flex align-items-center justify-content-between p-4">
                <div>
                    <a href="#" class="fs-4 text-muted fw-bold pe-10">Terms</a>
                    <a href="#" class="fs-4 text-muted fw-bold pe-10">Plans</a>
                    <a href="#" class="fs-4 text-muted fw-bold pe-10">Contact us</a>
                </div>
                <button type="button" class="btn btn-primary">Continue</button>
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

    public states: Array<string> = ["Alabama", "Alaska", "American Samoa", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "District Of Columbia", "Federated States Of Micronesia", "Florida",  "Georgia", "Guam", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Marshall Islands", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Northern Mariana Islands", "Ohio", "Oklahoma", "Oregon", "Palau", "Pennsylvania", "Puerto Rico", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virgin Islands", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"];

}
</script>