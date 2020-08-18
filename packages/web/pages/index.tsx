import React from 'react';
import { withAdapter } from '@vjcspy/web-ui';
import { NextPage } from 'next';

const apiBase = process.env.NEXT_PUBLIC_APOLLO_API!;

const home: NextPage<{ sayHello: string }> = props => {
  return <div>Hello</div>;
};

home.getInitialProps = context => {
  return { sayHello: 'Xin chao' };
};

export default withAdapter(home, { apollo: { apiBase }, ssr: true });
