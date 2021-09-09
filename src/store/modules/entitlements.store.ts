import { GetterTree, MutationTree, ActionTree } from "vuex";
import { firmsResponseModel } from "@/model";

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
