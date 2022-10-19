import { MenuItem, TreeNode } from "primeng/api";

export interface Tab {
  header:string;
  component:any;
  tooltip?:string;
  icon?:string;
  parent?:MenuItem[];
  active?:boolean;
}
