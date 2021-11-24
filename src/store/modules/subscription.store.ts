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
  customer: {},
  states: [],
};
const getters: GetterTree<any, any> = {
  getProducts: (state) => {
    return state.products;
  },
  getCommitmentTerm: (state) => {
    return state.commitmentTerm;
  },
  getAumBilling: (state) => {
    return state.aumBilling;
  },
  getSubscriptionBilling: (state) => {
    return state.subscriptionBilling;
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
  getState: (state) => {
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
      state.aumBilling.commitmentTerm = response.commitmentTerm;
    } else {
      state.subscriptionBilling.plan = response.plan;
      state.aumBilling.commitmentTerm = response.commitmentTerm;
    }
  },
  onUpdateAddons(state, response) {
    if (response.product == "AUM") state.aumBilling.addons = response.addons;
    else state.subscriptionBilling.addons = response.addons;
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
  updateCustomer(context, payload) {
    context.commit("onUpdateCustomer", payload);
  },
  updateCreditCard(context, payload) {
    context.commit("onUpdateCreditCard", payload);
  },
  updateACH(context, payload) {
    context.commit("onUpdateACH", payload);
  },
};
export const SubscriptionModule = {
  state,
  getters,
  mutations,
  actions,
};
