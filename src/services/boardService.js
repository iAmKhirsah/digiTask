// import { httpService } from './httpService'
import { storageService } from './async-storage.service';
import { userService } from './userService';

export const boardService = {
  add,
  query,
  remove,
  update,
};

async function query(filterBy) {
  try {
    //   var queryStr = (!filterBy) ? '' : `?name=${filterBy.name}&sort=anaAref`
    return storageService.query('board');
  } catch (err) {
    console.log('Had error on boardServices: QUERY', err);
  }
}

async function remove(boardId) {
  try {
    //   return httpService.delete(`review/${reviewId}`)
    return storageService.delete('board', boardId);
  } catch (err) {
    console.log('Had error on boardServices: REMOVE', err);
  }
}

async function add(board) {
  try {
    board.byMember = userService.getLoggedinUser();
    // board.byMember = await userService.getById(review.aboutUserId)
    // const addedBoard = await httpService.post(`review`, review)
    const addedBoard = storageService.post('board', board);
    return addedBoard;
  } catch (err) {
    console.log('Had error on boardServices: ADD', err);
  }
}
async function update(board) {
  try {
    const updatedBoard = storageService.put('board', board);
    return updatedBoard;
  } catch (err) {
    console.log('Had error on boardServices: UPDATE', err);
  }
}
