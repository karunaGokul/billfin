import { GetterTree, MutationTree, ActionTree } from "vuex";

const state: any = {
  commitmentTerm: '',
  plan: {},
  addons: [],
  paymentType: '',
  creditCard: {},
  ach: {},
  customer: {},
  states: ["Alabama", "Alaska", "American Samoa", "Arizona", "Arkansas", "Baker Island", "California", "Colorado", "Connecticut", "Delaware", "District of Columbia", "Florida", "Georgia", "Guam", "Hawaii", "Howland Island", "Idaho", "Illinois", "Indiana", "Iowa", "Jarvis Island", "Johnston Atoll", "Kansas", "Kentucky", "Kingman Reef", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Midway Atoll", "Minnesota", "Mississippi", "Missouri", "Montana", "Navassa Island", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Northern Mariana Islands", "Ohio", "Oklahoma", "Oregon", "Palmyra Atoll", "Pennsylvania", "Puerto Rico", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "United States Minor Outlying Islands", "United States Virgin Islands", "Utah", "Vermont", "Virginia", "Wake Island", "Washington", "West Virginia", "Wisconsin", "Wyoming"]
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
  getState: (state) => {
    return state.states;
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
  }
}
export const SubscriptionModule = {
  state,
  getters,
  mutations,
  actions
};