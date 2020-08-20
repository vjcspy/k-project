import {
  createAction as createActionOrigin,
  PayloadActionCreator
} from '@reduxjs/toolkit';

export function createAction<P, T extends string = string>(
  type: T,
  prefix?: string
): PayloadActionCreator<P, T> {
  let typeWithPrefix: any = type;
  if (prefix) {
    typeWithPrefix = '+' + prefix + '/' + typeWithPrefix;
  }

  return createActionOrigin<P, any>(typeWithPrefix);
}
