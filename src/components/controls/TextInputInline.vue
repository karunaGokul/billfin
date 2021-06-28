<template>
    <div class="mb-5 row">
        <label :for="label" class="col-sm-4 col-form-label fw-bolder">{{label}}</label>
        <div class="col-sm-8">
            <div class="input-group input-group-solid">
                <input type="text" class="form-control" />
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Vue } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

export default class TextInputInline extends Vue {
    @Prop() label!: string;
}
</script>