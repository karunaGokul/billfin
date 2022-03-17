import { BaseModel, DataRequest } from "./base.model";

export class FeeSchedulesRequestModel extends DataRequest {}
export class FeeSchedulesResponseModel extends BaseModel {
  name: string;
  tierType: string;
  currencyCode: string;
  flatAmount: number;
  flatRate: number;
  scheduleType: string;
  assignments: number;
  tier: Array<any>;
  status: string;
}
export class AddFeeScheduleRequestModel {
  name: string;
  currencyCode: string;
  type: string;
  tierType: string;
  isActive: boolean;
  bps: number;
  amount: number;
  tier: Array<tierModel> = [];
  formValid: boolean = false;
  touched: boolean;
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
}
export class tierFormModel extends tierModel {
  touched: boolean;
  invalid: boolean = true;
  field: string;
  message: string;
}