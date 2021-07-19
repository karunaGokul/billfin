import { IBaseService, BaseService } from './base.service';
import { firmRequestModel, firmsResponseModel, generalBoardRequestModel } from "@/model";

export interface IFirmService extends IBaseService<any, any> {
    getFirms(): Promise<Array<firmsResponseModel>>
    getGeneralDetails(request: firmRequestModel): Promise<Array<generalBoardRequestModel>>;
    updateGeneral(request: generalBoardRequestModel): Promise<any>;
}

export class FirmService extends BaseService<any, any> implements IFirmService {

    constructor() {
        super('public');
    }

    getFirms(): Promise<Array<firmsResponseModel>> {
        return this.httpGet('private/api/v1/firm', null).then(response => {
            return response.data;
        });
    }

    getGeneralDetails(request: firmRequestModel): Promise<Array<generalBoardRequestModel>> {
        return this.httpGet('private/api/v1/onboarding/firm', request).then(response => {
            return response.data;
        });
    }

    updateGeneral(request: generalBoardRequestModel): Promise<any> {
        return this.httpPost('private/api/v1/onboarding/firmInfo', request).then(response => {
            return response.data;
        });
    }

}