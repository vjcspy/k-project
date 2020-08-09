import { RetryLink } from 'apollo-link-retry';

export const RetryLinkWithDefaultBehavior = () => {
  return new RetryLink({
    delay: {
      initial: 200,
      max: Infinity,
      jitter: true
    },
    attempts: {
      max: 3,
      retryIf: error => error && (typeof navigator === 'undefined' || navigator.onLine)
    }
  });
};
