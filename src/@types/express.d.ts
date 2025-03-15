declare namespace Express {
  type Roles = import('@/application/modules/accounts/entities/role').Roles;
  interface Request {
    metadata?: {
      account?: {
        id: string;
        role: Roles;
      };
    };
  }
}
