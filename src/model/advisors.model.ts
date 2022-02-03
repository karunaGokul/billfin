export class advisorsRequestModel {}
export class advisorsResponseModel {
  displayName: string;
  email: string;
  repCode: Array<string>;
  branch: Array<string>;

  /* advisorId: number;
  advisorIdentifier: string;
  contactPhone: string;
  emailAddress: string;
  errorCode: string;
  errorMessage: string;
  firmId: number;
  firstName: string;
  lastName: string;
  message: string;
  middleName: string;
  status: string;
  userId: string;*/
}
export class addAdvisorReqeustModel {
  firstName: string;
  middleName: string;
  lastName: string;
  displayName: string;
  contactPhone: number;
  emailAddress: string;
  id: string;
}
export class assignRepCodesResponseModel {
  repId: number;
  repCode: string;
}
export class validateAdvisorRequestModel {
  emailAddress: string;
}
