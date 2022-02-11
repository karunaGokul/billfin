import { IBaseService, BaseService } from "./base.service";
import {
  repCodesResponseModel,
  addRepCodeRequestModel,
  addRepCodeResponseModel,
  unassignedRepCodesResponseModel,
  viewRepCodesResponseModel
} from "@/model";

export interface IRepCodesService extends IBaseService<any, any> {
  getRepCodes(): Promise<Array<repCodesResponseModel>>;
  addRepCode(request: addRepCodeRequestModel): Promise<addRepCodeResponseModel>;
  unassignedRepCodes(): Promise<Array<unassignedRepCodesResponseModel>>;
  viewRepCode(advisorId: number): Promise<viewRepCodesResponseModel>;
}

export class RepCodesService extends BaseService<any, any>
  implements IRepCodesService {
  constructor() {
    super("private");
  }

  public getRepCodes(): Promise<Array<repCodesResponseModel>> {
    return this.httpGet("private/api/v1/firmRepCode", null).then((response) => {
      return response.data;
    });
  }

  public unassignedRepCodes(): Promise<Array<unassignedRepCodesResponseModel>> {
    return this.httpGet("private/api/v1/unassignedRep", null).then(
      (response) => {
        return response.data;
      }
    );
  }

  public addRepCode(
    request: addRepCodeRequestModel
  ): Promise<addRepCodeResponseModel> {
    return this.httpPost("private/api/v1/rep", request).then((response) => {
      return response.data;
    });
  }

  public viewRepCode(advisorId: number): Promise<viewRepCodesResponseModel> {
    return this.httpGet("private/api/v1/rep/" + advisorId, null).then(
      (response) => {
        return response.data;
      }
    );
  }
}
