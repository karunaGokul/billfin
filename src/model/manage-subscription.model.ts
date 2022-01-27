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
  cancelDate: string;
  planName: string;
  planId: number;
  paymentToken: string;
  commitmentTerm: string;
  paymentAmount: number;
  endDate: string;
  renewDate: string;
  status: string;
  cardNumber: string;
  activeFlag: boolean;
  description: string;
}
export class addonsResponseModel extends addOnsModel {
  subscriptionAddOnId: number;
  addOnName: string;
  addOnId: number;
  cancelDate: string;
  cardType: string;
  paymentToken: string;
  commitmentTerm: string;
  paymentAmount: number;
  endDate: string;
  renewDate: string;
  status: string;
  cardNumber: string;
  activeFlag: boolean;
  description: string;
  planId: number;
  termPlanId: number;
}
export class manageSubscriptionResponseModel {
  productCode: string;
  subscriptions: Array<subscriptionResponseModel> = [];
  addOns: Array<addonsResponseModel> = [];
}
export class termPlanDetailsReqeustModel {
  termPlanType: string;
  planId: number;
  planSubscriptionId: number;
}
export class planDetailsResponseModel {
  planName: string;
  planCode: string;
  termPlanCode: string;
  termPlanName: string;
  termPlanAmount: number;
  planId: number;
  termPlanId: number;
}
export class termPlanDetailsResponseModel {
  plan: planDetailsResponseModel;
  addOns: Array<termAddOnDetailsResponseModel>;
}
export class termAddOnDetailsRequestModel extends termPlanDetailsReqeustModel {
  addOnName: string;
}
export class termAddOnDetailsResponseModel {
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
  cardHolderName: string;
  cardNumber: string;
  cardType: string;
  creditCardId: string;
  expDate: string;
  maskBinNumber: string;
  maskNumber: string;
  token: string;
  typeName: string;
  status: string;
  default: boolean;
  customerId: number;
  paymentFirmTokenId: number;
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
export class changePlanRequestModel {
  eventType: string;
  action: string;
  planActivate: string;
  termPlanId: number;
  subscriptionPlanId: number;
  addOns: Array<addOnsModel>;
}
export class changePlanResponseModel {
  status: string;
}
export class refundResponseModel {
  subscriptions: refundPlanResponseModel;
  addOns: Array<refundAddOnResponseModel>;
}
export class refundPlanResponseModel {
  activeFlag: boolean;
  cardNumber: string;
  cardType: string;
  commitmentTerm: string;
  customerId: string;
  endDate: string;
  firmId: number;
  paymentAmount: number;
  paymentFirmTokenId: number;
  paymentFrequency: string;
  planId: number;
  planName: string;
  refundAmount: number;
  refundEndDate: string;
  refundStartDate: string;
  renewDate: null;
  startDate: string;
  status: string;
  subscriptionPlanId: number;
  termPlanId: number;
}
export class refundAddOnResponseModel {
  activeFlag: boolean;
  addOnId: number;
  addOnName: string;
  cardNumber: string;
  cardType: string;
  commitmentTerm: string;
  customerId: string;
  endDate: string;
  firmId: number;
  paymentAmount: number;
  paymentToken: string;
  planId: number;
  planSubscriptionId: number;
  quantity: number;
  refundAmount: number;
  refundEndDate: string;
  refundStartDate: string;
  renewDate: string;
  startDate: string;
  status: string;
  subscriptionAddOnId: number;
  termAddOnId: number;
  termPlanId: number;
}
export class cancelPlanAddOnRequestModel {
  eventType: string;
  subscriptionPlanId?: number;
  subscriptionAddOnId?: number;
}
export class cancelPlanAddOnResponseModel {
  status: string;
}
export class deleteCardRequestModel {
  paymentFirmTokenId: number;
  customerId: number;
}
export class deleteCardResponseModel {
  status: string;
}