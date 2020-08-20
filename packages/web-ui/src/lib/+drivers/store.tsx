import { NextPage } from 'next';
import { Provider as ReduxProvider } from 'react-redux';
import { middleware, reducerManager } from '../ui/store';
import React from 'react';
import { configureStore } from '@reduxjs/toolkit';

console.log('load driver store');
// Create a store with the root reducer function being the one exposed by the manager.
const store = configureStore({
  reducer: reducerManager.reduce,
  middleware,
  devTools: true
});

// Optional: Put the reducer manager on the store so it is easily accessible
// @ts-ignore
store.reducerManager = reducerManager;

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
