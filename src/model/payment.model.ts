export class contactsModel {
    billingAddress: string;
    billingCity: string;
    billingState: string;
    postalCode: number;
    country: string;
}
export class creditCardRequestModel extends contactsModel {
    cardNumber: string;
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