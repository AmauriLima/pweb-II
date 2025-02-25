import { Entity, IEntityProps } from "@/application/shared/entities/entity";

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

interface IAccountProps extends IEntityProps {
  name: string;
  email: string;
  password: string;
  roleCode: Roles;
}

export class Account extends Entity {
  readonly props: IAccountProps;

  constructor(props: IAccountProps) {
    super(props);
    this.props = props
  }

  public get name(): string {
    return this.props.name;
  }

  public get email(): string {
    return this.props.email;
  }

  public get password(): string {
    return this.props.password;
  }

  public get roleCode(): Roles {
    return this.props.roleCode;
  }
}
