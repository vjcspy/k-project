export * from './lib';
import dynamic from 'next/dynamic';
import { WebUiComponentTree } from './lib/ui/component';

export const bootUi = () => {
  WebUiComponentTree.registerComponent([
    {
      uiId: 'default_category_list',
      uiTags: ['category_list'],
      component: dynamic(() => import('./lib/components/category-list-2/category-list-2')),
      priorityFn: () => 99
    }
  ]);
};
