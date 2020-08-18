import React, { FunctionComponent } from 'react';
import { WebUiComponentTree } from './WebUiComponentTree';

/**
 * Tất cả các component trong app đều sử dụng Component này để resolve
 *
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
export const Extension: FunctionComponent<{ uitag: string; defaultComponent?: any }> = props => {
  const Component = WebUiComponentTree.component(props.uitag, props.defaultComponent);

  return <Component />;
};
