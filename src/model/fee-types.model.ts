export class feeTypes {
    feeTypeCode: string;
    feeTypeName: string;
    aumFlag?: boolean;
    id?: number;
    selected?: boolean;
}
export class feeTypesRequestModel {
    billingType: Array<string> = [];
    aumFeeTypes: aumFeeTypes = new aumFeeTypes();
    nonAUMFeeTypes: nonAUMFeeTypes = new nonAUMFeeTypes();
}
class aumFeeTypes {
    feeTypes: Array<feeTypes> = [];
    commonFrequencyTimingFlag: boolean = false;
    commonAssetMethodologyFlag: boolean = false;
}
export class nonAUMFeeTypes {
    feeTypes: Array<feeTypes> = [];
    commonFrequencyTimingFlag: boolean = false;
}