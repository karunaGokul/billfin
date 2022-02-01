import { firmRequestModel } from "./firm.model";

export class SettingsModel {
  public plans: Array<plansListResponseModel>;
  public addOns: Array<addOnsListResponseModel>;
}
export class plansListResponseModel {
  planName: string;
  description: string;
  aumLevel: string;
  adminUsers: string;
  clients: string;
  connector: string;
  planDetails: Array<string>;
  preIncludedAddons: Array<preIncludedAddonsResponseModel>;
}
export class preIncludedAddonsResponseModel {
  addOnName: string;
  isPreInclueded: boolean;
}
export class addOnsListResponseModel {
  addOnName: string;
  description: string;
  extraInfo: string;
  selected: boolean;
  quantity: number;
  isPreInclueded: boolean;
}
export class EntitlemenetResponseModel {
  firms: firmRequestModel;
  dataEntitlements: Array<firmRequestModel>;
  firmId: string;
  settings: SettingsModel;
}
