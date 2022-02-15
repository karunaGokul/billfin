import {
  assignRepCodesResponseModel,
} from "@/model";

export class branchesResponseModel {
  branchCode: string;
  branchName: string;
  repCodes: Array<assignRepCodesResponseModel> = [];
}
export class unassignedBranchResponseModel {
  branchCode: string;
  branchName: string;
}
export class addBranchRequestModel {
  branchCode: string;
  branchName: string;
  repCodes: Array<assignRepCodesResponseModel> = [];
}
export class addBranchResponseModel {}
export class viewBranchsResponseModel {
}