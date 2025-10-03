import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Router } from '@angular/router';
import { LoadingService } from '~/app/services/loading/loading.service';
import { Utility } from '~/app/utils/utility';
import {
  LIST_PERIOD,
  ScrollXConfig,
  ScrollYConfig,
} from '~/app/utils/consts/const';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  // biểu đồ gói tin lỗi
  barStatisticsErrorlineChartData: any;
  public StatisticsErrorlineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.1,
      },
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      y: {
        min: 0,
        position: 'left',
        ticks: {
          stepSize: 1,
          callback: function (value) {
            return Number.isInteger(value) ? value : null;
          },
        },
      },
    },
  };
  public StatisticsErrorlineChartType: ChartType = 'line';
  // Bieu do so luong goi tim
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  public barChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.1,
      },
    },
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: { stacked: true },
      y: {
        min: 1,
        stacked: true,
        ticks: {
          stepSize: 1,
          callback: function (value) {
            return Number.isInteger(value) ? value : null;
          },
        },
      },
    },
    plugins: {
      legend: { display: true },
    },
  };

  barStatisticsChartLabels: string[];
  barStatisticsChartType: ChartType = 'bar';
  barStatisticsChartData: any;
  // biểu đồ dung lượng
  StorageChartData: ChartData<'doughnut'> = {
    labels: ['Dung lượng đã sử dụng', 'Dung lượng trống '],
    datasets: [{ data: [50, 50] }],
  };
  StorageChartType: ChartType = 'doughnut';
  public StorageChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    cutout: '50%',
  };
  scrollXConfig = ScrollXConfig;
  scrollYConfig = ScrollYConfig;
  lstPeriod = LIST_PERIOD;
  // appId: any = AuthenService.getApplicationId();
  Dashboard: any;
  Statistical = 0;
  StatisticalError = 0;

  constructor(
    public translate: TranslateService,
    private router: Router,
    private loadingSrv: LoadingService,
    public ultil: Utility
  ) {}
  ngOnInit(): void {}
}
