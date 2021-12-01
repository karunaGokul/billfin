import { GetterTree, MutationTree, ActionTree } from "vuex";

import { FirmService } from "@/service";
import { firmRequestModel, firmsResponseModel } from "@/model";

const FIRM_KEY = "firm_id";

const state: any = {
  firms: new firmsResponseModel(),
  dataEntitlements: [],
  firmId: localStorage.getItem(FIRM_KEY),
};
const getters: GetterTree<any, any> = {
  firms: (state) => {
    let firm = state.dataEntitlements.find(
      (e: any) => e.firmId == state.firmId
    );
    return firm;
  },
  selectedFirmId: (state) => {
    return state.firmId;
  },
  dataEntitlements: (state) => {
    return state.dataEntitlements;
  },
};
const mutations: MutationTree<any> = {
  onLoadEntitlements(state, firms) {
    state.dataEntitlements = firms;
  },
  onFirmIdChanged: (state, firmId) => {
    localStorage.setItem(FIRM_KEY, firmId);

    state.firmId = firmId;
  },
};
const actions: ActionTree<any, any> = {
  loadEntitlements(context) {
    if (
      !context.state.dataEntitlements ||
      !context.state.dataEntitlements.length
    ) {
      let service = new FirmService();
      return service.getFirms().then((response) => {
        context.commit("onLoadEntitlements", response);
        context.commit("onFirmIdChanged", response[0].firmId);
      });
    } else {
      return new Promise((resolve, reject) => {
        context.commit("onLoadEntitlements", context.state.dataEntitlements);

        resolve(context.state.dataEntitlements);
      });
    }
  },
  firmIdChanged(context, firmId) {
    context.commit("onFirmIdChanged", firmId);
  },
};

export const DataEntitlementModule = {
  state,
  getters,
  mutations,
  actions,
};
