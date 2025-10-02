import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenService } from '../../services/common/authen.service';
import { TranslateService } from '@ngx-translate/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Router } from '@angular/router';
import { DashboardService } from '../../services/system/dashboard.service';
import { LoadingService } from 'src/app/services/loading/loading.service';
import { Utility } from 'src/app/utils/utility';
import {
  LIST_PERIOD,
  ScrollXConfig,
  ScrollYConfig,
} from 'src/app/utils/consts/const';

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
  appId: any = AuthenService.getApplicationId();
  totalOrganization: number;
  totalNavigation: number;
  totalUser: number;
  totalGroupRole: number;
  Dashboard: any;
  Statistical = 0;
  StatisticalError = 0;

  constructor(
    public translate: TranslateService,
    private router: Router,
    private dashboardService: DashboardService,
    private loadingSrv: LoadingService,
    public ultil: Utility
  ) {}
  ngOnInit(): void {
    this.GetDashboard();
  }

  GetDashboard() {
    this.dashboardService.GetDashboard().subscribe(
      (res) => {
        this.loadingSrv.setDisplay(false);
        this.Dashboard = res.Data;
        this.SetStorageChartData(this.Dashboard.Storage);
        this.SetStatisticsChartData(this.Dashboard.StatisticalPacket);
        this.SetStatisticsErrorChartData(
          this.Dashboard.LstStatisticalPacketError
        );
      },
      (err) => {
        this.loadingSrv.setDisplay(false);
      }
    );
  }

  SetStorageChartData(Storage: any) {
    const StorageUse = Storage.StorageUsedWithTB;
    const StorageFree = 100 - StorageUse;
    this.StorageChartData = {
      labels: [
        this.translate.instant('SPACE_USE'),
        this.translate.instant('SPACE_FREE'),
      ],
      datasets: [{ data: [StorageUse, StorageFree] }],
    };
    this.chart?.update();
  }

  GetStatisticsNumber(item: any) {
    if (!this.ultil.isNullOrEmpty(item)) {
      this.loadingSrv.setDisplay(true);
      this.dashboardService.GetStatisticsNumberpackets(item).subscribe(
        (res) => {
          this.loadingSrv.setDisplay(false);
          this.SetStatisticsChartData(res.Data);
        },
        (err) => {
          this.loadingSrv.setDisplay(false);
        }
      );
    }
  }

  GetStatisticsNumberError(item: any) {
    if (!this.ultil.isNullOrEmpty(item)) {
      this.loadingSrv.setDisplay(true);
      this.dashboardService.GetStatisticsNumberpacketsError(item).subscribe(
        (res) => {
          this.loadingSrv.setDisplay(false);
          this.SetStatisticsErrorChartData(res.Data);
        },
        (err) => {
          this.loadingSrv.setDisplay(false);
        }
      );
    }
  }

  SetStatisticsErrorChartData(LstStatisticalPacketError: any) {
    var barStatisticsErrorChartLabels = LstStatisticalPacketError?.map(
      (x) => x.Key
    ).reverse();
    var barStatisticsErrorChartDataAIP = LstStatisticalPacketError?.map(
      (x) => x.Values
    ).reverse();
    this.barStatisticsErrorlineChartData = {
      datasets: [
        {
          data: barStatisticsErrorChartDataAIP,
          label: this.translate.instant('PACKET_ERROR'),
          backgroundColor: 'rgba(148,159,177,0.2)',
          borderColor: '#E24C4C',
          pointBackgroundColor: 'white',
          pointBorderColor: '#9d9797',
          pointHoverBackgroundColor: '#9d9797',
          pointHoverBorderColor: '#9d9797',
          fill: 'origin',
        },
      ],
      labels: barStatisticsErrorChartLabels,
    };
    this.chart?.update();
  }

  SetStatisticsChartData(StatisticalPacket: any) {
    this.barStatisticsChartLabels =
      StatisticalPacket?.LstDashboardStatisticalDocument.map(
        (x) => x.Key
      ).reverse();
    var barStatisticsChartDataDocument =
      StatisticalPacket?.LstDashboardStatisticalDocument.map(
        (x) => x.Values
      ).reverse();
    var barStatisticsChartDataRecord =
      StatisticalPacket?.LstDashboardStatisticalRecord.map(
        (x) => x.Values
      ).reverse();
    var barStatisticsChartDataConllection =
      StatisticalPacket?.LstDashboardStatisticalCollection.map(
        (x) => x.Values
      ).reverse();
    this.barStatisticsChartData = {
      labels: this.barStatisticsChartLabels,
      datasets: [
        {
          data: barStatisticsChartDataConllection,
          label: this.translate.instant('COLLECTION'),
          borderRadius: 6,
          backgroundColor: '#83DA15',
          hoverBackgroundColor: '#83DA15',
          barThickness: 35,
        },
        {
          data: barStatisticsChartDataRecord,
          label: this.translate.instant('FILE'),
          borderRadius: 6,
          backgroundColor: '#E24C4C',
          hoverBackgroundColor: '#E24C4C',
          barThickness: 35,
        },
        {
          data: barStatisticsChartDataDocument,
          label: this.translate.instant('DOCUMENT'),
          borderRadius: 6,
          backgroundColor: '#0084FF',
          hoverBackgroundColor: '#0084FF',
          barThickness: 35,
        },
      ],
    };
    this.chart?.update();
  }

  redirectContact() {
    this.router.navigate(['contact']);
  }

  redirectToRequest(url: string) {
    this.router.navigate([url]);
  }
}
