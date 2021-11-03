import { countryModel, stateModel, cityModel } from "@/model";
import axios from "axios";

import { IBaseService, BaseService } from "./base.service";

export interface IAddressService extends IBaseService<any, any> {
  getCountrys(): Promise<Array<countryModel>>;
  getState(country: string): Promise<Array<stateModel>>;
  getCity(country: string, state: string): Promise<Array<stateModel>>;
}

export class AddressService extends BaseService<any, any>
  implements IAddressService {
  constructor() {
    super("v1", "https://api.countrystatecity.in");
    axios.defaults.headers.common["X-CSCAPI-KEY"] =
      "WDlqRXIxQ3ZlZ2RyTUtycTdEWTU0SFN0ZWwzRUNwcVZjdDI2V1N5dQ==";
      axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    axios.defaults.headers.common["redirect"] = "follow";
  }

  getCountrys(): Promise<Array<countryModel>> {
    return this.getItem("countries").then((response) => {
      return response;
    });
  }

  getState(country: string): Promise<Array<stateModel>> {
    return this.getItem(`countries/${country}/states`).then((response) => {
      return response;
    });
  }

  getCity(country: string, state: string): Promise<Array<stateModel>> {
    return this.getItem(`countries/${country}/states/${state}/cities`).then(
      (response) => {
        return response;
      }
    );
  }
}
