import { TreeNode } from 'primeng/api';

export interface ITreeNode<T = any> extends TreeNode<T> {
  component?: any;
  recordId?: number;
  level?: number;
  id?: number;
  parentId?: number;
  departmentId?: number;
  children?: ITreeNode<T>[];
}
