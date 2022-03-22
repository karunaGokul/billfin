import { IBaseService, BaseService } from "./base.service";

import { ProductsResponseModel, FeeScheduleModel } from "@/model";

export interface IProductsService
  extends IBaseService<any, ProductsResponseModel> {
  getProducts(): Promise<Array<ProductsResponseModel>>;
}
export class ProductsService extends BaseService<any, ProductsResponseModel>
  implements IProductsService {
  constructor() {
    super("private");
  }

  getProducts(): Promise<Array<ProductsResponseModel>> {
    return new Promise((resolve, reject) => {
      let response: Array<ProductsResponseModel> = [];
      let fees: Array<FeeScheduleModel> = [];

      fees.push({ name: "Advisory Fee", bps: "75 bps" });
      response.push({
        productCode: "AGPT",
        productName: "Aggressive Growth Appreciation",
        feeSchedule: fees,
        noOfAccounts: 61,
      });

      return resolve(response);
    });
  }
}
