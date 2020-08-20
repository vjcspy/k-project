export interface ChiakiState {
  readonly version: string;
}

export const ChiakiStateFactory: () => ChiakiState = () => ({
  version: '1.0.0'
});
