export class adjustmentsBoardRequestModel {
    firmId: number | any;
    payorType: string | any;
    billingType: string | any;
    feeTypeCode: string | any;
    firmMinimumFee: boolean;
    firmMaximumFee: boolean;
    minimumFeeAmount: number;
    maximumFeeAmount: number;
    adjustForFlows: boolean;
    feeScheduleRateType: string;
    flowThresholdValue: number;
    dollarRoundingFlag: boolean;
}