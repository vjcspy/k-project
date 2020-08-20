import { NextPage } from 'next';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from '../ui/store';
import React from 'react';

export const withStore = (Page: NextPage) => {
  const WithStore: NextPage = props => {
    return (
      <ReduxProvider store={store}>
        <Page {...props} />
      </ReduxProvider>
    );
  };

  if (typeof Page.getInitialProps === 'function') {
    WithStore.getInitialProps = async context => {
      // @ts-ignore
      const props = await Page.getInitialProps(context);

      return { ...props };
    };
  }

  const displayName = Page.displayName || Page.name || 'PageComponent';
  WithStore.displayName = `withStore(${displayName})`;

  return WithStore;
};
