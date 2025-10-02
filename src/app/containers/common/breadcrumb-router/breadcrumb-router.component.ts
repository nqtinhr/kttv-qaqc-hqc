import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { selectedbreadcrumb } from '~/app/store/selectors/breadcrumb.selector';
import { IAppState } from '~/app/store/states/app.state';
import { Utility } from '~/app/utils/utility';

@Component({
  selector: 'app-breadcrumb-router',
  templateUrl: './breadcrumb-router.component.html',
  styleUrls: ['./breadcrumb-router.component.scss']
})
export class BreadcrumbRouterComponent implements OnInit {
  navC1: string;
  navC2: string;
  navC3: string;

  constructor(
      private storeApp: Store<IAppState>,
      public translate: TranslateService,
      public until: Utility,

    ) {
   }
  ngOnInit(): void {
     this.storeApp.pipe(select(selectedbreadcrumb)).subscribe((breadcrumb) => {
      this.navC1 = breadcrumb.BreadcrumbC1;
      this.navC2 = breadcrumb.BreadcrumbC2;
      this.navC3 = breadcrumb.BreadcrumbC3;
    });
  }

}
