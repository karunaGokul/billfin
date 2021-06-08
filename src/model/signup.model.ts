import { BaseModel, DataRequest } from './base.model';

export class signUpRequest extends DataRequest {
    firstName: string | any;
    lastName: string | any;
    company: string | any;
    phoneNo: string | any;
    aum: string = "";
    custodian: Array<any> = [];
    email: string | any;
    password: string | any;
    confirmPassword: string | any;
}
export class signUpResponse extends BaseModel {
    email: string | any;
    domain: string | any;
    status: string | any;
    errorCode: number | any;
    errorMessage: string | any;
}