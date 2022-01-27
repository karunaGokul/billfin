import moment from "moment";

export class VueHelperProvider {
  clone<T>(object: T): T {
    return this._clone(object);
  }

  getImageUrl(blobText: string) {
    return `data:image/png;base64, ${blobText}`;
  }

  private _clone(object: any) {
    const cloned: any = new (<any>object).constructor();

    for (const key in object) {
      try {
        cloned[key] = object[key];

        if (typeof object[key].getMonth === "function") {
          let date = new Date(object[key]);
          if (isNaN(date.getFullYear())) date = null;

          cloned[key] = date;
        } else if (typeof object[key] === "object")
          cloned[key] = this._clone(object[key]);
      } catch (e) {
        //error
      }
    }
    return cloned;
  }
}

export class DateHelper {
  changeMonthFormat(value: any, maximumDigit: number) {
    if (!value) value = new Date();
    let date = new Date(value);

    if (maximumDigit > 0)
      value = `${date.getDate()} ${date
        .toLocaleString("default", { month: "long" })
        .substring(0, maximumDigit)} ${date.getFullYear()}`;
    else
      value = `${date.getDate()} ${date.toLocaleString("default", {
        month: "long",
      })} ${date.getFullYear()}`;

    return value;
  }

  changeDateFormatWithHyphen(date: string) {
    if (!date) date = ""; // YYYY-MM-DD to MM/DD/YYYY

    return `${date.split("-")[1] + "/" + date.split("-")[2] + "/" + date.split("-")[0] }`;
  }

  changeDateFormatWithSlash(date: string) {
    if (!date) date = ""; // MM/DD/YYYY to YYYY-MM-DD

    return `${date.split("/")[2] + "-" + date.split("/")[0] + "-" + date.split("/")[1]}`
  }

  convertDate(date: string) {
    if (!date) date = ""; //MM/DD/YYYY;
    return `${date.split("/")[1] +
      "/" +
      date.split("/")[0] +
      "/" +
      date.split("/")[2]}`;
  }

  format(date: Date, format?: string) {
    if (!format) format = "MM/DD/YYYY";

    if (date) return moment(date).format(format);
    else return "";
  }

  getString(date: Date): any {
    return `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${(
      "0" + date.getDate()
    ).slice(-2)}`;
  }
}
