import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { UIChart } from 'primeng/chart';
import { AppComponent } from 'src/app/app.component';
import { ResponseBodyById } from 'src/app/models/responses/responseBodyById.model';
import { getDepartments } from 'src/app/modules/login/state/login.selector';
import { LoginState } from 'src/app/modules/login/state/loginState';
import { ApiService } from 'src/app/services/api.service';
import { CommonService } from 'src/app/services/common.service';
import { LayoutService } from 'src/app/services/layout.service';

interface IDataset {
  label: string;
  data: number[];
  borderColor: string;
  backgroundColor: string;
  borderWidth: number;
  fill: boolean;
}

@Component({
  selector: 'app-diagram-orders',
  templateUrl: './diagram-orders.component.html',
  styleUrls: ['./diagram-orders.component.scss'],
})
export class DiagramOrdersComponent implements OnInit {
  @ViewChild('bar') chartViewChild: UIChart;
  chartMonthlyData: any;
  chartMonthlyOptions: any;

  constructor(
    public app: AppComponent,
    private layoutService: LayoutService,
    private apiService: ApiService,
    private commonService: CommonService,
    private store: Store<LoginState>
  ) {}

  ngOnInit(): void {
    this.chartMonthlyData = this.getChartData();
    this.chartMonthlyOptions = this.getChartOptions();
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

  getChartData() {
    const labels: string[] = [];
    const years: number[] = [];
    const datasets: IDataset[] = [];
    const colorList = this.layoutService.getColors();
    const colors: string[] = [
      colorList.amberColor,
      colorList.blueColor,
      colorList.brownColor,
      colorList.pinkColor,
      colorList.deeporangeColor,
    ];

    const depts: number[] = this.commonService.getValueFromObservable(
      this.store.select(getDepartments)
    );
    this.apiService
      .getResponseByPost('/api/MainPageDiagramOrders', depts)
      .subscribe({
        next: (res: ResponseBodyById) => {
          res.value.forEach((element: any) => {
            if (!labels.find((x) => x === element.m)) {
              labels.push(element.m);
            }
            if (!years.find((x) => x === element.y)) {
              years.push(element.y);
            }
          });

          if (labels.length > 0 && years.length > 0) {
            var n = 1;
            years.forEach((year) => {
              n = n + 1;
              const values: any[] = res.value.filter((x: any) => x.y === year);
              const orders: number[] = [];
              for (let index = 1; index < 13; index++) {
                const val: any = values.find((x) => x.m === index);
                orders.push(val?.orderCount ?? 0);
              }

              datasets.push({
                label: year.toString(),
                data: orders,
                borderColor: colors[n],
                backgroundColor: colors[n],
                borderWidth: 2,
                fill: true,
              });
            });
          }
        },
        complete: () => {
          this.chartMonthlyData = {
            labels: labels,
            datasets: datasets,
          };
        },
      });
  }

  getChartOptions() {
    const textColor =
      getComputedStyle(document.body).getPropertyValue('--text-color') ||
      'rgba(0, 0, 0, 0.87)';
    const gridLinesColor =
      getComputedStyle(document.body).getPropertyValue('--divider-color') ||
      'rgba(160, 167, 181, .3)';
    const fontFamily = getComputedStyle(document.body).getPropertyValue(
      '--font-family'
    );
    return {
      plugins: {
        legend: {
          display: true,
          labels: {
            fontFamily,
            color: textColor,
          },
        },
      },
      animation: {
        animateScale: true,
        animateRotate: true,
      },
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          ticks: {
            fontFamily,
            color: textColor,
          },
          grid: {
            color: gridLinesColor,
          },
        },
        x: {
          categoryPercentage: 0.9,
          barPercentage: 0.8,
          ticks: {
            fontFamily,
            color: textColor,
          },
          grid: {
            color: gridLinesColor,
          },
        },
      },
    };
  }
}
