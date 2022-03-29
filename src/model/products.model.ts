export class ProductsResponseModel {
  productCode: string;
  productName: string;
  feeSchedule: Array<FeeScheduleModel> = [];
  noOfAccounts: number;
}
export class FeeScheduleModel {
  name: string;
  bps: string;
}
export class AddProductRequestModel {
  productId: number;
  productCode: string;
  productName: string;
  assignedFeeSchedule: AssignedFeeScheduleModel = new AssignedFeeScheduleModel();
}
export class AssignedFeeScheduleModel {
  prorationMethod: string;
  assetLevel: string;
  feeTypes: Array<FeeSchedulesModel> = [];
}
export class FeeSchedulesModel {
  feeTypeCode: string;
  feeTypeName: string;
  feeTypeId: number;
  name: string;
  feeScheduleId: number;
  selected: boolean = false;
}
