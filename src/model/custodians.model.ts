export class CustodiansResponseModel {
  custodianId: number;
  custodianIdentifier: string;
  custodianName: string;
  enabled: boolean;
  noOfAccountsLinked: number;
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