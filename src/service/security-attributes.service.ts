import { SecurityAttributesRequestModel } from "@/model";
import { IBaseService, BaseService } from "./base.service";

export interface ISecurityAttributesService extends IBaseService<any, any> {
  getResponse(): Promise<Array<SecurityAttributesRequestModel>>;
  saveAttributes(request: Array<SecurityAttributesRequestModel>): Promise<any>;
}
export class SecurityAttributesService extends BaseService<any, any>
  implements ISecurityAttributesService {
  constructor() {
    super("private");
  }

  getResponse(): Promise<Array<SecurityAttributesRequestModel>> {
    return this.httpGet("private/api/v1/firmSecurityAttribute", null).then(
      (response) => {
        return response.data;
      }
    );
  }

  saveAttributes(request: Array<SecurityAttributesRequestModel>): Promise<any> {
    return this.post(request, "api/v1/firmSecurityAttribute").then(
      (response) => {
        return response;
      }
    );
  }
}
