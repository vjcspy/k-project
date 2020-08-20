export interface ChiakiAppState {
  readonly version: string;
}

export const ChiakiAppStateFactory: () => ChiakiAppState = () => ({
  version: '1.0.0'
});
