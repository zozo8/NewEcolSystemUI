import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PrimeIcons } from 'primeng/api';

@Component({
  selector: 'app-estimate-type',
  templateUrl: './estimate-type.component.html',
  styleUrls: ['./estimate-type.component.scss'],
})
export class EstimateTypeComponent implements OnInit {
  static icon = PrimeIcons.LIST;
  static header: 'Słownik typów kosztorysów'; //this.translate.instant('pages.estimate_type.title');

  constructor(private translate: TranslateService) {}

  ngOnInit(): void {}
}
