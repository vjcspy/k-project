import React, { useState } from 'react';
import { bootUi, UiComponent } from '@vjcspy/web-ui';
import { bootChiaki } from '@vjcspy/web-chiaki';

bootUi();
bootChiaki();

function BarPage() {
  const [isCom1, setisCom1] = useState(true);

  const toggleCat = () => {
    setisCom1(!isCom1);
  };

  return (
    <>
      <button onClick={toggleCat}>Toggle</button>
      <UiComponent uitag={'category_list'} />
    </>
  );
}

export default BarPage;
