<template>
  <div>
    <router-view></router-view>
  </div>
</template>
<script lang="ts">
import { Vue } from "vue-class-component";
import { DIContainer } from "./dicontainer";

import { useStore } from "vuex";

import axios, { AxiosError, AxiosResponse } from "axios";

export default class App extends DIContainer {
  public store = useStore();

  created() {
    if (this.store.getters.isLoggedIn) this.store.dispatch("validateKeyCloak");
    this.tokenInterceptor();
  }

  tokenInterceptor() {
    axios.interceptors.request.use(
      (config) => {
        config.headers.Authorization = `Bearer ${this.store.getters.accessToken}`;
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    const interceptor = axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        const status = error.response ? error.response.status : null;
        axios.interceptors.response.eject(interceptor);

        if (status !== 401) return Promise.reject(error);
        if (status == 401) {
          this.store.dispatch("clearEntitlements");
          this.store.dispatch("clearSession");
          this.store.dispatch("logout");
          this.$router.push("/").catch((err) => {});
          return Promise.reject(error);
        }
      }
    );
  }
}
</script>