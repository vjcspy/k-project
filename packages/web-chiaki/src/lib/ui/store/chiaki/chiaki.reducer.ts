import { createReducer } from '@reduxjs/toolkit';
import { ChiakiStateFactory } from './chiaki.state';

export const chiakiReducer = createReducer(ChiakiStateFactory(), builder => {
  builder.addDefaultCase(state => state);
});
