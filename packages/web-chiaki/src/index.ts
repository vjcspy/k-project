import { WebUiComponentTree } from '@vjcspy/web-ui';
import dynamic from 'next/dynamic';

export const bootChiaki = () => {
  WebUiComponentTree.registerComponent([
    {
      uiId: 'chiaki_category_list',
      uiTags: ['category_list'],
      component: dynamic(() => import('./lib/components/bed')),
      priorityFn: () => 1
    }
  ]);
};
