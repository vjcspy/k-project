import { Reducer, ReducersMapObject, createStore } from 'redux';
import { appReducer } from './app/app.reducer';
import { combineReducers } from '@reduxjs/toolkit';

export * from './state.index';
export * from './actions.index';

const reducers: ReducersMapObject<any, any> = {
  app: appReducer
};

function createReducerManager(initialReducers: ReducersMapObject<any, any>) {
  // Create an object which maps keys to reducers
  const reducers = { ...initialReducers };

  // Create the initial combinedReducer
  let combinedReducer = combineReducers(reducers);

  // An array which is used to delete state keys when reducers are removed
  let keysToRemove: string[] = [];

  return {
    getReducerMap: () => reducers,

    // The root reducer function exposed by this object
    // This will be passed to the store
    reduce: (state: any, action: any) => {
      // If any reducers have been removed, clean up their state first
      if (keysToRemove.length > 0) {
        state = { ...state };
        for (let key of keysToRemove) {
          delete state[key];
        }
        keysToRemove = [];
      }

      // Delegate to the combined reducer
      return combinedReducer(state, action);
    },

    // Adds a new reducer with the specified key
    add: (key: string, reducer: Reducer<any>) => {
      if (!key || reducers[key]) {
        return;
      }

      // Add the reducer to the reducer mapping
      reducers[key] = reducer;

      // Generate a new combined reducer
      combinedReducer = combineReducers(reducers);
    },

    // Removes a reducer with the specified key
    remove: (key: string) => {
      if (!key || !reducers[key]) {
        return;
      }

      // Remove it from the reducer mapping
      delete reducers[key];

      // Add the key to the list of keys to clean up
      keysToRemove.push(key);

      // Generate a new combined reducer
      combinedReducer = combineReducers(reducers);
    }
  };
}

export const reducerManager = createReducerManager(reducers);

// Create a store with the root reducer function being the one exposed by the manager.
export const store = createStore(reducerManager.reduce);

// Optional: Put the reducer manager on the store so it is easily accessible
// @ts-ignore
store.reducerManager = reducerManager;
