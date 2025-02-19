import { Entity, IEntityProps } from "@/application/shared/entities/entity";

export interface IBookProps extends IEntityProps {
  name: string;
  description: string;
  coverUrl: string;
  totalAmount: number;
  loanAmount: number;
}

export class Book extends Entity {
  readonly props: IBookProps;

  constructor(props: IBookProps) {
    super(props);
    this.props = props;
  }

  get name(): string {
    return this.props.name;
  }

  get description(): string {
    return this.props.description;
  }

  get coverUrl(): string {
    return this.props.coverUrl;
  }

  get totalAmount(): number {
    return this.props.totalAmount;
  }

  get loanAmount(): number {
    return this.props.loanAmount;
  }
}
