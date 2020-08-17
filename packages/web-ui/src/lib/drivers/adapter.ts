import { NextPage } from 'next';
import { WebUiAdapterOptions } from '../types';
import { withApollo } from './apollo';
import { withUi } from './ui';

export const withAdapter = (
  PageComponent: NextPage<any>,
  webUiAdapterOptions: WebUiAdapterOptions = {
    ssr: true,
    apollo: {
      apiBase: process.env.NEXT_PUBLIC_APOLLO_API!
    }
  }
) => {
  console.log('here');
  return withUi(withApollo(PageComponent, webUiAdapterOptions));
};
