import { IBaseService, BaseService } from "./base.service";
import {
  repCodesResponseModel,
  assginAdvisorsResponseModel,
  addRepCodeRequestModel,
  addRepCodeResponseModel,
} from "@/model";

export interface IRepCodesService extends IBaseService<any, any> {
  getRepCodes(): Promise<Array<repCodesResponseModel>>;
  listOfAdvisors(): Promise<Array<assginAdvisorsResponseModel>>;
  addRepCode(request: addRepCodeRequestModel): Promise<addRepCodeResponseModel>;
}

export class RepCodesService extends BaseService<any, any>
  implements IRepCodesService {
  constructor() {
    super("private");
  }

  public getRepCodes(): Promise<Array<repCodesResponseModel>> {
    return new Promise((resolve, reject) => {
      let response: Array<repCodesResponseModel> = [];
      response.push({
        repCode: "ABGX2",
        branch: ["Burbank Office"],
        assignedAdvisors: [],
      });
      response.push({
        repCode: "ADSX1",
        branch: ["New York City Office"],
        assignedAdvisors: [],
      });
      response.push({
        repCode: "ASG01",
        branch: ["San Fran Region"],
        assignedAdvisors: [],
      });
      response.push({
        repCode: "CALX7",
        branch: ["Boston Office", "New York City Office"],
        assignedAdvisors: [],
      });
      response.push({
        repCode: "CRDX9",
        branch: ["Burbank Office", "New York City Office"],
        assignedAdvisors: [],
      });
      response.push({
        repCode: "DAR13",
        branch: ["Texas & Southwest Region"],
        assignedAdvisors: [],
      });
      response.push({
        repCode: "ELB62",
        branch: ["Chicago Branch"],
        assignedAdvisors: [],
      });
      response.push({
        repCode: "JPAX3",
        branch: ["New York City Office", "San Fran Region"],
        assignedAdvisors: [],
      });
      resolve(response);
    });
  }

  public listOfAdvisors(): Promise<Array<assginAdvisorsResponseModel>> {
    return new Promise((resolve, reject) => {
      let response: Array<assginAdvisorsResponseModel> = [];
      response.push({ advisorId: 1, advisorName: "Abram" });
      resolve(response);
    });
  }

  public addRepCode(
    request: addRepCodeRequestModel
  ): Promise<addRepCodeResponseModel> {
    return this.httpPost("private/api/v1/rep", request).then((response) => {
      return response.data;
    });
  }
}
