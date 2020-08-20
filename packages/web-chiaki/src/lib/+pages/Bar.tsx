import { Extension, withAdapter } from '@vjcspy/web-ui';
import React, { useState } from 'react';


console.log('loaded bar page from chiaki');
const BarPage = () => {
  const [isCom1, setisCom1] = useState(true);
  const toggleCat = () => {
    setisCom1(!isCom1);
  };
  console.log('render bar page chiaki');
  return (
    <>
      <h1>Bar Page from Chiaki</h1>
      <button onClick={toggleCat}>Toggle</button>
      <Extension uitag={isCom1 ? 'bar_child1' : 'bar_child2'} />
      <Extension uitag={'bar_child3'} />
    </>
  );
};

export default withAdapter(BarPage);
