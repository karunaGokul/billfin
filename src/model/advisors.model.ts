export class advisorsResponseModel {
  firstName: string;
  lastName: string;
  middleName: string;
  displayName: string;
  emailAddress: string;
  contactPhone: string;
  repCodes: Array<assignRepCodesResponseModel>;
  branch: string;
  advisorIdentifier: string;
  advisorId: number;
}
export class addAdvisorRequestModel {
  advisorId: number;
  firstName: string;
  middleName: string;
  lastName: string;
  displayName: string;
  contactPhone: number;
  emailAddress: string;
  advisorIdentifier: string;
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