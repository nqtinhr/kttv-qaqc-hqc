import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { iconSubset } from './icons/icon-subset';
import { Title } from '@angular/platform-browser';
import { cilEnvelopeOpen } from '@coreui/icons';
import {
  IconModule,
  IconSetModule,
  IconSetService,
} from '@coreui/icons-angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'body',
  template: '<router-outlet></router-outlet>',
  providers: [IconSetService],
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Phần mềm nội bộ';
  translate: TranslateService;
  constructor(
    private router: Router,
    private titleService: Title,
    private iconSetService: IconSetService,
    public iconSet: IconSetService,
    translate: TranslateService
  ) {
    titleService.setTitle(this.title);
    // iconSet singleton
    iconSet.icons = { cilEnvelopeOpen };
    iconSetService.icons = { ...iconSubset };
    //iconSet.icons = { cilEnvelopeOpen, ...flagSet };
    // iconSet.icons = { ...freeSet };
    this.translate = translate;
  }

  ngOnInit(): void {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }
}
