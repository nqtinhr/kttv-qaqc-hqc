import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { IconModule, IconSetModule, IconSetService } from '@coreui/icons-angular';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppComponent } from './app.component';
import { DefaultFooterComponent, DefaultHeaderComponent, DefaultLayoutComponent, } from './containers/default-layout';
import { TemperatureComponent } from './views/components/qc1qc2/temperature/temperature.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AvatarModule, BadgeModule, BreadcrumbModule, ButtonGroupModule, ButtonModule, CardModule, CollapseModule, DropdownModule, FooterModule, FormModule, GridModule, HeaderModule, ListGroupModule, NavModule, ProgressModule, SharedModule, SidebarModule, SpinnerModule, TabsModule, UtilitiesModule, } from '@coreui/angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { StoreModule } from '@ngrx/store';
import { NotifierModule } from 'angular-notifier';
import { SignaturePadModule } from 'angular2-signaturepad';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { RECAPTCHA_SETTINGS, RecaptchaFormsModule, RecaptchaModule, RecaptchaSettings, } from 'ng-recaptcha';
import { TrimValueAccessorModule } from 'ng-trim-value-accessor';
import { NgChartsModule } from 'ng2-charts';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ngxLoadingAnimationTypes, NgxLoadingModule } from 'ngx-loading';
import { PerfectScrollbarConfigInterface, PerfectScrollbarModule, PERFECT_SCROLLBAR_CONFIG, } from 'ngx-perfect-scrollbar';
import { SwiperModule } from 'swiper/angular';
import { AppRoutingModule } from './app.routing';
import { ViewModalComponent } from './containers';
import { BreadcrumbRouterComponent } from './containers/common/breadcrumb-router/breadcrumb-router.component';
import { ToggleButtonComponent } from './containers/common/toggle-button/toggle-button.component';
import { appReducers } from './store/reducers/app.reducers';
import { customNotifierOptions } from './utils/consts/const';
import { IconComponent } from './utils/directive/inp-icon/icon.component';
import { SelectCommonComponent } from './utils/directive/inp-select-common/select-common.component';
import { SelectDropdownCommonComponent } from './utils/directive/inp-select-dropdown-common/select-dropdown-common.component';
import { NumberOnlyDirective } from './utils/directive/number.directive';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { P403Component } from './views/error/p403.component';
import { P505Component } from './views/error/p505/p505.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};

const APP_CONTAINERS = [
  DefaultFooterComponent,
  DefaultHeaderComponent,
  DefaultLayoutComponent,
];

@NgModule({
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    ViewModalComponent,
    NumberOnlyDirective,
    BreadcrumbRouterComponent,
    P403Component,
    P505Component,
    IconComponent,
    SelectCommonComponent,
    ToggleButtonComponent,
    SelectDropdownCommonComponent,
    DashboardComponent,
    TemperatureComponent,
  ],
  imports: [
    FontAwesomeModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AvatarModule,
    BreadcrumbModule,
    FooterModule,
    DropdownModule,
    GridModule,
    HeaderModule,
    PerfectScrollbarModule,
    NavModule,
    ButtonModule,
    FormModule,
    FormsModule,
    UtilitiesModule,
    ButtonGroupModule,
    ReactiveFormsModule,
    NgSelectModule,
    SidebarModule,
    SharedModule,
    TabsModule,
    ListGroupModule,
    ProgressModule,
    BadgeModule,
    CardModule,
    HttpClientModule,
    TrimValueAccessorModule,
    NotifierModule.withConfig(customNotifierOptions),
    ModalModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
    IconModule,
    IconSetModule.forRoot(),
    // TreeModule,
    CollapseModule,
    BsDropdownModule.forRoot(),
    PaginationModule.forRoot(),
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.circleSwish,
      backdropBackgroundColour: 'rgba(0,0,0,0.6)',
      backdropBorderRadius: '4px',
      fullScreenBackdrop: true,
      primaryColour: '#2e69c1',
      secondaryColour: '#2e69c1',
      tertiaryColour: '#2e69c1',
    }),
    StoreModule.forRoot(appReducers),
    SpinnerModule,
    NgMultiSelectDropDownModule.forRoot(),
    SwiperModule,
    PdfViewerModule,
    DragDropModule,
    SignaturePadModule,
    RecaptchaFormsModule,
    RecaptchaModule,
    NgChartsModule,
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy,
    },
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: '6LfKi5sjAAAAADSJoPbIG3qBn_Hd9fnjDlQQJbgQ',
      } as RecaptchaSettings,
    },
    IconSetService,
    Title,
    NgbActiveModal,
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  exports: [NumberOnlyDirective],
})
export class AppModule {}

export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
