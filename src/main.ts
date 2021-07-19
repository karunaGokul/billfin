import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";

// BillFin styles
import "./styles/main.scss";

import VueKeyCloak from "@dsb-norge/vue-keycloak-js";
import { VueKeycloakInstance } from "@dsb-norge/vue-keycloak-js/dist/types";


const app = createApp(App);
app.use(store);
app.use(router);
app.use(VueKeyCloak, {
  onReady: () => {
    tokenInterceptor();
  }
});
app.mount("#app");

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $keycloak: VueKeycloakInstance;
  }
}

function tokenInterceptor() {
  axios.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${app.config.globalProperties.$keycloak.token}`
    return config
  }, error => {
    return Promise.reject(error)
  })

  const interceptor = axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      const status = error.response ? error.response.status : null;
      axios.interceptors.response.eject(interceptor);

      if (status !== 401) return Promise.reject(error);
      if (status == 401) {
        app.config.globalProperties.$keycloak.logoutFn();
        router.push("/").catch(err => { });
        return Promise.reject(error);
      }
    }
  )
}
