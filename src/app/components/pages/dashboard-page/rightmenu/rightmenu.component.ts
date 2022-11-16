import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { DashboardPageComponent } from '../dashboard-page.component';

@Component({
  selector: 'app-rightmenu',
  templateUrl: './rightmenu.component.html',
  styleUrls: ['./rightmenu.component.scss'],
})
export class RightmenuComponent implements OnInit {
  constructor(
    public app: AppComponent,
    public dashboard: DashboardPageComponent
  ) {}

  ngOnInit(): void {}
}
