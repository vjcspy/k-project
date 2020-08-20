import { ComponentType } from 'react';
import * as React from 'react';

console.log('load cate 1');
const CategoryListWebUi: ComponentType<any> = () => {
  console.log('render categoryList');

  return (
    <>
      <div>Load from cate 1</div>
    </>
  );
};
export default CategoryListWebUi;
