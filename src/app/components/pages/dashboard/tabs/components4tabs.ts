import { UsersComponent } from 'src/app/modules/admin/pages/users/users.component';
import { ClientComponent } from 'src/app/modules/dictionaries/pages/client/client.component';
import { EstimateTypeComponent } from 'src/app/modules/dictionaries/pages/estimate-type/estimate-type.component';
import { ProductTradeNameComponent } from 'src/app/modules/dictionaries/pages/product-trade-name/product-trade-name.component';
import { MainSummaryComponent } from 'src/app/pages/main-summary/main-summary.component';
import { Summary1Component } from 'src/app/pages/summary1/summary1.component';
import { Summary2Component } from 'src/app/pages/summary2/summary2.component';
import { TreeComponent } from 'src/app/pages/tree/tree.component';

interface IDictionaryComponent {
  component: any;
  name: string;
}

// component can open in tabs
export const components4tabs: IDictionaryComponent[] = [
  {
    component: TreeComponent,
    name: 'TreeComponent',
  },
  {
    component: Summary2Component,
    name: 'Summary2Component',
  },
  {
    component: Summary1Component,
    name: 'Summary1Component',
  },
  {
    component: MainSummaryComponent,
    name: 'MainSummaryComponent',
  },
  {
    component: ProductTradeNameComponent,
    name: 'ProductTradeNameComponent',
  },
  {
    component: UsersComponent,
    name: 'UsersComponent',
  },
  {
    component: EstimateTypeComponent,
    name: 'EstimateTypeComponent',
  },
  {
    component: ClientComponent,
    name: 'ClientComponent',
  },
];
