import { Vue } from "vue-class-component";
import { Provide } from "vue-property-decorator";

import { ISignUpService, SignUpService } from "@/service";
import { IFirmService, FirmService } from "@/service";
import { IAddressService, AddressService } from "@/service";

export class DIContainer extends Vue {
  @Provide("signUpService") signUpService: ISignUpService = new SignUpService();
  @Provide("firmService") onboardService: IFirmService = new FirmService();
  @Provide("addressService") addressService: IAddressService = new AddressService();
}
