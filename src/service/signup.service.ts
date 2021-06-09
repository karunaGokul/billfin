import { IBaseService, BaseService } from './base.service';
import { signUpRequest, signUpResponse } from "@/model";

export interface ISignUpService extends IBaseService<signUpRequest, signUpResponse> {
    getCustodian(): Promise<any>;
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

    public getCustodian(): Promise<any> {
        return new Promise((resolve, reject) => {
            const items: Array<string> = [];
            items.push("Fidelity");
            items.push("LPL");
            items.push("Schwab/TD");
            items.push("Folio/Goldman");
            items.push("Pershing");
            items.push("SSG");
            items.push("Interactive Brokers");
            items.push("Raymond James");
            items.push("Others");

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