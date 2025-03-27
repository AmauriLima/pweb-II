
import { AccountRepository } from '@/application/modules/accounts/repositories/account-repository';
import { NotFoundHTTPError } from '@/application/shared/http/errors/not-found-http-error';
import { IUseCase } from '@/application/shared/http/interfaces/use-case';
import { Account } from '../../entities/account';

interface IInput {
  accountId: string;
}

interface IOutput {
  account: Account;
}

export class GetAccountUseCase implements IUseCase<IInput, IOutput> {
  constructor(
    private readonly accountRepo: AccountRepository,
  ) {}

  async execute({ accountId }: IInput): Promise<IOutput> {
    const account = await this.accountRepo.getAccountById(accountId);

    if (!account) {
      throw new NotFoundHTTPError('Conta não encontrada');
    }

    return {
      account,
    };
  }
}
