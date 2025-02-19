import { PathItem } from "swagger-jsdoc";
import { createAccountSwagger } from "./create-account-swagger";
import { deleteAccountSwagger } from "./delete-account-swagger";
import { getAccountsSwagger } from "./get-accounts-swagger";
import { updateAccountSwagger } from "./update-account-swagger";

export const accountsPath: PathItem = {
  post: createAccountSwagger,
  get: getAccountsSwagger,
}

export const accountPathWithId: PathItem = {
  put: updateAccountSwagger,
  delete: deleteAccountSwagger,
}


