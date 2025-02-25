import { BcryptyHashProvider } from './bcrypt-hash-providers';
import { HashProvider } from './hash-provider';

export function makeHashProvider(): HashProvider {
  const SALT = 10;
  return new BcryptyHashProvider(SALT);
}
