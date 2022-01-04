import { App } from "vue";
export default {
  install: (app: App, options: any) => {
    app.config.globalProperties.$currencyDisplay = (
      value: any,
      numberOfDigits: number = 2,
      minDigits: number = 2,
      symbol: string = "$"
    ) => {
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
    app.config.globalProperties.$currencyToNumber = (value: any) => {
      if (!value) return 0;

    if (isNaN(value)) value = value.replaceAll(",", "");
    value = parseFloat(value);

    return value;
    }
  },
};
declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $currencyDisplay: any;
  }
}
declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $currencyToNumber: any;
  }
}