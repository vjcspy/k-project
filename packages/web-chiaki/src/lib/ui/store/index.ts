import { combineReducers } from 'redux';
import { chiakiReducer } from './chiaki/chiaki.reducer';

export * from './state.index';
export const reducer = combineReducers({
  chiaki: chiakiReducer
});
