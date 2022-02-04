export class advisorsRequestModel {}
export class advisorsResponseModel {
  firstName: string;
  lastName: string;
  middleName: string;
  displayName: string;
  emailAddress: string;
  contactPhone: string;
  repCode: Array<string>;
  branch: Array<string>;
  id: string;

  /* advisorId: number;
  advisorIdentifier: string;
  contactPhone: string;
  errorCode: string;
  errorMessage: string;
  firmId: number;
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
  repCodes: Array<assignRepCodesResponseModel> = [];
}
export class addAdvisorResponseModel {
  status: string;
}
export class assignRepCodesResponseModel {
  repId: number;
  repCode: string;
}
export class validateAdvisorRequestModel {
  emailAddress: string;
}
