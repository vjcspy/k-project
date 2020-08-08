import React from 'react';
import { initApolloClient, useApolloClient } from '../hooks/apollo';
import { ApolloProvider } from '@apollo/client';
import Head from 'next/head';
import { WebUiAdapterOptions, WebUiPage } from './types';
import { isSSR } from '../util';

/**
 *
 * @param PageComponent
 * @param adapterProps
 * @returns {React.ReactElement<any, any> | null}
 */
export const withApollo = (PageComponent: WebUiPage<any>, adapterProps: WebUiAdapterOptions) => {
  const { apollo, ssr = true } = adapterProps;
  const apiBase = apollo!.apiBase;

  /**
   * React function component
   * @param props
   * @returns {React.ElementType | null}
   * @constructor
   */
  const WithApollo: WebUiPage<any> = props => {
    const { apollo, ssrComplete, ...pageProps } = props;

    const [apolloClient] = useApolloClient({ ...apollo, apiBase });

    return (
      <ApolloProvider client={apolloClient}>
        <PageComponent {...pageProps} />
      </ApolloProvider>
    );
  };

  // Set the correct displayName in development
  if (process.env.NODE_ENV !== 'production') {
    const displayName = PageComponent.displayName || PageComponent.name || 'Component';

    if (displayName === 'App') {
      console.warn('This withApollo HOC only works with PageComponents.');
    }

    WithApollo.displayName = `withApollo(${displayName})`;
  }

  if (ssr || PageComponent.getInitialProps) {
    WithApollo.getInitialProps = async ctx => {
      const { AppTree } = ctx;

      // Initialize ApolloClient, add it to the ctx object so
      // we can use it in `PageComponent.getInitialProp`.
      const apolloClient = initApolloClient(adapterProps.apollo!);

      // Run wrapped getInitialProps methods
      let pageProps = {};
      if (PageComponent.getInitialProps) {
        pageProps = await PageComponent.getInitialProps(ctx);
      }

      // Only on the server:
      if (isSSR()) {
        // When redirecting, the response is finished.
        // No point in continuing to render
        if (ctx.res && ctx.res.writableEnded) {
          return pageProps;
        }

        // Only if ssr is enabled
        if (ssr) {
          try {
            // Run all GraphQL queries
            const { getDataFromTree } = await import('@apollo/react-ssr');
            await getDataFromTree(
              <AppTree
                pageProps={{
                  ...pageProps,
                  apollo: { apolloClient }
                }}
              />
            );
          } catch (error) {
            // Prevent Apollo Client GraphQL errors from crashing SSR.
            // Handle them in components via the data.error prop:
            // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
            console.error('Error while running `getDataFromTree`', error);
          }

          // getDataFromTree does not call componentWillUnmount
          // head side effect therefore need to be cleared manually
          Head.rewind();
        }
      }

      // Extract query data from the Apollo store
      const initialData = apolloClient.cache.extract();

      return {
        ...pageProps,
        apollo: { initialData },
        ssrComplete: true
      };
    };
  }

  return WithApollo;
};
