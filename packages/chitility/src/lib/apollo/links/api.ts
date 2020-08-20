import { HttpLink } from 'apollo-link-http';
import fetch from 'isomorphic-unfetch';

export const ApiLink = (uri: string) => {
  return new HttpLink({
    uri,
    credentials: 'include', // 'same-origin'
    fetch,
  });
};
