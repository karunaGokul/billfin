import { advisorsResponseModel } from "./advisors.model";

export class repCodesResponseModel {
  repCode: string;
  repId: number;
  branchCode: number;
  branchId: number;
  branchName: string;
  advisors: Array<string>;
}
export class unassignedRepCodesResponseModel {
  advisors: string;
  branchCode: number;
  branchId: number;
  branchName: string;
  firmId: number;
  repCode: string;
  repId: number;
}
export class addRepCodeRequestModel {
  repCode: string;
  branchName: string;
  advisors: Array<assignedAdvisorsResponseModel> = [];
}
export class assignedAdvisorsResponseModel {
  advisorId: number;
  displayName: string;
}
export class addRepCodeResponseModel {
  status: string;
  edit: boolean;
  firstName: string;
  lastName: string;
  middleName: string;
  displayName: string;
}
export class viewRepCodesResponseModel {
  repCode: string;
  repId: number;
  branchName: string;
  branchCode: number;
  advisors: Array<advisorsodel> = [];
}
export class advisorsodel extends advisorsResponseModel {
  status: string;
  edit: boolean;
}