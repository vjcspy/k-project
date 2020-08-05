import foo from '@vjcspy/foo';
import React from 'react';
import { bar } from '@vjcspy/bar';
import { double, HOME } from '@vjcspy/web-ui';

export default function Home() {
  return (
    <div>
      Imported modules from another workspace:
      <pre>{foo}</pre>
      <pre>{double(2)}</pre>
      <pre>{bar()}</pre>
      <HOME />
    </div>
  );
}
