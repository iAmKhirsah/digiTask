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
    currGroup: {},
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
    getCurrTask({ currTask }) {
      return currTask;
    },
    getCurrGroup({ currGroup }) {
      return currGroup;
    },
    getCurrBoard({ currBoard }) {
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
      let newGroup = boardService.getEmptyGroup();
      newGroup.title = group.title;
      state.currBoard.groups.push(newGroup);
      this.newGroup = boardService.getEmptyGroup();
    },
    addActivity(state, { activity }) {
      let newActivity = boardService.getEmptyActivity();
      newActivity.txt = activity.txt;
      newActivity.byMember = activity.user;
      newActivity.task.id = activity.task.id;
      newActivity.task.title = activity.task.title;
      if (activity.res) {
        newActivity.imgUrl = activity.res.url;
      }
      state.currBoard.activities.push(newActivity);
    },
    addTask(state, { taskRaw }) {
      let newTask = boardService.getEmptyTask();
      newTask.title = taskRaw.task;
      newTask.byMember = taskRaw.user;
      let idx = state.currBoard.groups.findIndex(
        (group) => group.id === taskRaw.groupId
      );
      state.currBoard.groups[idx].tasks.push(newTask);
    },
    addMember(state, { member }) {
      state.currTask.members.push(member);
    },
    getDetails(state, { taskId, groupId }) {
      let idx = state.currBoard.groups.findIndex(
        (group) => group.id === groupId
      );
      state.currGroup = state.currBoard.groups[idx];
      state.currTask = state.currGroup.tasks.find((task) => task.id === taskId);
      console.log(state.currTask);
    },
    updateGroup(state, { group }) {
      const idx = state.currBoard.groups.findIndex(
        (currGroup) => currGroup.id === group.id
      );
      state.currBoard.groups.splice(idx, 1, group);
    },
    updateTask(state, { task }) {
      state.currTask = task;
    },
    removeTask(state, { task }) {
      let idx = state.currGroup.tasks.findIndex(
        (currTask) => currTask.id === task.id
      );
      state.currGroup.tasks.splice(idx, 1);
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
        commit({ type: 'updateGroup', group });
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
    async addTask({ dispatch, commit }, { taskRaw }) {
      try {
        commit({ type: 'addTask', taskRaw });
        await dispatch({ type: 'updateBoard' });
      } catch (err) {
        console.log('Couldnt add a task', err);
      }
    },
    async addMember({ commit }, { member }) {
      try {
        commit({ type: 'addMember', member });
      } catch (err) {
        console.log('Error on board store ADDMEMBER');
      }
    },
    async removeTask({ dispatch, commit }, { task }) {
      try {
        commit({ type: 'removeTask', task });
        await dispatch({ type: 'updateBoard' });
      } catch (err) {
        console.log('Error on board store REMOVETASK', err);
      }
    },
    async getTaskDetails({ commit }, { taskId, groupId }) {
      try {
        commit({ type: 'getDetails', taskId, groupId });
      } catch (err) {
        console.log('Error on board store GETTASKDETAILS', err);
      }
    },
    async updateTask({ commit }, { task }) {
      try {
        commit({ type: 'updateTask', task });
      } catch (err) {
        console.log('Error on board store UPDATETASK', err);
      }
    },
    async addActivity({ dispatch, commit }, { activity }) {
      console.log(activity);
      try {
        commit({ type: 'addActivity', activity });
        dispatch({ type: 'updateBoard' });
      } catch (err) {
        console.log('Error on board store ADDACTIVITY', err);
      }
    },
  },
};
