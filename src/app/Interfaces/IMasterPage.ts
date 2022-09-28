import { MenuItem } from "primeng/api";

export interface IMasterPage {
  postPath: string;
  putPath: string;
  breadcrumbList:MenuItem[];
}
