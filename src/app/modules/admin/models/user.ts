import { DefaultProperties } from 'src/app/models/defaultProperties.model';

export class User extends DefaultProperties {
  userName?: string;
  userEmail?: string;
  evaluationDate?: Date;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  isAdmin?: boolean;
}
