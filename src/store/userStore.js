import { userService } from '../services/userService.js';

export const userStore = {
  strict: true,
  state: {
    users: {},
    loggedInUser: {},
    boardMembers: {},
  },
  getters: {
    currUser({ loggedInUser }) {
      return loggedInUser;
    },
    users({ users }) {
      return users;
    },
  },
  mutations: {
    setLoggedinUser(state, { user }) {
      state.loggedinUser = user ? { ...user } : null;
    },
    setUsers(state, { users }) {
      state.users = users;
    },
  },
  actions: {
    async loadUsers({ commit }) {
      try {
        const users = await userService.getUsers();
        commit({ type: 'setUsers', users });
      } catch (err) {
        console.log('userStore: Error in loadUsers', err);
        throw err;
      }
    },
    async getUserById({ commit }) {
      try {
      } catch (err) {
        console.log('userStore: Error on geting User by Id');
      }
    },
    async signup({ commit }, { userCred }) {
      try {
        const user = await userService.signup(userCred);
        commit({ type: 'setLoggedinUser', user });
        return user;
      } catch (err) {
        console.log('userStore: Error in signup', err);
        throw err;
      }
    },
    async login({ commit }, { userCred }) {
      try {
        const user = await userService.login(userCred);
        commit({ type: 'setLoggedinUser', user });
        return user;
      } catch (err) {
        console.log('userStore: Error in login', err);
        throw err;
      }
    },
    async logout({ commit }) {
      try {
        await userService.logout();
        commit({ type: 'setLoggedinUser', user: null });
      } catch (err) {
        console.log('userStore: Error in logout', err);
        throw err;
      }
    },
  },
};
