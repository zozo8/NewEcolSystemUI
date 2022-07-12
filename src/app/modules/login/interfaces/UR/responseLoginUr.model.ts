import { Token } from "./token.model";
export interface ResponseLoginUR {
  userId:number;
  userLogin:string;
  accessToken:Token;
  refreshToken:Token;
}
