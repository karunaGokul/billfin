export class CustodiansResponseModel {
  custodianId: number;
  custodianIdentifier: string;
  custodianName: string;
  enabled: boolean;
  noOfAccountsLinked: number;
  firmCustodianId: number;
}
export class AddCustodianRequestModel {
  custodianIdentifier: string;
  custodianName: string;
  enabled: boolean = false;
}
export class AddCustodianResponseModel {
  custodianIdentifier: string;
  custodianName: string;
  enabled: boolean;
}
export class TransactionCodeResponseModel {
  externalTransactionValue: string;
  firmCustodianId: number;
  firmId: number;
  transactionDescription: string;
  transactionType: string;
  transactionTypeId: number;
}
export class AddTransactionCodeRequestModel {
  transactionDescription: string;
  transactionType: string;
  externalTransactionValue: string;
  firmCustodianId: number;
}
export class AddTransactionCodeResponseModel {

}