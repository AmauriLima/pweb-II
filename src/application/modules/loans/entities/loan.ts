import { Entity, IEntityProps } from "@/application/shared/entities/entity";

export interface ILoanProps extends IEntityProps {
  accountId: string;
  bookId: string;
  dueDate: Date;
  returnDate?: Date | null;
}

export class Loan extends Entity {
  readonly props: ILoanProps;

  constructor(props: ILoanProps) {
    super(props);
    this.props = props;
  }

  get accountId(): string {
    return this.props.accountId;
  }

  get bookId(): string {
    return this.props.bookId;
  }

  get dueDate(): Date {
    return this.props.dueDate;
  }

  get returnDate(): Date | null {
    return this.props.returnDate ?? null;
  }

  set returnDate(returnDate: Date) {
    this.props.returnDate = returnDate;
  }
}
