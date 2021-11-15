import { BaseModel, DataRequest } from "./base.model";

export class manageSubscriptionRequestModel extends BaseModel {
  billingType: string;
}
export class manageSubscriptionPlanResponseModel {
  termPlanId: number;
  planName: string;
  termPlanAmount: string;
  description: string;
  planType: string;
  planStatus: string;
  startDate: string;
  endDate: string;
  status: string;
  cardType: string;
  cardNumber: string;
}
export class manageSubscriptionAddonsResponseModel {
  addOnName: string;
  planAddOnamount: string;
  termPlanAddOnId: number;
  description: string;
  planType: string;
  planStatus: string;
  startDate: string;
  endDate: string;
  status: string;
  cardType: string;
  cardNumber: string;
}
