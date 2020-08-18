import React from 'react';
import { withUiComponent } from '@vjcspy/web-ui';

console.log('load test component');
const ChiakiTest = () => {
  return <div>Test from chiaki</div>;
};

export default withUiComponent(ChiakiTest);
