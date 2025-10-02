import { environment } from '~/environments/environment';
import { Component } from '@angular/core';
import { FooterComponent } from '@coreui/angular';
import { AppConfigs } from '~/app/app.config';
import { AuthenService } from '~/app/services/common/authen.service';

@Component({
  selector: 'app-default-footer',
  templateUrl: './default-footer.component.html',
  styleUrls: ['./default-footer.component.scss'],
})
export class DefaultFooterComponent extends FooterComponent {
  public timeToExpired = '';
  public counter: { day: number; hour: number; min: number; sec: number };
  public appTitle: string = environment.APP_TITLE;
  public yearCreate: any = 2022;
  constructor(private authenService: AuthenService) {
    super();
    this.getWorkTime();
  }
  public getWorkTime() {
    let tokenExpried = window.localStorage.getItem(AppConfigs.TokenExpried);
    let totalSeconds = 0;
    let dayEx = 0;
    let hourEx = 0;
    let minEx = 0;
    let secEx = 0;
    if (tokenExpried && tokenExpried.length > 0) {
      let expriedDate = Number(tokenExpried);
      let today = new Date().getTime();
      let diffMs = Math.abs(expriedDate - today); // milliseconds between now & Christmas
      totalSeconds = Number(diffMs / 1000);
      dayEx = Math.floor(totalSeconds / (3600 * 24));
      hourEx = Math.floor((totalSeconds % (3600 * 24)) / 3600);
      minEx = Math.floor((totalSeconds % 3600) / 60);
      secEx = Math.floor(totalSeconds % 60);
    }
    this.timeToExpired = '';
    this.counter = { day: dayEx, hour: hourEx, min: minEx, sec: secEx }; // choose whatever you want
    if (this.counter.day > 0) {
      this.timeToExpired = this.counter.day + ' ngày ';
    }
    if (this.counter.hour < 10) {
      this.timeToExpired = this.timeToExpired + '0' + this.counter.hour;
    } else {
      this.timeToExpired = this.timeToExpired + this.counter.hour;
    }
    this.timeToExpired = this.timeToExpired + ':';
    if (this.counter.min < 10) {
      this.timeToExpired = this.timeToExpired + '0' + this.counter.min;
    } else {
      this.timeToExpired = this.timeToExpired + this.counter.min;
    }
    this.timeToExpired = this.timeToExpired + ':';
    if (this.counter.sec < 10) {
      this.timeToExpired = this.timeToExpired + '0' + this.counter.sec;
    } else {
      this.timeToExpired = this.timeToExpired + this.counter.sec;
    }
    let intervalId = setInterval(() => {
      totalSeconds -= 1;
      this.counter.day = Math.floor(totalSeconds / (3600 * 24));
      this.counter.hour = Math.floor((totalSeconds % (3600 * 24)) / 3600);
      this.counter.min = Math.floor((totalSeconds % 3600) / 60);
      this.counter.sec = Math.floor(totalSeconds % 60);
      this.timeToExpired = '';
      if (this.counter.day > 0) {
        this.timeToExpired = this.counter.day + ' ngày ';
      }
      if (this.counter.hour < 10) {
        this.timeToExpired = this.timeToExpired + '0' + this.counter.hour;
      } else {
        this.timeToExpired = this.timeToExpired + this.counter.hour;
      }
      this.timeToExpired = this.timeToExpired + ':';
      if (this.counter.min < 10) {
        this.timeToExpired = this.timeToExpired + '0' + this.counter.min;
      } else {
        this.timeToExpired = this.timeToExpired + this.counter.min;
      }
      this.timeToExpired = this.timeToExpired + ':';
      if (this.counter.sec < 10) {
        this.timeToExpired = this.timeToExpired + '0' + this.counter.sec;
      } else {
        this.timeToExpired = this.timeToExpired + this.counter.sec;
      }
      if (
        this.counter.day === 0 &&
        this.counter.hour === 0 &&
        this.counter.min === 0 &&
        this.counter.sec === 0
      ) {
        clearInterval(intervalId);
        this.authenService.doLogout();
      }
    }, 1000);
  }
}
