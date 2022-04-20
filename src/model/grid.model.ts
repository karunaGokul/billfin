export class DataTableModel {
  headers: Array<HeadersModel> = [];
  items: Array<ItemsModel> = [];
  styles: StylesModel = new StylesModel();
}
export class HeadersModel {
  text: string;
  value: string;
  class: string;
}
export class StylesModel {
  tableClass: string;
  theadClass: string;
  tbodyClass: string;
}
export class ItemsModel {}