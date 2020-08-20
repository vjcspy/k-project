import * as React from 'react';
import { UiContextValue } from '../../types';
import { useContext } from 'react';

const UiContext = React.createContext<UiContextValue>({
  themeName: 'default',
  pathname: '',
  generatedTime: '',
  tree: null,
});

export const useUiContext = () => useContext(UiContext);

export const UiContextProvider: React.FC<{ value: UiContextValue }> = (
  props
) => {
  return (
    <UiContext.Provider value={props.value}>
      {props.children}
    </UiContext.Provider>
  );
};
