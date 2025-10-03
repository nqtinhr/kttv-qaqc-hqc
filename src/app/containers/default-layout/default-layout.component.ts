import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  Inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { DEFAULT_PAGE_SIZE } from '~/app/utils/consts/const';
import { Router } from '@angular/router';
import { INavData } from '@coreui/angular';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '~/environments/environment';
import { AppConfigs } from '~/app/app.config';
// import { AuthenService } from '~/app/services/common/authen.service';
// import { ChangePasswordComponent } from '../common/change-password/change-password.component';
import 'lodash';
import { Utility } from '~/app/utils/utility';
import { select, Store } from '@ngrx/store';
import { IAppState } from '~/app/store/states/app.state';
import { selectedLoading } from '~/app/store/selectors/loading.selector';
import { LoadingService } from '~/app/services/loading/loading.service';
// import { NavigationService } from '~/app/services/system/navigation.service';
import { BreadCumbService } from '~/app/services/breadcumb/breadcumb.service';
import { LocalStorageService } from '~/app/services/common/storage-change.service';

@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
})
export class DefaultLayoutComponent implements OnInit, OnDestroy {
  public navItems: any[] = [];
  public perfectScrollbarConfig = {
    suppressScrollX: true,
  };
  minimized = false;
  public UserName = '';
  public FullName = '';
  public UserId: number;
  public IsShowSystemMenu = false;
  public sidebarMinimized = true;
  public sidebarShow = true;
  private changes: MutationObserver;
  public element: HTMLElement;
  public mobileSidebarToggler = false;
  public IsShowTranslate = false;
  public counter: { day: number; hour: number; min: number; sec: number };
  public timeToExpired = '';
  public sidebaritems: INavData[] = [];
  navChildItems: any[] = [];
  slidesPerView: any = 0;
  isLoading = false;
  textSearch: string = '';
  pageNumber: number = 1;
  columnOrderBy: string = 'Order';
  pageSize: number = DEFAULT_PAGE_SIZE;
  // appId: any = AuthenService.getApplicationId();
  typeOrderBy: string = 'ASC';
  lstParentName: any[] = [];
  oldData: any;
  RouParent: string = 'SYSTEM_MANAGEMENT';
  RouChilrent: string = 'VITAM';
  @ViewChild('dialogChangePassword')
  // dialogChangePassword: ChangePasswordComponent;
  showPopup = false;
  toggleMinimize(e) {
    this.minimized = e;
  }
  urlLogo: string = environment.URLLOGO;
  navc1: any;
  isVN = true;
  OpenNav: number = -1;
  IsOpenNav = 0;

