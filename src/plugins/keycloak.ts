import { App } from "vue";
import Keycloak, { KeycloakConfig, KeycloakInitOptions } from "keycloak-js";

export interface IKeycloakModule {
  keycloak: any;
}
export default {
  install: (app: App) => {
    const config: KeycloakConfig = {
      url: "https://keycloak.redi2.com:8443/auth/",
      realm: "BillFin-Dev",
      clientId: "reference-service",
    };
    const keycloak = Keycloak(config);

    app.config.globalProperties.$keycloak = keycloak;
  }
};
declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $keycloak: IKeycloakModule;
  }
}
