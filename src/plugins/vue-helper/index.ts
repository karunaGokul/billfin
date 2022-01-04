import { App } from "vue";
import { VueHelperProvider, DateHelper } from "./vuehelper";

export default {
  install(app: App, opts: any) {
    app.config.globalProperties.$vuehelper = new VueHelperProvider();
    app.config.globalProperties.$datehelper = new DateHelper();
  },
};
declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $vuehelper: any;
    $dateHelper: any;
  }
}
