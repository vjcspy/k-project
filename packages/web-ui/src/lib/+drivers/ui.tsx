import * as React from 'react';
import moment from 'moment';
import { NextPage } from 'next';
import { WebUiAdapterOptions } from '../types';
import { UiContextProvider } from '../ui/context';

export const withUi = (
  PageComponent: NextPage<any>,
  webUiAdapterOptions: WebUiAdapterOptions
): NextPage<any> => {
  const WithUi: NextPage<any> = (props) => {
    return (
      <UiContextProvider value={props.webUiContext}>
        <PageComponent {...props} />
      </UiContextProvider>
    );
  };

  if (webUiAdapterOptions.ssr === true || !!PageComponent.getInitialProps) {
    WithUi.getInitialProps = async (context) => {
      let pageProps = {};
      if (PageComponent.getInitialProps) {
        pageProps = await PageComponent.getInitialProps(context);
      }

      return {
        webUiContext: {
          pathname: context.pathname,
          generatedTime: moment().format(),
        },
        ...pageProps,
      };
    };
  }

  const displayName =
    PageComponent.displayName || PageComponent.name || 'PageComponent';
  WithUi.displayName = `withUi(${displayName})`;

  return WithUi;
};
