import { useCategoryListQuery } from '../../graphql/generated/_generated-hooks';
import * as React from 'react';

export const HomeWebUi = (props: { id: number }) => {
  const { data, loading } = useCategoryListQuery({
    variables: {
      id: props.id
    },
    ssr: true
  });

  return (
    <>
      {loading && null}
      {data ? <pre>{JSON.stringify(data, null, '\t')}</pre> : null}
    </>
  );
};
