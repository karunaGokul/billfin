import { IBaseService, BaseService } from "./base.service";
import {
  DataResponse,
  FeeSchedulesRequestModel,
  FeeSchedulesResponseModel,
  AddFeeScheduleRequestModel,
} from "@/model";

export interface IFeeSchedulesService
  extends IBaseService<FeeSchedulesRequestModel, FeeSchedulesResponseModel> {
  getFeeSchedules(
    request: FeeSchedulesRequestModel
  ): Promise<DataResponse<FeeSchedulesResponseModel>>;
  addFeeSchedule(request: AddFeeScheduleRequestModel): Promise<any>;
}

export class FeeSchedulesService
  extends BaseService<FeeSchedulesRequestModel, FeeSchedulesResponseModel>
  implements IFeeSchedulesService {
  constructor() {
    super("private", "https://bv2qa01.billfin.com/rule-service");
  }

  public getFeeSchedules(
    request: FeeSchedulesRequestModel
  ): Promise<DataResponse<FeeSchedulesResponseModel>> {
    return new Promise((resolve, reject) => {
      let response = new DataResponse<FeeSchedulesResponseModel>();

      response.data.push({
        name: "50 BPS + $1,000.00",
        type: "Flat",
        currencyType: "USD",
        assignments: 23,
        status: "active",
      });

      response.data.push({
        name: "0 - 1m @ 100 BPS, above 1m @ 50 BPS",
        type: "Tiered",
        currencyType: "USD",
        assignments: 51,
        status: "in-active",
      });

      response.data.push({
        name: "70 BPS",
        type: "Flat",
        currencyType: "USD",
        assignments: 3,
        status: "active",
      });

      response.pageInfo.totalPages = 1;
      response.pageInfo.totalResults = response.data.length;
      response.pageInfo.pageSize = 10;
      resolve(response);
    });
  }

  public addFeeSchedule(request: AddFeeScheduleRequestModel): Promise<any> {
    return this.httpPost("private/api/v1/feeSchedule", request).then((response) => {
      return response.data;
    });
  }
}
