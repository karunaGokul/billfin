import { IBaseService, BaseService } from './base.service';
import { signUpRequest, signUpResponse, custodianResponseModel, emailVerificationRequestModel, emailVerificationResponseModel } from "@/model";

export interface ISignUpService extends IBaseService<signUpRequest, signUpResponse> {
    getCustodian(): Promise<Array<custodianResponseModel>>;
    verifyEmail(request: emailVerificationRequestModel): Promise<emailVerificationResponseModel>;
    createAccount(request: signUpRequest): Promise<signUpResponse>;
}

export class SignUpService extends BaseService<signUpRequest, signUpResponse> {

    public createAccount(request: signUpRequest): Promise<signUpResponse> {
        return this.httpGet('admin', request).then(response => {
            return response.data;
        })
    }
}

export class SignUpMockService extends BaseService<signUpRequest, signUpResponse> implements ISignUpService {

    constructor() {
        super('public');
    }

    public verifyEmail(request: emailVerificationRequestModel): Promise<emailVerificationResponseModel> {
        return new Promise((resolve, reject) => {
            const items: emailVerificationResponseModel = new emailVerificationResponseModel();
            items.email = request.email;
            items.userRegistered = true;
            items.firmRegistered = true;

            resolve(items);
        });
    }

    public getCustodian(): Promise<Array<custodianResponseModel>> {
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
            response.status = "Failed";
            response.errorCode = 1;
            response.errorMessage = `${request.email} is already registered`;

            resolve(response);
        });
    }
}