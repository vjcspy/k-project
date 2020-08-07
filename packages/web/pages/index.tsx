import foo from '@vjcspy/foo';
import React from 'react';
import { bar } from '@vjcspy/bar';
import { Adapter, double, HOME } from '@vjcspy/web-ui';

export default function Home() {
  return (
    <Adapter apiBase={process.env.NEXT_PUBLIC_ANALYTICS_ID!}>
      Imported modules from another workspace:
      <pre>{foo}</pre>
      <pre>{double(2)}</pre>
      <pre>{bar()}</pre>
      <HOME />
    </Adapter>
  );
}
