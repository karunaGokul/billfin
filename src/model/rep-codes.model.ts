export class repCodesResponseModel {
  repCode: string;
  branch: Array<string>;
  assignedAdvisors: Array<string>;
}
export class addRepCodeRequestModel {
  repCode: string;
  branch: string;
  advisors: Array<assginAdvisorsResponseModel> = [];
}
export class assginAdvisorsResponseModel {
  advisorId: number;
  advisorName: string;
}
export class addRepCodeResponseModel {
  status: string;
}