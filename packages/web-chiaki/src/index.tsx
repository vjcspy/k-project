import React from 'react';
import { WebUiComponentTree } from '@vjcspy/web-ui';
import dynamic from 'next/dynamic';
import { NextPage } from 'next';
import BarPage from './lib/pages/Bar';

/*
 * Declare chiaki component theme
 * */
WebUiComponentTree.registerComponent([
  {
    uiId: 'chiaki_bar_page',
    uiTags: ['BAR_PAGE'],
    component: BarPage,
    priorityFn: () => 1011
  },
  {
    uiId: 'chiaki_category_list',
    uiTags: ['bar_child1'],
    component: dynamic(() => import('./lib/components/bed')),
    priorityFn: () => 1
  },
  {
    uiId: 'chiaki_test',
    uiTags: ['bar_child3'],
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
  // TODO: Create a context, wrapper ....
  return pros => {
    return <Page {...pros} />;
  };
};

export default withChiakiUi;
