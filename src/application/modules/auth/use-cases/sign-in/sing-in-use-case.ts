import { AccountRepository } from '@/application/modules/accounts/repositories/account-repository';
import { InternalServerHTTPError } from '@/application/shared/http/errors/internal-server-http-error';
import { UnauthorizedHTTPError } from '@/application/shared/http/errors/unauthorized-http-error';
import { IUseCase } from '@/application/shared/http/interfaces/use-case';
import { HashProvider } from '@/application/shared/providers/hash-provider/hash-provider';
import { TokenProvider } from '@/application/shared/providers/token-provider/token-provider';
import { INVALID_CREDENTIALS_ERROR, SIGN_IN_ERROR } from '../../docs/sign-in-swagger';

interface IInput {
  email: string;
  password: string;
}

interface IOutput {
  accessToken: string;
  role: string;
}

export class SignInUseCase implements IUseCase<IInput, IOutput> {
  constructor(
    private readonly accountRepo: AccountRepository,
    private readonly hashProvider: HashProvider,
    private readonly tokenProvider: TokenProvider,
  ) {}

  async execute({ email, password }: IInput): Promise<IOutput> {
    const account = await this.accountRepo.getAccountByEmail(email);

    if (!account) {
      throw new UnauthorizedHTTPError(INVALID_CREDENTIALS_ERROR);
    }

    const isPasswordValid = await this.hashProvider.compare(password, account.password);

    if (!isPasswordValid) {
      throw new UnauthorizedHTTPError(INVALID_CREDENTIALS_ERROR);
    }

    try {
      const accessToken = this.tokenProvider.generateToken({
        sub: account.id,
        role: account.roleCode,
        expiresIn: '1d',
      });

      return {
        accessToken,
        role: account.roleCode,
      };
    } catch {
      throw new InternalServerHTTPError(SIGN_IN_ERROR);
    }

  }
}
