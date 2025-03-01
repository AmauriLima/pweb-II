import { Entity, IEntityProps } from "@/application/shared/entities/entity";
import { Roles } from "./role";

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
