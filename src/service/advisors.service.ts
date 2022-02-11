import { IBaseService, BaseService } from "./base.service";
import {
  advisorsResponseModel,
  validateAdvisorRequestModel,
  addAdvisorRequestModel,
  addAdvisorResponseModel
} from "@/model";

export interface IAdvisorsService extends IBaseService<any, any> {
  getAdvisors(): Promise<Array<advisorsResponseModel>>;
  validateAdvisor(request: validateAdvisorRequestModel): Promise<any>;
  addAdvisor(request: addAdvisorRequestModel): Promise<addAdvisorResponseModel>;
  unassignedAdvisors(): Promise<Array<advisorsResponseModel>>;
}
export class AdvisorsService extends BaseService<any, any>
  implements IAdvisorsService {
  constructor() {
    super("private");
  }

  public getAdvisors(): Promise<Array<advisorsResponseModel>> {
    return this.httpGet("private/api/v1/firmAdvisors", null).then(
      (response) => {
        return response.data;
      }
    );
  }

  public validateAdvisor(request: validateAdvisorRequestModel): Promise<any> {
    return this.httpGet("private/api/v1/validateAdvisor", request).then(
      (response) => {
        return response.data;
      }
    );
  }

  public addAdvisor(
    request: addAdvisorRequestModel
  ): Promise<addAdvisorResponseModel> {
    return this.httpPost("private/api/v1/advisor", request).then((response) => {
      return response.data;
    });
  }

  public unassignedAdvisors(): Promise<Array<advisorsResponseModel>> {
    return this.httpGet("private/api/v1/unassignedAdvisors", null).then(
      (response) => {
        return response.data;
      }
    );
  }
}
