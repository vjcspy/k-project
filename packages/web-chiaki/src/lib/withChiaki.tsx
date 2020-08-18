import React, { ComponentType } from 'react';
import { WebUiComponentTree } from '@vjcspy/web-ui';
import dynamic from 'next/dynamic';

WebUiComponentTree.registerComponent([
  {
    uiId: 'chiaki_category_list',
    uiTags: ['category_list_1'],
    component: dynamic(() => import('./components/bed')),
    priorityFn: () => 101
  },
  {
    uiId: 'chiaki_test',
    uiTags: ['test'],
    component: dynamic(() => import('./components/test')),
    priorityFn: () => 101
  }
]);

export const withChiakiUi = (Component: ComponentType): ComponentType<any> => {
  return pros => {
    return <Component {...pros} />;
  };
};
