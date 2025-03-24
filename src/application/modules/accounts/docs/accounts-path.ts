import { addDefaultResponsesSwagger } from "@/application/shared/docs/add-default-responses-swagger";
import { PathItem } from "swagger-jsdoc";
import { createAccountSwagger } from "./create-account-swagger";
import { deleteAccountSwagger } from "./delete-account-swagger";
import { getAccountsSwagger } from "./get-accounts-swagger";
import { getMyAccountSwagger } from "./get-my-account-swagger";
import { updateAccountSwagger } from "./update-account-swagger";

export const accountsPath: PathItem = {
  post: addDefaultResponsesSwagger(createAccountSwagger),
  get: addDefaultResponsesSwagger(getAccountsSwagger, { omitResponses: ["400"] }),
}

export const accountPathWithMe: PathItem = {
  get: addDefaultResponsesSwagger(getMyAccountSwagger, { omitResponses: ["400", "403"] }),
}

export const accountPathWithId: PathItem = {
  put: addDefaultResponsesSwagger(updateAccountSwagger),
  delete: addDefaultResponsesSwagger(deleteAccountSwagger),
}


