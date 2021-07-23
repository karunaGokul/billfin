export class methodologiesRequestModel {
    firmId: number | any;
    payorType: string | any;
    billingType: string | any;
    feeTypeCode: string | any;
    valuationMethod: Array<string> | Array<any> = [];
    defaultValuationMethod: string | any;
    initialBillingValuationMethod: string | any;
    defaultProrationMethod: string | any;
    expressRatesAs: string | any;
}