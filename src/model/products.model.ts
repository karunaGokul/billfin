export class AddProductRequestModel {
  productId: number;
  productCode: string;
  productName: string;
  assignedFeeSchedule: AssignedFeeScheduleModel = new AssignedFeeScheduleModel();
}
export class ProductsResponseModel extends AddProductRequestModel {
  noOfAccounts: number;
}
export class FeeScheduleModel {
  name: string;
  bps: string;
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
  feeScheduleId: number;
  feeScheduleName: string;
  name: string;
  selected: boolean = false;
}