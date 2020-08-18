// import { WebUiComponentTree } from '@vjcspy/web-ui';
// import dynamic from 'next/dynamic';
//
// console.log('boot theme chiaki');
// const bootChiaki = () => {
//   WebUiComponentTree.registerComponent([
//     {
//       uiId: 'chiaki_category_list',
//       uiTags: ['category_list_1'],
//       component: dynamic(() => import('./lib/components/bed')),
//       priorityFn: () => 101
//     },
//     {
//       uiId: 'chiaki_test',
//       uiTags: ['test'],
//       component: dynamic(() => import('./lib/components/test')),
//       priorityFn: () => 101
//     }
//   ]);
// };
//
// export default bootChiaki;

export * from './lib'
