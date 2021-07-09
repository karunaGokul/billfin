import { IBaseService, BaseService } from './base.service';
import { signUpRequest, signUpResponse, custodianResponseModel, validateEmailRequestModel, validateEmailResponseModel } from "@/model";

export interface ISignUpService extends IBaseService<signUpRequest, signUpResponse> {
    getCustodian(): Promise<Array<custodianResponseModel>>;
    verifyEmail(request: validateEmailRequestModel): Promise<validateEmailResponseModel>;
    createAccount(request: signUpRequest): Promise<signUpResponse>;
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
        /*return new Promise((resolve, reject) => {
            const items: validateEmailResponseModel = new validateEmailResponseModel();
            items.email = request.email;
            if(request.email == 'logeswaran@yectra.com') {
                items.userRegistered = true;
                items.firmRegistered = false;
            } else if(request.email == 'sample@yectra.com') {
                    items.userRegistered = false;
                    items.firmRegistered = true;
            } else {
                items.userRegistered = false;
                items.firmRegistered = false;
            }

            resolve(items);
        });*/

        return this.httpPost('trailsignup/validateemail', request).then(response => {
            return response.data;
        });
    }

    public createAccount(request: signUpRequest): Promise<signUpResponse> {
        return this.httpPost('trailsignup/createuser', request).then(response => {
            return response.data;
        })
    }
    
}

export class SignUpMockService extends BaseService<signUpRequest, signUpResponse> implements ISignUpService {

    constructor() {
        super('public');
    }

    public verifyEmail(request: validateEmailRequestModel): Promise<validateEmailResponseModel> {
        return new Promise((resolve, reject) => {
            const items: validateEmailResponseModel = new validateEmailResponseModel();
            items.email = request.email;
            if(request.email == 'logeswaran@yectra.com') {
                items.userRegistered = true;
                items.firmRegistered = false;
            } else if(request.email == 'sample@yectra.com') {
                    items.userRegistered = false;
                    items.firmRegistered = true;
            } else {
                items.userRegistered = false;
                items.firmRegistered = false;
            }

            resolve(items);
        });
    }

    public getCustodian(): Promise<Array<custodianResponseModel>> {
        console.log(`ApiUrl ${this.apiUrl}`);
        return new Promise((resolve, reject) => {
            const items: Array<custodianResponseModel> = [];
            items.push({custodianId: 1, custodianName: "Fidelity"});
            items.push({custodianId: 2, custodianName: "LPL"});
            items.push({custodianId: 3, custodianName: "Schwab/TD"});
            items.push({custodianId: 4, custodianName: "Folio/Goldman"});
            items.push({custodianId: 5, custodianName: "Pershing"});
            items.push({custodianId: 6, custodianName: "SSG"});
            items.push({custodianId: 7, custodianName: "Interactive Brokers"});
            items.push({custodianId: 8, custodianName: "Raymond James"});
            items.push({custodianId: 9, custodianName: "Others"});
            
            resolve(items);
        });
    }

    public createAccount(request: signUpRequest): Promise<signUpResponse> {
        return new Promise((resolve, reject) => {
            const response = new signUpResponse();
            response.email = request.email;
            response.domain = request.email;

            if(response.email == 'logeswaran@yectra.com') {
                response.status = "Failed";
                response.errorCode = 1;
                response.errorMessage = `${request.email} is already registered`;
            } else if(response.email == 'sample@yectra.com') {
                response.status = "Failed";
                response.errorCode = 2;
                response.errorMessage = `${request.email.split('@')[1]} is already registered`;
            } else if(response.email == 'sample1@yectra.com') {
                response.status = "Failed";
                response.errorCode = 2;
                response.errorMessage = `${request.email.split('@')[1]} is already registered`;
            }
             else {
                response.status = "Success";
                response.errorCode = 0;
                response.errorMessage = "";
            }

            resolve(response);
        });
    }
}