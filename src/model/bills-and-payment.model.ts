export class billsAndPaymentRequestModel {
  firmId: number;
}
export class productsResponseModel {
  planName: string;
  planCode: string;
  termPlanCode: string;
  termPlanName: string;
  termPlanAmount: number;
  planId: number;
  termPlanId: number;
  planTerm: string;
  product: string;
  quantity: number;
  type: string;
}
export class billsAndPaymentResponseModel {
  transactionDate: string;
  transactionId: string;
  transactionCardDetail: string;
  transactionCardType: string;
  products: Array<productsResponseModel>;
}
