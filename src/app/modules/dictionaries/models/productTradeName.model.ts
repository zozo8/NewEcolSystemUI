import { DefaultProperties } from 'src/app/models/defaultProperties.model';

export class productTradeName extends DefaultProperties {
  name?: string;
  description?: string;
  estimateTypeId?: number;
  estimateTypeName?:string;
  wasteCodeProductTradeNameId?: number;
  wasteCodeName?:string;
}
