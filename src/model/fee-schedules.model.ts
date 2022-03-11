import { BaseModel, DataRequest } from "./base.model";

export class FeeSchedulesRequestModel extends DataRequest {}
export class FeeSchedulesResponseModel extends BaseModel {
  name: string;
  type: string;
  currencyType: string;
  assignments: number;
  status: string;
}
export class AddFeeScheduleRequestModel {
  name: string;
  currency: string;
  type: string;
  tierType: string;
  isActive: boolean;
  bps: number;
  amount: number;
  tier: Array<tierModel> = [];
  formValid: boolean = false;
}
export class FlatModel {
  bps: number;
  amount: number;
}
export class tierModel {
  fromValue: number;
  toValue: number;
  bps: number;
  amount: number;
  touched: boolean;
  invalid: boolean = true;
  field: string;
  message: string;
}