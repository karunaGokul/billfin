import { IBaseService, BaseService } from "./base.service";
import {
  UserResponseModel,
  AddUserRequestModel,
  AddUserResponseModel,
  RolesResponseModel,
} from "@/model";

export interface IUserListService extends IBaseService<any, UserResponseModel> {
  getUserList(): Promise<Array<UserResponseModel>>;
  getRoles(): Promise<Array<RolesResponseModel>>;
  addUser(request: AddUserRequestModel): Promise<AddUserResponseModel>;
  uploadPhoto(file: File, uuid: string): Promise<any>;
}

export class UserListService extends BaseService<any, UserResponseModel>
  implements IUserListService {
  constructor() {
    super("private");
  }

  getUserList(): Promise<Array<UserResponseModel>> {
    return this.httpGet("private/api/v1/users", null).then((response) => {
      return response.data;
    });
  }

  getRoles(): Promise<Array<RolesResponseModel>> {
    return this.httpGet("private/api/v1/roles", null).then((response) => {
      return response.data;
    });
  }

  addUser(request: AddUserRequestModel): Promise<AddUserResponseModel> {
    return this.httpPost("private/api/v1/addUser", request).then((response) => {
      return response.data;
    });
  }

  uploadPhoto(file: File, uuid: string): Promise<any> {
    let formData = new FormData();
    formData.append("profilePhoto ", file);
    formData.append("uuid", uuid);

    return this.upload(formData, `api/v1/addUserAvatar`);
  }
}
