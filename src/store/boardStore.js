import { boardService } from '../services/boardService.js';

import {
  socketService,
  SOCKET_EVENT_WATCHBOARD,
  SOCKET_EMIT_UPDATEBOARD,
} from '../services/socketService';

export const boardStore = {
  strict: true,
  state: {
    currBoard: {},
    boards: [],
    currTask: {},
    filterBy: { keyWord: '', members: [], dueDate: null, labels: [] },
    newGroup: {},
    newTask: {},
  },
  getters: {
    getEmptyTask({ newTask }) {
      return newTask;
    },
    getEmptyGroup({ newGroup }) {
      return newGroup;
    },
    currBoard({ currBoard }) {
      return currBoard;
    },
    boards({ boards }) {
      return boards;
    },
  },
  mutations: {
    setBoards(state, { boards }) {
      state.boards = boards;
    },
    setCurrBoard(state, { board }) {
      state.currBoard = board;
    },
    updateBoard(state, { board }) {
      if (board._id === state.currBoard._id) state.currBoard = board;
    },
    removeBoard(state, { boardId }) {
      let idx = state.boards.findIndex((board) => board._Id === boardId);
      state.boards.splice(idx, 1);
    },
    addGroup(state, { group }) {
      state.currBoard.groups.push(group);
      this.newGroup = boardService.getEmptyGroup();
    },
    updateGroup(state, { group }) {
      let idx = state.boards.groups.findIndex(
        (currGroup) => currGroup.id === group.id
      );
      state.currBoard.groups.splice(idx, 1, group);
    },
    removeGroup(state, { groupId }) {
      let idx = state.currBoard.groups.findIndex(
        (currGroup) => currGroup.id === groupId
      );
      state.currBoard.groups.splice(idx, 1);
    },
    addBoard(state, { board }) {
      state.boards.push(board);
    },
  },
  actions: {
    async loadBoards({ commit }) {
      try {
        const boards = await boardService.query();
        commit({ type: 'setBoards', boards });
      } catch (err) {
        console.log('Couldnt load boards', err);
      }
    },
    async loadAndWatchBoard({ commit }, { boardId }) {
      try {
        const board = await boardService.getBoardById(boardId);

        commit({ type: 'setCurrBoard', board });
        socketService.off(SOCKET_EVENT_WATCHBOARD);
        socketService.on(SOCKET_EVENT_WATCHBOARD, (board) => {
          console.log('Board changed from socket', board);
          commit({ type: 'updateBoard', board });
        });
      } catch (err) {
        console.log('Couldnt load board', err);
      }
    },
    async addBoard({ commit }, board) {
      try {
        await boardService.add(board);
        commit({ type: 'addBoard', board });
      } catch (err) {
        console.log("Couldn't add board", err);
      }
    },
    async updateBoard({ state, commit }, { board = null }) {
      try {
        if (!board) board = state.currBoard;
        await boardService.update(board);
        commit({ type: 'updateBoard', board });
        socketService.emit(SOCKET_EMIT_UPDATEBOARD, board);
      } catch (err) {
        console.log('Couldnt update Board', err);
      }
    },

    async removeBoard({ commit }, { boardId }) {
      try {
        await boardService.remove(boardId);
        commit({ type: 'removeBoard', boardId });
        //SOCKET FOR DELETING MIGHT BE NEEDED
      } catch (err) {
        console.log("Couldn't remove board", err);
      }
    },
    async removeGroup({ dispatch, commit }, { groupId }) {
      try {
        commit({ type: 'removeGroup', groupId });
        let board = null; //not sure if its needed
        await dispatch({ type: 'updateBoard' }, board);
      } catch (err) {
        console.log("Coulnd't remove group", err);
      }
    },
    async updateGroup({ dispatch, commit }, { group }) {
      try {
        commit({ type: 'updateGroup' }, group);
        let board = null; //not sure if its needed
        await dispatch({ type: 'updateBoard' });
      } catch (err) {}
    },
    async addGroup({ dispatch, commit }, { group }) {
      try {
        commit({ type: 'addGroup', group });
        await dispatch({ type: 'updateBoard' });
      } catch (err) {
        console.log('couldnt update in addgroup', err);
      }
    },
    async addTask({ dispatch, commit }, { task }) {
      try {
      } catch (err) {
        console.log('Couldnt add a task', err);
      }
    },
    async getTaskById() {
      //Not sure if we need it yet
      try {
      } catch (err) {}
    },
  },
};
