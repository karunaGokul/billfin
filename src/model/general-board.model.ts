export class generalBoardRequestModel {
    company: string | any;
    companyPhone: string | any;
    companyDomain: string | any = "universal-advisort-lic.com";
    companyAddress: string | any;
    city: string | any;
    state: string | any;
    postalCode: number | any;
    feesBill: Array<string> | Array<any> = [];
}