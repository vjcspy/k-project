import React from 'react';
import { WebUiComponentTree } from './lib/ui';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import BarPage from './lib/++pages/Bar';

/*____TYPES____*/
export * from './lib/types';

/*____ADAPTER____*/
export * from './lib/+drivers';

/*____UI____*/
export * from './lib/ui';

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
    priorityFn: () => 101,
  },
  {
    uiId: 'ui_bar_child1',
    uiTags: ['bar_child1'],
    component: dynamic(() =>
      import('./lib/++components/category-list/category-list')
    ),
    priorityFn: () => 101,
  },
]);

/**
 * Wrap with chiaki theme
 *
 * @param Page
 * @returns {(pros) => JSX.Element}
 */
const withUi = (Page: NextPage): NextPage<any> => {
  // TODO: Create a context, wrapper ....
  const WithUi: React.FC = (props) => {
    return <Page {...props} />;
  };

  const displayName = Page.displayName || Page.name || 'PageComponent';
  WithUi.displayName = `withUi(${displayName})`;

  return WithUi;
};

export default withUi;
