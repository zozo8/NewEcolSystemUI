import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-main-summary',
  templateUrl: './main-summary.component.html',
  styleUrls: ['./main-summary.component.scss'],
})
export class MainSummaryComponent {
  static icon = 'pi pi-fw pi-home';

  constructor(private translate: TranslateService) {}
}
