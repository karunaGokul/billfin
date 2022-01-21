import { IBaseService, BaseService } from "./base.service";
import {
  billsAndPaymentRequestModel,
  billsAndPaymentResponseModel,
  cardDetailsRequestModel,
  cardDetailsResponsetModel,
} from "@/model";

export interface IBillsAndPaymentService extends IBaseService<any, any> {
  geiBillAndPayment(
    request: billsAndPaymentRequestModel
  ): Promise<Array<billsAndPaymentResponseModel>>;
  getCardDetails(
    request: cardDetailsRequestModel
  ): Promise<Array<cardDetailsResponsetModel>>;
}
export class BillsAndPaymentService extends BaseService<any, any>
  implements IBillsAndPaymentService {
  constructor() {
    super("private", "https://bv2qa01.billfin.com/subscription-service");
  }

  geiBillAndPayment(
    request: billsAndPaymentRequestModel
  ): Promise<Array<billsAndPaymentResponseModel>> {
    return this.httpGet("private/api/v1/billAndPayments", request).then(
      (response) => {
        return response.data;
      }
    );
  }

  getCardDetails(
    request: cardDetailsRequestModel
  ): Promise<Array<cardDetailsResponsetModel>> {
    return this.httpGet("private/api/v1/allCardDetails", request).then(
      (response) => {
        return response.data;
      }
    );
  }
}
