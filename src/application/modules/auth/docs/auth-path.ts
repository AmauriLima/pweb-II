import { PathItem } from "swagger-jsdoc";
import { signInSwagger } from "./sign-in-swagger";

export const authPath: PathItem = {
  post: signInSwagger,
}



