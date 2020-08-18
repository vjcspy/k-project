import { ComponentType } from 'react';

export type WebUiComponentConfig = {
  uiId: string;
  uiTags: string[];
  component: ComponentType<any> | WebUiComponent<any>;
  priorityFn?: () => number;
};

/**
 * Chỉ có một kiểu chung dành cho cả Page, cả Component con là WebUiComponent
 */
export type WebUiComponent<T> = ComponentType<T & {}>;
