import { GetterTree, MutationTree, ActionTree } from "vuex";
import { AddressService } from "@/service";

const state: any = {
  products: [],
  commitmentTerm: "",
  aumBilling: { plan: {}, addons: [], commitmentTerm: "" },
  subscriptionBilling: { plan: {}, addons: [], commitmentTerm: "" },
  paymentType: "",
  creditCard: {},
  ach: {},
  address: {},
  states: []
};
const getters: GetterTree<any, any> = {
  products: (state) => {
    return state.products;
  },
  commitmentTerm: (state) => {
    return state.commitmentTerm;
  },
  aumBilling: (state) => {
    return state.aumBilling;
  },
  subscriptionBilling: (state) => {
    return state.subscriptionBilling;
  },
  addons: (state) => {
    return state.addons;
  },
  address: (state) => {
    return state.address;
  },
  paymentType: (state) => {
    return state.paymentType;
  },
  creditCard: (state) => {
    return state.creditCard;
  },
  ach: (state) => {
    return state.ach;
  },
  states: (state) => {
    return state.states;
  },
};
const mutations: MutationTree<any> = {
  onUpdateState(state, response) {
    state.states = response;
  },
  onUpdateProducts(state, response) {
    state.products = response;
  },
  onUpdateTerm(state, response) {
    state.commitmentTerm = response;
  },
  onUpdatePlan(state, response) {
    if (response.product == "AUM") {
      state.aumBilling.plan = response.plan;
      state.aumBilling.addons = response.addons;
      state.aumBilling.commitmentTerm = response.commitmentTerm;
    } else {
      state.subscriptionBilling.plan = response.plan;
      state.subscriptionBilling.addons = response.addons;
      state.subscriptionBilling.commitmentTerm = response.commitmentTerm;
    }
  },
  onUpdateAddons(state, response) {
    if (response.product == "AUM") state.aumBilling.addons = response.addons;
    else state.subscriptionBilling.addons = response.addons;
  },
  onUpdatePaymentType(state, paymentType) {
    state.paymentType = paymentType;
  },
  onUpdateAddress(state, payload) {
    state.address = payload;
  },
  onUpdateCreditCard(state, payload) {
    state.creditCard = payload;
  },
  onUpdateACH(state, payload) {
    state.ach = payload;
  }
};
const actions: ActionTree<any, any> = {
  updateState(context) {
    const service = new AddressService();
    const data: Array<string> = [];
    service.getState().then((response) => {
      response.forEach((item) => {
        data.push(item.name);
      });
      data.sort();
    });
    context.commit("onUpdateState", data);
  },
  updateProducts(context, payload) {
    context.commit("onUpdateProducts", payload);
  },
  updateTerm(context, payload) {
    context.commit("onUpdateTerm", payload);
  },
  updatePlan(context, payload) {
    context.commit("onUpdatePlan", payload);
  },
  updateAddons(context, payload) {
    context.commit("onUpdateAddons", payload);
  },
  updatePaymentType(context, paymentType) {
    context.commit("onUpdatePaymentType", paymentType);
  },
  updateAddress(context, payload) {
    context.commit("onUpdateAddress", payload);
  },
  updateCreditCard(context, payload) {
    context.commit("onUpdateCreditCard", payload);
  },
  updateACH(context, payload) {
    context.commit("onUpdateACH", payload);
  }
};
export const SubscriptionModule = {
  state,
  getters,
  mutations,
  actions,
};
