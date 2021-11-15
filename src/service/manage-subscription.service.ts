import { IBaseService, BaseService } from "./base.service";
import {
  manageSubscriptionRequestModel,
  manageSubscriptionPlanResponseModel,
  manageSubscriptionAddonsResponseModel,
} from "@/model";

export interface IManageSubscription
  extends IBaseService<any, manageSubscriptionPlanResponseModel> {
  getPlans(
    request: manageSubscriptionRequestModel
  ): Promise<Array<manageSubscriptionPlanResponseModel>>;
  getAddons(
    request: manageSubscriptionRequestModel
  ): Promise<Array<manageSubscriptionAddonsResponseModel>>;
}

export class ManageSubscription extends BaseService<
  any,
  manageSubscriptionPlanResponseModel
> {
  constructor() {
    super("private", "https://bv2qa01.billfin.com/subscription-service");
  }

  public getPlans(
    request: manageSubscriptionRequestModel
  ): Promise<Array<manageSubscriptionPlanResponseModel>> {
    /*return this.httpGet(
      "private/api/v1/subscription/getPlanDetails",
      request
    ).then((response) => {
      return response.data;
    });*/

    return new Promise((resolve, reject) => {
      const response: Array<manageSubscriptionPlanResponseModel> = [];
      response.push({
        termPlanId: 0,
        planName: "Standard",
        termPlanAmount: "1188",
        description: "For small to medium-sized RIAs",
        planType: "Yr",
        status: "active",
        planStatus: "Renew",
        startDate: "12/30/2020",
        endDate: "12/31/2021",
        cardType: "mast",
        cardNumber: "6789",
      });
      return resolve(response);
    });
  }

  public getAddons(
    request: manageSubscriptionRequestModel
  ): Promise<Array<manageSubscriptionAddonsResponseModel>> {
    return new Promise((resolve, reject) => {
      const response: Array<manageSubscriptionAddonsResponseModel> = [];
      response.push({
        addOnName: "Average Daily Balances",
        planAddOnamount: "1188",
        termPlanAddOnId: 1,
        description: "Support ADB calculations and reporting",
        planType: "Yr",
        planStatus: "Renew",
        startDate: "12/30/2020",
        endDate: "12/31/2021",
        status: "active",
        cardType: "mastt",
        cardNumber: "6789",
      });
      response.push({
        addOnName: "Admin user License",
        planAddOnamount: "2388",
        termPlanAddOnId: 1,
        description: "Support ADB calculations and reporting",
        planType: "Yr",
        planStatus: "Renew",
        startDate: "12/30/2020",
        endDate: "12/31/2021",
        status: "active",
        cardType: "mastt",
        cardNumber: "6789",
      });
      return resolve(response);
    });
  }
}
