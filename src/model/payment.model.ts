export class paymentRequestModel {
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