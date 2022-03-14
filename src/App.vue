<template>
  <div>
    <router-view></router-view>
    <app-confirmation ref="confirmation"></app-confirmation>
    <app-alert ref="alert"></app-alert>
  </div>
</template>
<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { DIContainer } from "./dicontainer";

import { useStore } from "vuex";

import axios, { AxiosError, AxiosResponse } from "axios";

import AppConfirmation from "@/components/layout/AppConfirmation.vue";
import AppAlert from "@/components/layout/AppAlert.vue";

@Options({
  components: {
    AppConfirmation,
    AppAlert
  },
})
export default class App extends DIContainer {
  public store = useStore();

  created() {
    if (this.store.getters.isLoggedIn) this.store.dispatch("validateKeyCloak");
    //this.tokenInterceptor();
  }

  mounted() {
    let root: any = this.$root;
    let confirmation:any = this.$refs.confirmation as AppConfirmation;
    let alert:any = this.$refs.alert as AppAlert;

    root.$confirmation = confirmation.show;
    root.$alert = alert.show;

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
          this.store.dispatch("logout");
          this.$router.push("/").catch((err) => {});
          return Promise.reject(error);
        }
      }
    );
  }
}
</script>