  constructor(
    // private authenService: AuthenService,
    private breadCumbService: BreadCumbService,
    public translate: TranslateService,
    public ulti: Utility,
    private storeApp: Store<IAppState>,
    private router: Router,
    // private service: NavigationService,
    private until: Utility,
    private localStorageService: LocalStorageService,
    private cdr: ChangeDetectorRef,
    @Inject(DOCUMENT) _document?: any
  ) {
    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized =
        _document.body.classList.contains('sidebar-minimized');
      this.sidebarShow = _document.body.classList.contains('sidebar-lg-show');
    });
    this.element = _document.body;
    this.changes.observe(<Element>this.element, {
      attributes: true,
      attributeFilter: ['class'],
    });
    // if (!AuthenService.IsAuthenticated && environment.CheckAuthen) {
    //   window.localStorage.removeItem(AppConfigs.AccessToken);
    //   window.localStorage.removeItem(AppConfigs.InfoToken);
    //   // window.localStorage.removeItem('applicationId');
    //   window.localStorage.removeItem('authenType');
    //   window.location.href = '/authenticate';
    // }
    // this.UserId = AuthenService.getUserId();
    // this.UserName = AuthenService.getUserName();
    // this.FullName = AuthenService.getDisplayName();
  }

  public doLogout() {
    // this.authenService.doLogout();
  }

  async ngOnInit() {
    let init = 0;
    this.localStorageService.currentLS.subscribe((LS) => (this.isVN = LS));
    this.setLanguageFromlocalStorage();
    this.getLangNav();
    this.storeApp.pipe(select(selectedLoading)).subscribe((loading = true) => {
      if (loading) {
        this.isLoading = loading;
      } else if (init > 0) {
        setTimeout(() => {
          this.isLoading = loading;
        }, 500);
      }
      this.cdr.detectChanges();
    });
    init++;

    var currentURL = this.router.url?.trim();
    if (currentURL === '/') {
      this.router.navigateByUrl('/dashboard');
    }
    if (
      !this.ulti.isNullOrEmpty(localStorage.getItem('navigation')) &&
      currentURL != '/'
    ) {
      this.navItems = JSON.parse(localStorage.getItem('navigation') ?? '');
      this.navItems = this.navItems.map((x) => {
        x.active = false;
        return x;
      });
      let nav1 = 0;
      let nav2 = 0;
      let nav3 = 0;
      nav1 = this.checkURL(this.navItems, currentURL);
      if (nav1 > -1) {
        nav2 = this.checkURLC2(this.navItems[nav1]?.SubNavigation, currentURL);
        if (nav2 > -1) {
          nav3 = this.checkURLC3(
            this.navItems[nav1]?.SubNavigation[nav2]?.SubNavigation,
            currentURL
          );
        }
        this.Setbreadcrumb(
          this.navItems[nav1],
          this.navItems[nav1]?.SubNavigation[nav2],
          this.navItems[nav1]?.SubNavigation[nav2]?.SubNavigation[nav3]
        );
        this.navItems[nav1].active = true;
        this.navc1 = this.navItems[nav1];
        this.navChildItems = this.navItems[nav1].SubNavigation;
        this.navChildItems = this.navChildItems.map((x) => {
          x.active = false;
          return x;
        });
        if (nav2 > -1) {
          this.navChildItems[nav2].active = true;
        }
      }
      this.oldData = JSON.stringify(this.navItems);
    } else {
      window.localStorage.removeItem('navigation');
      this.getNavigation();
    }
  }
  ngOnDestroy(): void {
    this.changes.disconnect();
  }
  getShowpopup(item: any) {
    this.showPopup = true;
  }
  hideNotification() {
    this.showPopup = false;
  }
  searchNav(item: any) {
    var value = item.target.value;
    var data = JSON.parse(this.oldData);
    var datafilter = data.filter(
      (x) =>
        this.until
          .unicodeToChar(x.NavigationName)
          .toLowerCase()
          .trim()
          .includes(this.until.unicodeToChar(value).toLowerCase().trim()) ||
        this.until
          .unicodeToChar(x.NavigationNameEN)
          .toLowerCase()
          .trim()
          .includes(this.until.unicodeToChar(value).toLowerCase().trim())
    );
    if (datafilter.length > 0) {
      this.navItems = datafilter;
      this.navItems.map((x) => (x.active = true));
    } else {
      this.navItems = [];
      for (const item of data) {
        var itemfilter = item.SubNavigation.filter(
          (x) =>
            this.until
              .unicodeToChar(x.NavigationName.toLowerCase().trim())
              .includes(this.until.unicodeToChar(value).toLowerCase().trim()) ||
            this.until
              .unicodeToChar(x.NavigationNameEN.toLowerCase().trim())
              .includes(this.until.unicodeToChar(value).toLowerCase().trim())
        );
        if (itemfilter.length > 0) {
          for (const item2 of itemfilter) {
            this.navItems.push(item2);
          }
        }
      }
    }
  }

  getNavigation(isReload = false): void {
    // this.service.getNavByUser().subscribe(
    //   (res) => {
    //     if (res != null) {
    //       this.navItems = res.Data;
    //       this.navItems = this.navItems.map((x) => {
    //         x.active = false;
    //         return x;
    //       });
    //       localStorage.setItem('navigation', JSON.stringify(this.navItems));
    //     }
    //   },
    //   (err) => {}
    // );
  }
  GetParentName(data: any, isReload = false) {
    this.lstParentName = [];
    this.navItems = data.filter((a) =>
      this.until.isNullOrBlank(a.ParentNavigationId)
    );
    const HasParent = data.filter(
      (a) => !this.until.isNullOrBlank(a.ParentNavigationId)
    );
    for (const item of this.navItems) {
      item.active = false;
      item.select = true;
      item.SubNavigation = HasParent.filter(
        (a) => a.ParentNavigationId == item.NavigationId
      );
      item.SubNavigation.map((a) => (a.active = false));
      item.SubNavigation.map((a) => (a.select = true));
    }
    this.oldData = JSON.stringify(this.navItems);
    this.navItems[0].active = true;
    localStorage.setItem('navigation', JSON.stringify(this.navItems));
  }
  clickLogo() {
    this.RouChilrent = 'VITAM';
  }

  selectNavChilrent(
    data: any,
    index: number,
    indexchild: number,
    indexchildren: number,
    isParent: boolean
  ) {
    const actice = data.active;
    if (isParent) {
      this.RouParent = data.NavigationCode;
      this.RouChilrent = 'VITAM';
      this.navItems.forEach((nav) => {
        nav.active = false;
        nav.SubNavigation.map((a) => (a.active = false));
      });
      this.navItems[index].active = !actice;
    } else {
      this.RouChilrent = data.NavigationCode;
      this.navItems.map((a) => (a.active = false));
      this.navItems[index].active = true;
      // this.navItems[index].SubNavigation.map((a) => (a.active = false));
      // this.navItems[index].SubNavigation[indexchild].active = this.navItems[index].SubNavigation[indexchild].active == true ? false : true;
      if (indexchildren != null) {
        this.navItems[index].SubNavigation[indexchild].SubNavigation[
          indexchildren
        ].active =
          this.navItems[index].SubNavigation[indexchild].SubNavigation[
            indexchildren
          ].active == true
            ? false
            : true;
      }
      this.navItems[index].SubNavigation.forEach((x: any, i: any) => {
        if (indexchild != i) {
          x.active = false;
        } else {
          x.active = x.active == true ? false : true;
        }
      });
    }
    localStorage.setItem('navigation', JSON.stringify(this.navItems));
  }

  public changetoVI() {
    window.localStorage.setItem('lang', 'vi');
    this.translate.use('vi');
  }

  public changetoEN() {
    window.localStorage.setItem('lang', 'en');
    this.translate.use('en');
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
        // this.authenService.doLogout();
      }
    }, 1000);
  }
  /**
   * Mở form đổi mật khẩu
   */
  // changePassword(): void {
  //   if (this.UserId && this.UserId > 0)
  //     this.dialogChangePassword.openDialog(this.UserId);
  // }
  setLanguageFromlocalStorage() {
    const strLanguageLocal = localStorage.getItem('language');
    if (this.ulti.isNullOrEmpty(strLanguageLocal)) {
      this.isVN = true;
      const strDefaultLanguage = 'en';
      this.translate.setDefaultLang(strDefaultLanguage);
      this.translate.use(strDefaultLanguage);
      localStorage.setItem('language', strDefaultLanguage);
    } else {
      strLanguageLocal === 'en' ? (this.isVN = false) : (this.isVN = true);
      this.translate.setDefaultLang(strLanguageLocal ? strLanguageLocal : 'en');
      this.translate.use(strLanguageLocal ? strLanguageLocal : 'en');
    }
  }
  switchLanguage(language: string) {
    this.translate.use(language);
    this.translate.setDefaultLang(language);
    localStorage.setItem('language', language);
    language === 'en' ? (this.isVN = false) : (this.isVN = true);
    //this.setslidesPerView(this.widthNow);
  }

  GetnavChildren(item: any, index: number) {
    this.navc1 = item;
    this.navChildItems = item?.SubNavigation;
    this.navChildItems.forEach((x) => (x.active = false));
    this.navItems.forEach((x, i) => {
      if (index != i) {
        x.active = false;
      } else {
        x.active = x.active == true ? false : true;
      }
    });

    localStorage.setItem('navigation', JSON.stringify(this.navItems));
    var currentURL = this.router.url?.trim();
    const indexc2 = this.checkURLC2(this.navChildItems, currentURL);
    if (this.navChildItems.length > 0 && indexc2 > -1) {
      this.navChildItems[indexc2].active = true;
    }
  }
  SetActiveNavC3(index2: number, index3: number) {
    this.navChildItems.forEach((element) => {
      element.SubNavigation.forEach((element2) => {
        element2.active = false;
      });
    });
    if (index3 > -1) {
      this.navChildItems[index2].SubNavigation[index3].active = true;
    }
  }
  SetActiveNavC2(index: number) {
    this.navChildItems = this.navChildItems.map((x) => {
      x.active = false;
      return x;
    });
    if (this.navChildItems.length > 0) {
      this.navChildItems[index].active = true;
    }
  }
  checkURL(lstItem: any, currentURL: string) {
    let nav1 = 0;
    for (const item of this.navItems) {
      if (item.UrlRewrite === currentURL) {
        return nav1;
      } else {
        for (const item2 of item.SubNavigation) {
          if (item2.UrlRewrite === currentURL) {
            return nav1;
          } else {
            for (const item3 of item2.SubNavigation) {
              if (item3.UrlRewrite === currentURL) {
                return nav1;
              }
            }
          }
        }
      }
      nav1++;
    }
    return -1;
  }
  checkURLC2(lstItem: any, currentURL: string) {
    let nav2 = 0;
    for (const item2 of lstItem) {
      if (item2.UrlRewrite === currentURL) {
        return nav2;
      } else {
        for (const item3 of item2.SubNavigation) {
          if (item3.UrlRewrite === currentURL) {
            return nav2;
          }
        }
      }
      nav2++;
    }
    return -1;
  }
  checkURLC3(lstItem: any, currentURL: string) {
    let nav3 = 0;
    for (const item2 of lstItem) {
      if (item2.UrlRewrite === currentURL) {
        return nav3;
      }
      nav3++;
    }
    return -1;
  }
  getLangNav() {
    if (this.translate.currentLang === 'vi') {
      this.isVN = true;
    } else {
      this.isVN = false;
    }
  }
  Setbreadcrumb(navc1: any, navc2: any, navc3: any) {
    if (this.isVN) {
      this.breadCumbService.setBreadCumb(
        navc1?.NavigationName,
        navc2?.NavigationName,
        navc3?.NavigationName
      );
    } else {
      this.breadCumbService.setBreadCumb(
        navc1?.NavigationNameEN,
        navc2?.NavigationNameEN,
        navc3?.NavigationNameEN
      );
    }
  }
}
