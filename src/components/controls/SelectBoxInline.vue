<template>
    <div class="mb-5 row">
        <label :for="label" class="col-sm-4 col-form-label fw-bolder">{{label}}</label>
        <div class="col-sm-8">
            <select 
                class="form-select form-select-solid" 
                v-model="selectedValue"
            >
                <option selected value=""></option>
                <option 
                    v-for="(item, i) in data" 
                    :key="i" 
                    :value="item"
                    @click="selectedValue = item"
                >
                    {{item}}
                </option>
            </select>
        </div>
    </div>
</template>
<script lang="ts">
import { Vue } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

export default class SelectBoxInline extends Vue {
    @Prop() label!: string;
    @Prop() data: any;
    @Prop() value!: string;

    public selectedValue: string = '';

    mounted() {
        this.selectedValue = this.value;
    }
}
</script>