import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { HeaderComponent } from '@coreui/angular';
// import { AuthenService } from '~/app/services/common/authen.service';
// import { ChangePasswordComponent } from '~/app/containers/common/change-password/change-password.component';
import { IconSetService } from '@coreui/icons-angular';
import { freeSet } from '@coreui/icons/js/free';
import { TranslateService } from '@ngx-translate/core';
import { Utility } from '~/app/utils/utility';
// import { NavigationService } from '~/app/services/system/navigation.service';
import { LoadingService } from '~/app/services/loading/loading.service';
import { Router } from '@angular/router';
import SwiperCore, { Pagination, Navigation } from 'swiper';
import { SwiperComponent } from 'swiper/angular';
import { BreadCumbService } from '~/app/services/breadcumb/breadcumb.service';
import { select, Store } from '@ngrx/store';
import { IAppState } from '~/app/store/states/app.state';
import { selectedNotification } from '~/app/store/selectors/notification.selector';
import { notificationRouter, userRouter } from '~/app/utils/consts/router';
import { environment } from '~/environments/environment';
// import { HttpService } from '~/app/services/common/http.service';
import { NoticationFilter, NoticationModel } from '~/app/model/Notification';
import { NotifierService } from 'angular-notifier';
import {
  DEFAULT_PAGE_SIZE,
  NotifierType,
  ScrollXConfig,
  ScrollYConfig,
} from '~/app/utils/consts/const';
import { LocalStorageService } from '~/app/services/common/storage-change.service';

SwiperCore.use([Pagination, Navigation]);

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
  styleUrls: ['./default-header.component.scss'],
  providers: [IconSetService],
})
export class DefaultHeaderComponent extends HeaderComponent {
  urlLogo: string = environment.URLLOGO;
  scrollXConfig = ScrollXConfig;
  scrollYConfig = ScrollYConfig;

  isVN = true;
  icon: any;
  pageSize: number = 100000;
  isSelectFormNav = false;
  ChildBreadCumb: string;
  navItems: any[] = [];
  navChildItems: any[] = [];
  oldData: any;
  showPopup: boolean = false;
  currentIndex: string = '';
  slidesPerView: number;
  lstNotification: any[] = [];
  lstUser: any[] = [];
  indexNumber: any = 0;
  isView: boolean;
  datasource: any[];
  arrayDelete: any[] = [];
  totalItems: number;
  pageNumber: number = 1;
  columnOrderBy: string = '';
  typeOrderBy: string = 'ASC';
  textSearch: string = '';
  totalPage: number;
  totalNotView: number;
  queryObj: NoticationFilter;
  // baseURL: string = environment.APP_API_URL;
  // applicationType = AuthenService.getApplicationType();
  // authenType = AuthenService.getAuthenType();
  navc1: any;
  @Input() sidebarId: string = 'sidebar';
  @Input() RouterParent: string;
  @Input() RouterChilrent: string;
  @Input() hidePopup: boolean = false;
  @Output() NavChildren: EventEmitter<any> = new EventEmitter();
  @Output() outshowPopup: EventEmitter<any> = new EventEmitter();

