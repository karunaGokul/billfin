import { createApp } from "vue";
import App from "./App.vue";

import { ListItem, feeTypes } from "./model";

import router from "./router";
import store from "./store";
import customFilters from "./plugins/customFilters";
import VueHelper from "./plugins/vue-helper";

// BillFin styles
import "./styles/main.scss";

const app = createApp(App);
app.use(store);
app.use(router);
app.use(customFilters);
app.use(VueHelper);

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
      return `${symbol}${value.toLocaleString("en-US", {
        minimumFractionDigits: minDigits,
        maximumFractionDigits: numberOfDigits,
      })}`;
    else
      return `${symbol}(${Math.abs(value).toLocaleString("en-US", {
        minimumFractionDigits: minDigits,
        maximumFractionDigits: numberOfDigits,
      })})`;
  },
  currencyDisplayWithoutSymbol(
    value: any,
    numberOfDigits: number = 0,
    minDigits: number = 0
  ) {
    if (!value) return `0`;

    if (isNaN(parseFloat(value))) return value;

    value = parseFloat(value);

    if (value >= 0)
      return `${value.toLocaleString("en-US", {
        minimumFractionDigits: minDigits,
        maximumFractionDigits: numberOfDigits,
      })}`;
    else
      return `(${Math.abs(value).toLocaleString("en-US", {
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
  creditCardType(value: any) {
    let card: string = "";
    if (value == "mast") card = "Mastercard";
    else if (value == "visa") card = "Visa";
    else if (value == "amex") card = "American Express";
    else card = "Discover";
    return card;
  },
};

app.directive("click-outside", {
  beforeMount: function(el: any, binding: any) {
    el.clickOutsideEvent = function(event: any) {
      if (!(el == event.target || el.contains(event.target))) {
        binding.value(event, el);
      }
    };
    document.body.addEventListener("click", el.clickOutsideEvent);
  },
  unmounted: function(el: any) {
    document.body.removeEventListener("click", el.clickOutsideEvent);
  },
});