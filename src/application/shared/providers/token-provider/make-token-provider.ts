import { env } from '@/application/config/env';
import { JWTTokenProvider } from './jwt-token-provider';
import { TokenProvider } from './token-provider';

export function makeTokenProvider(secret?: string): TokenProvider {
  return new JWTTokenProvider(secret ?? env.jwtSecret);
}