  public FullName = '';
  public newMessages = new Array(4);
  public newTasks = new Array(5);
  public newNotifications = new Array(5);
  public UserId: number;
  @ViewChild('dialogChangePassword')
  // dialogChangePassword: ChangePasswordComponent;
  itemUpdate?: NoticationModel;
  action: string;
  slidesPerViewParent = 7;
  widthNow = screen.width;
  constructor(
    // private authenService: AuthenService,
    public iconSet: IconSetService,
    public translate: TranslateService,
    public ulti: Utility,
    // private service: NavigationService,
    private loadingSrv: LoadingService,
    private until: Utility,
    private router: Router,
    private breadCumbService: BreadCumbService,
    private storeApp: Store<IAppState>,
    // private httpService: HttpService,
    private notifier: NotifierService,
    private localStorageService: LocalStorageService
  ) {
    super();
    // this.UserId = AuthenService.getUserId();
    // this.FullName = AuthenService.getDisplayName();
    this.icon = freeSet;
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (
      !this.ulti.isNullOrBlank(changes) &&
      !this.ulti.isNullOrBlank(changes.RouterParent)
    ) {
      this.isSelectFormNav = true;
      this.RouterParent = changes.RouterParent.currentValue?.trim();
    }
    if (
      !this.ulti.isNullOrBlank(changes) &&
      !this.ulti.isNullOrBlank(changes.RouterChilrent)
    ) {
      this.isSelectFormNav = true;
      this.RouterChilrent = changes.RouterChilrent.currentValue?.trim();
    }
    if (
      !this.ulti.isNullOrEmpty(changes) &&
      !this.ulti.isNullOrEmpty(changes?.hidePopup)
    ) {
      this.showPopup = changes.hidePopup.currentValue;
    }
  }
  ngOnInit(): void {
    this.localStorageService.currentLS.subscribe((LS) => (this.isVN = LS));
    this.SelectNotification();
    this.setLanguageFromlocalStorage();
    this.getLangNav();
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
    this.setslidesPerView(window.innerWidth);
    setInterval(() => {
      this.getAllNotification();
    }, Number(environment.NOTIFICATION_DELAY_TIME));
  }
  ngAfterViewInit() {
    // document.querySelectorAll("#swiperSlideparent .swiper-slide").forEach(function (d: any) {
    //   d.style.background = '#193f7d';
    // })
  }
  SelectNotification() {
    this.storeApp.pipe(select(selectedNotification)).subscribe((type) => {
      this.getAllNotification();
    });
  }

  getAllNotification() {
    // let url = this.baseURL + notificationRouter.getByRoleId;
    // this.httpService.DoGet(url).subscribe((res) => {
    //   if (res.Data != null) {
    //     this.lstNotification = res.Data;
    //     this.totalNotView = res.Data.filter((x) => x.isView == false).length;
    //   }
    // });
  }

  isViewNotification(e) {
    this.loadingSrv.setDisplay(true);
    let id = e.Id;
    // let url = this.baseURL + notificationRouter.update;
    // this.httpService.DoPost(url, { Id: id }).subscribe((res) => {
    //   if (res.Data != null) {
    //     this.totalNotView = res.Data;
    //   }
    //   this.getAllNotification();
    // });
    this.loadingSrv.setDisplay(false);
  }

  getListNotification() {
    this.queryObj = new NoticationFilter(
      this.textSearch,
      this.pageSize,
      this.pageNumber,
      this.columnOrderBy,
      this.typeOrderBy
      // this.UserId,
    );
    this.loadingSrv.setDisplay(true);
    // const data = this.httpService
    //   .DoPost(this.baseURL + notificationRouter.getFilter, this.queryObj)
    //   .toPromise()
    //   .then((res: any) => {
    //     this.loadingSrv.setDisplay(false);
    //     this.datasource = res.Data;
    //     this.totalPage = res.TotalPage;
    //     this.pageNumber = res.PageNumber;
    //     this.totalItems = res.TotalCount;
    //     this.arrayDelete = [];
    //     this.datasource.forEach((e) => {
    //       if (e.isChecked) {
    //         e.isChecked = false;
    //       }
    //     });
    //   })
      // .catch((err) => {
      //   this.loadingSrv.setDisplay(false);
      // });
  }

  isViewAllNotification(e) {
    this.loadingSrv.setDisplay(true);
    if (e || e != undefined) {
      lstid = e.Id;
    } else {
      var lstid = this.lstNotification.filter((x) => x.isView == false);
      var arrId = lstid.map((e) => e.Id);
      // let url = this.baseURL + notificationRouter.updateAll;
      // this.httpService.DoPost(url, arrId).subscribe((res) => {
      //   this.getAllNotification();
      // });
    }

    this.loadingSrv.setDisplay(false);
  }

  changePage(page: any) {
    this.pageNumber = page.page || 1;
    this.getListNotification();
  }

  orderBy(col: string) {
    this.columnOrderBy = col || 'Order';
    this.getListNotification();
  }

  changeTypeOrderBy() {
    if (this.typeOrderBy === 'DESC') {
      this.typeOrderBy = 'ASC';
    } else {
      this.typeOrderBy = 'DESC';
    }
    this.getListNotification();
  }

