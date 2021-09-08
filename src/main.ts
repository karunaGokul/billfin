import { createApp } from "vue";
import App from "./App.vue";

import { ListItem, feeTypes } from "./model";

import router from "./router";
import store from "./store";

// BillFin styles
import "./styles/main.scss";

const app = createApp(App);
app.use(store);
app.use(router);

app.mount("#app");

app.config.globalProperties.$filters = {
  lineDisplay(data: Array<string>) {
    let value: string = "";
    if (!data) value = "";
    else
      value =
        data.slice(0, data.length - 1).join(", ") + " and " + data.slice(-1);

    return value;
  },
  filterArray(data: Array<ListItem>) {
    const item: Array<string> = [];
    if (!data) data = [];
    else {
      data.filter((value) => {
        if (value.selected) item.push(value.text);
      });
    }
    return item;
  },
  filterFeeTypes(data: Array<feeTypes>) {
    const item: Array<string> = [];
    if (!data) data = [];
    else {
      data.filter((value) => {
        if (value.selected) item.push(value.feeTypeName);
      });
    }
    return item;
  }
};
