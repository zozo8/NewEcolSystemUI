import { DefaultProperties } from 'src/app/models/defaultProperties.model';

export class Client extends DefaultProperties {
  clientName: string;
  clientSymbol: string;
  nip: string;
  elementTypeId: number;
}
