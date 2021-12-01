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
  planName: string;
  paymentToken: string;
  term: string;
  amount: number;
  endDate: string;
  status: string;
  cardNumber: string;
  active: boolean;
  description: string;
}
export class addonsResponseModel extends addOnsModel {
  subscriptionPlanId: number;
  addOnName: string;
  paymentToken: string;
  amount: number;
  endDate: string;
  status: string;
  cardNumber: string;
  active: boolean;
  description: string;
}
export class manageSubscriptionResponseModel {
  productCode: string;
  firmId: number;
  subscriptions: Array<subscriptionResponseModel>;
  addOns: Array<addonsResponseModel>;
}