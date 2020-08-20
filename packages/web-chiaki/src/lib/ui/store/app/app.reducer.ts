import { createReducer } from '@reduxjs/toolkit';
import { initChiaki } from './app.actions';
import { ChiakiAppStateFactory } from './app.state';

export const chiakiAppReducer = createReducer(
  ChiakiAppStateFactory(),
  (builder) => {
    builder
      .addCase(initChiaki, (state, action) => {
        state.version = action.payload.version;
      })
      .addDefaultCase((state) => state);
  }
);
