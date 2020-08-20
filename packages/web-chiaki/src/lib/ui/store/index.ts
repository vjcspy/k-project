import { combineReducers } from 'redux';
import { chiakiAppReducer } from './app/app.reducer';

export const reducer = combineReducers({
  app: chiakiAppReducer
});
export * from './state.index';
