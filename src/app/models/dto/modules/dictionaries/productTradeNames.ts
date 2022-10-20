import { DefaultProperties } from "../../defaultProperties";

export interface productTradeName extends DefaultProperties {
  name?:string;
  description?:string;
  estimateTypeId?:number;
  wasteCodeProductTradeNameId?:number;
}
