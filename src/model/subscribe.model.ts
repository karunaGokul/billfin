import { BaseModel, DataRequest } from "./base.model";

export class createCustomerRequestModel {
  company: string;
  bill_addr1: string;
  bill_city: string;
  bill_state: string;
  bill_postcode: string;
  bill_country: string;
  external_key: string;
  superuser_name: string;
  superuser_phone: string;
  superuser_email: string;
}
export class createCustomerResponseModel extends BaseModel {
  id: number;
}
export class subscribePlanRequestModel {
  termPlanType: string;
  productCode: string;
}
export class subscribePlanResponseModel {
  planId: number;
  termPlanId: number;
  planName: string;
  termPlanAmount: number;
  paymentAmount?: number;
  aumLevel: string;
  adminUsers: string;
  clients: string;
  connector: string;
  description: string;
  planType: string;
  planDetails: Array<string>;
  preIncludedAddons: Array<subscribeAddonsResponseModel>;
}
export class subscribeAddonsRequestModel {
  termPlanType: string;
  planId: number;
}
export class subscribeAddonsResponseModel {
  addOnName: string;
  planAddOnAmount: number;
  termPlanAddOnId: number;
  selected: boolean;
  description: string;
  planType: string;
  quantity: number;
  extraInfo: string;
  isPreInclueded: boolean;
}
export class paymentTokenRequestModel {
  token: string;
  paymentMethod: string;
  firmId: number;
  reqType: string;
}
export class addOnsModel {
  termAddOnId: number;
  quantity: string;
  startDate: string;
}
export class termPlanModel {
  termPlanId: number;
  startDate: string; 
}
export class subscriptionsModel {
  termPlanId: number;
  startDate: string; 
}
export class productsModel {
  productCode: string;
  subscriptions: Array<subscriptionsModel> = [];
  addOns: Array<addOnsModel> = [];
}
export class subscribeRequestModel {
  firmId: number;
  products: Array<productsModel> = [];
}
export class subscribeResponseModel {
  status: string;
}