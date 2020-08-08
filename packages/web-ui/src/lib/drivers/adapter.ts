import { withApollo } from './apollo';
import { WebUiAdapterOptions, WebUiPage } from './types';

export const withAdapter = (PageComponent: WebUiPage<any>, webUiAdapterOptions?: WebUiAdapterOptions) => {
  let PageWithAdapter = PageComponent;
  if (webUiAdapterOptions && webUiAdapterOptions.apollo) {
    PageWithAdapter = withApollo(PageComponent, webUiAdapterOptions);
  }
  return PageWithAdapter;
};
