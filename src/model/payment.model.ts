export class creditCardRequestModel {
    cardNumber: number;
    expirationMonth: number;
    expirationYear: number;
    cvv: number;
    cardHolderName: string;
    billingAddress: string;
    billingCity: string;
    billingState: string;
    postalCode: number;
    country: string;
}
export class achRequestModel {
    accountNo: number;
    routingNo: number;
    accountHolder: string;
    billingAddresss: string;
    billingCity: string;
    billingState: string;
    country: string;
    postalCode: string;
}