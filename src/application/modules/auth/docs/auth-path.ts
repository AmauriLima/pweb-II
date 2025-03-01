import { addDefaultResponsesSwagger } from "@/application/shared/docs/add-default-responses-swagger";
import { PathItem } from "swagger-jsdoc";
import { signInSwagger } from "./sign-in-swagger";

export const authPath: PathItem = {
  post: addDefaultResponsesSwagger(signInSwagger, { omitResponses: ["403"] }),
}



