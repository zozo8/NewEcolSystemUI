import { RequestBodyGetListValue } from "./requestBodyGetListValue.model";

export interface ResponseBodyGetList {
  code?:number;
  errors?:any;
  success?:boolean;
  value:RequestBodyGetListValue[]

}
