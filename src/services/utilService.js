function makeId(length = 5) {
  var txt = '';
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return txt;
}
function benyIsKingButDeleteThis() {}
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

export const utilService = {
  makeId,
  getRandomInt,
  debounce,
  applyDrag
};

function debounce(func, wait) {
  let timeout;

  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function applyDrag(arr, dragResult){
  const { removedIndex, addedIndex, payload } = dragResult
  console.log(removedIndex, addedIndex, payload)
  if (removedIndex === null && addedIndex === null) return arr

  const result = [...arr]
  let itemToAdd = payload

  if (removedIndex !== null) {
      itemToAdd = result.splice(removedIndex, 1)[0]
  }

  if (addedIndex !== null) {
      result.splice(addedIndex, 0, itemToAdd)
  }

  return result
}

