import React, { ComponentType } from 'react';
import { UiComponent } from '../../types';

console.log('loaded withUiComponent');

/**
 *  Wrap Component
 *
 * @param Component
 * @returns {(props) => JSX.Element}
 */
export function withUiComponent<T>(Component: ComponentType<T>): UiComponent<T> {
  return props => <Component {...props} />;
}
