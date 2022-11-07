import { DefaultProperties } from 'src/app/models/defaultProperties.model';

export class Department extends DefaultProperties {
  departmentName?: string;
  clientId?: number;
  address?: string;
  nip?: string;
  elementTypeId?: number;
}
