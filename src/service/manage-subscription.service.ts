import { IBaseService, BaseService } from "./base.service";
import {
  manageSubscriptionRequestModel,
  manageSubscriptionResponseModel,
  termPlanDetailsReqeustModel,
  termPlanDetailsResponseModel,
  termAddOnDetailsRequestModel,
  termAddOnDetailsResponseModel,
  changePlanTermRequestModel,
  changePlanTermResponseModel,
  changeAddOnTermRequestModel,
  cardDetailsRequestModel,
  cardDetailsResponsetModel,
  billingAddressResponseModel,
  addMoreSubscriptionRequestModel,
  addMoreSubscriptionResponseModel,
  subscribedAddonsReqeustModel,
  refundResponseModel,
  changePlanRequestModel,
  changePlanResponseModel,
  cancelPlanAddOnRequestModel,
  cancelPlanAddOnResponseModel,
  deleteCardRequestModel,
  deleteCardResponseModel,
} from "@/model";

export interface IManageSubscription
  extends IBaseService<any, manageSubscriptionResponseModel> {
  getSubscription(
    request: manageSubscriptionRequestModel
  ): Promise<manageSubscriptionResponseModel>;
  getTermPlanDetails(
    request: termPlanDetailsReqeustModel
  ): Promise<termPlanDetailsResponseModel>;
  changePlanTerm(
    request: changePlanTermRequestModel
  ): Promise<changePlanTermResponseModel>;
  getCardDetails(
    request: cardDetailsRequestModel
  ): Promise<Array<cardDetailsResponsetModel>>;
  getTermAddOnDetails(
    request: termAddOnDetailsRequestModel
  ): Promise<termAddOnDetailsResponseModel>;
  changeAddOnTerm(
    request: changeAddOnTermRequestModel
  ): Promise<changePlanTermResponseModel>;
  getBillingAddress(): Promise<billingAddressResponseModel>;
  subscribeAddOns(
    request: addMoreSubscriptionRequestModel
  ): Promise<addMoreSubscriptionResponseModel>;
  getRefundDetails(
    request: subscribedAddonsReqeustModel
  ): Promise<refundResponseModel>;
  changePlan(request: changePlanRequestModel): Promise<changePlanResponseModel>;
  cancelPlanAddOn(
    request: cancelPlanAddOnRequestModel,
    path: string
  ): Promise<changePlanResponseModel>;
  deleteCard(request: deleteCardRequestModel): Promise<deleteCardResponseModel>;
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

  public getTermPlanDetails(
    request: termPlanDetailsReqeustModel
  ): Promise<termPlanDetailsResponseModel> {
    return this.httpGet("private/api/v1/termPlanDetail", request).then(
      (response) => {
        return response.data;
      }
    );
  }

  public getTermAddOnDetails(
    request: termAddOnDetailsRequestModel
  ): Promise<termAddOnDetailsResponseModel> {
    return this.httpGet("private/api/v1/termAddOnDetail", request).then(
      (response) => {
        return response.data;
      }
    );
  }

  public changePlanTerm(
    request: changePlanTermRequestModel
  ): Promise<changePlanTermResponseModel> {
    return this.httpPost("private/api/v1/changePlanTerm", request).then(
      (response) => {
        return response.data;
      }
    );
  }

  public changeAddOnTerm(
    request: changeAddOnTermRequestModel
  ): Promise<changePlanTermResponseModel> {
    return this.httpPost("private/api/v1/changeAddOnTerm", request).then(
      (response) => {
        return response.data;
      }
    );
  }

  public getCardDetails(
    request: cardDetailsRequestModel
  ): Promise<Array<cardDetailsResponsetModel>> {
    return this.httpGet("private/api/v1/cardDetails", request).then(
      (response) => {
        return response.data;
      }
    );
  }

  public getBillingAddress(): Promise<billingAddressResponseModel> {
    return this.httpGet("private/api/v1/billingAddress", null).then(
      (response) => {
        return response.data;
      }
    );
  }

  public subscribeAddOns(
    request: addMoreSubscriptionRequestModel
  ): Promise<addMoreSubscriptionResponseModel> {
    return this.httpPost("private/api/v1/addMoreAddOn", request).then(
      (response) => {
        return response.data;
      }
    );
  }

  public getRefundDetails(
    request: subscribedAddonsReqeustModel
  ): Promise<refundResponseModel> {
    return this.httpGet("private/api/v1/getRefundDetails", request).then(
      (response) => {
        return response.data;
      }
    );
  }

  public changePlan(
    request: changePlanRequestModel
  ): Promise<changePlanResponseModel> {
    return this.httpPost("private/api/v1/changePlan", request).then(
      (response) => {
        return response.data;
      }
    );
  }

  public cancelPlanAddOn(
    request: cancelPlanAddOnRequestModel,
    path: string
  ): Promise<cancelPlanAddOnResponseModel> {
    return this.httpPost("private/api/v1/" + path, request).then((response) => {
      return response.data;
    });
  }

  public deleteCard(
    request: deleteCardRequestModel
  ): Promise<deleteCardResponseModel> {
    return this.httpPost("private/api/v1/deleteCard", request).then(
      (response) => {
        return response.data;
      }
    );
  }
}
