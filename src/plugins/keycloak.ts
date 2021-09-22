import { App } from "vue";
import Keycloak, {
  KeycloakConfig,
  KeycloakInitOptions,
  KeycloakInstance,
  KeycloakLoginOptions,
  KeycloakPromise,
  KeycloakProfile,
  KeycloakResourceAccess,
  KeycloakRoles,
} from "keycloak-js";

export interface IKeycloakModule {
  ready: boolean; // Flag indicating whether Keycloak has initialised and is ready
  authenticated: boolean;
  userName?: string; // Username from Keycloak. Collected from tokenParsed['preferred_username']
  fullName?: string; // Full name from Keycloak. Collected from tokenParsed['name']
  login?(options?: KeycloakLoginOptions): KeycloakPromise<void, void>; // [Keycloak] login function
  loginFn?(options?: KeycloakLoginOptions): KeycloakPromise<void, void>; // Alias for login
  // This is not defined in keycloak
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  logoutFn?(options?: any): KeycloakPromise<void, void> | void; // Keycloak logout function
  createLoginUrl?(options?: KeycloakLoginOptions): string; // Keycloak createLoginUrl function
  // This is not defined in keycloak
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createLogoutUrl?(options?: any): string; // Keycloak createLogoutUrl function
  createRegisterUrl?(options?: KeycloakLoginOptions): string; // Keycloak createRegisterUrl function
  register?(options?: KeycloakLoginOptions): KeycloakPromise<void, void>; // Keycloak register function
  accountManagement?(): KeycloakPromise<void, void>; // Keycloak accountManagement function
  createAccountUrl?(): string; // Keycloak createAccountUrl function
  loadUserProfile?(): KeycloakPromise<KeycloakProfile, void>; // Keycloak loadUserProfile function
  subject?: string; // The user id
  idToken?: string; // The base64 encoded ID token.
  realmAccess?: KeycloakRoles; // The realm roles associated with the token.
  resourceAccess?: KeycloakResourceAccess; // The resource roles associated with the token.
  refreshToken?: string; // The base64 encoded refresh token that can be used to retrieve a new token.
  timeSkew?: number; // The estimated time difference between the browser time and the Keycloak server in seconds. This value is just an estimation, but is accurate enough when determining if a token is expired or not.
  responseMode?: string; // Response mode passed in init (default value is fragment).
  responseType?: string; // Response type sent to Keycloak with login requests. This is determined based on the flow value used during initialization, but can be overridden by setting this value.
  hasRealmRole?(role: string): boolean; // Keycloak hasRealmRole function
  hasResourceRole?(role: string, resource?: string): boolean; // Keycloak hasResourceRole function
  token?: string; // The base64 encoded token that can be sent in the Authorization header in requests to services
  keycloak?: KeycloakInstance; // The original keycloak instance 'as is' from keycloak-js adapter
}
export default {
  install: (app: App) => {
    const config: KeycloakConfig = {
      url: "https://keycloak.redi2.com:8443/auth/",
      realm: "BillFin-Dev",
      clientId: "reference-service",
    };
    const keycloak = Keycloak(config);

    const options: KeycloakInitOptions = {
      onLoad: "login-required",
      checkLoginIframe: false,
    };

    //keycloak.init(options);

    /*const login = () => {
      console.log('login');
      keycloak.init(options);
    }*/

    app.config.globalProperties.$keycloak = keycloak;
    //app.config.globalProperties.$login = login

  }
};
declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $keycloak: IKeycloakModule;
  }
}
