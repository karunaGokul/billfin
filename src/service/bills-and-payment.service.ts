import { IBaseService, BaseService } from "./base.service";
import {
  billsAndPaymentRequestModel,
  billsAndPaymentResponseModel,
} from "@/model";

export interface IBillsAndPaymentService extends IBaseService<any, any> {
  geiBillAndPayment(
    request: billsAndPaymentRequestModel
  ): Promise<Array<billsAndPaymentResponseModel>>;
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
}
