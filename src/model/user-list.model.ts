import { BaseModel, DataRequest } from "./base.model";

export class UserResponseModel extends BaseModel {
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  roleName: string;
  roleId: number;
  status: string;
  imgUrl: string;
  isActive: boolean;
  profilePhoto: string;
  uuid: string;
}
export class AddUserRequestModel {
  firstName: string;
  lastName: string;
  email: string;
  roleId: number;
  isActive: boolean = false;
  uuid: string;
}
export class AddUserResponseModel {
  domain: string;
  email: string;
  status: string;
  uuid: string;
}
export class RolesResponseModel {
  roleId: number;
  roleName: string;
}
