import { GetterTree, MutationTree, ActionTree } from "vuex";
import { AddressService } from "@/service";

const state: any = {
  commitmentTerm: '',
  plan: {},
  addons: [],
  paymentType: '',
  creditCard: {},
  ach: {},
  customer: {},
  country: []
};
const getters: GetterTree<any, any> = {
  getCommitmentTerm: (state) => {
    return state.commitmentTerm;
  },
  getPlan: (state) => {
    return state.plan;
  },
  getAddons: (state) => {
    return state.addons;
  },
  getCustomer: (state) => {
    return state.customer;
  },
  getPaymentType: (state) => {
    return state.paymentType;
  },
  getCreditCard: (state) => {
    return state.creditCard;
  },
  getAch: (state) => {
    return state.ach;
  },
  getCountry: (state) => {
    return state.country;
  }
};
const mutations: MutationTree<any> = {
  onUpdateTerm(state, response) {
    state.commitmentTerm = response;
  },
  onUpdatePlan(state, response) {
    state.plan = response;
  },
  onUpdateAddons(state, response) {
    state.addons = response;
  },
  onUpdatePaymentType(state, paymentType) {
    state.paymentType = paymentType;
  },
  onUpdateCustomer(state, payload) {
    state.customer = payload;
  },
  onUpdateCreditCard(state, payload) {
    state.creditCard = payload;
  },
  onUpdateACH(state, payload) {
    state.ach = payload;
  },
  onUpdateCountry(state, country) {
    state.country = country;
  }
}
const actions: ActionTree<any, any> = {
  updateTerm(context, payload) {
    context.commit('onUpdateTerm', payload);
  },
  updatePlan(context, payload) {
    context.commit('onUpdatePlan', payload);
  },
  updateAddons(context, payload) {
    context.commit('onUpdateAddons', payload);
  },
  updatePaymentType(context, paymentType) {
    context.commit('onUpdatePaymentType', paymentType);
  },
  updateCustomer(context, payload) {
    context.commit('onUpdateCustomer', payload);
  }, 
  updateCreditCard(context, payload) {
    context.commit('onUpdateCreditCard', payload);
  },
  updateACH(context, payload) {
    context.commit('onUpdateACH', payload);
  },
  updateCountry(context) {
    const service = new AddressService();
    service.getCountrys().then((response) => {
      context.commit('onUpdateCountry', response);
    })
  }
}
export const SubscriptionModule = {
  state,
  getters,
  mutations,
  actions
};
//4112165412345678