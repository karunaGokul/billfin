import { IBaseService, BaseService } from "./base.service";
import {
  addBranchRequestModel,
  addBranchResponseModel,
  branchesResponseModel,
  unassignedBranchResponseModel,
} from "@/model";

export interface IBranchesService extends IBaseService<any, any> {
  getBranches(): Promise<Array<branchesResponseModel>>;
  addBranch(
    request: addBranchRequestModel
  ): Promise<Array<branchesResponseModel>>;
  unassignedBranch(): Promise<Array<unassignedBranchResponseModel>>;
}
export class BranchesService extends BaseService<any, any>
  implements IBranchesService {
  constructor() {
    super("private");
  }

  public getBranches(): Promise<Array<branchesResponseModel>> {
    return this.httpGet("private/api/v1/firmBranch", null).then((response) => {
      return response.data;
    });
  }

  public unassignedBranch(): Promise<Array<unassignedBranchResponseModel>> {
    return this.httpGet("private/api/v1/unassignedBranch", null).then(
      (response) => {
        return response.data;
      }
    );
  }

  public addBranch(
    request: addBranchRequestModel
  ): Promise<Array<branchesResponseModel>> {
    return this.httpPost("private/api/v1/branch", request).then((response) => {
      return response.data;
    });
  }
}
