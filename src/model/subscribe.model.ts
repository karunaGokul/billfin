export class productsModel {
  item_id: number;
}
export class subscribeModel {
  customer: string;
  user: {
    name: string;
    email: string;
    phone: string;
  };
  package: {
    paycycle: string;
  };
  creditcard: any;
  ach: any;
  line_items: productsModel[];
}
