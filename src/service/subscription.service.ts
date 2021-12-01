import { IBaseService, BaseService } from "./base.service";
import {
  createCustomerRequestModel,
  createCustomerResponseModel,
  subscribePlanRequestModel,
  subscribePlanResponseModel,
  subscribeAddonsRequestModel,
  subscribeAddonsResponseModel,
  paymentTokenRequestModel,
  subscribeRequestModel,
  subscribeResponseModel
} from "@/model";

export interface ISubscripeService extends IBaseService<any, any> {
  getPlans(request: subscribePlanRequestModel): Promise<Array<subscribePlanResponseModel>>;
  getAddons(request: subscribeAddonsRequestModel): Promise<Array<subscribeAddonsResponseModel>>;
  createCustomer(
    request: createCustomerRequestModel
  ): Promise<createCustomerResponseModel>;
  updatePaymentToken(request: paymentTokenRequestModel): Promise<any>;
  createSubscription(request: subscribeRequestModel): Promise<subscribeResponseModel>;
}
export class SubscripeService extends BaseService<any, any>
  implements ISubscripeService {
  constructor() {
    super("private", "https://bv2qa01.billfin.com/subscription-service");
  }

  public getPlans(
    request: subscribePlanRequestModel
  ): Promise<Array<subscribePlanResponseModel>> {
    return this.httpGet(
      "private/api/v1/subscription/getPlanDetails",
      request
    ).then((response) => {
      return response.data;
    });
  }

  public getAddons(
    request: subscribeAddonsRequestModel
  ): Promise<Array<subscribeAddonsResponseModel>> {
    return this.httpGet(
      "private/api/v1/subscription/getAddOnDetails",
      request
    ).then((response) => {
      return response.data;
    });
  }

  public createCustomer(
    request: createCustomerRequestModel
  ): Promise<createCustomerResponseModel> {
    return this.post(request, "api/v1/paymentFirm").then((response) => {
      return response.data;
    });
  }

  public updatePaymentToken(request: paymentTokenRequestModel): Promise<any> {
    return this.post(request, "api/v1/paymentFirmToken").then((response) => {
      return response.data;
    });
  }

  public createSubscription(request: subscribeRequestModel): Promise<subscribeResponseModel> {
    return this.post(request, "api/v1/subscription/subscriptionPayment").then((response) => {
      return response.data;
    });
  }

}