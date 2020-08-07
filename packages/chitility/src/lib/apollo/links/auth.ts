import { setContext } from 'apollo-link-context';
import { BrowserPersistence } from '../../util';

export const AuthLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists.
  const storage = new BrowserPersistence();
  const token = storage.getItem('signin_token');

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  };
});
