
import { GetAccountUseCase } from '../get-account-use-case';
import { GetMyAccountController } from '../get-my-account-controller';
import { makeGetAccountUseCase } from './make-get-account-use-case';


export function makeGetMyAccountController(useCaseParam?: GetAccountUseCase) {
  const useCase = useCaseParam ?? makeGetAccountUseCase();

  return new GetMyAccountController(useCase);
}
