import { advisorsResponseModel } from "./advisors.model";

export class repCodesResponseModel {
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
export class advisorsModel extends advisorsResponseModel {
  status: string;
  edit: boolean;
}