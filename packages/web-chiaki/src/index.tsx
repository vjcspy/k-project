import React from 'react';
import { WebUiComponentTree } from '@vjcspy/web-ui';
import dynamic from 'next/dynamic';
import { NextPage } from 'next';

/*
 * Declare chiaki component theme
 * */
WebUiComponentTree.registerComponent([
  {
    uiId: 'chiaki_category_list',
    uiTags: ['category_list_1'],
    component: dynamic(() => import('./lib/components/bed')),
    priorityFn: () => 101
  },
  {
    uiId: 'chiaki_test',
    uiTags: ['test'],
    component: dynamic(() => import('./lib/components/test')),
    priorityFn: () => 101
  }
]);

/**
 * Wrap with chiaki theme
 *
 * @param Page
 * @returns {(pros) => JSX.Element}
 */
const withChiakiUi = (Page: NextPage): NextPage<any> => {
  // TODO: Create a context, wraper ....
  return pros => {
    return <Page {...pros} />;
  };
};

export default withChiakiUi;
