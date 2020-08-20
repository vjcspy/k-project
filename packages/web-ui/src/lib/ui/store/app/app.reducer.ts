import { createReducer } from '@reduxjs/toolkit';
import { decreaseCount, increaseCount } from './app.actions';
import { AppState, AppStateFactory } from './app.state';

export const appReducer = createReducer(AppStateFactory(), (builder) => {
  builder
    .addCase(increaseCount, (state, action) => {
      state.count = state.count + action.payload.number;
    })
    .addCase(decreaseCount, (state, action) => {
      state.count = state.count - action.payload.number;
    });
});
