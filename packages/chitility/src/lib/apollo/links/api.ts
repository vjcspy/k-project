import { createHttpLink } from 'apollo-link-http';

export const ApiLink = (apiBase: string) => {
  return createHttpLink({
    uri: apiBase + '/graphql'
  });
};
