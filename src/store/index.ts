import { createStore } from "vuex";

import { AuthenticationModule } from "./modules/authentication.store";
import { DataEntitlementModule } from "./modules/entitlements.store";
import { SubscriptionModule } from "./modules/subscription.store";
import { SecurityAttributeModule } from "./modules/security-attributes.store";

export default createStore({
  modules: {
    AuthenticationModule,
    DataEntitlementModule,
    SubscriptionModule,
    SecurityAttributeModule
  },
});