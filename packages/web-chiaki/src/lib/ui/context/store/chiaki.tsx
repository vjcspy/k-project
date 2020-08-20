import * as React from 'react';
import { ChiakiContextValue } from '../../../types/ui';
import { useContext, useEffect, useState } from 'react';
import { useDispatch, useStore } from 'react-redux';
import { initChiaki, reducer } from '../../store';

const ChiakiContext = React.createContext<ChiakiContextValue>({});

export const useChiakiContext = () => useContext(ChiakiContext);

export const ChiakiContextProvider: React.FC<{
  chiakiContextValue: ChiakiContextValue;
}> = props => {
  const store = useStore();

  // @ts-ignore
  store.reducerManager.add('chiaki', reducer);
  const dispatch = useDispatch();

  const [isInitChiaki, setInitChiaki] = useState(false);
  useEffect(() => {
    if (!isInitChiaki) {
      dispatch(initChiaki({ version: '1.0.0' }));
    }

    setInitChiaki(true);
  }, [isInitChiaki, dispatch]);

  return (
    <ChiakiContext.Provider value={props.chiakiContextValue}>
      {props.children}
    </ChiakiContext.Provider>
  );
};
