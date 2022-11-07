import { MenuItem } from 'primeng/api';

export class Tab {
  header: string;
  component: any;
  tooltip?: string;
  icon?: string;
  parent?: MenuItem[];
  active?: boolean;
}
