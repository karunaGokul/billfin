import { BaseModel, DataRequest } from "./base.model";

export class FeeSchedulesRequestModel extends DataRequest {}
export class FeeSchedulesResponseModel extends BaseModel {
  name: string;
  type: string;
  currencyType: string;
  assignments: number;
  status: string;
}
