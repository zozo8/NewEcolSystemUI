import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { Subscription } from 'rxjs';
import { GridEnum } from 'src/app/models/enums/gridEnum';
import { getDepartments } from 'src/app/modules/login/state/login.selector';
import { LoginState } from 'src/app/modules/login/state/loginState';
import { TableButtonComponent } from 'src/app/modules/universal-components/components/table-button/table-button.component';
import { TableComponent } from 'src/app/modules/universal-components/components/table/table.component';
import { TableMenuStructure } from 'src/app/modules/universal-components/models/tableMenuStructure.model';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-products-under-minimal-state',
  templateUrl: './products-under-minimal-state.component.html',
  styleUrls: ['./products-under-minimal-state.component.scss'],
})
export class ProductsUnderMinimalStateComponent implements OnInit, OnDestroy {
  @ViewChild(TableComponent) tableComponent: TableComponent;
  @ViewChild(TableButtonComponent) tableButtonComponent: TableButtonComponent;

  static icon = PrimeIcons.LIST;
  icon = PrimeIcons.LIST;
  gridId = GridEnum.Products;
  multiselect = false;
  model = 'ProductsUnderMinimum';
  buttons: MenuItem[];
  obj: TableMenuStructure = new TableMenuStructure();
  compsiteSub = new Subscription();

  constructor(
    private store: Store<LoginState>,
    private commonService: CommonService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.getButtons();
  }

  getButtons(): void {
    this.buttons = [
      {
        label: this.translateService.instant('btn.refresh'),
        icon: 'pi pi-fw pi-refresh',
        disabled: false,
        command: () => this.tableButtonComponent.refreshTable.emit(),
      },
    ];
  }

  refreshTable() {
    this.compsiteSub.add(
      this.store.select(getDepartments).subscribe({
        next: (depts: number[]) => {
          const filters = this.commonService.getFilters4Departments(depts);
          if (filters.length > 0) {
            this.tableComponent.getData4Grid(this.gridId, filters);
          }
        },
      })
    );
  }

  ngOnDestroy(): void {
    this.compsiteSub.unsubscribe();
  }
}
