import { RecordOf } from 'immutable';

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

/**
 * Context data interface
 */
export interface WebUiContextValueInterface {
  themeName: string;
  pathname: string;
  generatedTime: string;
  tree: any;
}

/**
 * Context Record type
 */
export type WebUiContextValue = RecordOf<WebUiContextValueInterface>;
