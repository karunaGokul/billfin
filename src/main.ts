import { createApp } from "vue";
import App from "./App.vue";

import { ListItem, feeTypes } from "./model";

import router from "./router";
import store from "./store";
import keycloak from "./plugins/keycloak";

// BillFin styles
import "./styles/main.scss";

const app = createApp(App);
app.use(keycloak);
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
  },
  currencyDisplay(
    value: any,
    numberOfDigits: number = 2,
    minDigits: number = 2,
    symbol: string = "$"
  ) {
    if (!value) return `${symbol}0`;

    if (isNaN(parseFloat(value))) return value;

    value = parseFloat(value);

    if (value >= 0)
      return `${symbol}${value.toLocaleString(undefined, {
        minimumFractionDigits: minDigits,
        maximumFractionDigits: numberOfDigits,
      })}`;
    else
      return `${symbol}(${Math.abs(value).toLocaleString(undefined, {
        minimumFractionDigits: minDigits,
        maximumFractionDigits: numberOfDigits,
      })})`;
  },
  percentDisplay(value: any, numberOfDigits: number = 2) {
    if (!value && value != null) value = 0;
    if (!value) return "N/A";

    if (value >= 0)
      return `${value.toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: numberOfDigits,
      })}%`;
    else
      return `(${Math.abs(value).toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: numberOfDigits,
      })})%`;
  },
};

app.directive("currencyDisplay", {
  updated(el) {
    console.log(el.value);
    const numberOfDigits: number = 2,
      minDigits: number = 2

    if (!el.value) el.value =`0`;

    if (isNaN(parseFloat(el.value))) el.value;

    el.value = parseFloat(el.value);

    console.log('float', el.value);

    if (el.value >= 0)
      el.value = `${el.value.toLocaleString(undefined, {
        minimumFractionDigits: minDigits,
        maximumFractionDigits: numberOfDigits,
      })}`;
    else
      el.value = `(${Math.abs(el.value).toLocaleString(undefined, {
        minimumFractionDigits: minDigits,
        maximumFractionDigits: numberOfDigits,
      })})`;

    console.log(el.value);
  },
});
