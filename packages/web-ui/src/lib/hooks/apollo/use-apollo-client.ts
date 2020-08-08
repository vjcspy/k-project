import { ApolloClient } from '@apollo/client';
import { cacheKeyFromType } from '@magento/venia-ui/lib/util/apolloCache';
import {DefaultLink} from '@vjcspy/chitility';
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import { CachePersistor } from 'apollo-cache-persist';
import { useEffect, useState } from 'react';
import { WebUiApolloOptions } from '../../drivers';
import { isSSR } from '../../util';

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
    // UNION_AND_INTERFACE_TYPES is injected into the bundle by webpack at build time.
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
  const cache = apollo.cache || preInstantiatedCache;
  const link = apollo.link || DefaultLink(apiBase);
  const initialData = apollo.initialData || {};

  cache.writeData({
    data: initialData
  });

  apolloClient = new ApolloClient({
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

  apolloClient.onResetStore(async () =>
    cache.writeData({
      data: initialData
    })
  );

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
