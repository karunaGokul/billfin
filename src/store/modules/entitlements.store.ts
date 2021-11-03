import { GetterTree, MutationTree, ActionTree } from "vuex";
import { firmsResponseModel } from "@/model";

const state: any = {
  firms: new firmsResponseModel(),
};
const getters: GetterTree<any, any> = {
  firms: (state) => {
    return state.firms;
  },
  selectedFirmDomain: (state) => {
    return state.firms.domain;
  },
  selectedFirmName: (state) => {
    return state.firms.name;
  },
  selectedFirmId: (state) => {
    return state.firms.firmId;
  }
};
const mutations: MutationTree<any> = {
  onLoadEntitlements(state, firms) {
    state.firms = firms;
  },
};
const actions: ActionTree<any, any> = {
  loadEntitlements(context, response) {
    context.commit("onLoadEntitlements", response);
  }
};

export const DataEntitlementModule = {
  state,
  getters,
  mutations,
  actions,
};
