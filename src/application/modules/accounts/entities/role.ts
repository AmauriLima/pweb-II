import { Entity, IEntityProps } from '@/application/shared/entities/entity';

export enum Roles {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  BOOK_MANAGER = 'BOOK_MANAGER',
  USER_MANAGER = 'USER_MANAGER',
  USER = 'USER',
}

export const roleHierarchy: Record<Roles, Roles[]> = {
  ADMIN: Object.values(Roles),
  MANAGER: [Roles.BOOK_MANAGER, Roles.USER_MANAGER, Roles.USER],
  USER_MANAGER: [Roles.USER],
  BOOK_MANAGER: [],
  USER: [],
};

export interface RoleProps extends IEntityProps {
  code: Roles;
}

export class Role extends Entity {
  readonly props: RoleProps;

  constructor(props: RoleProps) {
    super(props);
    this.props = props;
  }

  public get code(): Roles {
    return this.props.code;
  }
}
