import { List, Map } from 'immutable';
import { WebUiComponent, WebUiComponentConfig } from '../../types';
import _ from 'lodash';

export class WebUiComponentTree {
  private static THEMES: {
    [propName: string]: List<WebUiComponentConfig>;
  } = {};

  static COMPONENT_TREE: Map<string, any> = Map();

  private static _currentTheme: string = 'default';

  static registerComponent(componentConfigs: WebUiComponentConfig | WebUiComponentConfig[], theme: string = 'default') {
    if (typeof WebUiComponentTree.THEMES[theme] === 'undefined') {
      WebUiComponentTree.THEMES[theme] = List.of();
    }
    if (!_.isArray(componentConfigs)) {
      // @ts-ignore
      componentConfigs = [componentConfigs];
    }

    // @ts-ignore
    WebUiComponentTree.THEMES[theme] = WebUiComponentTree.THEMES[theme].push(...componentConfigs);
  }

  static component(uiTag: string, defaultPage?: WebUiComponent<any>): WebUiComponent<any> {
    console.log('try to resolve component');
    if (WebUiComponentTree.COMPONENT_TREE.has(uiTag)) {
      return WebUiComponentTree.COMPONENT_TREE.get(uiTag);
    }

    // TODO: add more logic to handle override page
    if (typeof WebUiComponentTree.THEMES[WebUiComponentTree._currentTheme] !== 'undefined') {
      const isReplaced: WebUiComponentConfig = WebUiComponentTree.THEMES[WebUiComponentTree._currentTheme]
        .filter(value => _.includes(value.uiTags, uiTag))
        .sort((valueA, valueB) => {
          let a = typeof valueA.priorityFn == 'function' ? valueA.priorityFn() : 0;
          let b = typeof valueB.priorityFn == 'function' ? valueB.priorityFn() : 0;

          if (a < b) {
            return -1;
          }
          if (a > b) {
            return 1;
          }
          if (a === b) {
            return 0;
          }

          return 0;
        })
        .first();

      if (isReplaced) {
        WebUiComponentTree.COMPONENT_TREE = WebUiComponentTree.COMPONENT_TREE.set(uiTag, isReplaced.component);
        return isReplaced.component;
      }
    }

    if (defaultPage) {
      return defaultPage;
    }

    throw new Error('We can not resolve component with tag: ' + uiTag);
  }
}
