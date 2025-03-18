import { makeTokenProvider } from '@/application/shared/providers/token-provider/make-token-provider';
import { TokenProvider } from '@/application/shared/providers/token-provider/token-provider';
import { AuthenticationMiddleware } from '../authentication-middleware';

export function makeAuthenticationMiddleware(tokenProviderParam?: TokenProvider) {
  const tokenProvider = tokenProviderParam ?? makeTokenProvider();

  return new AuthenticationMiddleware(tokenProvider);
}
