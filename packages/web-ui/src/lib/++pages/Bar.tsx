import React, { useState } from 'react';
import { Extension } from '../ui/component/extension';
import { withAdapter } from '../+drivers';

console.log('loaded bar page from Web UI');

function BarPage() {
  const [isCom1, setisCom1] = useState(true);
  const toggleCat = () => {
    setisCom1(!isCom1);
  };
  console.log('render bar page web UI');
  return (
    <>
      <h1>Bar from WEBUI</h1>
      <button onClick={toggleCat}>Toggle</button>
      <Extension uitag={isCom1 ? 'bar_child1' : 'bar_child2'} />
      <Extension uitag={'bar_child3'} />
    </>
  );
}

export default withAdapter(BarPage, { ssr: true });
