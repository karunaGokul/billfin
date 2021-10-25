export class contactsModel {
    billingAddress: string;
    billingCity: any;
    billingState: any;
    postalCode: number;
    country: any;
}
export class creditCardRequestModel extends contactsModel {
    cardNumber: number;
    expirationMonth: number;
    expirationYear: number;
    cvv: number;
    cardHolderName: string;
}
export class achRequestModel extends contactsModel {
    accountNo: number;
    routingNo: number;
    accountHolder: string;
}