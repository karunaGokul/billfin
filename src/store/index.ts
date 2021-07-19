import { createStore } from 'vuex';

import { AuthenticationModule } from './modules/authentication.store';
import { DataEntitlementModule } from './modules/entitlements.store';

export default createStore({
  modules: {
    AuthenticationModule,
    DataEntitlementModule
  }
})
