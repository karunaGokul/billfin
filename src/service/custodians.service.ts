import { IBaseService, BaseService } from "./base.service";

import {
  AddCustodianRequestModel,
  AddCustodianResponseModel,
  CustodiansResponseModel,
  TransactionCodeResponseModel,
  AddTransactionCodeRequestModel,
  AddTransactionCodeResponseModel,
  AddKeysRequestModel,
} from "@/model";

export interface ICustodiansService
  extends IBaseService<any, CustodiansResponseModel> {
  getCustodians(): Promise<Array<CustodiansResponseModel>>;
  addCustodian(
    request: AddCustodianRequestModel
  ): Promise<AddCustodianResponseModel>;
  getTransactionCode(
    firmCustodianId: number
  ): Promise<Array<TransactionCodeResponseModel>>;
  addTransactionCode(
    request: AddTransactionCodeRequestModel
  ): Promise<AddTransactionCodeResponseModel>;
  addKeys(request: AddKeysRequestModel): Promise<any>;
}

export class CustodiansService extends BaseService<any, CustodiansResponseModel>
  implements ICustodiansService {
  constructor() {
    super("private");
  }

  getCustodians(): Promise<Array<CustodiansResponseModel>> {
    return this.httpGet("private/api/v1/firmCustodian", null).then(
      (response) => {
        return response.data;
      }
    );
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

  addKeys(request: AddKeysRequestModel): Promise<any> {
    return this.httpPost("private/api/v1/firmCustodianKey", request).then(
      (response) => {
        return response.data;
      }
    );
  }

  getTransactionCode(
    firmCustodianId: number
  ): Promise<Array<TransactionCodeResponseModel>> {
    return this.httpGet(
      `private/api/v1/firmTransactionType/${firmCustodianId}`,
      null
    ).then((response) => {
      return response.data;
    });
  }

  addTransactionCode(
    request: AddTransactionCodeRequestModel
  ): Promise<AddTransactionCodeResponseModel> {
    return this.httpPost("private/api/v1/transactionType", request).then(
      (response) => {
        return response.data;
      }
    );
  }
}
