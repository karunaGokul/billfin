import { IBaseService, BaseService } from "./base.service";

export interface ISecurityAttributesService extends IBaseService<any, any> {
  getResponse(): Promise<any>;
}
export class SecurityAttributesService extends BaseService<any, any>
  implements ISecurityAttributesService {
  constructor() {
    super("private");
  }

  getResponse(): Promise<any> {
    return this.httpGet("private/api/v1/firmSecurityAttribute", null).then(
      (response) => {
        return response.data;
      }
    );
  }
}
