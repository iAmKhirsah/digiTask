import { boardService } from '../services/boardService.js';
import { utilService } from '../services/utilService.js';
import {
  socketService,
  SOCKET_EVENT_WATCHBOARD,
  SOCKET_EMIT_UPDATEBOARD,
  SOCKET_EVENT_UPDATEDBOARD,
} from '../services/socketService';

export const boardStore = {
  strict: true,
  state: {
    currBoard: null,
    boards: [],
    currTask: {},
    currGroup: {},
    filterBy: { keyWord: '', members: [], dueDate: null, labels: [] },
    isLoading: false,
    newGroup: {},
    newTask: {},
    newChecklist: {},
    newTodo: {},
    // newId: utilService.makeId(),
  },
  getters: {
    isLoading({ isLoading }) {
      return isLoading;
    },
    getEmptyTodo({ newTodo }) {
      return newTodo;
    },
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
    setComment(state, { comment }) {
      comment.id = utilService.makeId();
      if (!state.currTask.comments || !state.currTask.comments.length)
        state.currTask.comments = [];
      state.currTask.comments.push(comment);
    },
    setLoadingOn(state) {
      state.isLoading = true;
    },
    setLoadingOff(state) {
      state.isLoading = false;
    },
    setBoards(state, { boards }) {
      state.boards = boards;
    },
    setCurrBoard(state, { board }) {
      state.currBoard = board;
    },
    setTask(state, { task }) {
      state.currTask = task;
    },
    updateBoard(state, { board }) {
      if (board._id === state.currBoard._id) {
        state.currBoard = board;
        if (state.currBoard.groups.length)
          state.currBoard.groups.forEach((group) => {
            if (group.id === state.currGroup.id) state.currGroup = group;
          });
        if (state.currGroup.tasks && state.currTask)
          state.currGroup.tasks.forEach((task) => {
            if (task.id === state.currTask.id) state.currTask = task;
          });
      }
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
    async createBoard(state, { board, user }) {
      try {
        let emptyBoard = boardService.getEmptyBoard();
        emptyBoard.createdBy = user;
        emptyBoard.title = board.title;
        if (board.imgUrl) {
          emptyBoard.style.backgroundUrl = board.imgUrl;
        } else if (board.background)
          emptyBoard.style.backgroundColor = board.background;
        else emptyBoard.style.backgroundColor = 'rgb(0, 121, 191)';
        let newBoard = await boardService.add(emptyBoard);
        if (!state.boards.length) state.boards = [];
        state.boards.push(newBoard);
      } catch (err) {
        console.log('Couldnt create board', err);
      }
    },
    addActivity(state, { activity }) {
      let newActivity = boardService.getEmptyActivity();
      newActivity.txt = activity.txt;
      newActivity.byMember._id = activity.user._id;
      newActivity.byMember.username = activity.user.username;
      newActivity.byMember.fullname = activity.user.fullname;
      newActivity.byMember.imgUrl = activity.user.imgUrl;
      newActivity.task.id = activity.task.id;
      newActivity.task.title = activity.task.title;
      if (activity.res) {
        newActivity.imgUrl = activity.res.url;
      }
      state.currBoard.activities.unshift(newActivity);
    },
    addAttachment(state, { attachment }) {
      let newAttachment = boardService.getEmptyAttachment();
      newAttachment.txt = attachment.txt;
      newAttachment.imgUrl = attachment.res.url;
      newAttachment.task.id = attachment.task.id;
      newAttachment.task.title = attachment.task.title;
      state.currBoard.attachments.push(newAttachment);
    },
    createLabel(state, { label }) {
      if (label.id) {
        let idx = state.currBoard.labels.findIndex(
          (currLabel) => currLabel.id === label.id
        );
        state.currBoard.labels[idx] = label;
      } else {
        let newLabel = boardService.getEmptyLabel();
        newLabel.title = label.title;
        newLabel.color = label.selectedColor;
        state.currBoard.labels.push(newLabel);
        if(state.currTask)
        state.currTask.labelIds.push(newLabel.id);
      }
    },
    deleteLabel(state, label) {
      let boardIdx = state.currBoard.labels.findIndex(
        (currLabel) => currLabel.id === label.id
      );
      state.currBoard.labels.splice(boardIdx, 1);
      if(state.currTask){
        let taskIdx = state.currTask.labelIds.findIndex(
        (currLabel) => currLabel.id === label.id
      );
      state.currTask.labelIds.splice(taskIdx, 1);
      }  
    },
    addTask(state, { taskRaw }) {
      let newTask = boardService.getEmptyTask();
      newTask.title = taskRaw.task;
      newTask.byMember = taskRaw.user
      state.currBoard.groups[taskRaw.idx].tasks.push(newTask);  
    },
    updateStore(state, { taskId }) {
      let groupIdx = state.currBoard.groups.findIndex((group) =>
        group.tasks.some((task) => task.id === taskId)
      );
      state.currGroup = state.currBoard.groups[groupIdx];
      if (state.currBoard.groups[groupIdx].tasks)
        state.currTask = state.currBoard.groups[groupIdx].tasks.find(
          (task) => task.id === taskId
        );
    },
    updateGroup(state, { group }) {
      const idx = state.currBoard.groups.findIndex(
        (currGroup) => currGroup.id === group.id
      );
      state.currBoard.groups.splice(idx, 1, group);
      state.currGroup = state.currBoard.groups[idx];
    },
    updateTask(state, { task }) {
      if (!task) {
        state.currTask = null;
        return;
      }
      const groupIdx = state.currBoard.groups.findIndex((currGroup) =>
        currGroup.tasks.find((currTask) => task.id === currTask.id)
      );
      const taskIdx = state.currBoard.groups[groupIdx].tasks.findIndex(
        (currTask) => currTask.id === task.id
      );
      state.currBoard.groups[groupIdx].tasks.splice(taskIdx, 1, task);
      state.currTask = task;
    },
    removeTask(state, { task }) {
      const groupIdx = state.currBoard.groups.findIndex((currGroup) =>
        currGroup.tasks.find((currTask) => task.id === currTask.id)
      );
      const taskIdx = state.currBoard.groups[groupIdx].tasks.findIndex(
        (currTask) => currTask.id === task.id
      );
      state.currBoard.groups[groupIdx].tasks.splice(taskIdx, 1);
      state.currTask = null;
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
    applyDrag(state, { content }) {
      if (
        content.dropResult.removedIndex === null &&
        content.dropResult.addedIndex === null
      )
        return;
      const { removedIndex, addedIndex, payload } = content.dropResult;
      const idx = content.groupIdx;
      const result = [...state.currBoard.groups[idx].tasks];
      let itemToAdd = payload;
      if (removedIndex !== null) {
        itemToAdd = result.splice(removedIndex, 1)[0];
      }
      if (addedIndex !== null) {
        result.splice(addedIndex, 0, itemToAdd);
      }
      state.currBoard.groups[idx].tasks = [...result];
    },
    applyDragGroup(state, { dropResult }) {
      if (dropResult.removedIndex === null && dropResult.addedIndex === null)
        return;

      const { removedIndex, addedIndex, payload } = dropResult;
      const result = [...state.currBoard.groups];
      let itemToAdd = payload;
      if (removedIndex !== null) {
        itemToAdd = result.splice(removedIndex, 1)[0];
      }
      if (addedIndex !== null) {
        result.splice(addedIndex, 0, itemToAdd);
      }
      state.currBoard.groups = [...result];
    },
  },
  actions: {
    async loadBoards({ commit }) {
      try {
        commit({ type: 'setLoadingOn' });
        const boards = await boardService.query();
        commit({ type: 'setBoards', boards });
      } catch (err) {
        console.log('Couldnt load boards', err);
      } finally {
        commit({ type: 'setLoadingOff' });
      }
    },
    async loadAndWatchBoard({ commit }, { boardId }) {
      try {
        commit({ type: 'setCurrBoard', board: null });
        commit({ type: 'setLoadingOn' });
        const board = await boardService.getBoardById(boardId);
        commit({ type: 'setCurrBoard', board });
        socketService.emit(SOCKET_EVENT_WATCHBOARD, boardId);
        socketService.off(SOCKET_EVENT_UPDATEDBOARD);
        socketService.on(SOCKET_EVENT_UPDATEDBOARD, (updatedBoard) => {
          commit({ type: 'updateBoard', board: updatedBoard });
        });
      } catch (err) {
        console.log('Couldnt load board', err);
      } finally {
        commit({ type: 'setLoadingOff' });
      }
    },
    async addBoard({ commit }, board) {
      try {
        let newBoard = await boardService.add(board);
        commit({ type: 'addBoard', newBoard });
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
    async removeTask({ dispatch, commit }, { task }) {
      try {
        commit({ type: 'removeTask', task });
        await dispatch({ type: 'updateBoard' });
      } catch (err) {
        console.log('Error on board store REMOVETASK', err);
      }
    },
    async updateStore({ commit }, { boardId, taskId }) {
      try {
        let board = await boardService.getBoardById(boardId);
        commit({ type: 'setCurrBoard', board });
        commit({ type: 'updateStore', taskId });
      } catch (err) {
        console.log('Error on board store GETTASKDETAILS', err);
      }
    },
    async updateTask({ commit, dispatch }, { task }) {
      try {
        commit({ type: 'updateTask', task });
        await dispatch({ type: 'updateBoard' });
      } catch (err) {
        console.log('Error on board store UPDATETASK', err);
      }
    },
    async createLabel({ dispatch, commit }, { label }) {
      try {
        commit({ type: 'createLabel', label });
        await dispatch({ type: 'updateBoard' });
      } catch (err) {
        console.log('Error on board store CREATELABEL');
      }
    },
    async deleteLabel({ dispatch, commit }, { label }) {
      try {
        commit({ type: 'deleteLabel', label });
        await dispatch({ type: 'updateBoard' });
      } catch (err) {
        console.log('Error on board soter DELETELABEL');
      }
    },
    async addActivity({ dispatch, commit }, { activity }) {
      try {
        commit({ type: 'addActivity', activity });
        dispatch({ type: 'updateBoard' });
      } catch (err) {
        console.log('Error on board store ADDACTIVITY', err);
      }
    },
    async addAttachment({ dispatch, commit }, { attachment }) {
      try {
        commit({ type: 'addAttachment', attachment });
        await dispatch({ type: 'updateBoard' });
      } catch (err) {
        console.log('boardStore: Error on-AddAttachment', err);
      }
    },
    async createBoard({ commit }, { board ,user}) {
      try {
        let emptyBoard = boardService.getEmptyBoard();
        emptyBoard.createdBy = user;
        emptyBoard.title = board.title;
        if (board.imgUrl) {
          emptyBoard.style.backgroundUrl = board.imgUrl;
        }
        else if (board.background)
        emptyBoard.style.backgroundColor = board.background;
        else emptyBoard.style.backgroundColor = 'rgb(0, 121, 191)';
        let newBoard = await boardService.add(emptyBoard);
        
        commit({ type: 'addBoard', board: newBoard ,user});
      } catch (err) {
        console.log('Error on board store CREATEBOARD');
      }
    },
    async applyDrag({ dispatch, commit }, { content }) {
      commit({ type: 'applyDrag', content });
      await dispatch({ type: 'updateBoard' });
    },
    async applyDragGroup({ dispatch, commit }, { dropResult }) {
      commit({ type: 'applyDragGroup', dropResult });
      await dispatch({ type: 'updateBoard' });
    },
  },
};
