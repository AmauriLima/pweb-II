import { Entity, IEntityProps } from '@/application/shared/entities/entity';
import { Roles } from './account';

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
