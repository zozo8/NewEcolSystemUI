import { DefaultProperties } from "../../defaultProperties";

export class User extends DefaultProperties {
  userName?:string;
  userEmail?: string;
  evaluationDate?: Date;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  isAdmin?: boolean;

}
