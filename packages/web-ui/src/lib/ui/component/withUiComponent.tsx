import React, { ComponentType } from 'react';
import { WebUiComponent } from '../../types';

console.log('loaded withUiComponent');

/**
 *  Wrap Component
 *
 * @param Component
 * @returns {(props) => JSX.Element}
 */
export function withUiComponent<T>(Component: ComponentType<T>): WebUiComponent<T & {}> {
  return props => {
    return <Component {...props} />;
  };
}
