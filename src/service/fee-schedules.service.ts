import { IBaseService, BaseService } from "./base.service";
import {
  FeeSchedulesResponseModel,
  AddFeeScheduleRequestModel,
  FeeTypesResponseModel,
  ValidateFeeScheduleRequestModel
} from "@/model";

export interface IFeeSchedulesService
  extends IBaseService<any, FeeSchedulesResponseModel> {
  getFeeSchedules(): Promise<Array<FeeSchedulesResponseModel>>;
  addFeeSchedule(request: AddFeeScheduleRequestModel): Promise<any>;
  getFeeTypes(): Promise<Array<FeeTypesResponseModel>>;
  validateFeeSchedule(request: ValidateFeeScheduleRequestModel): Promise<any>;
}

export class FeeSchedulesService
  extends BaseService<any, FeeSchedulesResponseModel>
  implements IFeeSchedulesService {
  constructor() {
    super("private", "https://bv2qa01.billfin.com/rule-service");
  }

  public getFeeSchedules(): Promise<Array<FeeSchedulesResponseModel>> {
    return this.httpGet("private/api/v1/firmFeeSchedule", null).then(
      (response) => {
        return response.data;
      }
    );
  }

  public validateFeeSchedule(request: ValidateFeeScheduleRequestModel): Promise<any> {
    return this.httpGet("private/api/v1/validateFeeSchedule", request).then(
      (response) => {
        return response.data;
      }
    );
  }

  public addFeeSchedule(request: AddFeeScheduleRequestModel): Promise<any> {
    return this.httpPost("private/api/v1/feeSchedule", request).then(
      (response) => {
        return response.data;
      }
    );
  }

  public getFeeTypes(): Promise<Array<FeeTypesResponseModel>> {
    return this.httpGet("private/api/v1/firmAUMFeeTypes", null).then(
      (response) => {
        return response.data;
      }
    );
  }
}
