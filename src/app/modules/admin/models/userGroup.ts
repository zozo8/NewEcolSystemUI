import { DefaultProperties } from 'src/app/models/defaultProperties.model';

export class UserGroup extends DefaultProperties {
  groupName: string;
  description: string;
  isClient: boolean;
}
