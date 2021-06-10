import { GetterTree, MutationTree, ActionTree } from 'vuex';

import { AuthenticationState } from '@/model';

const state: AuthenticationState = {
    accessToken: localStorage.getItem('accessToken') || '',
    refreshToken: localStorage.getItem('refreshToken') || ''
}
const getters: GetterTree<AuthenticationState, any> = {
    accessToken: state => {
        return state.accessToken;
    },
    refreshToken: state => {
        return state.refreshToken;
    },
    isLoggedIn: state => {
        return !!state.accessToken;
    }
}

export const AuthenticationModule = {
    state,
    getters
}