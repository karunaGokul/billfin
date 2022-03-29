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
    return this.httpGet("private/api/v1/firmProduct", null).then((response) => {
      return response.data;
    });
  }
}
