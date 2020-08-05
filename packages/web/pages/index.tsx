import foo from '@vjcspy/foo';
import React from 'react';
import { double } from '@vjcspy/web-ui';
import { bar } from '@vjcspy/bar';

export default function Home() {
  return (
    <div>
      Imported modules from another workspace:
      <pre>{foo}</pre>
      <pre>{double(2)}</pre>
      <pre>{bar()}</pre>
    </div>
  );
}
