// import { httpService } from './httpService'
import { storageService } from './asyncStorageService';
import { userService } from './userService';
import { utilService } from './utilService';

export const boardService = {
  add,
  query,
  remove,
  update,
  getBoardById,
  getEmptyGroup,
  getEmptyTask,
  getEmptyActivity,
  getEmptyLabel,
  getEmptyBoard,
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

async function getTaskById(taskId, boardId) {
  //Not sure yet
  try {
  } catch (err) {}
}

async function getBoardById(boardId) {
  try {
    const board = await storageService.get('boards', boardId);
    return board;
  } catch (err) {
    console.log("Could'nt get board by id ", err);
  }
}
async function remove(boardId) {
  try {
    //   return httpService.delete(`review/${reviewId}`)
    return storageService.delete('boards', boardId);
  } catch (err) {
    console.log('Had error on boardServices: REMOVE', err);
  }
}

async function add(board) {
  try {
    // board.createdBy = userService.getLoggedinUser();
    // board.byMember = await userService.getById(review.aboutUserId)
    // const addedBoard = await httpService.post(`review`, review)
    // const addedBoard = storageService.post('boards', board);
    storageService.post('boards', board);
    // return addedBoard;
  } catch (err) {
    console.log('Had error on boardServices: ADD', err);
  }
}
async function update(board) {
  try {
    const updatedBoard = storageService.put('boards', board);
    return updatedBoard;
  } catch (err) {
    console.log('Had error on boardServices: UPDATE', err);
  }
}
function getEmptyTask() {
  const task = {
    id: 't' + utilService.makeId(),
    title: '',
    description: '',
    byMember: [],
    members: [],
    labelIds: [],
    dates: {
      startDate: '',
      dueDate: '',
      isDone: false,
    },
    style: {
      bgColor: '',
      isInfo:true,
    },
  };
  return task;
}
function getEmptyGroup() {
  const group = {
    id: 'g' + utilService.makeId(),
    title: '',
    tasks: [],
  };
  return group;
}
function getEmptyLabel() {
  const label = {
    id: 'l' + utilService.makeId(),
    title: '',
    color: '',
  };
  return label;
}
function getEmptyActivity() {
  const activity = {
    id: 'a' + utilService.makeId(),
    txt: '',
    imgUrl: '',
    createdAt: Date.now(),
    byMember: {
      _id: '',
      fullname: '',
      imgUrl: '',
    },
    task: {
      id: '',
      title: '',
    },
  };
  return activity;
}
function getEmptyBoard() {
  const board = {
    _id: 'b' + utilService.makeId(),
    title: '',
    createdAt: Date.now(),
    createdBy: {},
    style: {
      backgroundColor: 'rgb(0, 121, 191)',
      backgroundUrl: '',
    },
    labels: [],
    groups: [],
    activities: [],
  };
  return board;
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
    style: {
      backgroundColor: '#61bd4f',
      backgroundUrl: '',
    },
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
        fullname: 'Ilya Shershniov',
        imgUrl:
          'https://icatcare.org/app/uploads/2018/07/Helping-your-new-cat-or-kitten-settle-in-1.png',
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
            description: '',
            byMember: [],
            members: [],
            comments: [],
            labelIds: [],
            dates: {
              startDate: '',
              dueDate: '',
              isDone: false,
            },
            style: {
              bgColor: '',
            },
          },
          {
            id: 'c102',
            title: 'Add Samples',
            description: '',
            byMember: [],
            members: [],
            comments: [],
            labelIds: [],
            dates: {
              startDate: '',
              dueDate: '',
              isDone: false,
            },
            style: {
              bgColor: '',
            },
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
            description: '',
            byMember: [],
            members: [],
            comments: [],
            labelIds: [],
            dates: {
              startDate: '',
              dueDate: '',
              isDone: false,
            },
            style: {
              bgColor: '',
            },
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
              {
                id: 'ZdPnmm2',
                txt: 'beny fix digiTask pls',
                createdAt: 1590999917436.0,
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
            dates: {
              startDate: '2021-12-13',
              dueDate: '2021-12-21',
              isDone: false,
            },
            byMember: {
              _id: 'u101',
              username: 'Tal',
              fullname: 'Tal Tarablus',
              imgUrl:
                'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
            },
            style: {
              bgColor: '',
              isInfo:true,
            },
          },
        ],
        style: {},
      },
    ],
    activities: [
      {
        id: 'a101',
        txt: 'changed the color',
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
