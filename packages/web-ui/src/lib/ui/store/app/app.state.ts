import { Record, RecordOf } from 'immutable';

export interface AppState {
  version: string;
  error?: any;
  count: number;
}

export const AppStateFactory: () => AppState = () => ({
  version: '1.0.0',
  error: null,

  count: 0
});