  changePageSize(size: number): void {
    this.pageSize = size;
    this.pageNumber = 1;
    this.getListNotification();
  }

  onBlurMethod() {
    this.showPopup = false;
  }
  showMe(index: string) {
    this.showPopup = !this.showPopup;
    this.currentIndex = index;
    this.outshowPopup.emit(this.showPopup);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.widthNow = event.target.innerWidth;
    this.setslidesPerView(event.target.innerWidth);
  }
  setslidesPerView(width) {
    if (this.navChildItems.length >= 5) {
      if (width > 1850 && this.navChildItems.length >= 9) {
        this.slidesPerView = 9;
      } else if (width > 1800 && this.navChildItems.length >= 8) {
        this.slidesPerView = 8;
      } else if (width > 1600 && this.navChildItems.length >= 7) {
        this.slidesPerView = 7;
      } else if (width > 1400 && this.navChildItems.length >= 6) {
        this.slidesPerView = 6;
      } else if (width > 1200 && this.navChildItems.length >= 5) {
        this.slidesPerView = 5;
      } else if (width > 1000 && this.navChildItems.length >= 4) {
        this.slidesPerView = 4;
      } else if (width > 800 && this.navChildItems.length >= 3) {
        this.slidesPerView = 3;
      } else if (width > 600 && this.navChildItems.length >= 2) {
        this.slidesPerView = 2;
      } else {
        this.slidesPerView = 1;
      }
    } else {
      this.slidesPerView = this.navChildItems.length;
    }
    if (this.isVN) {
      if (width > 1850 && this.navItems.length >= 7) {
        this.slidesPerViewParent = 7;
      } else if (width > 1800 && this.navItems.length >= 6) {
        this.slidesPerViewParent = 6;
      } else if (width > 1600 && this.navItems.length >= 5) {
        this.slidesPerViewParent = 5;
      } else if (width > 1400 && this.navItems.length >= 4) {
        this.slidesPerViewParent = 4;
      } else if (width > 1200 && this.navItems.length >= 3) {
        this.slidesPerViewParent = 3;
      } else if (width > 1000 && this.navItems.length >= 2) {
        this.slidesPerViewParent = 2;
      } else if (width > 800 && this.navItems.length >= 1) {
        this.slidesPerViewParent = 1;
      }
    } else {
      if (width > 1850 && this.navItems.length >= 6) {
        this.slidesPerViewParent = 6;
      } else if (width > 1800 && this.navItems.length >= 5) {
        this.slidesPerViewParent = 5;
      } else if (width > 1600 && this.navItems.length >= 4) {
        this.slidesPerViewParent = 4;
      } else if (width > 1400 && this.navItems.length >= 3) {
        this.slidesPerViewParent = 3;
      } else if (width > 1200 && this.navItems.length >= 2) {
        this.slidesPerViewParent = 2;
      } else if (width > 1000 && this.navItems.length >= 1) {
        this.slidesPerViewParent = 1;
      }
    }
    //
    if (width <= 500) {
      this.slidesPerView = 1;
      this.slidesPerViewParent = 1;
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
  public doLogout() {
    // this.authenService.doLogout();
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
    this.localStorageService.changeLS(this.isVN);
    this.setslidesPerView(this.widthNow);
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
  GetnavChildren(item: any, index: number) {
    this.navc1 = item;
    this.navChildItems = item?.SubNavigation;
    this.navChildItems = this.navChildItems.map((x) => {
      x.active = false;
      return x;
    });
    this.navItems = this.navItems.map((x) => {
      x.active = false;
      return x;
    });
    this.navItems[index].active = true;
    localStorage.setItem('navigation', JSON.stringify(this.navItems));
    var currentURL = this.router.url?.trim();
    const indexc2 = this.checkURLC2(this.navChildItems, currentURL);
    if (this.navChildItems.length > 0 && indexc2 > -1) {
      this.navChildItems[indexc2].active = true;
    }
    this.setslidesPerView(window.innerWidth);
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
  RedirectHomePage() {
    this.navChildItems = [];
    this.router.navigate(['dashboard']);
  }
}
