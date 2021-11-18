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
export class planRequestModel {
  termPlanType: string;
  productCode: string;
}
export class planResponseModel {
  termPlanId: number;
  planName: string;
  termPlanAmount: string;
  aumLevel: string;
  adminUsers: string;
  clients: string;
  connector: string;
  description: string;
  planType: string;
  planDetails: Array<string>;
}
export class addonsRequestModel {
  termPlanId: number;
}
export class addonsResponseModel {
  addOnName: string;
  planAddOnamount: number;
  termPlanAddOnId: number;
  selected: boolean;
  description: string;
  planType: string;
  quantity: string;
  extraInfo: string;
}
export class paymentTokenRequestModel {
  token: string;
  paymentMethod: string;
  firmId: number;
}
export class addonsModel {
  termPlanAddOnId: number;
  quantity: string;
  addOnStartDate: string;
}
export class termPlanModel {
  termPlanId: number;
  planStartDate: string;
}
export class subscriptions {
  termPlan: termPlanModel;
  addons: Array<addonsModel> = [];
}
export class subscribeRequestModel {
  firmId: number;
  subscriptions: Array<subscriptions> = [];
}
export class subscribeResponseModel {
  status: string;
}
