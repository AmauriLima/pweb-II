
import { AccountRepository } from '../../../repositories/account-repository';
import { makeAccountRepository } from '../../../repositories/make-account-repository';
import { GetAccountUseCase } from '../get-account-use-case';

export function makeGetAccountUseCase(repo?: AccountRepository) {
  const accountRepo = repo ?? makeAccountRepository();

  return new GetAccountUseCase(accountRepo);
}
