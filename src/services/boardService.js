// import { httpService } from './httpService'
import { storageService } from './asyncStorageService';
import { userService } from './userService';

export const boardService = {
  add,
  query,
  remove,
  update,
  getBoardById
  
};
loadBoard();
async function loadBoard() {
  try {
    let loadedBoard = await query();
    
    if (!loadedBoard.length || !loadedBoard) createDemoBoard();
  } catch (err) {
    console.log('loadedBoard');
  }
}

async function query(filterBy = null) {
  try {

    //   var queryStr = (!filterBy) ? '' : `?name=${filterBy.name}&sort=anaAref`
    return await storageService.query('boards');
  } catch (err) {
    console.log('Had error on boardServices: QUERY', err);
  }
}

async function getTaskById(taskId,boardId){ //Not sure yet
  try{
    
  }catch(err){

  }
}

async function getBoardById(boardId){
  try{
    const board = await storageService.get('boards',boardId)
    console.log(boardId)
    return board
    
  }catch(err){
    console.log('Could\'nt get board by id ',err)
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
function createDemoBoard() {
  const board = {
    _id: 'b101',
    title: 'Robot dev proj',
    createdAt: 1589983468418,
    createdBy: {
      _id: 'u101',
      fullname: 'Abi Abambi',
      imgUrl: 'http://some-img',
    },
    style: {},
    labels: [
      {
        id: 'l101',
        title: 'Done',
        color: '#61bd4f',
      },
    ],
    members: [
      {
        _id: 'u101',
        fullname: 'Tal Tarablus',
        imgUrl: 'https://www.google.com',
      },
    ],
    groups: [
      {
        id: 'g101',
        title: 'Group 1',
        tasks: [
          {
            id: 'c101',
            title: 'Replace logo',
          },
          {
            id: 'c102',
            title: 'Add Samples',
          },
        ],
        style: {},
      },
      {
        id: 'g102',
        title: 'Group 2',
        tasks: [
          {
            id: 'c103',
            title: 'Do that',
          },
          {
            id: 'c104',
            title: 'Help me',
            description: 'description',
            comments: [
              {
                id: 'ZdPnm',
                txt: 'also @yaronb please CR this',
                createdAt: 1590999817436.0,
                byMember: {
                  _id: 'u101',
                  fullname: 'Tal Tarablus',
                  imgUrl:
                    'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                },
              },
            ],
            checklists: [
              {
                id: 'YEhmF',
                title: 'Checklist',
                todos: [
                  {
                    id: '212jX',
                    title: 'To Do 1',
                    isDone: false,
                  },
                ],
              },
            ],
            members: [
              {
                _id: 'u101',
                username: 'Tal',
                fullname: 'Tal Tarablus',
                imgUrl:
                  'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
              },
            ],
            labelIds: ['l101', 'l102'],
            createdAt: 1590999730348,
            dueDate: 16156215211,
            byMember: {
              _id: 'u101',
              username: 'Tal',
              fullname: 'Tal Tarablus',
              imgUrl:
                'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
            },
            style: {
              bgColor: '#26de81',
            },
          },
        ],
        style: {},
      },
    ],
    activities: [
      {
        id: 'a101',
        txt: 'Changed Color',
        createdAt: 154514,
        byMember: {
          _id: 'u101',
          fullname: 'Abi Abambi',
          imgUrl: 'http://some-img',
        },
        task: {
          id: 'c101',
          title: 'Replace Logo',
        },
      },
    ],
  };
  storageService.post('boards', board);
}
