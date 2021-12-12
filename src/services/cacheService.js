import localForage from 'localforage';

const store = localForage.createInstance({
  name: 'app',
});

const mapStateForCache = (state) => {
  // NOT SURE IF THIS IS HOW ITS DONE
  let cachedState = {
    boards: state.boards,
    currBoard: state.currBoard,
    currTask: {},
    currGroup: {},
  };
  return cachedState;
};

export const setState = (state) => {
  const cachedState = mapStateForCache(state);
  return store.setItem('state', cachedState);
};

export const getState = () => store.getItem('state');

export const deleteState = () => store.removeItem('state');
