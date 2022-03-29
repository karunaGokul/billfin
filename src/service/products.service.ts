import { IBaseService, BaseService } from "./base.service";

import {
  ProductsResponseModel,
  AddProductRequestModel,
} from "@/model";

export interface IProductsService
  extends IBaseService<any, ProductsResponseModel> {
  getProducts(): Promise<Array<ProductsResponseModel>>;
  addProduct(request: AddProductRequestModel): Promise<any>;
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

  addProduct(request: AddProductRequestModel): Promise<any> {
    return this.httpPost("private/api/v1/product", request).then((response) => {
      return response.data;
    });
  }
}
