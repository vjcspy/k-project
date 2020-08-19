import { createAction } from '@reduxjs/toolkit';

export const INCREASE_COUNT = 'INCREASE_COUNT';
export const increaseCount = createAction<{ number: number }>(INCREASE_COUNT);

export const DECREASE_COUNT = 'DECREASE_COUNT';
export const decreaseCount = createAction<{ number: number }>(DECREASE_COUNT);
