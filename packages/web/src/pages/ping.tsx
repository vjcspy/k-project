import { NextPage } from 'next';
import { WebUIContext, withAdapter } from '@vjcspy/web-ui';
import React from 'react';

const Ping: NextPage<{ request: any }> = props => {
  return (
    <div>
      <pre>{JSON.stringify(props.request, null, '\t')}</pre>
      <WebUIContext.Consumer>{value => <pre>{JSON.stringify(value, null, '\t')}</pre>}</WebUIContext.Consumer>
    </div>
  );
};

Ping.getInitialProps = context => {
  return {
    request: context.req ? context.req.headers : null
  };
};

export default withAdapter(Ping);
