export class frequencyRequestModel {
    firmId: number | any;
    payorType: string | any;
    billingType: string | any;
    feeTypeCode: string | any;
    billingFrequency: Array<string> | Array<any> = [];
    billingMethod: Array<string> | Array<any> = [];
    defaultBillingFrequency: string | any;
    defaultBillingMethod: string | any;
    offsetCycleFlag: boolean = false;
    defaultOffsetCycle: string | any;
}

export class frequencyResponseModel {
    status: string | any;
}