import { GetterTree, MutationTree, ActionTree } from "vuex";
import { FirmService } from "@/service";
import { firmsResponseModel } from "@/model";

const state: any = {
  firms: new Array<firmsResponseModel>()
};
const getters: GetterTree<any, any> = {
  firms: (state) => {
    return state.firms;
  },
  selectedFirmDomain:(state) => {
    return state.firms[0].firmDomain;
  },
  selectedFirmName:(state) => {
    return state.firms[0].firmName;
  }
};
const mutations: MutationTree<any> = {
  onLoadEntitlements(state, firms) {
    state.firms = firms;
  },
};
const actions: ActionTree<any, any> = {
  loadEntitlements(context) {
    if (!context.state.firms || !context.state.firms.length) {
      const service = new FirmService();

      return service.getFirms().then((response) => {
        context.commit("onLoadEntitlements", response);
      });
    } else {
      return new Promise((resolve, reject) => {
        context.commit("onLoadEntitlements", context.state.firms);

        resolve(context.state.firms);
      });
    }
  },
};

export const DataEntitlementModule = {
  state,
  getters,
  mutations,
  actions,
};
