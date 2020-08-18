import React from 'react';
import { WebUiComponentTree } from './lib/ui/component/WebUiComponentTree';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import BarPage from './lib/pages/Bar';

/*____ADAPTER____*/
export * from './lib/drivers/context';
export * from './lib/drivers/adapter';

/*____UI____*/
export * from './lib/ui/component/withUiComponent';
export * from './lib/ui/component/extension';
export * from './lib/ui/component/WebUiComponentTree';

/*____Utilize____*/
export * from './lib/util';

/*
 * Declare UI component theme
 * */
WebUiComponentTree.registerComponent([
  {
    uiId: 'ui_bar_page',
    uiTags: ['BAR_PAGE'],
    component: BarPage,
    priorityFn: () => 101
  },
  {
    uiId: 'ui_bar_child1',
    uiTags: ['bar_child1'],
    component: dynamic(() => import('./lib/components/category-list/category-list')),
    priorityFn: () => 101
  }
]);

/**
 * Wrap with chiaki theme
 *
 * @param Page
 * @returns {(pros) => JSX.Element}
 */
const withUi = (Page: NextPage): NextPage<any> => {
  // TODO: Create a context, wrapper ....
  return pros => {
    return <Page {...pros} />;
  };
};

export default withUi;
