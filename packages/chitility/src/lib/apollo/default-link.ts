import MutationQueueLink from '@adobe/apollo-link-mutation-queue';
import { ApolloLink } from 'apollo-link';
import { ApiLink, AuthLink, ErrorLink, RetryLinkWithDefaultBehavior } from './links';

export const DefaultLink = (api: string): ApolloLink => {
  // TODO: should split ApiLink with 2 case Batched and non-Batched
  return ApolloLink.from([new MutationQueueLink(), RetryLinkWithDefaultBehavior(), AuthLink, ErrorLink, ApiLink(api)]);
};
