import { useCategoryListQuery } from '../../graphql/generated/_generated-hooks';
import * as React from 'react';

const HomeWebUi = (props: { id: number }) => {
  const { data, loading } = useCategoryListQuery({
    variables: {
      id: 2,
    },
    ssr: true,
  });

  return (
    <>
      {loading && null}
      {data ? <pre>{JSON.stringify(data, null, '\t')}</pre> : null}
    </>
  );
};

export const HomePage = HomeWebUi;
