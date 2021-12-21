import { BaseModel, DataRequest } from "./base.model";
import { subscriptionsModel, addOnsModel } from "./subscribe.model";

export class manageSubscriptionRequestModel extends BaseModel {
  productCode: string;
  firmId: number;
}
export class availableCardsModel {
  cardType: string;
  cardNumber: string;
  accountType: string;
}
export class subscriptionResponseModel extends subscriptionsModel {
  subscriptionPlanId: number;
  cardType: string;
  customerId: string;
  planName: string;
  planId: number;
  paymentToken: string;
  term: string;
  amount: number;
  endDate: string;
  renewDate: string;
  status: string;
  cardNumber: string;
  active: boolean;
  description: string;
}
export class addonsResponseModel extends addOnsModel {
  subscriptionAddOnId: number;
  addOnName: string;
  addOnId: number;
  cardType: string;
  paymentToken: string;
  term: string;
  amount: number;
  endDate: string;
  renewDate: string;
  status: string;
  cardNumber: string;
  active: boolean;
  description: string;
}
export class manageSubscriptionResponseModel {
  productCode: string;
  subscriptions: Array<subscriptionResponseModel> = [];
  addOns: Array<addonsResponseModel> = [];
}
export class termPlanAmountReqeustModel {
  termPlanType: string;
  planId: number;
}
export class termPlanAmountResponseModel {
  planName: string;
  planCode: string;
  termPlanCode: string;
  termPlanName: string;
  termPlanAmount: number;
  planId: number;
  termPlanId: number;
}
export class changePlanTermRequestModel {
  eventType: string;
  subscriptionPlanId: number;
  subscriptionAddOnId: number;
  term: string;
  termPlanId: number;
}
export class changePlanTermResponseModel {
  status: string;
}
export class subscribedAddonsReqeustModel {
  planSubscriptionId: number;
}