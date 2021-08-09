import { IBaseService, BaseService } from './base.service';
import { 
    firmRequestModel, 
    firmsResponseModel, 
    generalBoardRequestModel, 
    generalBoardResponseModel, 
    frequencyRequestModel, 
    frequencyResponseModel, 
    methodologiesRequestModel,
    adjustmentsBoardRequestModel,
    ListItem
} from "@/model";

export interface IFirmService extends IBaseService<any, any> {
    getFirms(): Promise<Array<firmsResponseModel>>

    getGeneralDetails(request: firmRequestModel): Promise<generalBoardRequestModel>;
    saveGeneral(request: generalBoardRequestModel): Promise<generalBoardResponseModel>;

    getAUMAdvisory(): Promise<Array<ListItem>>;
    getNonAUMBilling(): Promise<Array<ListItem>>;

    getFrequencyAndTiming(request: firmRequestModel): Promise<frequencyRequestModel>;
    saveFrequncyAndTiming(request: frequencyRequestModel): Promise<frequencyResponseModel>;

    getMethodologies(request: firmRequestModel): Promise<methodologiesRequestModel>;
    saveMethodologies(request: methodologiesRequestModel): Promise<frequencyResponseModel>;

    getAdjustments(request: firmRequestModel): Promise<adjustmentsBoardRequestModel>;
    saveAdjustments(request: adjustmentsBoardRequestModel): Promise<frequencyResponseModel>;
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

    getAUMAdvisory(): Promise<Array<ListItem>> {
        return new Promise((resolve, reject) => {
            const items: Array<ListItem> = [];
            items.push(new ListItem("Advisory Fee", "ADVISORY_FEE"));
            items.push(new ListItem("Management Fee", "MANAGEMENT_FEE"));
            items.push(new ListItem("Platform Fee", "PLATFORM_FEE"));
            items.push(new ListItem("Strategy Fee", "STARTEGY_FEE"));

            resolve(items);
        });
    } 

    getNonAUMBilling(): Promise<Array<ListItem>> {
        return new Promise((resolve, reject) => {
            const items: Array<ListItem> = [];
            items.push(new ListItem("Financial Fee", "FINANCIAL_FEE"));
            items.push(new ListItem("Consulting Fee", "CONSULTING_FEE"));
            items.push(new ListItem("Estate Planning Fee", "ESTATE_PLANNING_FEE"));
            items.push(new ListItem("Tax Strategy Fee", "TAX_STARTEGY_FEE"));

            resolve(items);
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

    getMethodologies(request: firmRequestModel): Promise<methodologiesRequestModel> {
        return this.httpGet('private/api/v1/firm/methodologies', request).then(response => {
            return response.data;
        });
    }

    saveMethodologies(request: methodologiesRequestModel): Promise<frequencyResponseModel> {
        return this.httpPost('private/api/v1/firm/methodologies', request).then(response => {
            return response.data;
        });
    }

    getAdjustments(request: firmRequestModel): Promise<adjustmentsBoardRequestModel> {
        return this.httpGet('private/api/v1/firm/adjustments', request).then(response => {
            return response.data;
        });
    }

    saveAdjustments(request: adjustmentsBoardRequestModel): Promise<frequencyResponseModel> {
        return this.httpPost('private/api/v1/firm/adjustments', request).then(response => {
            return response.data;
        });
    }

}