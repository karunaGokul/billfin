export class firmsResponseModel {
    firmCustodainId: number | any;
    domain: string | any;
    firmId: number | any;
    firmKey: string | any;
    name:  string | any;
    lastOnboardingStepCompleted: number | any;
    provider:  string | any;
    trialOnboardingStatus:  string | any;
    trialStartsOn: string;
    trialEndsOn: string;
    billingTypes: Array<string>;
    firmStatus: string;
}
export class firmRequestModel {
    firmDomain: string | any;
    firmName: string | any;
    firmId: number | any;
    billingType: string | any;
}
export class planModel {
    plan: any;
    addons: Array<any>;
    commitmentTerm: string;
    currentPlan: any;
}
export class SubscribeModel {
    products: Array<string>;
    aumBilling: planModel;
    subscriptionBilling: planModel;
    paymentType: string;
    creditCard: any;
    ach: any;
    address: any;
    states: Array<string>;
    planAction: string;
    activatePlan: string;
}