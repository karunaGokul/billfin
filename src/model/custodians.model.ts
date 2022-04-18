import { TimeModel } from "./base.model";

export class AddKeysRequestModel extends TimeModel {
  custodianKey: string;
  settledTradesFlag: boolean;
  accruedInterestFlag: boolean;
  accountDisplayFormat: string;
  firmCustodianId: number;
}
export class CustodiansResponseModel extends AddKeysRequestModel {
  custodianId: number;
  custodianIdentifier: string;
  custodianName: string;
  enabled: boolean = true;
  noOfAccountsLinked: number;
}
export class AddCustodianRequestModel {
  custodianIdentifier: string;
  custodianName: string;
  noOfAccountsLinked: string;
  enabled: boolean = false;
  firmCustodianId: number;
  custodianId: number;
}
export class AddCustodianResponseModel {
  custodianIdentifier: string;
  custodianName: string;
  enabled: boolean;
}
export class TransactionCodeResponseModel extends TimeModel {
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
export class AddTransactionCodeResponseModel {}
export class DeleteTransactionCodeRequestModel {
  transactionTypeId: number;
}
