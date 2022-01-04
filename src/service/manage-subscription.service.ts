import { IBaseService, BaseService } from "./base.service";
import {
  manageSubscriptionRequestModel,
  manageSubscriptionResponseModel,
  termPlanAmountReqeustModel,
  termPlanAmountResponseModel,
  termAddOnAmountRequestModel,
  termAddOnAmountResponseModel,
  changePlanTermRequestModel,
  changePlanTermResponseModel,
  changeAddOnTermRequestModel,
  cardDetailsRequestModel,
  cardDetailsResponsetModel,
  billingAddressRequestModel,
  billingAddressResponseModel,
  addMoreSubscriptionRequestModel,
  addMoreSubscriptionResponseModel,
  subscribedAddonsReqeustModel,
  refundResponseModel,
  changePlanRequestModel,
  changePlanResponseModel
} from "@/model";

export interface IManageSubscription
  extends IBaseService<any, manageSubscriptionResponseModel> {
  getSubscription(
    request: manageSubscriptionRequestModel
  ): Promise<manageSubscriptionResponseModel>;
  getTermPlanAmount(
    request: termPlanAmountReqeustModel
  ): Promise<termPlanAmountResponseModel>;
  changePlanTerm(
    request: changePlanTermRequestModel
  ): Promise<changePlanTermResponseModel>;
  getCardDetails(
    request: cardDetailsRequestModel
  ): Promise<Array<cardDetailsResponsetModel>>;
  getTermAddOnAmount(
    request: termAddOnAmountRequestModel
  ): Promise<termAddOnAmountResponseModel>;
  changeAddOnTerm(
    request: changeAddOnTermRequestModel
  ): Promise<changePlanTermResponseModel>;
  getBillingAddress(
    request: billingAddressRequestModel
  ): Promise<billingAddressResponseModel>;
  subscribeAddOns(
    request: addMoreSubscriptionRequestModel
  ): Promise<addMoreSubscriptionResponseModel>;
  getRefundDetails(request: subscribedAddonsReqeustModel): Promise<refundResponseModel>;
  changePlan(
    request: changePlanRequestModel
  ): Promise<changePlanResponseModel>
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

  public getTermAddOnAmount(
    request: termAddOnAmountRequestModel
  ): Promise<termAddOnAmountResponseModel> {
    return this.httpGet(
      "private/api/v1/subscription/termAddOnDetail",
      request
    ).then((response) => {
      return response.data;
    });
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

  public getBillingAddress(
    request: billingAddressRequestModel
  ): Promise<billingAddressResponseModel> {
    return this.httpGet("private/api/v1/billingAddress", request).then(
      (response) => {
        return response.data;
      }
    );
  }

  public subscribeAddOns(
    request: addMoreSubscriptionRequestModel
  ): Promise<addMoreSubscriptionResponseModel> {
    return this.httpPost("private/api/v1/addOn", request).then((response) => {
      return response.data;
    });
  }

  public getRefundDetails(request: subscribedAddonsReqeustModel): Promise<refundResponseModel> {
    return this.httpGet("private/api/v1/getRefundDetails", request).then(
      (response) => {
        return response.data;
      }
    );
  }

  public changePlan(
    request: changePlanRequestModel
  ): Promise<changePlanResponseModel> {
    return this.httpPost("private/api/v1/changePlan", request).then((response) => {
      return response.data;
    });
  }
}
