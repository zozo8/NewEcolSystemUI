import { DefaultProperties } from 'src/app/models/defaultProperties.model';

export class UserUserGroup extends DefaultProperties {
  userId: number;
  userGroupId: number;
  groupName?: string;
  description?: string;
}
