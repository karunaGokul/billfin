export class generalBoardRequestModel {
    company: string | any;
    companyPhone: string | any;
    companyDomain: string | any = "universal-advisort-lic.com";
    companyAddress: string | any;
    city: string | any;
    state: string | any;
    postalCode: number | any;
    billingTypes: Array<string> | Array<any> = [];
}
export class firmRequestModel {
    firmDomain: string | any;
    firmName: string | any;
}