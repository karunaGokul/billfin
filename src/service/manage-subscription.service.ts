import { IBaseService, BaseService } from "./base.service";
import {
  manageSubscriptionRequestModel,
  manageSubscriptionResponseModel,
} from "@/model";

export interface IManageSubscription
  extends IBaseService<any, manageSubscriptionResponseModel> {
  getRes(
    request: manageSubscriptionRequestModel
  ): Promise<Array<manageSubscriptionResponseModel>>;
  
}

export class ManageSubscription extends BaseService<
  any,
  manageSubscriptionResponseModel
> {
  constructor() {
    super("private", "https://bv2qa01.billfin.com/subscription-service");
  }

  public getRes(
    request: manageSubscriptionRequestModel
  ): Promise<Array<manageSubscriptionResponseModel>> {
    return this.httpGet(
      "private/api/v1/subscriptionDetails",
      request
    ).then((response) => {
      return response.data;
    });
  }

}
