import { Vue } from "vue-class-component";
import { Provide } from "vue-property-decorator";

import { ISignUpService, SignUpService } from "@/service";
import { IFirmService, FirmService } from "@/service";
import { ISubscripeService, SubscripeService } from "@/service";
import { IAddressService, AddressService } from "@/service";
import { IManageSubscription, ManageSubscription } from "@/service";
import { IBillsAndPaymentService, BillsAndPaymentService } from "@/service";
import { IAdvisorsService, AdvisorsService } from "@/service";
import { IRepCodesService, RepCodesService } from "@/service";
import { IBranchesService, BranchesService } from "@/service";

import { IUserListService, UserListService } from "@/service";
import { IFeeSchedulesService, FeeSchedulesService } from "@/service";
import { ICustodiansService, CustodiansService } from "@/service";

export class DIContainer extends Vue {
  @Provide("signUpService") signUpService: ISignUpService = new SignUpService();
  @Provide("firmService") onboardService: IFirmService = new FirmService();
  @Provide("subscripeService")
  subscripeService: ISubscripeService = new SubscripeService();
  @Provide("addressService")
  addressService: IAddressService = new AddressService();
  @Provide("manageSubscripeService")
  manageSubscripeService: IManageSubscription = new ManageSubscription();
  @Provide("billsAndPaymentService")
  billsAndPaymentService: IBillsAndPaymentService = new BillsAndPaymentService();
  @Provide("advisorsService")
  advisorsService: IAdvisorsService = new AdvisorsService();
  @Provide("repCodesService")
  repCodesService: IRepCodesService = new RepCodesService();
  @Provide("branchesService")
  branchesService: IBranchesService = new BranchesService();
  @Provide("userService")
  userService: IUserListService = new UserListService();

  @Provide("feeSchedulesService")
  feeSchedulesService: IFeeSchedulesService = new FeeSchedulesService();

  @Provide("custodiansService")
  custodiansService: ICustodiansService = new CustodiansService();
}