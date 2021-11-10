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

export class planDetails {
  planInfo: string;
  access: boolean;
}
export class planRequestModel {
  termPlanType: string;
}
export class planResponseModel {
  termPlanId: number;
  planName: string;
  termPlanAmount: string;
  description: string;
  planType: string;
  extraInfo: string;
  planDetails: Array<planDetails>;
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
  extraInfo: string;
  quantity: string;
}
export class paymentTokenRequestModel {
  token: string;
  paymentMethod: string;
  firmId: number;
}
export class addons {
  termPlanAddOnId: number;
  quantity: string;
}
export class subscribeRequestModel {
  firmId: number;
  termPlanId: number;
  startDate: string;
  addons: Array<addons>;
}
export class subscribeResponseModel {
  status: string;
}
