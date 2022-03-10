import { GetterTree, MutationTree, ActionTree } from "vuex";
import { SubscribeModel } from "@/model";
import { AddressService } from "@/service";

const state: SubscribeModel = {
  products: [],
  aumBilling: { plan: {}, addons: [], commitmentTerm: "", currentPlan: {} },
  subscriptionBilling: {
    plan: {},
    addons: [],
    commitmentTerm: "",
    currentPlan: {},
  },
  paymentType: "",
  creditCard: {},
  ach: {},
  address: {},
  states: [],
  planAction: "",
  activatePlan: ""
};
const getters: GetterTree<any, any> = {
  products: (state) => {
    return state.products;
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
  planAction: (state) => {
    return state.planAction;
  },
  activatePlan: (state) => {
    return state.activatePlan;
  }
};
const mutations: MutationTree<any> = {
  onUpdateState(state, response) {
    state.states = response;
  },
  onUpdateProducts(state, response) {
    state.products = response;
  },
  onUpdateTerm(state, response) {
    if (response.product == "AUM")
      state.aumBilling.commitmentTerm = response.commitmentTerm;
    else state.subscriptionBilling.commitmentTerm = response.commitmentTerm;
  },
  onUpdatePlan(state, response) {
    if (response.product == "AUM") {
      state.aumBilling.plan = response.plan;
      state.aumBilling.addons = response.addons;
      state.aumBilling.commitmentTerm = response.commitmentTerm;
      state.aumBilling.currentPlan = response.currentPlan;
    } else {
      state.subscriptionBilling.plan = response.plan;
      state.subscriptionBilling.addons = response.addons;
      state.subscriptionBilling.commitmentTerm = response.commitmentTerm;
      state.subscriptionBilling.currentPlan = response.currentPlan;
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
  },
  onClearSubscription(state) {
    state.products = [];
    state.commitmentTerm = "";
    state.aumBilling = { plan: {}, addons: [], commitmentTerm: "", currentPlan: {} };
    state.subscriptionBilling = { plan: {}, addons: [], commitmentTerm: "", currentPlan: {} };
    state.paymentType = "";
    state.creditCard = {};
    state.ach = {};
    state.address = {};
  },
  onUpdatePlanAction(state, planAction) {
    state.planAction = planAction;
  },
  onUpdateActivatePlan(state, activatePlan) {
    state.activatePlan = activatePlan;
  }
};
const actions: ActionTree<any, any> = {
  updateState(context) {
    if (!context.state.states || !context.state.states.length) {
      const service = new AddressService();
      const data: Array<string> = [];
      service.getState().then((response) => {
        response.forEach((item) => {
          data.push(item.name);
        });
        data.sort();
      });
      context.commit("onUpdateState", data);
    } else {
      return new Promise((resolve, reject) => {
        context.commit("onUpdateState", context.state.states);

        resolve(context.state.states);
      });
    }
  },
  updateProducts(context, payload) {
    context.commit("onUpdateProducts", payload);
  },
  updateTerm(context, payload) {
    console.log(payload);
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
  },
  clearSubscription(context) {
    context.commit("onClearSubscription");
  },
  updatePlanAction(context, action) {
    context.commit('onUpdatePlanAction', action);
  },
  updateActivatePlan(context, activatePlan) {
    context.commit('onUpdateActivatePlan', activatePlan);
  }
};
export const SubscriptionModule = {
  state,
  getters,
  mutations,
  actions,
};
