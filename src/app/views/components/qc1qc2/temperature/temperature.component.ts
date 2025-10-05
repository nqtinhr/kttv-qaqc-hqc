import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { freeSet } from '@coreui/icons';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ViewModalComponent } from '~/app/containers';
import { TemperatureFilter, TemperatureModel } from '~/app/model/Temperature';
import { LoadingService } from '~/app/services/loading/loading.service';
import {
  DEFAULT_DATE_FORMAT,
  DEFAULT_PAGE_SIZE,
  LIST_ARRANGE,
  NotifierType,
  PAGE_SIZE_OPTIONS,
  PAGINATION_SIZE,
  ScrollXConfig,
  ScrollYConfig,
} from '~/app/utils/consts/const';
import { Utility } from '~/app/utils/utility';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-temperature',
  templateUrl: './temperature.component.html',
  styleUrls: ['./temperature.component.scss'],
})
export class TemperatureComponent implements OnInit {
  scrollXConfig = ScrollXConfig;
  scrollYConfig = ScrollYConfig;
  icon = freeSet;

  @ViewChild('dialog') dialog: ViewModalComponent;
  @ViewChild('delete') delete: ViewModalComponent;
  @ViewChild("create") create: ViewModalComponent;

  //mảng chứa dữ liệu trả về từ server
  datasource: any[] = [];
  //mảng id sẽ thực hiện xóa
  arrayDelete: any[] = [];
  itemDelete: any;
  deleteSingle: boolean = false;
  isExistCode: boolean = false;

  formGroup: FormGroup;
  isEdit: boolean = false;
  get form() {
    return this.formGroup.controls;
  }

  //Biến phân trang
  totalPage: number;
  totalItems: number;
  maxSize: number = 5;
  numPages: number = 0;
  pageSize: number = DEFAULT_PAGE_SIZE;
  maxSizeDisplay: number = PAGINATION_SIZE;
  pageSizeOptions: number[] = PAGE_SIZE_OPTIONS;
  arrangeOptions: any = LIST_ARRANGE;
  pageNumber: number = 1;
  textSearch: string = '';
  // mặc định factor = 'T2m' và dtDate = ngày hiện tại (YYYY-MM-DD)
  factor: string = 'T2m';
  dtDate: string = new Date().toISOString().slice(0, 10);
  filterName: string;
  columnOrderBy: string = 'StationNameVn';
  typeOrderBy: string = 'ASC';
  queryObj: TemperatureFilter;

  //Biến boolean
  isAdd: boolean = true;
  isSubmited: boolean = false;
  isCheckAllGroupRole: boolean = false;
  isCheckAll: boolean = false;
  isReversed: boolean | null = null;

  header: string[] = [
    'STATION_NO',
    'STATION_NAME',
    'TMAX2',
    'TMIN2',
    'TMAX1',
    'TMIN1',
    'DELTA_T_6H',
    'MEASURE_TIME',
    'DATA_VALUE',
    'QCFLAG',
    'STATUS'
  ];

  property: string[] = [
    'StationNo',
    'StationNameVn',
    'TMax2',
    'TMin2',
    'TMax1',
    'TMin1',
    'DT6H',
    'DtDate',
    'Value',
    'QCFlag',
    'Status'
  ];


  constructor(
    public translate: TranslateService,
    private formBuilder: FormBuilder,
    private loadingSrv: LoadingService,
    private notifier: NotifierService,
    public until: Utility,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // read query params on init and restore state (then fetch)
    this.route.queryParams.subscribe(params => {
      this.textSearch = params['textSearch'] ?? this.textSearch;
      this.factor = params['factor'] ?? this.factor;
      this.dtDate = params['dtDate'] ?? this.dtDate;
      this.pageSize = params['pageSize'] ? +params['pageSize'] : this.pageSize;
      this.pageNumber = params['pageNumber'] ? +params['pageNumber'] : this.pageNumber;
      this.columnOrderBy = params['columnOrderBy'] ?? this.columnOrderBy;
      this.typeOrderBy = params['typeOrderBy'] ?? this.typeOrderBy;
      this.getData();
    });
  }

  bindFormGroup(item?: TemperatureModel) {
    this.formGroup = this.formBuilder.group({
      TMax2:           [item?.TMax2 ?? null,  [Validators.pattern(/^-?\d+(\.\d+)?$/)]],
      TMin2:           [item?.TMin2 ?? null,  [Validators.pattern(/^-?\d+(\.\d+)?$/)]],
      TMax1:           [item?.TMax1 ?? null,  [Validators.pattern(/^-?\d+(\.\d+)?$/)]],
      TMin1:           [item?.TMin1 ?? null,  [Validators.pattern(/^-?\d+(\.\d+)?$/)]],
      DT6H:            [item?.DT6H ?? null,   [Validators.pattern(/^-?\d+(\.\d+)?$/)]],
      Value:           [item?.Value ?? null,  [Validators.required, Validators.pattern(/^-?\d+(\.\d+)?$/)]],
      QCFlag:          [item?.QCFlag ?? 1,    [Validators.required, Validators.pattern(/^\d+$/)]],
    });
  }

