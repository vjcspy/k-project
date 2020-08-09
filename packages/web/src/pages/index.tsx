import foo from '@vjcspy/foo';
import React from 'react';
import { withAdapter } from '@vjcspy/web-ui';
import { NextPage } from 'next';
import { bar } from '@vjcspy/bar';
import { HomeWebUi } from '../../../web-ui/src/lib/rootPages/HomeWebUi';
// import { ProductWebUi } from '../../../web-ui/src/lib/rootPages/ProductWebUi';

const apiBase = process.env.NEXT_PUBLIC_APOLLO_API!;

const home: NextPage<{ sayHello: string }> = props => {
  return (
    <div>
      Imported modules from another workspace:
      <pre>{foo}</pre>
      <pre>{bar()}</pre>
      <pre>{props.sayHello}</pre>
      <HomeWebUi id={2} />
      <HomeWebUi id={33} />
      {/*
      Fix loi fragment o component nay
      */}
      {/*<ProductWebUi/>*/}
    </div>
  );
};

home.getInitialProps = context => {
  return { sayHello: 'Xin chao' };
};

export default withAdapter(home, { apollo: { apiBase }, ssr: true });
