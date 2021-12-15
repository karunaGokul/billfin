import { IBaseService, BaseService } from "./base.service";
import {
  manageSubscriptionRequestModel,
  manageSubscriptionResponseModel,
  termPlanAmountReqeustModel,
  termPlanAmountResponseModel,
  changePlanTermRequestModel,
  changePlanTermResponseModel,
} from "@/model";

export interface IManageSubscription
  extends IBaseService<any, manageSubscriptionResponseModel> {
  getSubscription(
    request: manageSubscriptionRequestModel
  ): Promise<manageSubscriptionResponseModel>;
  getTermPlanAmount(
    request: termPlanAmountReqeustModel
  ): Promise<termPlanAmountResponseModel>;
  changePlan(
    request: changePlanTermRequestModel
  ): Promise<changePlanTermResponseModel>;
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
    return this.httpGet("private/api/v1/subscriptionDetails", request).then(
      (response) => {
        return response.data;
      }
    );
  }

  public getTermPlanAmount(
    request: termPlanAmountReqeustModel
  ): Promise<termPlanAmountResponseModel> {
    return this.httpGet(
      "private/api/v1/subscription/termPlanDetail",
      request
    ).then((response) => {
      return response.data;
    });
  }

  public changePlan(
    request: changePlanTermRequestModel
  ): Promise<changePlanTermResponseModel> {
    return this.httpPost(
      "private/api/v1/changePlanTerm",
      request
    ).then((response) => {
      return response.data;
    });
  }
}
