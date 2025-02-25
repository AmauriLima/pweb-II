

import { Roles } from '@/application/modules/accounts/entities/account';
import { AuthorizationMiddleware } from '../authorization-middleware';

export function makeAuthorizationMiddleware(allowedRoles: Exclude<Roles, Roles.ADMIN>[]) {
  return new AuthorizationMiddleware(allowedRoles);
}
