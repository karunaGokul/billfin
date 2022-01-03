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
  commitmentTerm: string;
  paymentAmount: number;
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
  commitmentTerm: string;
  paymentAmount: number;
  endDate: string;
  renewDate: string;
  status: string;
  cardNumber: string;
  active: boolean;
  description: string;
  planId: number;
  termPlanId: number;
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
export class termAddOnAmountRequestModel extends termPlanAmountReqeustModel {
  addOnName: string;
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
export class termAddOnAmountResponseModel {
  addOnName: string;
  planAddOnAmount: number;
  planId: number;
  termPlanAddOnId: number;
  termPlanId: number;
  termPlanType: string;
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
export class changeAddOnTermRequestModel {
  eventType: string;
  subscriptionAddOnId: number;
  term: string;
  termAddOnId: number;
  firmId: number;
}
export class subscribedAddonsReqeustModel {
  planSubscriptionId: number;
}
export class cardDetailsRequestModel {
  paymentMethod: string;
  firmId: number;
}
export class cardDetailsResponsetModel {
  cardNumber: string;
  cardType: string;
  creditCardId: string;
  expDate: string;
  maskBinNumber: string;
  maskNumber: string;
  token: string;
  typeName: string;
  status: string;
}
export class billingAddressRequestModel {
  firmId: number;
}
export class billingAddressResponseModel {
  bill_addr1: string;
  bill_addr2: string;
  bill_addr3: string;
  bill_city: string;
  bill_country: string;
  bill_postcode: string;
  bill_state: string;
}
export class addMoreSubscriptionRequestModel {
  term: string;
  termPlanId: number;
  eventType: string;
  firmId: number;
  subscriptionPlanId: number;
  addOns: Array<addOnsModel>;
}
export class addMoreSubscriptionResponseModel {
  status: string;
}
export class changPlanRequestModel {
  eventType: string;
  action: string;
  planActivate: string;
  termPlanId: number;
  subscriptionPlanId: number;
  addOns: Array<addOnsModel>;
}