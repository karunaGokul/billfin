export class invoicesResponseModel {
  invoiceDate: string;
  invoiceId: string;
  invoiceDueAmount: number;
  invoicePaidAmount: number;
  invoiceStatus: string;
  invoiceTotalAmount: number;
  planDetails: Array<productsResponseModel>;
}
export class billsAndPaymentResponseModel {
  transactionDate: string;
  transactionId: string;
  transactionCardDetail: string;
  transactionCardType: string;
  invoices: Array<invoicesResponseModel>;
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