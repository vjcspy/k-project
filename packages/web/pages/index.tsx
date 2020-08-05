import foo from '@vjcspy/foo';
import Bar from '@vjcspy/bar';
import React from 'react';
import {double} from '@vjcspy/web-ui';

export default function Home() {
  return (
          <div>
            Imported modules from another workspace:
            <pre>{foo}</pre>
            <pre>{double(2)}</pre>
            <Bar/>
          </div>
  );
}
