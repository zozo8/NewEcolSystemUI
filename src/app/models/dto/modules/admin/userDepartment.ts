import { DefaultProperties } from "../../defaultProperties";

export class UserDepartment extends DefaultProperties {
  userId:number;
  departmentId:number;
  userName?:string;
  departmentName?:string;
}
