import { storageService } from './asyncStorageService';
import { utilService } from './utilService';
import { httpService } from './httpService';
const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser';

export const userService = {
  login,
  logout,
  signup,
  getLoggedinUser,
  getUsers,
  getEmptyUser,
  getById,
  update,
};

// Debug technique
window.userService = userService;

async function getUsers() {
  try {
    // return storageService.query('user');
    return httpService.get(`user`)
  } catch (err) {
    console.log('Had error on userService: GETUSERS', err);
  }
}

async function getById(userId) {
  try {
    // const user = await storageService.get('user', userId);
    const user = await httpService.get(`user/${userId}`)
    return user;
  } catch (err) {
    console.log('Had error on userService: GETUSERBYID', err);
  }
}

async function update(user) {
  try {
    // await storageService.put('user', user);
    user = await httpService.put(`user/${user._id}`, user)
    // Handle case in which admin updates other user's details
    if (getLoggedinUser()._id === user._id) _saveLocalUser(user);
    return user;
  } catch (err) {
    console.log('Had error on userService: UPDATE', err);
  }
}

async function login(userCred) {
  try {
    // const users = await storageService.query('user');
    // const user = users.find((user) => user.username === userCred.username);
    // return _saveLocalUser(user);

    const user = await httpService.post('auth/login', userCred)
    console.log(user);
    // socketService.emit('set-user-socket', user._id);
    if (user) return _saveLocalUser(user)
  } catch (err) {
    console.log('Had error on userService: LOGIN', err);
  }
}
async function signup(userCred) {
  try {
    // const user = await storageService.post('user', userCred);
    const user = await httpService.post('auth/signup', userCred)
    console.log(user);
    // socketService.emit('set-user-socket', user._id);
    return _saveLocalUser(user);
  } catch (err) {
    console.log('Had error on userService: SIGNUP', err);
  }
}
async function logout() {
  try {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER);
    // socketService.emit('unset-user-socket');
    return await httpService.post('auth/logout')
  } catch (err) {
    console.log('Had error on userService: LOGOUT', err);
  }
}

function _saveLocalUser(user) {
  sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user));
  return user;
}

function getLoggedinUser() {
  return JSON.parse(
    sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER) || 'null'
  );
}
function getEmptyUser() {
  const user = {
    _id: '',
    username: '',
    fullname: '',
    imgUrl: '',
    recentBoards: [],
    starred: [],
    mentions: [],
  };
  return user;
}
