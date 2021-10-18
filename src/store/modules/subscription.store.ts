import { GetterTree, MutationTree, ActionTree } from "vuex";
import store from "..";

const state: any = {
  planType: '',
  planName: '',
  planPrice: 0,
  commitmentTerm: "Annual",
  addons: [],
};
const getters: GetterTree<any, any> = {
  getPlanType: (state) => {
    return state.planType;
  },
  getPlanFee: (state) => {
    return state.planPrice;
  },
  getAddons: (state) => {
    return state.addons;
  },
};
const mutations: MutationTree<any> = {
  onUpdatePlan(state, response) {
    state.planType = response.planType;
    state.planName = response.planName;
    state.planPrice = response.planPrice;
  },
  onUpdateAddons(state, response) {
    state.addons = response;
  }
}
const actions: ActionTree<any, any> = {
  updatePlan(context, payload) {
    context.commit('onUpdatePlan', payload);
  },
  updateAddons(context, payload) {
    context.commit('onUpdateAddons', payload);
  }
}
export const SubscriptionModule = {
  state,
  getters,
  mutations,
  actions
};
