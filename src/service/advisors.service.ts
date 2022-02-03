import { IBaseService, BaseService } from "./base.service";
import {
  advisorsRequestModel,
  advisorsResponseModel,
  assignRepCodesResponseModel,
  validateAdvisorRequestModel,
} from "@/model";

export interface IAdvisorsService extends IBaseService<any, any> {
  getAdvisors(): Promise<Array<advisorsResponseModel>>;
  listOfRepCodes(): Promise<Array<assignRepCodesResponseModel>>;
  validateAdvisor(request: validateAdvisorRequestModel): Promise<any>;
}
export class AdvisorsService extends BaseService<any, any>
  implements IAdvisorsService {
  constructor() {
    super("private");
  }
  public getAdvisors(): Promise<Array<advisorsResponseModel>> {
    /*return this.httpGet('private/api/v1/advisor', null).then(response => {
      return response.data;
    });*/
    return new Promise((resolve, reject) => {
      let response: Array<advisorsResponseModel> = [];
      response.push({
        displayName: "Abram Geidt",
        email: "Abram Geidt",
        repCode: ["ABGX2"],
        branch: ["Burbank Office"],
      });
      response.push({
        displayName: "Adison Saris",
        email: "adison.saris@excellent-advisors-inc.com",
        repCode: ["ADSX1", "HUJ73"],
        branch: ["New York City Office"],
      });
      response.push({
        displayName: "Ashlynn George",
        email: "ashlynn@excellent-advisors-inc.com",
        repCode: ["ASG01", "JKW83"],
        branch: ["San Fran Region"],
      });
      response.push({
        displayName: "Carla Lubin",
        email: "carla-lubin@excellent-advisors-inc.com",
        repCode: ["CALX7", "UEW66"],
        branch: ["Boston Office", "New York City Office"],
      });
      response.push({
        displayName: "Cristofer Dias",
        email: "cristofer.dias@excellent-advisors-inc.com",
        repCode: ["CRDX9", "UEW66"],
        branch: ["Burbank Office", "New York City Office"],
      });
      response.push({
        displayName: "Davis Rosser",
        email: "drosser@excellent-advisors-inc.com",
        repCode: ["DAR13"],
        branch: ["Texas & Southwest Region"],
      });
      response.push({
        displayName: "Ellen Bix",
        email: "ellen.bix@excellent-advisors-inc.com",
        repCode: ["ELB62", "EGK02", "REL11", "TEL43"],
        branch: ["Chicago Branch"],
      });
      response.push({
        displayName: "Jaxson Passaquindici Arcand",
        email: "jaxson@excellent-advisors-inc.com",
        repCode: ["JPAX3", "JPAG2", "UEW66"],
        branch: ["New York City Office", "San Fran Region"],
      });
      resolve(response);
    });
  }

  public listOfRepCodes(): Promise<Array<assignRepCodesResponseModel>> {
    return new Promise((resolve, reject) => {
      let response: Array<assignRepCodesResponseModel> = [];
      response.push({ repId: 1, repCode: "AE01" });
      response.push({ repId: 2, repCode: "AE02" });
      response.push({ repId: 3, repCode: "AE03" });
      response.push({ repId: 4, repCode: "AE04" });
      response.push({ repId: 5, repCode: "AE05" });

      resolve(response);
    });
  }

  public validateAdvisor(request: validateAdvisorRequestModel): Promise<any> {
    return this.post(request, "private/api/v1/advisor").then((response) => {
      return response.data;
    });
  }
}
