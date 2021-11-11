import { GetterTree, MutationTree, ActionTree } from "vuex";
import { firmsResponseModel } from "@/model";

const state: any = {
  firms: new firmsResponseModel(),
};
const getters: GetterTree<any, any> = {
  firms: (state) => {
    return state.firms;
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
