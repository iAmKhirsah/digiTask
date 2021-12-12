import { setState } from '../services/cacheService';

const shouldSkipCache = (mutation) => {
  // LOGIC HERE
};

const plugin = (store) => {
  store.subscribe((mutation, state) => {
    if (!shouldSkipCache(mutation)) {
      setState(state).catch((err) =>
        console.warn('failed to cache state', err)
      );
    }
  });
};

export default plugin;
