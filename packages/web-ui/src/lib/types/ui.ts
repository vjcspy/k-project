import { ComponentType } from 'react';

export type WebUiComponentConfig = {
  uiId: string;
  uiTags: string[];
  component: UiComponent<any>;
  priorityFn?: () => number;
};

/**
 * Chỉ có một kiểu chung dành cho cả Page, cả Component con là WebUiComponent
 */
export type UiComponent<T> = ComponentType<T & {}>;
