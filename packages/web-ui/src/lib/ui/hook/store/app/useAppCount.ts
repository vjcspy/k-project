import { createSelector } from '@reduxjs/toolkit';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState, decreaseCount, increaseCount } from '../../../store';

export const selectAppCount = createSelector(
  (state: { app: AppState }) => state.app.count,
  count => count
);

export const useAppCount = () => {
  const appCount = useSelector(selectAppCount);
  const dispatch = useDispatch();

  const actionIncrease = useCallback(() => dispatch(increaseCount({ number: 1 })), [dispatch]);
  const actionDecrease = useCallback(() => dispatch(decreaseCount({ number: 1 })), [dispatch]);

  return { appCount, actionIncrease, actionDecrease };
};
