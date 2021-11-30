import { GetterTree, MutationTree, ActionTree } from "vuex";

import { FirmService } from "@/service";
import { firmRequestModel, firmsResponseModel } from "@/model";

const state: any = {
  firms: new firmsResponseModel(),
  dataEntitlements: [],
};
const getters: GetterTree<any, any> = {
  firms: (state) => {
    return state.firms;
  },
  dataEntitlements: (state) => {
    return state.dataEntitlements;
  },
};
const mutations: MutationTree<any> = {
  onLoadEntitlements(state, firms) {
    state.dataEntitlements = firms;
    state.firms = state.dataEntitlements[0];
  },
};
const actions: ActionTree<any, any> = {
  loadEntitlements(context) {
    if (
      !context.state.dataEntitlements ||
      !context.state.dataEntitlements.length
    ) {
      const service = new FirmService();
      return service.getFirms().then((response) => {
        context.commit("onLoadEntitlements", response);
      });
    } else {
      return new Promise((resolve, reject) => {
        context.commit("onLoadEntitlements", context.state.dataEntitlements);

        resolve(context.state.dataEntitlements);
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
