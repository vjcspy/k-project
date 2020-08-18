import * as React from 'react';
import { useContext } from 'react';
import { WebUIContext } from './context';
import moment from 'moment';
import { NextPage } from 'next';
import { WebUiComponentTree } from '../ui/component/WebUiComponentTree';
import { WebUiAdapterOptions } from '../types';

export const withUi = (PageComponent: NextPage<any>, webUiAdapterOptions: WebUiAdapterOptions): NextPage<any> => {
  const WithUi: NextPage<any> = props => {
    const webUiContext = useContext(WebUIContext);
    const context = webUiContext.merge({ ...props.webUiContext });
    WebUiComponentTree.WEB_UI_CONTEXT = context.toJS();
    return (
      <WebUIContext.Provider value={context}>
        <PageComponent {...props} />
      </WebUIContext.Provider>
    );
  };

  if (webUiAdapterOptions.ssr === true) {
    WithUi.getInitialProps = async context => {
      let pageProps = {};
      if (PageComponent.getInitialProps) {
        pageProps = await PageComponent.getInitialProps(context);
      }

      return {
        webUiContext: {
          pathname: context.pathname,
          generatedTime: moment().format()
        },
        ...pageProps
      };
    };
  }

  const displayName = PageComponent.displayName || PageComponent.name || 'PageComponent';
  WithUi.displayName = `withUi(${displayName})`;

  return WithUi;
};
