import { createStore } from "vuex";

import { AuthenticationModule } from "./modules/authentication.store";
import { DataEntitlementModule } from "./modules/entitlements.store";
import { SubscriptionModule } from "./modules/subscription.store";
import { ContextModule } from './modules/context.store';

export default createStore({
  modules: {
    AuthenticationModule,
    DataEntitlementModule,
    SubscriptionModule,
    ContextModule
  },
});