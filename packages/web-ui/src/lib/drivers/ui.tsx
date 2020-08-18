import * as React from 'react';
import { useContext } from 'react';
import { WebUIContext } from './context';
import moment from 'moment';
import { NextPage } from 'next';

export const withUi = (PageComponent: NextPage<any>): NextPage<any> => {
  const WithUi: NextPage<any> = props => {
    const webUiContext = useContext(WebUIContext);

    return (
      <WebUIContext.Provider value={webUiContext.merge({ ...props.webUiContext })}>
        <PageComponent {...props} />
      </WebUIContext.Provider>
    );
  };

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

  const displayName = PageComponent.displayName || PageComponent.name || 'PageComponent';
  WithUi.displayName = `withUi(${displayName})`;

  return WithUi;
};
