import React from 'react';
import { ApolloProvider } from '@apollo/client';
import Head from 'next/head';
import { isSSR } from '../util';
import { initApolloClient, useApolloClient } from '../ui/apollo/use-apollo-client';
import { WebUiAdapterOptions } from '../types';
import { NextPage } from 'next';

/**
 *
 * @param PageComponent
 * @param adapterProps
 * @returns {React.ReactElement<any, any> | null}
 */
export const withApollo = (PageComponent: NextPage<any>, adapterProps: WebUiAdapterOptions) => {
  console.log('withApollo');
  const { apollo, ssr = true } = adapterProps;
  const apiBase = apollo!.apiBase;

  /**
   * React function component
   * @param props
   * @returns {React.ElementType | null}
   * @constructor
   */
  const WithApollo: NextPage<any> = props => {
    const { apollo, ssrComplete, ...pageProps } = props;

    const [client] = useApolloClient({ ...apollo, apiBase });

    return (
      <ApolloProvider client={client}>
        <PageComponent {...pageProps} />
      </ApolloProvider>
    );
  };

  // Set the correct displayName in development
  if (process.env.NODE_ENV !== 'production') {
    const displayName = PageComponent.displayName || PageComponent.name || 'PageComponent';

    if (displayName === 'App') {
      console.warn('This withApollo HOC only works with PageComponents.');
    }

    WithApollo.displayName = `withApollo(${displayName})`;
  }

  if (ssr || PageComponent.getInitialProps) {
    WithApollo.getInitialProps = async ctx => {
      // Initialize ApolloClient, add it to the ctx object so
      // we can use it in `PageComponent.getInitialProp`.
      const client = initApolloClient(adapterProps.apollo!);

      // Run wrapped getInitialProps methods
      let pageProps = {};
      if (PageComponent.getInitialProps) {
        pageProps = await PageComponent.getInitialProps(ctx);
        console.log(pageProps);
      }

      // Only on the server:
      if (isSSR()) {
        console.log(3);
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
              <ctx.AppTree
                pageProps={{
                  ...pageProps,
                  apollo: { client }
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
      const initialData = client.cache.extract();
      console.log(initialData);
      return {
        ...pageProps,
        apollo: { initialData },
        ssrComplete: true
      };
    };
  }

  return WithApollo;
};
