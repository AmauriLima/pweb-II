import { Roles } from "@/application/modules/accounts/entities/role";

export interface IHttpRequest {
  body: Record<string, any>;
  query: Record<string, any>;
  params: Record<string, string>;
  headers: Record<string, string>;
  account?: {
    id: string;
    role: Roles;
  };
}

export interface IHttpResponse {
  statusCode: number;
  body?: Record<string, any> | null;
}

export enum IHttpStatusCode {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  INTERNAL_SERVER_ERROR = 500,
}
