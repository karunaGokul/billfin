<template>
    <label 
        :for="label" 
        class="form-label fw-bolder"
    >
        {{label}}
    </label>
    <div class="input-group input-group-solid mb-2">
        <input 
            :type="showPassword ? 'text' : inputType" 
            class="form-control text-start" 
            :id="label" 
            v-model="controls.$model"
            @blur="label == 'Work email' && 
                !controls.$invalid ? verifyEmail() : ''"
        />
        <span class="input-group-text">
            <i 
                class="fa"
                :class="{
                    'fa-eye': showPassword,
                    'fa-eye-slash': !showPassword
                }" 
                v-if="inputType == 'password'"
                style="cursor: pointer"
                @click="showPassword = !showPassword"
            >
            </i>
        </span>
    </div>
    <div 
        class="invalid-feedback" 
        v-if="errorMessage != null"
    >
        {{errorMessage}}
        <a 
            href="#" 
            class="border-bottom border-primary"
            v-if="controls.domain && 
            !controls.required.$invalid && 
            !controls.email.$invalid &&
            controls.domain.$invalid"
        >
            Contact us
        </a>
    </div>
</template>
<script lang="ts">
import { Vue } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

export default class TextInput extends Vue {
@Prop() label: string | any;
@Prop() controls: any;
@Prop() inputType: string | any;
@Prop() validation: Array<string> | any;

    public showPassword:boolean = false;

    public verifyEmail() {
        this.$emit('verifyEmail');
    }

    get errorMessage() {
        if(this.controls.$dirty && 
            this.controls.$invalid) {
            for(let error in this.validation) {
                if (this.controls[this.validation[error]].$invalid) {
                    return TextInput.getValidatorErrorMessage(
                        this.validation[error], 
                        this.label, 
                        this.controls[this.validation[error]].$params
                    );
                }
            }
        }
        return null;
    }

    public static getValidatorErrorMessage(validatorName: string, propertyName: string, propertyValue?: any)	{
		let config:any = {
			'required': `${propertyName == 'Work email'? 'Email': propertyName} is required`,
            'numeric': 'Please enter valid number',
            'minLength': `Minimum ${propertyValue.min} characters`,
			'maxLength': `Maximum ${propertyValue.max} characters`,
            'email': 'Please enter a valid email address',
            'domain': `Please enter your business email. Don't have one?`,
            'number': 'Please enter one number',
            'special': `Please enter one special character: !@#$%&*`,
            'letter': 'Please enter one letter',
        }

        return config[validatorName];
    }

}
</script>