import { NextPage } from 'next';
import { WebUiAdapterOptions, WebUiPageDefaultProps } from '../types';
import { withApollo } from './apollo';
import { withStore } from './store';
import { withUi } from './ui';

export const withAdapter = (
  PageComponent: NextPage<any>,
  webUiAdapterOptions: WebUiAdapterOptions = {
    ssr: true,
    apollo: {
      apiBase: process.env.NEXT_PUBLIC_APOLLO_API!,
    },
  }
): NextPage<WebUiPageDefaultProps> => {
  return withUi(
    withApollo(withStore(PageComponent), webUiAdapterOptions),
    webUiAdapterOptions
  );
};
