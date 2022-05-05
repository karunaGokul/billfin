import { GetterTree, MutationTree, ActionTree } from "vuex";

import { SecurityAttributesService } from "@/service";
import { SecurityAttributesRequestModel } from "@/model";

const state: any = {
      securityAttribute: []
};
const getters: GetterTree<any, any> = {
      onSecurityAttribute: (state) => {
            return state.securityAttribute;
      }
}
const mutations: MutationTree<any> = {
      onLoadSecurityAttribute(state, securityAttribute)  {
            state.securityAttribute = securityAttribute;
      }
}
const actions: ActionTree<any, any> = {
      loadSecurityAttribute(context) {
            if (
                  !context.state.securityAttribute ||
                  !context.state.securityAttribute.length
            ) {
                  let service = new SecurityAttributesService();
                  return service.getResponse().then((response) => {
                        context.commit("onLoadSecurityAttribute", response);
                  });
            }     else {
                  return new Promise((resolve, reject) => {
                    context.commit("onLoadSecurityAttribute", context.state.securityAttribute);
            
                    resolve(context.state.securityAttribute);
                  });
                }
      },
      clearSecurityAttribute() {
            state.securityAttribute = [];
      }
}

export const SecurityAttributeModule = {
      state,
      getters,
      mutations,
      actions,
};