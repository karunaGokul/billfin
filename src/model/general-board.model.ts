export class generalBoardRequestModel {
    company: string | any;
    companyPhone: string | any;
    companyDomain: string | any;
    companyAddress1: string | any;
    city: string | any;
    state: string | any;
    postalCode: number | any;
    //billingTypes: Array<string> | Array<any> = [];
    firmId: number;
}

export class generalBoardResponseModel {
    status: string | any;
}