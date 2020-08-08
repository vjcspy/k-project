import { RetryLink } from 'apollo-link-retry';

export const RetryLinkWithDefaultBehavior = () => {
  return new RetryLink({
    delay: {
      initial: 300,
      max: Infinity,
      jitter: true
    },
    attempts: {
      max: 5,
      retryIf: error => error && (typeof navigator === 'undefined' || navigator.onLine)
    }
  });
};
