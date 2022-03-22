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
  productCode: string;
  productName: string;
}