  reload(): void {
    this.textSearch = '';
    this.arrayDelete = [];
    this.typeOrderBy = '';
    this.pageSize = DEFAULT_PAGE_SIZE;
    this.pageNumber = 1;
    this.getData();
  }

  changePage(page: any) {
    this.pageNumber = page.page || 1;
    this.getData();
  }

  orderBy(col: string) {
    this.columnOrderBy = col || 'Order';
    this.getData();
  }

  changeTypeOrderBy() {
    if (this.typeOrderBy === 'ASC') {
      this.typeOrderBy = 'DESC';
    } else {
      this.typeOrderBy = 'ASC';
    }
    this.getData();
  }

  changePageSize(size: number): void {
    this.pageSize = size;
    this.pageNumber = 1;
    this.getData();
  }

  getData() {
    this.loadingSrv.setDisplay(true);

    const factor = this.factor ?? 'T2m';
    const dtDate = this.dtDate ?? new Date().toISOString().slice(0, 10);

    this.queryObj = new TemperatureFilter(
      this.textSearch,
      this.pageSize,
      this.pageNumber,
      factor,
      dtDate,
      this.columnOrderBy,
      this.typeOrderBy
    );
    console.log('queryObj', this.queryObj);
    // push current filter state to URL (so it can be shared / restored)
    const q: any = {
      textSearch: this.textSearch || null,
      factor: this.factor || null,
      dtDate: this.dtDate || null,
      pageSize: this.pageSize || null,
      pageNumber: this.pageNumber || null,
      columnOrderBy: this.columnOrderBy || null,
      typeOrderBy: this.typeOrderBy || null
    };
    // remove null keys to keep URL clean
    Object.keys(q).forEach(k => q[k] == null && delete q[k]);
    this.router.navigate([], { relativeTo: this.route, queryParams: q, replaceUrl: true });

    // Fake DB
    const names = ['Bắc Hà','Sa Pa','Mộc Châu','Ba Vì','Tam Đảo','Đà Lạt','Bảo Lộc','Buôn Ma Thuột','Pleiku','Kon Tum'];
    const rows: TemperatureModel[] = Array.from({ length: 123 }, (_, i) => {
      const tMax2 = 38 - (i % 5), tMin2 = 18 + (i % 4);
      const dt = new Date();
      dt.setDate(dt.getDate() - (i % 10)); // spread data over last 10 days
      dt.setHours(12 - (i % 12), 0, 0, 0);
      return {
        StationNo: (1000 + i).toString(),
        StationNameVn: names[i % names.length],
        TMax2: tMax2, TMin2: tMin2, TMax1: tMax2 - 1, TMin1: tMin2 + 1,
        DT6H: Math.round(((Math.random() * 4) + 0.3) * 10) / 10,
        DtDate: dt,
        Value: Math.round(((tMin2 + tMax2) / 2 + (Math.random() * 2 - 1)) * 10) / 10,
        QCFlag: [1, 2, 9][i % 3],
      };
    });

    // Filter
    const kw = (this.textSearch || '').trim().toLowerCase();
    let data = rows;
    if (kw) {
      data = data.filter(r => r.StationNo.toLowerCase().includes(kw) || r.StationNameVn.toLowerCase().includes(kw));
    }
    if (this.dtDate) {
      data = data.filter(r => {
        const itemDate = new Date(r.DtDate);
        // Parse YYYY-MM-DD as local time, not UTC, to prevent timezone issues
        const filterDate = new Date(this.dtDate + 'T00:00:00');
        return itemDate.getFullYear() === filterDate.getFullYear()
            && itemDate.getMonth() === filterDate.getMonth()
            && itemDate.getDate() === filterDate.getDate();
      });
    }

    // Sort
    const col = (this.columnOrderBy as keyof TemperatureModel) || null;
    const asc = String(this.typeOrderBy || 'asc').toLowerCase() !== 'desc';
    if (col) {
      const cmp = (a: any, b: any) => {
        const va = a?.[col], vb = b?.[col];
        // nulls last
        if (va == null && vb == null) return 0;
        if (va == null) return 1;
        if (vb == null) return -1;

        if (col === 'DtDate') {
          return ((new Date(va).getTime()) - (new Date(vb).getTime())) * (asc ? 1 : -1);
        }
        if (typeof va === 'number' && typeof vb === 'number') {
          return (va - vb) * (asc ? 1 : -1);
        }
        return String(va).localeCompare(String(vb)) * (asc ? 1 : -1);
      };
      data = data.slice().sort(cmp);
    }

    // Paging (FIX: clamp page vào [1..totalPage])
    const size = Math.max(1, +this.pageSize || 10);
    const totalCount = data.length;
    const totalPage  = Math.max(1, Math.ceil(totalCount / size));
    const page = Math.min(Math.max(1, +this.pageNumber || 1), totalPage);
    const start = (page - 1) * size;
    const pageItems = data.slice(start, start + size);

    // Apply
    setTimeout(() => {
      this.datasource = [...pageItems];   // đổi reference cho OnPush
      this.totalItems = totalCount;
      this.totalPage  = totalPage;
      this.pageNumber = page;
      this.isCheckAll = false;
      this.itemDelete = null;
      this.setCheckboxOnPages?.();
      this.setIsCheckAll?.();
      this.loadingSrv.setDisplay(false);
    }, 100);
  }

