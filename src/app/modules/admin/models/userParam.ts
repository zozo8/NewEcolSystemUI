import { DefaultProperties } from 'src/app/models/defaultProperties.model';

export class UserParam extends DefaultProperties {
  userId: number;
  paramValue: string;
  paramDictId: number;
}
