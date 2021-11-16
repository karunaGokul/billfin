import { GetterTree, MutationTree, ActionTree } from "vuex";

import Keycloak, { KeycloakConfig, KeycloakInitOptions } from "keycloak-js";
import JwtDecode from "jwt-decode";

import {
  AuthenticationState,
  AuthenticationResponse,
  UserModel,
} from "@/model";

const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";

const config: KeycloakConfig = {
  url: "https://keycloak.redi2.com:8443/auth/",
  realm: "BillFin-Dev",
  clientId: "reference-service",
};

let keycloak = Keycloak(config);

const options: KeycloakInitOptions = {
  onLoad: "login-required",
  responseMode: "query",
  checkLoginIframe: false,
};

const state: AuthenticationState = {
  accessToken: localStorage.getItem(ACCESS_TOKEN_KEY) || "",
  refreshToken: localStorage.getItem(REFRESH_TOKEN_KEY) || "",
};
const getters: GetterTree<AuthenticationState, any> = {
  accessToken: (state) => {
    return state.accessToken;
  },
  userInfo: (state) => {
    let userInfo: UserModel = null;

    if (state.accessToken) {
      const tokenParsed: any = JwtDecode(state.accessToken);

      userInfo = new UserModel();
      userInfo.email = tokenParsed.email;
      userInfo.userName = tokenParsed.preferred_username;
      userInfo.fullName = tokenParsed.name;
      userInfo.firstName = tokenParsed.given_name;
      userInfo.lastName = tokenParsed.family_name;
      userInfo.emailVerified = tokenParsed.email_verified;
      userInfo.phoneNumber = tokenParsed.phoneNumber;
    }

    return userInfo;
  },
  isTokenExpired: (state) => {
    let expired = true;

    if (state.accessToken) {
      const tokenParsed: any = JwtDecode(state.accessToken);

      const date = new Date(0);
      const exp = parseInt(tokenParsed.exp);
      if (!isNaN(exp)) date.setUTCSeconds(exp);
      expired = date < new Date();
    }
    return expired;
  },
  isLoggedIn: (state, getters) => {
    return state.accessToken && !getters.isTokenExpired;
  },
  refreshToken: (state) => {
    return state.refreshToken;
  },
};
const mutations: MutationTree<AuthenticationState> = {
  onLogin(state, data: AuthenticationResponse) {
    if (data.success) {
      localStorage.setItem(ACCESS_TOKEN_KEY, data.accessToken);
      localStorage.setItem(REFRESH_TOKEN_KEY, data.refreshToken);

      state.accessToken = data.accessToken;
      state.refreshToken = data.refreshToken;
    }
  },
  onLogout(state) {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);

    state.accessToken = "";
    state.refreshToken = "";
  },
};
const actions: ActionTree<AuthenticationState, any> = {
  login(context) {

    keycloak.onTokenExpired = () => {
      keycloak
        .updateToken(30)
        .then(() => {
          console.log(keycloak);
          context.commit("onLogin", {
            success: true,
            accessToken: keycloak.token,
            refreshToken: keycloak.refreshToken,
          });
        })
        .catch(() => {
          console.log("refresh token error");
        });
    };

    return new Promise((resolve, reject) => {
      keycloak
        .init(options)
        .then(async (authenticated) => {
          if (!authenticated) {
            console.log("NOT Authenticated");
            context.commit("onLogin", { success: false });
          } else {
            context.commit("onLogin", {
              success: true,
              accessToken: keycloak.token,
              refreshToken: keycloak.refreshToken,
            });
          }
          resolve(authenticated);
        })
        .catch((kcError) => {
          let msg = "An error happened during Keycloak initialization.";
          if (kcError) {
            const { error, error_description } = kcError;
            msg = msg.concat(
              `\nAdapter error details:\nError: ${error}\nDescription: ${error_description}`
            );
          }

          context.commit("onLogin", { success: false, error: msg });

          reject(msg);
        });
    });
  },
  logout(context) {
    const logoutOptions = { redirectUri: window.location.href };
    keycloak.logout(logoutOptions);
    return new Promise((resolve, reject) => {
      context.commit("onLogout");
      keycloak = null;
      resolve("");
    });
  },
  validateKeyCloak(context) {
    if (!keycloak.token) {
      keycloak.init({token: state.accessToken, refreshToken: state.refreshToken});
    }
  },
};

export const AuthenticationModule = {
  state,
  getters,
  mutations,
  actions,
};
