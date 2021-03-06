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
      // return userService.getLoggedinUser();
    },
    users({ users }) {
      return users;
    },
  },
  mutations: {
    setLoggedinUser(state, { user = null }) {
      if (!user) user = userService.getLoggedinUser();
      state.loggedInUser = user;
      // state.loggedInUser = user ? { ...user } : userService.getLoggedinUser();
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
    async addRecent({ dispatch, commit }, { boardId, user }) {
      try {
        let idx = user.recentBoards.findIndex(
          (currBoardId) => currBoardId === boardId
        );
        if (idx === -1) user.recentBoards.push(boardId);
        await dispatch({ type: 'updateUser', user });
      } catch (err) {
        console.log('userStore: Error on adding recent boards');
      }
    },
    async updateUser({ commit }, { user }) {
      try {
        await userService.update(user);
        commit({ type: 'setLoggedinUser', user });
      } catch (err) {
        console.log('userStore: Error on updating user');
      }
    },
    async getUserById({ commit }, { userId }) {
      try {
        let user = await userService.getById(userId);
        commit({ type: 'setLoggedinUser', user });
      } catch (err) {
        console.log('userStore: Error on geting User by Id');
      }
    },
    async signup({ commit }, { userCred }) {
      try {
        const user = await userService.signup(userCred);
        commit({ type: 'setLoggedinUser', user });
        // return user;
      } catch (err) {
        console.log('userStore: Error in signup', err);
        throw err;
      }
    },
    async login({ commit }, { userCred }) {
      try {
        const user = await userService.login(userCred);
        commit({ type: 'setLoggedinUser', user });
        // return user;
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
