import { App } from "vue";
import { VueHelperProvider } from "./vuehelper";

export default {
  install(app: App, opts: any) {
    app.config.globalProperties.$vuehelper = new VueHelperProvider();
  },
};
declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $vuehelper: any;
  }
}
