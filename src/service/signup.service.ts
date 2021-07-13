import { IBaseService, BaseService } from './base.service';
import { signUpRequest, signUpResponse, custodianResponseModel, validateEmailRequestModel, validateEmailResponseModel, resentEmailRequestModel } from "@/model";

export interface ISignUpService extends IBaseService<signUpRequest, signUpResponse> {
    getCustodian(): Promise<Array<custodianResponseModel>>;
    verifyEmail(request: validateEmailRequestModel): Promise<validateEmailResponseModel>;
    createAccount(request: signUpRequest): Promise<signUpResponse>;
    resendEmail(request: resentEmailRequestModel): Promise<any>;
}

export class SignUpService extends BaseService<signUpRequest, signUpResponse> {

    constructor() {
        super('public');
    }

    public getCustodian(): Promise<Array<custodianResponseModel>> {
        return this.httpGet('trailsignup/custodian', null).then(response => {
            return response.data;
        });
    }

    public verifyEmail(request: validateEmailRequestModel): Promise<validateEmailResponseModel> {
        return this.httpPost('trailsignup/validateemail', request).then(response => {
            return response.data;
        });
    }

    public createAccount(request: signUpRequest): Promise<signUpResponse> {
        return this.httpPost('trailsignup/createuser', request).then(response => {
            return response.data;
        })
    }

    public resendEmail(request: resentEmailRequestModel): Promise<any> {
        return this.httpPost('trailsignup/resendVerificationEmail', request).then(response => {
            return response.data;
        });
    }
    
}