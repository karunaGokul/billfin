import { BaseModel, DataRequest } from './base.model';

export class signUpRequest extends DataRequest {
    firstName: string | any;
    lastName: string | any;
    companyName: string | any;
    phoneNumber: string | any;
    aumRange: string = "";
    custodians: Array<number> = [];
    email: string | any;
    password: string | any;
    confirmPassword: string | any;
    hasAgreed: boolean | any;
}
export class signUpResponse extends BaseModel {
    email: string | any;
    domain: string | any;
    status: string | any;
    errorCode: number | any;
    errorMessage: string | any;
}
export class emailVerificationRequestModel {
    email: string | any;
}
export class emailVerificationResponseModel {
    email: string | any;
    userRegistered: boolean | any;
    firmRegistered: boolean | any;
}
export class custodianResponseModel  {
    custodianId: number | any;
    custodianName: string | any;
}