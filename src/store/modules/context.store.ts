import { GetterTree, MutationTree, ActionTree } from "vuex";

const state: any = {
  message: "",
  title: "",
};
const getters: GetterTree<any, any> = {
  message: (state) => {
    return state.message;
  },
  title: (state) => {
    return state.title;
  },
};
const mutations: MutationTree<any> = {
  onShowAlert(state, response) {
    state.message = response.message;
    state.title = response.title; 
  },
};
const actions: ActionTree<any, any> = {
  showAlert(context, response) {
    context.commit("onShowAlert", response);
  },
};

export const ContextModule = {
  state,
  getters,
  mutations,
  actions,
};
