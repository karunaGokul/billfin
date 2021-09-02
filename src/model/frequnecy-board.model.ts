export class frequencyRequestModel {
    firmId: number | any;
    aumFeeTypes: Array<aumFeeTypes> = [];
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
    feeTypeName: string = "";
    aumFeeTypeFlag: boolean = false;
    onboardingFeeTypeId: number = 0;
    onboardingFeeTypeCode: string = "";
    billingFrequency: Array<string> = [];
    billingMethod: Array<string> = [];
    defaultBillingFrequency: string = "";
    defaultBillingMethod: string = "";
    offsetCycleFlag: boolean = false;
    defaultOffsetCycle: string = "";
    valuationMethod: Array<string> = [];
    defaultValuationMethod: string = "";
    initialBillingValuationMethod: string = "";
    defaultProrationMethod: string = "";
    expressRatesAs: string = "";
    feeScheduleRateType: string = "";
    inceptionValuationMethod: string = "";
    flowBillingType: string = "";
    flowThresholdType: string = "";
    flowThresholdValue: string = "";
    dollarRoundingFlag: boolean = false;
    minimumFeeAmount: string = "";
    maximumFeeAmount: string = "";
    adjustForFlows: boolean = false;
    nonAUMBillingType: string = "";
    forward: boolean = false;

    firmMinimumFee:boolean = false;
    firmMaximumFee:boolean = false;
}