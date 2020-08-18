import { ApolloClient } from '@apollo/client';
import { cacheKeyFromType } from '@magento/venia-ui/lib/util/apolloCache';
import { DefaultLink } from '@vjcspy/chitility';
import { ApolloCache } from 'apollo-cache';
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import { CachePersistor } from 'apollo-cache-persist';
import { useEffect, useState } from 'react';
import { WebUiApolloOptions } from '../../types';
import { isSSR } from '../../util';
import fetch from 'isomorphic-unfetch';

// Polyfill fetch() on the server (used by apollo-client)
if (isSSR()) {
  global.fetch = fetch;
}

/**
 * To improve initial load time, create an apollo cache object as soon as
 * this module is executed, since it doesn't depend on any component props.
 * The tradeoff is that we may be creating an instance we don't end up needing.
 *
 * @see https://www.npmjs.com/package/apollo-cache-inmemory
 */
const preInstantiatedCache = new InMemoryCache({
  dataIdFromObject: cacheKeyFromType,
  fragmentMatcher: new IntrospectionFragmentMatcher({
    // TODO: need to fix
    // introspectionQueryResultData: UNION_AND_INTERFACE_TYPES
  })
});

let apolloClient: any;

/**
 * Always creates a new apollo client on the server
 * Creates or reuses apollo client in the browser.
 * @param apolloOptions
 * @returns {ApolloClient<any>}
 */
export const initApolloClient = (apolloOptions: WebUiApolloOptions): ApolloClient<any> => {
  if (apolloOptions.client) {
    return apolloOptions.client;
  }

  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!isSSR() && !!apolloClient) {
    return apolloClient;
  }

  const { apiBase, ...apollo } = apolloOptions;
  const cache: ApolloCache<any> | any = apollo.cache || preInstantiatedCache;
  const link = apollo.link || DefaultLink(apiBase);

  if (apollo.initialData) {
    cache.restore(apollo.initialData);
  }

  apolloClient = new ApolloClient({
    ssrMode: isSSR(),
    cache,
    link
  });
  apolloClient.apiBase = apiBase;

  let persistor: CachePersistor<any>;

  if (!isSSR()) {
    /**
     * @see: https://github.com/apollographql/apollo-cache-persist
     */
    persistor = new CachePersistor({
      cache,
      storage: window.localStorage as any,
      debug: process.env.NODE_ENV === 'development'
    });
    apolloClient.persistor = persistor;
  }

  apolloClient.onResetStore(async () => {
    cache.restore(apollo.initialData ?? {})
  });

  return apolloClient;
};

/**
 *
 * @param apolloOptions
 * @returns {[ApolloClient<any> & {persistor: any}, boolean]}
 */
export const useApolloClient = (apolloOptions: WebUiApolloOptions) => {
  const [initClientCache, setInitClientCache] = useState(false);

  const client: ApolloClient<any> = initApolloClient(apolloOptions);

  let persistor = (client as any).persistor;

  useEffect(() => {
    async function initialize() {
      if (persistor) {
        await persistor.restore();
      }
      setInitClientCache(true);
    }

    if (!initClientCache) {
      initialize();
    }
  }, [initClientCache]);

  return [client];
};
