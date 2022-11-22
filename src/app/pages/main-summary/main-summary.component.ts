import { Component, OnInit, ViewChild } from '@angular/core';
import { UIChart } from 'primeng/chart';
import { AppComponent } from 'src/app/app.component';
import { DashboardPageComponent } from 'src/app/components/pages/dashboard-page/dashboard-page.component';

@Component({
  selector: 'app-main-summary',
  templateUrl: './main-summary.component.html',
  styleUrls: ['./main-summary.component.scss'],
})
export class MainSummaryComponent implements OnInit {
  chartMonthlyData: any;

  @ViewChild('doughnut') doughnutViewChild: UIChart;
  @ViewChild('bar') chartViewChild: UIChart;
  @ViewChild('storeA') storeAViewChild: UIChart;
  @ViewChild('storeB') storeBViewChild: UIChart;
  @ViewChild('storeC') storeCViewChild: UIChart;
  @ViewChild('storeD') storeDViewChild: UIChart;
  @ViewChild('pie') pieViewChild: UIChart;

  static icon = 'pi pi-fw pi-home';

  constructor(
    public app: AppComponent,
    public appMain: DashboardPageComponent
  ) {}

  ngOnInit(): void {
    //this.chartMonthlyData = this.getChartData();
  }

  changeMonthlyDataView() {
    if (this.chartViewChild.chart.options.scales.x.stacked) {
      this.chartViewChild.chart.options.scales.x.stacked = false;
      this.chartViewChild.chart.options.scales.y.stacked = false;
    } else {
      this.chartViewChild.chart.options.scales.x.stacked = true;
      this.chartViewChild.chart.options.scales.y.stacked = true;
    }

    this.chartViewChild.chart.update();
  }
}
