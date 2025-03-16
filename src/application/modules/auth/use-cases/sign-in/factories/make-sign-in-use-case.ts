import { AccountRepository } from '@/application/modules/accounts/repositories/account-repository';
import { makeAccountRepository } from '@/application/modules/accounts/repositories/make-account-repository';
import { makeHashProvider } from '@/application/shared/providers/hash-provider/make-hash-provider';
import { makeTokenProvider } from '@/application/shared/providers/token-provider/make-token-provider';
import { SignInUseCase } from '../sing-in-use-case';

export function makeSignInUseCase(repo?: AccountRepository) {
  const accountRepo = repo ?? makeAccountRepository();
  const hashProvider = makeHashProvider();
  const tokenProvider = makeTokenProvider();

  return new SignInUseCase(accountRepo, hashProvider, tokenProvider);
}
