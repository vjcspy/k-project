import { useCategoryListQuery } from '../../graphql/generated/_generated-hooks';
import * as React from 'react';

export const HomeWebUi = () => {
  const { data, loading } = useCategoryListQuery({
    variables: {
      id: 2
    },
    ssr: true
  });

  return (
    <>
      {loading && null}
      {data ? <div>{JSON.stringify(data, null, '\t')}</div> : null}
    </>
  );
};
