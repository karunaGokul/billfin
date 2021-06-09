<template>
    <div class="modal fade show d-block">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content" style="width: 400px;">
                <div class="modal-header justify-content-center border-0">
                    <i class="fa fa-times error" v-if="status == 'Failed'"></i>
                </div>
                <div class="modal-body pt-0">
                    <p class="fs-6 fw-bolder ps-10" v-if="status == 'Failed'">Sorry, looks like we encountered errors. Please try again.</p>
                    <p class="ps-10 mt-7 invalid-feedback">{{message}}</p>
                </div>
                <div class="modal-footer justify-content-center border-0">
                    <button type="button" class="btn btn-primary fw-bold" @click="close">Ok, got it!</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Vue } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

export default class Information extends Vue {
    @Prop() status: string | any;
    @Prop() message: string | any;

    public close() {
        this.$emit('closeInformationModel');
    }
}
</script>