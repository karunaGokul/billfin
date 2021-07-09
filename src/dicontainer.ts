import { Vue } from 'vue-class-component';
import { Provide } from 'vue-property-decorator';

import { ISignUpService, SignUpService, SignUpMockService } from "@/service";

export class DIContainer extends Vue {
    @Provide('signUpService') signUpService: ISignUpService = new SignUpService();
}