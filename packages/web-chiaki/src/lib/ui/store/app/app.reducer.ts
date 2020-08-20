import { createReducer } from '@reduxjs/toolkit';
import {ChiakiAppStateFactory} from './app.state';

export const chiakiAppReducer = createReducer(ChiakiAppStateFactory(), builder => {
  builder.addDefaultCase(state => state);
});
