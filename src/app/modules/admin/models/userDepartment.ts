import { DefaultProperties } from 'src/app/models/defaultProperties.model';

export class UserDepartment extends DefaultProperties {
  userId: number;
  departmentId: number;
  userName?: string;
  departmentName?: string;
}
