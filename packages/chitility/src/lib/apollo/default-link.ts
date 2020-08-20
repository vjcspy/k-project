import { ApolloLink } from 'apollo-link';
import { ApiLink, ErrorLink, RetryLinkWithDefaultBehavior } from './links';

export const DefaultLink = (api: string): ApolloLink => {
  // TODO: should split ApiLink with 2 case Batched and non-Batched
  return ApolloLink.from([
    RetryLinkWithDefaultBehavior(),
    ErrorLink,
    ApiLink(api),
  ]);
};
