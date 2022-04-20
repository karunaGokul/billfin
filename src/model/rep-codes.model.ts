import { TimeModel } from "./base.model";
import { advisorsResponseModel } from "./advisors.model";

export class repCodesResponseModel extends TimeModel {
  repCode: string;
  repId: number;
  branchCode: string;
  branchId: number;
  branchName: string;
  advisors: Array<advisorsResponseModel>;
}
export class unassignedRepCodesResponseModel {
  advisors: Array<addRepCodeResponseModel> = [];
  branchCode: number;
  branchId: number;
  branchName: string;
  firmId: number;
  repCode: string;
  repId: number;
}
export class addRepCodeRequestModel {
  repId: number;
  repCode: string;
  branchName: string;
  branchCode: string;
  branchId: number;
  advisors: Array<addRepCodeResponseModel> = [];
}
export class addRepCodeResponseModel {
  advisorId: number;
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
  advisors: Array<advisorsModel> = [];
}
export class advisorsModel extends TimeModel {
  firstName: string;
  lastName: string;
  middleName: string;
  displayName: string;
  emailAddress: string;
  contactPhone: string;
  repCodes: Array<repCodesResponseModel>;
  branch: string;
  advisorIdentifier: string;
  advisorId: number;
  status: string;
  edit: boolean;
}
