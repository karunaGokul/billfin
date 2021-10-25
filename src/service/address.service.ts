import { countryModel, stateModel, cityModel } from "@/model";
import axios from "axios";

import { IBaseService, BaseService } from "./base.service";

export interface IAddressService extends IBaseService<any, any> {
  getCountrys(): Promise<Array<countryModel>>;
  getState(country: string): Promise<Array<stateModel>>;
  getCity(country: string, state: string): Promise<Array<stateModel>>;
  getPick(): Promise<any>;
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

  getPick(): Promise<any> {
    return new Promise((resolve, reject) => {
      axios.defaults.headers["Authorization"] = `Basic ${btoa(
        "JdUksla7QE1mM3DNvH4xWhZPzqIRy956" +
          ":" +
          "2zv8pO3Lfbs0r5hVgeHaXDynRWoK4dY1"
      )}`;
      axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
      axios
        .get<any>("https://redi2-staging.chargeover.com/api/v3/item")
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
      const response: any = "";
      resolve(response);
    });
  }
}
