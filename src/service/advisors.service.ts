import { IBaseService, BaseService } from "./base.service";
import {
  advisorsRequestModel,
  advisorsResponseModel,
  assignRepCodesResponseModel,
  validateAdvisorRequestModel,
  addAdvisorReqeustModel,
  addAdvisorResponseModel,
} from "@/model";

export interface IAdvisorsService extends IBaseService<any, any> {
  getAdvisors(): Promise<Array<advisorsResponseModel>>;
  listOfRepCodes(): Promise<Array<assignRepCodesResponseModel>>;
  validateAdvisor(request: validateAdvisorRequestModel): Promise<any>;
  addAdvisor(request: addAdvisorReqeustModel): Promise<addAdvisorResponseModel>;
}
export class AdvisorsService extends BaseService<any, any>
  implements IAdvisorsService {
  constructor() {
    super("private");
  }
  public getAdvisors(): Promise<Array<advisorsResponseModel>> {
    return this.httpGet('private/api/v1/advisor', null).then(response => {
      return response.data;
    });
    /*return new Promise((resolve, reject) => {
      let response: Array<advisorsResponseModel> = [];
      response.push({
        firstName: "Abram",
        lastName: "Geidt",
        middleName: "",
        contactPhone: "1115551234",
        id: "",
        displayName: "Abram Geidt",
        emailAddress: "abram@excellent-advisors-inc.com",
        repCode: ["ABGX2"],
        branch: ["Burbank Office"],
      });
      response.push({
        firstName: "Adison",
        lastName: "Saris",
        middleName: "",
        contactPhone: "1115551234",
        id: "",
        displayName: "Adison Saris",
        emailAddress: "adison.saris@excellent-advisors-inc.com",
        repCode: ["ADSX1", "HUJ73"],
        branch: ["New York City Office"],
      });
      response.push({
        firstName: "Ashlynn",
        lastName: "George",
        middleName: "",
        contactPhone: "1115551234",
        id: "",
        displayName: "Ashlynn George",
        emailAddress: "ashlynn@excellent-advisors-inc.com",
        repCode: ["ASG01", "JKW83"],
        branch: ["San Fran Region"],
      });
      response.push({
        firstName: "Carla",
        lastName: "Lubin",
        middleName: "",
        contactPhone: "1115551234",
        id: "",
        displayName: "Carla Lubin",
        emailAddress: "carla-lubin@excellent-advisors-inc.com",
        repCode: ["CALX7", "UEW66"],
        branch: ["Boston Office", "New York City Office"],
      });
      response.push({
        firstName: "Cristofer",
        lastName: "Dias",
        middleName: "",
        contactPhone: "1115551234",
        id: "",
        displayName: "Cristofer Dias",
        emailAddress: "cristofer.dias@excellent-advisors-inc.com",
        repCode: ["CRDX9", "UEW66"],
        branch: ["Burbank Office", "New York City Office"],
      });
      response.push({
        firstName: "Davis",
        lastName: "Rosser",
        middleName: "",
        contactPhone: "1115551234",
        id: "",
        displayName: "Davis Rosser",
        emailAddress: "drosser@excellent-advisors-inc.com",
        repCode: ["DAR13"],
        branch: ["Texas & Southwest Region"],
      });
      response.push({
        firstName: "Ellen",
        lastName: "Bix",
        middleName: "",
        contactPhone: "1115551234",
        id: "",
        displayName: "Ellen Bix",
        emailAddress: "ellen.bix@excellent-advisors-inc.com",
        repCode: ["ELB62", "EGK02", "REL11", "TEL43"],
        branch: ["Chicago Branch"],
      });
      response.push({
        firstName: "Jaxson",
        lastName: "Passaquindici",
        middleName: "Arcand",
        contactPhone: "1115551234",
        id: "",
        displayName: "Jaxson Passaquindici Arcand",
        emailAddress: "jaxson@excellent-advisors-inc.com",
        repCode: ["JPAX3", "JPAG2", "UEW66"],
        branch: ["New York City Office", "San Fran Region"],
      });
      resolve(response);
    });*/
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
    return this.httpGet("private/api/v1/validateAdvisor", request).then(
      (response) => {
        return response.data;
      }
    );
  }

  public addAdvisor(
    request: addAdvisorReqeustModel
  ): Promise<addAdvisorResponseModel> {
    return this.httpPost("private/api/v1/advisor", request).then(
      (response) => {
        return response.data;
      }
    );
  }
}
