import io from 'socket.io-client'

// REFERENCE
// export const SOCKET_EMIT_USER_WATCH = 'user-watch';
// export const SOCKET_EVENT_USER_UPDATED = 'user-updated';
// export const SOCKET_EVENT_REVIEW_ADDED = 'review-added';
// export const SOCKET_EVENT_REVIEW_ABOUT_YOU = 'review-about-you';
export const SOCKET_EVENT_WATCHBOARD = 'board-watch'
export const SOCKET_EMIT_UPDATEBOARD = 'board-updated'
export const SOCKET_EVENT_UPDATEDBOARD = 'updated-board'

const baseUrl = (process.env.NODE_ENV === 'production')? '' : '//localhost:3000'
export const socketService = createSocketService()
// export const socketService = createDummySocketService()

window.socketService = socketService

socketService.setup()


function createSocketService() {
  var socket = null;
  const socketService = {
    async setup() {
      socket = io(baseUrl)
    },
    on(eventName, cb) {
      socket.on(eventName, cb)
    },
    off(eventName, cb=null) {
      if (!socket) return;
      if (!cb) socket.removeAllListeners(eventName)
      else socket.off(eventName, cb)
    },
    emit(eventName, data) {
      socket.emit(eventName, data)
    },
    terminate() {
      socket = null
    }
  }
  return socketService
}

// DUMMY SERVICE FOR BEFORE BACKEND
function createDummySocketService() {
  var listenersMap = {}
  const socketService = {
    listenersMap,
    setup() {
      listenersMap = {}
    },
    terminate() {
      this.setup()
    },
    on(eventName, cb) {
      listenersMap[eventName] = [...(listenersMap[eventName]) || [], cb]
    },
    off(eventName, cb) {
      if (!listenersMap[eventName]) return
      if (!cb) delete listenersMap[eventName]
      else listenersMap[eventName] = listenersMap[eventName].filter(l => l !== cb)
    },
    emit(eventName, data) {
      if (!listenersMap[eventName]) return
      listenersMap[eventName].forEach(listener => {
        listener(data)
      })
    },
    // debugMsg() {
    //   this.emit('chat addMsg', {from: 'Someone', txt: 'Aha it worked!'})
    // },
    
  }
  return socketService
}

