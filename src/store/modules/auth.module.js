import AuthService from '../../services/auth.service';

const token = AuthService.getToken() || null
const user = {}
const initialState = { token, user }

export const auth = {
  namespaced: true,
  state: initialState,
  actions: {
    async initialUser ({ commit }) {
      const currentUser = await AuthService.currentUser()
      commit('currentUser', currentUser);
    },

    async login ({ commit }, user) {
      const res = await AuthService.login(user)
      if (res.token) {
        AuthService.setToken(res.token)
        const currentUser = await AuthService.currentUser()
        commit('currentUser', currentUser);
        commit('loginSuccess', res.token);
      }
      return res.message

    },
    logout ({ commit }) {
      AuthService.logout();
      commit('logout');
    },
  },
  mutations: {
    currentUser (state, currentUser) {
      state.user = currentUser
    },
    loginSuccess (state, token) {
      state.token = token
      // state.user = user;
    },
    logout (state) {
      state.token = null;
      state.user = null;
    },
  },
  getters: {
    checkToken: () => {
      return AuthService.checkToken()
    }
  }
};