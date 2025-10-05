import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { AuthorizeService } from './authorize.service';
import { Utility } from '~/app/utils/utility';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(
    private authorizeService: AuthorizeService,
    public util: Utility,
    private titleService: Title,
    public translate: TranslateService
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    return this.hasRequiredPermission(
      route.data['title'],
      route.data['role'],
      route.data['right']
    );
  }

  hasRequiredPermission(
    Title: string,
    roleCode: string,
    rightCode: string
  ): boolean {
    setTimeout(() => {
      var data = sessionStorage.getItem('titleService');
      let routerName;
      if (!this.util.isNullOrEmpty(data)) {
        routerName = JSON.parse(data ?? '');
        if (Title === routerName.title) {
          this.titleService.setTitle(routerName.titleLang);
        } else {
          this.titleService.setTitle(this.translate.instant(Title));
        }
      } else {
        this.titleService.setTitle(this.translate.instant(Title));
      }
      const title = {
        title: Title,
        titleLang: this.translate.instant(Title),
      };
      if (
        title.title != 'SYSTEM_MANAGEMENT' &&
        title.title != 'VITAM' &&
        title.title != routerName?.title
      ) {
        sessionStorage.setItem('titleService', JSON.stringify(title));
      }
      // if (!this.util.isNullOrEmpty(roleCode) && !this.util.isNullOrEmpty(rightCode)
      // ) {
      //   this.authorizeService.initializePermissions();
      //   if (roleCode && rightCode)
      //     return this.authorizeService.hasPermission(roleCode, rightCode);
      //   else return this.authorizeService.hasPermission('', '');
      // } else {
      //   return true;
      // }
    }, 500);
    return true;
  }
}
