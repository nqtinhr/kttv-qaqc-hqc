import { HttpClient, HttpClientModule } from '@angular/common/http';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import {
  IconModule,
  IconSetModule,
  IconSetService,
} from '@coreui/icons-angular';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppComponent } from './app.component';
import {
  DefaultFooterComponent,
  DefaultHeaderComponent,
  DefaultLayoutComponent,
} from './containers/default-layout';

import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { customNotifierOptions, ScrollXConfig } from './utils/consts/const';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import {
  PERFECT_SCROLLBAR_CONFIG,
  PerfectScrollbarConfigInterface,
  PerfectScrollbarModule,
} from 'ngx-perfect-scrollbar';
import { TrimValueAccessorModule } from 'ng-trim-value-accessor';
import { TreeModule } from '@circlon/angular-tree-component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgSelectModule } from '@ng-select/ng-select';
import { SwiperModule } from 'swiper/angular';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AppRoutingModule } from './app.routing';
import { NotifierModule } from 'angular-notifier';
import { ngxLoadingAnimationTypes, NgxLoadingModule } from 'ngx-loading';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { StoreModule } from '@ngrx/store';
import { appReducers } from './store/reducers/app.reducers';
import { SignaturePadModule } from 'angular2-signaturepad';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {
  RECAPTCHA_SETTINGS,
  RecaptchaFormsModule,
  RecaptchaModule,
  RecaptchaSettings,
} from 'ng-recaptcha';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import {
  AvatarModule,
  BadgeModule,
  BreadcrumbModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  DropdownModule,
  FooterModule,
  FormModule,
  GridModule,
  HeaderModule,
  ListGroupModule,
  NavModule,
  ProgressModule,
  SharedModule,
  SidebarModule,
  TabsModule,
  UtilitiesModule,
  CollapseModule,
  SpinnerModule,
} from '@coreui/angular';
import { NgChartsModule } from 'ng2-charts';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NumberOnlyDirective } from './utils/directive/number.directive';
import { ViewModalComponent } from './containers';
import { BreadcrumbRouterComponent } from './containers/common/breadcrumb-router/breadcrumb-router.component';
import { P403Component } from './views/error/p403.component';
import { P505Component } from './views/error/p505/p505.component';
import { SelectCommonComponent } from './utils/directive/inp-select-common/select-common.component';
import { SelectDropdownCommonComponent } from './utils/directive/inp-select-dropdown-common/select-dropdown-common.component';
import { ToggleButtonComponent } from './containers/common/toggle-button/toggle-button.component';
import { IconComponent } from './utils/directive/inp-icon/icon.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';

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
    DashboardComponent
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
