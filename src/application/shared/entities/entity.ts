import { randomUUID } from 'node:crypto';


export interface IEntityProps {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export abstract class Entity {
  private _id: string;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(props?: IEntityProps) {
    this._id = props?.id || randomUUID();
    this._createdAt = props?.createdAt || new Date();
    this._updatedAt = props?.updatedAt || new Date();
  }

  get id(): string {
    return this._id;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  onUpdated() {
    this._updatedAt = new Date();
  }
}
