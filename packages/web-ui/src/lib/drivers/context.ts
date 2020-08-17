import { Record } from 'immutable';
import * as React from 'react';
import { WebUiContextValue, WebUiContextValueInterface } from '../types';

export const webUiContextFactory: Record.Factory<WebUiContextValueInterface> = Record({
  themeName: 'default',
  pathname: '',
  generatedTime: '',
  tree: null
});

export const WebUIContext = React.createContext<WebUiContextValue>(webUiContextFactory());
