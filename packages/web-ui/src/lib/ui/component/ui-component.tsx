import React, { FunctionComponent } from 'react';
import { WebUiComponentTree } from './WebUiComponentTree';

export const UiComponent: FunctionComponent<{ uitag: string; defaultComponent?: any }> = props => {
  const Component = WebUiComponentTree.component(props.uitag, props.defaultComponent);

  return <Component />;
};
