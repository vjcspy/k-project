import MutationQueueLink from '@adobe/apollo-link-mutation-queue';
import { ApolloLink } from 'apollo-link';
import { ApiLink, AuthLink, ErrorLink, RetryLinkWithDefaultBehavior } from './links';

export const DefaultLink = (api: string): ApolloLink => {
  return ApolloLink.from([new MutationQueueLink(), RetryLinkWithDefaultBehavior(), AuthLink, ErrorLink, ApiLink(api)]);
};
