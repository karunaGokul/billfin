import { BaseModel, DataRequest } from "./base.model";

export class UserRequestModel extends DataRequest {}
export class UserResponseModel extends BaseModel {
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  roleName: string;
  status: string;
  imgUrl: string;
}
export class AddUserRequestModel {
  firstName: string;
  lastName: string;
  email: string;
  roleId: string;
  isActive: boolean;
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
