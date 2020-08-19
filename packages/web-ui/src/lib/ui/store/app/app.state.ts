import { Record, RecordOf } from 'immutable';

export interface AppStateInterface {
  version: string;
  error?: any;
  count: number;
}

export type AppState = RecordOf<AppStateInterface>;

export const AppStateFactory: Record.Factory<AppStateInterface> = Record({
  version: '1.0.0',
  error: null,

  count: 0
});
