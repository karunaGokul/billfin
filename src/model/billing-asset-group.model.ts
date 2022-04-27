export class AssetGroupResponseModel {
  assetGroup: string;
  fidelity: Array<FidelityTypeModel>;
  schwab: Array<FidelityTypeModel>;
  td: Array<FidelityTypeModel>;
}
export class FidelityTypeModel {
  type: string;
  value: string;
}
export class BillingAssetGroupsResponseModel {
  groupType: string;
  groups: Array<AssetGroupResponseModel> = [];
}
