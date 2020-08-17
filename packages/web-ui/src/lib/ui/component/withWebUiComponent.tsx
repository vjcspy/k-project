import React, { ComponentType } from 'react';
import { WebUiComponent } from '../../types';

export function withWebUiComponent<T>(Component: ComponentType<T>): WebUiComponent<T & { uiTag: string }> {
  return props => {
    return <Component {...props} />;
  };
}
