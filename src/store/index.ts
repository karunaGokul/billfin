import { createStore } from 'vuex';

import { AuthenticationModule } from './modules/authentication.store';

export default createStore({
  modules: {
    AuthenticationModule
  }
})
