export class FeeSchedulesRequestModel {}
export class FeeSchedulesResponseModel {
  name: string;
  tierType: string;
  currencyCode: string;
  flatAmount: number;
  flatRate: number;
  scheduleType: string;
  assignments: number;
  tier: Array<any>;
  active: boolean;
  feeScheduleId: number;
}
export class AddFeeScheduleRequestModel {
  name: string;
  currencyCode: string;
  tierType: string;
  active: boolean;
  flatRate: number;
  flatAmount: number;
  tier: Array<TierModel> = [];
  feeScheduleId: number;
}
export class AddFeeScheduleValidationModel {
  type: string;
  blended: boolean = false;
  bps: FormValidation = new FormValidation();
  amount: FormValidation = new FormValidation();
  formValid: boolean = false;
}
export class FormValidation {
  touched: boolean;
  invalid: boolean = true;
  message: string;
  value: number;
}
export class TierModel {
  fromValue: number;
  toValue: number;
  bps: number;
  amount: number;
  tierId: number;
  id: number;
}
export class TierFormModel {
  fromValue: FormValidation = new FormValidation();
  toValue: FormValidation = new FormValidation();
  bps: FormValidation = new FormValidation();
  amount: FormValidation = new FormValidation();
  tierId: number;
}
export class FeeTypesResponseModel {
  feeTypeCode: string;
  feeTypeName: string;
  feeTypeId: number;
}
export class ValidateFeeScheduleRequestModel {
  feeScheduleName: string;
}