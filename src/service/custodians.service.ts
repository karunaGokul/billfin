import { IBaseService, BaseService } from "./base.service";

import {
  AddCustodianRequestModel,
  AddCustodianResponseModel,
  CustodiansResponseModel,
} from "@/model";

export interface ICustodiansService
  extends IBaseService<any, CustodiansResponseModel> {
  getCustodians(): Promise<Array<CustodiansResponseModel>>;
  addCustodian(
    request: AddCustodianRequestModel
  ): Promise<AddCustodianResponseModel>;
}

export class CustodiansService extends BaseService<any, CustodiansResponseModel>
  implements ICustodiansService {
  constructor() {
    super("private");
  }

  getCustodians(): Promise<Array<CustodiansResponseModel>> {
    return this.httpGet("private/api/v1/firmCustodian", null).then((response) => {
      return response.data;
    });
  }

  addCustodian(
    request: AddCustodianRequestModel
  ): Promise<AddCustodianResponseModel> {
    return this.httpPost("private/api/v1/firmCustodian", request).then(
      (response) => {
        return response.data;
      }
    );
  }
}
