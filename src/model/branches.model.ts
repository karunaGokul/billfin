import { TimeModel } from "./base.model";
import { assignRepCodesResponseModel } from "./advisors.model";
import {
  addRepCodeRequestModel,
  repCodesResponseModel,
} from "./rep-codes.model";

export class branchesResponseModel extends TimeModel {
  branchCode: string;
  branchId: number;
  branchName: string;
  repCodes: Array<repCodesResponseModel> = [];
}
export class unassignedBranchResponseModel {
  branchCode: string;
  branchName: string;
  branchId: number;
}
export class addBranchRequestModel {
  branchId: number;
  branchCode: string;
  branchName: string;
  repCodes: Array<assignRepCodesResponseModel> = [];
}
export class viewBranchsResponseModel {
  branchName: string;
  branchCode: string;
  branchId: number;
  repCodes: Array<repCodesModel> = [];
}
export class repCodesModel extends addRepCodeRequestModel {
  status: string;
  edit: boolean;
}
