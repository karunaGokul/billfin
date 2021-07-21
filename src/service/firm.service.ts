import { IBaseService, BaseService } from './base.service';
import { firmRequestModel, firmsResponseModel, generalBoardRequestModel, generalBoardResponseModel, frequencyRequestModel, frequencyResponseModel, methodologiesBoardModel } from "@/model";

export interface IFirmService extends IBaseService<any, any> {
    getFirms(): Promise<Array<firmsResponseModel>>

    getGeneralDetails(request: firmRequestModel): Promise<generalBoardRequestModel>;
    saveGeneral(request: generalBoardRequestModel): Promise<generalBoardResponseModel>;

    getFrequencyAndTiming(request: firmRequestModel): Promise<frequencyRequestModel>;
    saveFrequncyAndTiming(request: frequencyRequestModel): Promise<frequencyResponseModel>;

    getMethodologies(request: firmRequestModel): Promise<frequencyRequestModel>;
    saveMethodologies(request: methodologiesBoardModel): Promise<frequencyResponseModel>;
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

    getGeneralDetails(request: firmRequestModel): Promise<generalBoardRequestModel> {
        return this.httpGet('private/api/v1/firm/general', request).then(response => {
            return response.data;
        });
    }

    saveGeneral(request: generalBoardRequestModel): Promise<generalBoardResponseModel> {
        return this.httpPost('private/api/v1/firm/general', request).then(response => {
            return response.data;
        });
    }

    getFrequencyAndTiming(request: firmRequestModel): Promise<frequencyRequestModel> {
        return this.httpGet('private/api/v1/firm/frequencyAndTiming', request).then(response => {
            return response.data;
        });
    }

    saveFrequncyAndTiming(request: frequencyRequestModel): Promise<frequencyResponseModel> {
        return this.httpPost('private/api/v1/firm/frequencyAndTiming', request).then(response => {
            return response.data;
        });
    }

    getMethodologies(request: firmRequestModel): Promise<frequencyRequestModel> {
        return this.httpGet('private/api/v1/firm/methodologies', request).then(response => {
            return response.data;
        });
    }

    saveMethodologies(request: methodologiesBoardModel): Promise<frequencyResponseModel> {
        return this.httpPost('private/api/v1/firm/methodologies', request).then(response => {
            return response.data;
        });
    }

}