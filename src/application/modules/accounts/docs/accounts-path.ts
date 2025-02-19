import { PathItem } from "swagger-jsdoc";
import { createAccountSwagger } from "../use-cases/create-account/swagger";
import { deleteAccountSwagger } from "../use-cases/delete-account/swagger";
import { getAccountsSwagger } from "../use-cases/get-accounts/swagger";
import { updateAccountSwagger } from "../use-cases/update-account/swagger";

export const accountsPath: PathItem = {
  post: createAccountSwagger,
  get: getAccountsSwagger,
}

export const accountPathWithId: PathItem = {
  put: updateAccountSwagger,
  delete: deleteAccountSwagger,
}


