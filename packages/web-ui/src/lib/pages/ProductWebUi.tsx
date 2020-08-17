import { useCategoryListQuery, useProductDetailBySkuQuery } from '../../graphql/generated/_generated-hooks';
import * as React from 'react';

// TODO: fix loi fragment khi load component nay

/*Invariant Violation: FragmentMatcher.match() was called before FragmentMatcher.init()*/
export const ProductWebUi = () => {
  const { data, loading } = useProductDetailBySkuQuery({
    variables: {
      sku: 'Bánh crepe phomai Đài Loan'
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
