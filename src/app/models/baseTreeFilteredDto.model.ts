export class BaseTreeFilteredDto {
  id: number;
  parentId: number;
  objectType?: string;
  nodeName?: string;
  level?: number;
  treePath: string;
  recordId: number;
  departmentId: number;
}
