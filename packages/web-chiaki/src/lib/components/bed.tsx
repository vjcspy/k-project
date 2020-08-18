import React, { FunctionComponent } from 'react';
import { useCategoryListQuery } from '@vjcspy/web-ui/build/main/graphql/generated/_generated-hooks';

console.log('load bed component');
const Bed: FunctionComponent<{}> = props => {

  const { data, loading } = useCategoryListQuery({
    variables: {
      id: 2
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

export default Bed;
