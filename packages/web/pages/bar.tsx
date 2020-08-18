import React, { useState } from 'react';
import { bootUi, UiComponent, withAdapter } from '@vjcspy/web-ui';
import { withChiakiUi } from '@vjcspy/web-chiaki';

bootUi();

function BarPage() {
  const [isCom1, setisCom1] = useState(true);
  const toggleCat = () => {
    setisCom1(!isCom1);
  };
  console.log('render bar page');
  return (
    <>
      <button onClick={toggleCat}>Toggle</button>
      <UiComponent uitag={isCom1 ? 'category_list_1' : 'category_list'} />
      <UiComponent uitag={'test'} />
    </>
  );
}

export default withAdapter(withChiakiUi(BarPage));