  submitForm() {
    // this.formGroup.markAllAsTouched();
    // this.formGroup.markAsDirty();
    // if (this.formGroup.invalid) {
    //   this.notifier.notify(
    //     NotifierType.Warning,
    //     this.translate.instant('ENTER_FULL_INFOMATION')
    //   );
    //   return;
    // }


    if (!this.isEdit) {
      this.notifier.notify(NotifierType.Success, this.translate.instant('ADD_SUCCESS'));
    } else {
        this.notifier.notify(NotifierType.Success, this.translate.instant('UPDATE_SUCCESS'));
    }
  }

  // Create - Update
  createOrUpdateDialog(isUpdate: boolean, data: TemperatureModel = new TemperatureModel()) {
    this.isEdit = isUpdate;
    if (isUpdate) {
      this.create.openDialog(this.translate.instant('UPDATE_COUNTRY'));
    } else {
      // this.resetInput();
      this.create.openDialog(this.translate.instant('ADD_NEW_COUNTRY'));
    }
  }


  // Delete
  confirmDelete() {
    this.loadingSrv.setDisplay(true);

    try {
      if (!this.deleteSingle) {
        // Xóa nhiều
        const ids = new Set(this.arrayDelete.map((e: any) => e.ID ?? e.CountryId ?? e.StationNo));
        this.datasource = this.datasource.filter((x: any) => !ids.has(x.ID ?? x.CountryId ?? x.StationNo));
        this.arrayDelete = [];
      } else {
        // Xóa đơn
        const id = this.itemDelete?.ID ?? this.itemDelete?.CountryId ?? this.itemDelete?.StationNo;
        this.datasource = this.datasource.filter((x: any) => (x.ID ?? x.CountryId ?? x.StationNo) !== id);
        this.itemDelete = null;
      }

      this.totalItems = this.datasource.length;
      this.isCheckAll = false;
      this.setCheckboxOnPages?.();
      this.setIsCheckAll?.();
      this.delete?.handleCloseDialog?.();

      this.notifier.notify(NotifierType.Success, this.translate.instant('DELETE_SUSSCESS'));
    } catch {
      this.notifier.notify(NotifierType.Error, this.translate.instant('ERR_OCCURED'));
    } finally {
      this.loadingSrv.setDisplay(false);
    }
  }


  openDelete(deleteSingle: boolean, item?) {
    if (deleteSingle) {
      this.itemDelete = item;
    }
    this.deleteSingle = deleteSingle;
    this.delete.openDialog(this.translate.instant('NOTIFICATION'));
  }

  closeDialog() {
    if (this.deleteSingle) {
      this.itemDelete = null;
      this.deleteSingle = false;
    }
  }


  resetInput() {
    this.formGroup.reset();
    this.isSubmited = false;
  }

  setIsCheckAll() {
    let flagCheck = true;
    this.datasource.forEach((elem: any) => {
      if (!elem.isChecked) {
        flagCheck = false;
      }
    });

    this.isCheckAll = this.datasource.length > 0 ? flagCheck : false;
  }

   setCheckboxOnPages() {
    this.datasource.forEach((elem: any) => {
      if (this.arrayDelete.findIndex(x => x.CountryId == elem.CountryId) !== -1) {
        elem.isChecked = true;
      }
    });
  }

  checkAll() {
    this.datasource.forEach((elem: any) => {
      elem.isChecked = this.isCheckAll;
      const position = this.arrayDelete.findIndex(
        (e: any) => e.CountryId === elem.CountryId
      );
      if (elem.isChecked && position === -1) {
        this.arrayDelete.push(elem);
      } else if (!elem.isChecked && position !== -1) {
        this.arrayDelete.splice(position, 1);
      }
    });
  }

  checkElement(item): void {
    this.setIsCheckAll();
    const isContain = this.arrayDelete.findIndex(x => x.CountryId == item.CountryId);
    if (isContain === -1) {
      this.arrayDelete.push(item);
    } else {
      this.arrayDelete.splice(isContain, 1);
    }
  }

  changeArrangeName(item){
    this.typeOrderBy = item.key === 0 ? "ASC" : "DESC";
    this.getData();
  }
}
