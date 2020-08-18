import React, { FunctionComponent, useContext } from 'react';
import { WebUiComponentTree } from './WebUiComponentTree';
import { WebUIContext } from '../../drivers';

/**
 * Tất cả các component trong app đều sử dụng Component này để resolve
 *
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
export const Extension: FunctionComponent<{ uitag?: string; defaultComponent?: any; uiTag?: string }> = props => {
  const uiContext = useContext(WebUIContext);
  // @ts-ignore
  const Component = WebUiComponentTree.component(props.uitag ?? props.uiTag, uiContext.toJS(), props.defaultComponent);

  return <Component />;
};
