/**
 * Adapter options
 */
export type WebUiAdapterOptions = {
  ssr?: boolean;
  apollo?: WebUiApolloOptions;
};

/**
 * Apollo options for `Adapter options`
 */
export type WebUiApolloOptions = {
  apiBase: string;
  link?: any;
  client?: any;
  initialData?: any;
  cache?: any;
};

/**
 * Props mặc định được pass từ server
 */
export type WebUiPageDefaultProps = {
  webUiContext?: {
    pathname: string;
    generatedTime: string;
  };

  apollo?: {
    initialData: any;
    ssrComplete: boolean;
  };
};

export interface UiContextValue {
  readonly themeName: string;
  readonly pathname: string;
  readonly generatedTime: string;
  readonly tree: any;
}
