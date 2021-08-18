export class frequencyRequestModel {
    firmId: number | any;
    aumFeeTypes: Array<aumFeeTypes>;
}

export class frequencyResponseModel {
    status: string | any;
}
export class aumFeeTypes {
    feeTypeCode: string;
    feeTypeName: string;
    aumFlag: boolean;
    id: number;
    aumDetails: aumDetails = new aumDetails();
}
export class aumDetails {
    firmId: number = 0;
    feeTypeName: string = '';
    aumFeeTypeFlag: boolean = false;
    onboardingFeeTypeId: number = 0;
    billingFrequency: Array<string>  = [];
    billingMethod: Array<string> = [];
    defaultBillingFrequency: string = '';
    defaultBillingMethod: string = '';
    offsetCycleFlag: boolean = false;
    defaultOffsetCycle: string = '';
}