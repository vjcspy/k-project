import React, { FunctionComponent } from 'react';
import { useApolloClient } from '../hooks/apollo';
import { ApolloProvider } from '@apollo/client';

/**
 * Không sử dụng Adapter ở Custom App bởi vì chúng ta có thể cần đẩy dữ liệu cache vào Apollo
 * @param props
 * @returns {React.Element}
 * @constructor
 */
export const Adapter: FunctionComponent<{
  apiBase: string;
  apollo?: { link?: any; client?: any; initialData?: any; cache?: any };
}> = props => {
  const { apiBase, apollo = {}, children } = props;
  const [apolloClient] = useApolloClient({
    apiBase,
    apollo
  });

  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};
