import React, { FunctionComponent } from 'react';
import { useCategoryListQuery } from '@vjcspy/web-ui/build/main/graphql/generated/_generated-hooks';
import { withUiComponent } from '@vjcspy/web-ui';
import { useAppCount } from '@vjcspy/web-ui/build/main/lib/ui/hook';

console.log('load bed component');
const Bed: FunctionComponent<{}> = props => {
  console.log('re-render bed component');
  const { data, loading } = useCategoryListQuery({
    variables: {
      id: 2
    },
    ssr: true
  });

  const { appCount, actionIncrease, actionDecrease } = useAppCount();

  return (
    <>
      <h2>Bed from chiaki</h2>
      <pre>Current count: {appCount}</pre>
      <button onClick={() => actionIncrease()}>increase</button>
      <button onClick={() => actionDecrease()}>decrease</button>
      {loading && null}
      {data ? <pre>{JSON.stringify(data, null, '\t')}</pre> : null}
    </>
  );
};

export default withUiComponent(Bed);
