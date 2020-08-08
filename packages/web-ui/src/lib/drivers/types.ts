import { NextPage } from 'next';

export type WebUiPage<T> = {} & NextPage<T>;

export type WebUiAdapterOptions = {
  ssr?: boolean;
  apollo?: WebUiApolloOptions;
};

export type WebUiApolloOptions = {
  apiBase: string;
  link?: any;
  apolloClient?: any;
  initialData?: any;
  cache?: any;
};

export type WebUiProps = {};
