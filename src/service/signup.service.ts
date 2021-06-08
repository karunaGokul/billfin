import { IBaseService, BaseService } from './base.service';
import { signUpRequest, signUpResponse } from "@/model";

export interface ISignUpService extends IBaseService<signUpRequest, signUpResponse> {
    createAccount(request: signUpRequest): Promise<signUpResponse>;
}

export class SignUpService extends BaseService<signUpRequest, signUpResponse> implements ISignUpService {

    public createAccount(request: signUpRequest): Promise<signUpResponse> {
        return this.httpGet('admin/creditHistory/getAll', request).then(response => {
            return response.data;
        })
    }
}

export class SignUpMockService extends BaseService<signUpRequest, signUpResponse> implements ISignUpService {

    constructor() {
        super('public');
    }

    public createAccount(request: signUpRequest): Promise<signUpResponse> {
        return new Promise((resolve, reject) => {
            let response = new signUpResponse();
            response.email = request.email;
            response.domain = request.email;
            status = "Success";
            response.errorCode = 0;
            response.errorMessage = "";
            resolve(response);
        });
    }
}