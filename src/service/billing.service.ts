import { IBaseService, BaseService } from './base.service';

export interface IBillingService extends IBaseService<any, any> {

}
export class BillingService extends BaseService<any, any> implements IBillingService {

}