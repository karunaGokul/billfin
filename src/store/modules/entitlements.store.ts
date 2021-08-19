import { GetterTree, MutationTree, ActionTree } from "vuex";
import { FirmService } from "@/service";
import { firmsResponseModel, BillingTypes, ListItem } from "@/model";

const state: any = {
  firms: new Array<firmsResponseModel>(),
};
const getters: GetterTree<any, any> = {
  firms: (state) => {
    return state.firms;
  },
  selectedFirmDomain: (state) => {
    return state.firms[0].domain;
  },
  selectedFirmName: (state) => {
    return state.firms[0].name;
  },
  selectedFirmId: (state) => {
    return state.firms[0].firmId;
  },
  billingTypes: () => {
    const item: Array<string> = state.firms[0].billingTypes,
      billingTypes: Array<ListItem> = [];
    item.forEach((e) => {
      billingTypes.push(
        new ListItem(e, BillingTypes[e as keyof typeof BillingTypes])
      );
    });

    return billingTypes;
  },
};
const mutations: MutationTree<any> = {
  onLoadEntitlements(state, firms) {
    state.firms = firms;
  },
};
const actions: ActionTree<any, any> = {
  loadEntitlements(context) {
    if (!context.state.firms || !context.state.firms.length) {
      const service = new FirmService();

      return service.getFirms().then((response) => {
        console.log('onLoadEntitlements');
        console.log(response);
        context.commit("onLoadEntitlements", response);
      });
    } else {
      return new Promise((resolve, reject) => {
        context.commit("onLoadEntitlements", context.state.firms);

        resolve(context.state.firms);
      });
    }
  },
};

export const DataEntitlementModule = {
  state,
  getters,
  mutations,
  actions,
};
