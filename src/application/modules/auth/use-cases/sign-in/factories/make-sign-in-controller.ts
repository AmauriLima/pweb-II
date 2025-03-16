import { SignInController } from '../sign-in-controller';
import { SignInUseCase } from '../sing-in-use-case';
import { makeSignInUseCase } from './make-sign-in-use-case';

export function makeSignInController(useCase?: SignInUseCase) {
  const signInUseCase = useCase ?? makeSignInUseCase();

  return new SignInController(signInUseCase);
}
