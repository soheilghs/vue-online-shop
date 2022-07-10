import Cookies from 'js-cookie';
import axios from "axios";
import Errors from './../../modules/errors';
import {baseUrl} from '@/config';

axios.defaults.baseURL = baseUrl;

const state = {
  access_token: Cookies.get('access_token') || '',
  roles: Cookies.get('roles') || [],
  permissions: Cookies.get('permissions') || '',
  status: '',
  hasLoadedOnce: false,
  errors: new Errors()
};

const getters = {
  isAuthenticated: state => !!state.access_token,
  authStatus: state => state.status,
  authErrors: state => state.errors,
  access_token: state => state.access_token
};

const actions = {
  authRequest: ({commit}, payload) => {
    let actionUrl = '';
    let data = {};

    if (payload.action === 'login') {
      actionUrl = '/auth/login';
      data = {
        username: payload.username,
        password: payload.password,
      }
    }

    return new Promise((resolve, reject) => {
      commit('authRequest');
      axios.post( actionUrl, data, {
        headers: {
          'Accept': 'application/json'
        }
      })
        .then((response) => {
          if ((actionUrl === '/auth/login')) {
            let access_token = 'Bearer ' + response.data.token;

            let expireTime = new Date(new Date().getTime() + 600 * 60 * 1000);
            Cookies.set('access_token', access_token,
              {expires: expireTime});

            commit('authSuccess', access_token);
            resolve(access_token);
          }
        })
        .catch((err) => {
          console.log(err.response.data);
          commit('authError', err.response.data);
          reject(err)
        })
    });
  }
};

const mutations = {
  authRequest: () => {
  },
  authError: (state, err) => {
    state.status = 'error';
    state.hasLoadedOnce = true;
    state.errors.record(err);
  },
  authSuccess: (state, access_token) => {
    state.status = 'success';
    state.access_token = access_token;
    state.hasLoadedOnce = true;
  }
};

export default {
  state,
  getters,
  actions,
  mutations,
}
