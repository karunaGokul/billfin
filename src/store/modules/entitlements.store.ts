import axios from "axios";
import { GetterTree, MutationTree, ActionTree } from "vuex";

import { FirmService } from "@/service";
import {
  firmRequestModel,
  firmsResponseModel,
  EntitlemenetResponseModel,
} from "@/model";

const FIRM_KEY = "firm_id";

const state: EntitlemenetResponseModel = {
  firms: null,
  dataEntitlements: [],
  firmId: localStorage.getItem(FIRM_KEY),
  settings: null,
};
const getters: GetterTree<any, any> = {
  firms: (state) => {
    let firm = state.dataEntitlements.find(
      (e: firmsResponseModel) => e.firmId == state.firmId
    );
    return firm;
  },
  selectedFirmId: (state) => {
    return state.firmId;
  },
  dataEntitlements: (state) => {
    return state.dataEntitlements;
  },
  planList: (state) => {
    return state.settings.plans;
  },
  addOnsList: (state) => {
    return state.settings.addOns;
  },
};
const mutations: MutationTree<any> = {
  onLoadEntitlements(state, firms) {
    state.dataEntitlements = firms.sort((item: any, value: any) =>
      item.name.localeCompare(value.name)
    );
    if (!state.firmId) {
      state.firmId = state.dataEntitlements[0].firmId;
      localStorage.setItem(FIRM_KEY, state.firmId);
    }

    axios.defaults.headers.common["firmId"] = state.firmId;
  },
  onFirmIdChanged: (state, firmId) => {
    localStorage.setItem(FIRM_KEY, firmId);

    state.firmId = firmId;
  },
  onUpdateFirmStatus: (state, { getters }) => {
    getters.firms.firmStatus = "SUBSCRIBED";
  },
  onLoadSettings: (state, response) => {
    state.settings = response;
  },
  onFirmSubscribed: (state) => {
    console.log(state.frims);
  }
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
  updateFirmStatus({ commit, getters }) {
    commit("onUpdateFirmStatus", { getters });
  },
  loadSettings(context) {
    if (context.state.settings == null) {
      return axios.get("/theme.json").then((json) => {
        context.commit("onLoadSettings", json.data);
      });
    }
  },
  firmSubscribed(context) {
    context.commit("onFirmSubscribed");
  },
  clearFirm({commit, state}) {
    state.dataEntitlements = [];   
    localStorage.removeItem(FIRM_KEY);
    state.firmId = "";
  },
};

export const DataEntitlementModule = {
  state,
  getters,
  mutations,
  actions,
};
