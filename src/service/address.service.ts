import axios from "axios";

import { IBaseService, BaseService } from "./base.service";

export interface IAddressService extends IBaseService<any, any> {
  getState(): Promise<Array<any>>;
}

export class AddressService extends BaseService<any, any>
  implements IAddressService {
  constructor() {
    super("v1", "https://api.countrystatecity.in");
    axios.defaults.headers.common["X-CSCAPI-KEY"] =
      "WDlqRXIxQ3ZlZ2RyTUtycTdEWTU0SFN0ZWwzRUNwcVZjdDI2V1N5dQ==";
    axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
    axios.defaults.headers.common["redirect"] = "follow";
  }

  getState(): Promise<Array<any>> {
    return this.getItem(`countries/US/states`).then((response) => {
      return response;
    });
  }
}
