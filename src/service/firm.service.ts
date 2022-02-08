import { IBaseService, BaseService } from './base.service';
import { 
    firmRequestModel, 
    firmsResponseModel, 
    generalBoardRequestModel, 
    generalBoardResponseModel, 
    feeTypes,
    feeTypesRequestModel,
    frequencyRequestModel, 
    aumDetails,
    frequencyResponseModel
} from "@/model";

export interface IFirmService extends IBaseService<any, any> {
    getFirms(): Promise<Array<firmsResponseModel>>

    getGeneralDetails(): Promise<generalBoardRequestModel>;
    saveGeneral(request: generalBoardRequestModel): Promise<generalBoardResponseModel>;

    getFeeType(): Promise<Array<feeTypes>>;
    getFeeTypesSetup(): Promise<feeTypesRequestModel>;
    saveFeeTypesSetup(request: feeTypesRequestModel): Promise<frequencyResponseModel>;

    getFrequencyAndTiming(request: firmRequestModel): Promise<frequencyRequestModel>;
    saveFrequncyAndTiming(request: aumDetails): Promise<frequencyResponseModel>;

    getMethodologies(): Promise<frequencyRequestModel>;
    saveMethodologies(request: aumDetails): Promise<frequencyResponseModel>;

    getAdjustments(request: firmRequestModel): Promise<frequencyRequestModel>;
    saveAdjustments(request: aumDetails): Promise<frequencyResponseModel>;

    saveConfirm(request: firmRequestModel): Promise<frequencyRequestModel>;
}

export class FirmService extends BaseService<any, any> implements IFirmService {

    constructor() {
        super('public');
    }

    getFirms(): Promise<Array<firmsResponseModel>> {
        return this.httpGet('private/api/v1/firms', null).then(response => {
            return response.data;
        });
    }

    getGeneralDetails(): Promise<generalBoardRequestModel> {
        return this.httpGet('private/api/v1/firm/general', null).then(response => {
            return response.data;
        });
    }

    saveGeneral(request: generalBoardRequestModel): Promise<generalBoardResponseModel> {
        return this.httpPost('private/api/v1/firm/general', request).then(response => {
            return response.data;
        });
    } 

    getFeeType(): Promise<Array<feeTypes>> {
        return this.httpGet('private/api/v1/feeTypes', null).then(response => {
            return response.data;
        });
    }

    getFeeTypesSetup(): Promise<feeTypesRequestModel> {
        return this.httpGet('private/api/v1/firm/feeTypesSetup', null).then(response => {
            return response.data;
        });
    }

    saveFeeTypesSetup(request: feeTypesRequestModel): Promise<frequencyResponseModel> {
        return this.httpPost('private/api/v1/firm/feeTypesSetup', request).then(response => {
            return response.data;
        });
    }

    getFrequencyAndTiming(request: firmRequestModel): Promise<frequencyRequestModel> {
        return this.httpGet('private/api/v1/firm/frequencyAndTiming', request).then(response => {
            return response.data;
        });
    }

    saveFrequncyAndTiming(request: aumDetails): Promise<frequencyResponseModel> {
        return this.httpPost('private/api/v1/firm/frequencyAndTiming', request).then(response => {
            return response.data;
        });
    }

    getMethodologies(): Promise<frequencyRequestModel> {
        return this.httpGet('private/api/v1/firm/methodologies', null).then(response => {
            return response.data;
        });
    }

    saveMethodologies(request: aumDetails): Promise<frequencyResponseModel> {
        return this.httpPost('private/api/v1/firm/methodologies', request).then(response => {
            return response.data;
        });
    }

    getAdjustments(request: firmRequestModel): Promise<frequencyRequestModel> {
        return this.httpGet('private/api/v1/firm/adjustments', request).then(response => {
            return response.data;
        });
    }

    saveAdjustments(request: aumDetails): Promise<frequencyResponseModel> {
        return this.httpPost('private/api/v1/firm/adjustments', request).then(response => {
            return response.data;
        });
    }

    saveConfirm(request: firmRequestModel): Promise<frequencyRequestModel> {
        return this.httpPost('private/api/v1/firm/onboardingConfirmation', request).then(response => {
            return response.data;
        });
    }


}