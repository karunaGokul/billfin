export class firmsResponseModel {
    firmCustodainId: number | any;
    domain: string | any;
    firmId: number | any;
    firmKey: string | any;
    name:  string | any;
    lastOnboardingStepCompleted: number | any;
    provider:  string | any;
    trialOnboardingStatus:  string | any;
    billingTypes: Array<string>;
}
export class firmRequestModel {
    firmDomain: string | any;
    firmName: string | any;
    firmId: number | any;
    billingType: string | any;
}