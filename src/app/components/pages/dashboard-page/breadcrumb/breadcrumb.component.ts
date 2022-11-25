import { Component, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { Department } from 'src/app/modules/admin/models/department';
import { DashboardPageComponent } from '../dashboard-page.component';
import { BreadcrumbService } from './breadcrumb.service';
import { SelectDepartmentComponent } from './select-department/select-department.component';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
  providers: [DialogService],
})
export class BreadcrumbComponent implements OnDestroy {
  private compsiteSubs = new Subscription();
  items: MenuItem[];
  home: MenuItem;
  departments: Department[];
  selectedDepartments: Department[];

  constructor(
    public breadcrumbService: BreadcrumbService,
    public dashboard: DashboardPageComponent,
    private translateService: TranslateService,
    public dialogService: DialogService
  ) {
    this.compsiteSubs.add(
      breadcrumbService.itemsHandler.subscribe((response) => {
        this.items = response;
      })
    );

    // this.home = { icon: 'pi pi-home', routerLink: '/' };
  }

  selectDepartment() {
    var ref = this.dialogService.open(SelectDepartmentComponent, {
      contentStyle: { width: '500px' },
      header: this.translateService.instant('common.select_department'),
    });

    this.compsiteSubs.add(
      ref.onClose.subscribe({
        next: () =>
          console.log('Wybranio zaklady, zamkniecie wszystkich tabów.'),
      })
    );
  }

  ngOnDestroy() {
    this.compsiteSubs.unsubscribe();
  }
}
