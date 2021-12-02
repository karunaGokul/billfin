import { IBaseService, BaseService } from "./base.service";
import {
  manageSubscriptionRequestModel,
  manageSubscriptionResponseModel,
} from "@/model";

export interface IManageSubscription
  extends IBaseService<any, manageSubscriptionResponseModel> {
    getSubscription(
    request: manageSubscriptionRequestModel
  ): Promise<manageSubscriptionResponseModel>;
  
}

export class ManageSubscription extends BaseService<
  any,
  manageSubscriptionResponseModel
> {
  constructor() {
    super("private", "https://bv2qa01.billfin.com/subscription-service");
  }

  public getSubscription(
    request: manageSubscriptionRequestModel
  ): Promise<manageSubscriptionResponseModel> {
    return this.httpGet(
      "private/api/v1/subscriptionDetails",
      request
    ).then((response) => {
      return response.data;
    });
  }

}
