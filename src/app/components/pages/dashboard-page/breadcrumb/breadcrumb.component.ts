import { Component, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { DashboardPageComponent } from '../dashboard-page.component';
import { BreadcrumbService } from './breadcrumb.service';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent implements OnDestroy {
  subscription: Subscription;
  items: MenuItem[];
  home: MenuItem;

  constructor(
    public breadcrumbService: BreadcrumbService,
    public dashboard: DashboardPageComponent
  ) {
    this.subscription = breadcrumbService.itemsHandler.subscribe((response) => {
      this.items = response;
    });

    this.home = { icon: 'pi pi-home', routerLink: '/' };
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
