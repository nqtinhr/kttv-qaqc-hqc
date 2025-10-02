import { AbstractControl, ValidatorFn } from '@angular/forms';
import { NotifierOptions } from 'angular-notifier';
import { NgxLoadingXConfig, POSITION, SPINNER } from 'ngx-loading-x';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

export const ActionInView = {
  Create: 'Create',
  Detail: 'Detail',
  Update: 'Update',
  Delete: 'Delete'
};
export const Const = {
  noImage: '/assets/img/no-image.png',
  CountKeywordOnPage: 9,
  TokenExpriedMinute: 240,
  DefaultPageSize: 1,
  SUCCESS_CODE: 1,
  NOTFOUND_CODE: 0,
  FAIL_CODE: -1,
  NOTDEL_CASE_1_CODE: 1002,
};

export const NotifierType = {
  Default: 'default',
  Error: 'error',
  Success: 'success',
  Warning: 'warning',
  Info: 'info',
};
export const Verify_Signature_File = 'code_verify_signature_';

export const Lst_extensions_sig_USB = [
  'pdf',
  'xml',
  'xlsx',
  'xls',
  'doc',
  'docx',
  'ppt',
  'pptx',
  'pps',
  'odp',
];
export const Lst_extensions_office = [
  'xlsx',
  'xls',
  'doc',
  'docx',
  'ppt',
  'pptx',
  'pps',
  'odp',
];
export const CellMergeValueConst: any = 'Merge';

export const ngxLoadingXConfig: NgxLoadingXConfig = {
  show: false,
  bgBlur: 2,
  bgOpacity: 5,
  bgLogoUrl: '',
  bgLogoUrlPosition: POSITION.topLeft,
  bgLogoUrlSize: 100,
  spinnerType: SPINNER.wanderingCubes,
  spinnerSize: 120,
  spinnerColor: '#dd0031',
  spinnerPosition: POSITION.centerCenter,
};

export const customNotifierOptions: NotifierOptions = {
  position: {
    horizontal: {
      position: 'right',
      distance: 20,
    },
    vertical: {
      position: 'bottom',
      distance: 20,
      gap: 10,
    },
  },
  theme: 'material',
  behaviour: {
    autoHide: 5000,
    onClick: false,
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4,
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease',
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50,
    },
    shift: {
      speed: 300,
      easing: 'ease',
    },
    overlap: 150,
  },
};

export const ScrollXConfig: PerfectScrollbarConfigInterface = {
  suppressScrollX: false,
  suppressScrollY: true,
  minScrollbarLength: 20,
  wheelPropagation: true,
};

export const ScrollYConfig: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  suppressScrollY: false,
  minScrollbarLength: 20,
  wheelPropagation: true,
};

export const PAGE_SIZE_OPTIONS = [5, 10, 15, 20, 50];
export const DEFAULT_PAGE_SIZE = 10;
export const PAGINATION_SIZE = 3;
export const LIST_STATUS = [
  { key: 1, value: 'Đang hoạt động', css: 'bg-success', code: 'ACTIVE_BTN' },
  { key: 0, value: 'Không hoạt động', css: 'bg-danger', code: 'INACTIVE_BTN' },
];
export const LIST_STATUS_EFFECT = [
  { key: 1, value: 'Đang hoạt động', css: 'bg-success', code: 'ACTIVE_BTN' },
  { key: 0, value: 'Tạm xóa', css: 'bg-danger', code: 'TEMPORARILY_DEL' },
];
export const LIST_STATUS_DIP = [
  { key: 1, value: 'Đã mã hóa' },
  { key: 0, value: 'Chưa mã hóa' },
];
export const LIST_ARRANGE = [
  { key: 0, value: 'A - Z' },
  { key: 1, value: 'Z - A' },
];
export const LIST_AND_OR = [
  { key: 1, value: 'And' },
  { key: 0, value: 'Or' },
];
export const LIST_COMPARE_DIP = [
  { key: 0, value: '=' },
  { key: 1, value: '!=' },
  { key: 2, value: '>' },
  { key: 3, value: '<' },
  { key: 4, value: '>=' },
  { key: 5, value: '<=' },
  { key: 6, value: 'is between' },
  { key: 7, value: 'is empty' },
  { key: 8, value: 'not empty' },
  { key: 9, value: 'exits' },
  { key: 10, value: 'does not exits' },
  { key: 11, value: 'is one of' },
  { key: 12, value: 'is not one of' },
];
export const LIST_COMPARE_DIP_CHAR = [
  { key: 0, value: '=' },
  { key: 1, value: '!=' },
  { key: 7, value: 'is empty' },
  { key: 8, value: 'not empty' },
  { key: 9, value: 'exits' },
  { key: 10, value: 'does not exits' },
  { key: 11, value: 'is one of' },
  { key: 12, value: 'is not one of' },
];
export const LIST_COMPARE_DIP_INT_DATE = [
  { key: 0, value: '=' },
  { key: 1, value: '!=' },
  { key: 2, value: '>' },
  { key: 3, value: '<' },
  { key: 4, value: '>=' },
  { key: 5, value: '<=' },
  { key: 6, value: 'is between' },
];
export const LIST_STATUS_BOOLEAN = [
  { key: true, value: 'Đang hoạt động', css: 'bg-success', code: 'ACTIVE_BTN' },
  {
    key: false,
    value: 'Không hoạt động',
    css: 'bg-danger',
    code: 'INACTIVE_BTN',
  },
];

export const LIST_STATUS_ROLE = [
  { key: 1, value: 'Đang hoạt động', css: 'bg-success', code: 'ACTIVE_BTN' },
  { key: 0, value: 'Chờ xử lý', css: 'bg-secondary', code: 'PENDING_BTN' },
];

export const LIST_STATUS_CERT = [
  { key: 1, value: 'Còn hiệu lực', css: 'bg-success', code: 'CERT_ACTIVE' },
  { key: 0, value: 'Hết hiệu lực', css: 'bg-danger', code: 'CERT_EXPIRED' },
];

export const LIST_PERIOD = [
  { key: 0, value: 'BY_DAY' },
  { key: 1, value: 'BY_WEEK' },
  { key: 2, value: 'BY_MONTH' },
  { key: 3, value: 'BY_YEAR' },
  { key: 4, value: 'BY_QUARTER' },
];

export const USER_STATUS = [
  { key: 'Không hoạt động', value: false },
  { key: 'Đang hoạt động', value: true }
];

export const DEFAULT_DATE_FORMAT = 'dd-MM-yyyy hh:mm:ss a';
export const LOG_ACTIONS = [
  'Login',
  'Logout',
  'Add',
  'Update',
  'Delete',
  'Search',
  'Export',
  'Import',
];

export const Role = {
  USER_MANAGER: 'QLND',
  NAVIGATION_MANAGER: 'QLDH',
  ORG_MANAGER: 'CCTT',
  ROLE_MANAGER: 'QLQ',
  APP_MANAGER: 'QLUD',
  PARAMS_MANAGER: 'TSHT',
  USERGROUP_MANAGER: 'QLNND',
};

export const Right = {
  CREATE: 'CREATE',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE',
  VIEW: 'VIEW',
  IMPORT: 'IMPORT',
  EXPORT: 'EXPORT',
  PWCHANGE: 'PWCHANGE',
  LOCK: 'LOCK',
};

export const LIST_PROTOCOL = [
  { code: 'ARKIVUM', name: 'Arkivum' },
  { code: 'DV', name: 'Dataverse' },
  { code: 'DC', name: 'DuraCloud' },
  { code: 'DSPACE', name: 'DSpace via SWORD2 API' },
  { code: 'DSPC_RST', name: 'DSpace via REST API' },
  { code: 'FEDORA', name: 'FEDORA via SWORD2' },
  { code: 'GPG', name: 'GPG encryption on Local Filesystem' },
  { code: 'FS', name: 'Local Filesystem' },
  { code: 'LOM', name: 'LOCKSS-o-matic' },
  { code: 'NFS', name: 'NFS' },
  { code: 'REPLICA', name: 'Write-Only Replica Staging on Local Filesystem' },
  { code: 'PIPE_FS', name: 'Pipeline Local Filesystem' },
  { code: 'SWIFT', name: 'Swift' },
  { code: 'S3', name: 'S3' },
  { code: 'CIFS', name: 'CIFS' },
  { code: 'WEBDAV', name: 'WebDAV' },
  { code: 'MINIO', name: 'MinIO' },
  { code: 'LTFS', name: 'LTFS' },
  { code: 'OBTA', name: 'OBTA' },
];

export const SPACE_LOCATION_TYPE = [
  { code: 'AR', name: 'AIP Recovery' },
  { code: 'AS', name: 'AIP Storage' },
  { code: 'CP', name: 'Currently Processing' },
  { code: 'DS', name: 'DIP Storage' },
  { code: 'SD', name: 'DSpace via REST API' },
  { code: 'SS', name: 'Storage Service Internal Processing' },
  { code: 'BL', name: 'Transfer Backlog' },
  { code: 'TS', name: 'Transfer Source' },
  { code: 'RP', name: 'Replicator' },
];

export const ICON_DEFAULT_NAV = ' icon-user ';
export const REGEX_NAME =
  '^[a-zA-Z0-9_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽếềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳýỵỷỹ -]+';
export const REGEX_CODE = '^[a-zA-Z0-9_]*$';
export const REGEX_CODE_ROOT = '^[a-zA-Z0-9_/.=?:&#@%-]*$';
export const REGEX_CODE_FOND = '^[a-z0-9_]*$';
export const REGEX_NO_UNICODE =
  '[^ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽếềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳýỵỷỹ ]+';
export const REGEX_CODE_ROOTS = '^[a-zA-Z0-9_.@]*$';
export const REGEX_PHONE =
  '^(([+][(]?[8]{1}?[4]{1}[)]?)|0|84)(2(0[3-9]|1[0-6|8|9]|2[0-2|5-9]|3[2-9]|4[0-9]|5[1|2|4-9]|6[0-3|9]|7[0-7]|8[0-9]|9[0-4|6|7|9])|3[2-9]|5[5|6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])([0-9]{7})$';
export const REGEX_EMAIL =
  "^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$";

export const REGEX_EMAILS = '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$';

export const REGEX_FAX = '[- +()0-9]+';

export const REGEX_ORDER = '^-?[0-9]+$';



export const REGEX_WEB =
  '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

export const LIST_APPLICATION_TYPE = [
  { ID: 1, Name: 'AUTHEN_APP' },
  { ID: 2, Name: 'DATA_PROVIDE_APP' },
  { ID: 3, Name: 'DATA_EXPLOITATION_APP' },
];

export const LIST_AUTHEN_TYPE = [
  { ID: 1, Name: 'Jwt' },
  { ID: 2, Name: 'AD' },
  { ID: 3, Name: 'LDAP' },
  { ID: 4, Name: 'WSO2' },
  { ID: 5, Name: 'Keycloak' },
];

export const APPLICATION_TYPE = {
  AUTHEN_APP: 1,
  DATA_PROVIDE_APP: 2,
  DATA_EXPLOITATION_APP: 3,
};

export const AUTHEN_TYPE = {
  JWT: 1,
  AD: 2,
  LDAP: 3,
  WSO2: 4,
  KEYCLOAK: 5,
};

export const LIST_TRANSFER_TYPE = ['FOLDER', 'ZIPPED', 'OBJECT_STORAGE'];

export const LIST_PERSON_TYPE = [
  { Id: 0, Name: 'Khách' },
  { Id: 1, Name: 'Nội bộ' },
];

export const LIST_BACKLOG_STATUS = [
  { key: 1, value: 'Mới', css: 'bg-success', code: 'NEW' },
  { key: 0, value: 'Đã lưu', css: 'bg-danger', code: 'STORED' },
];
export const LIST_TYPE_OF_SIGNATURE = [
  { code: 0, value: 'USB Token' },
  { code: 1, value: 'HSM' },
  { code: 2, value: 'Remote Signing' },
];
export const LIST_TYPE_OF_SIGNING = [
  { code: 0, value: 'Cơ bản' },
  { code: 1, value: 'Nâng cao' },
];
export const LIST_CERT_STATUS = [
  {
    key: 0,
    value: 'Đang hoạt động',
    css: 'btn-cert-active',
    code: 'CERT_ACTIVE',
  },
  {
    key: 1,
    value: 'Hết hiệu lực',
    css: 'btn-cert-expired',
    code: 'CERT_EXPIRED',
  },
  {
    key: 2,
    value: 'Bị thu hồi',
    css: 'btn-cert-revoked',
    code: 'CERT_REVOKED',
  },
  {
    key: 3,
    value: 'Không xác định',
    css: 'btn-cert-unknown',
    code: 'CERT_UNKNOWN',
  },
];
export const LIST_INPUT_CONTROL = [
  {
    id: 1,
    code: 'SelectControl',
    type: 'DATA_LIST',
    name: 'DATA_LIST',
    typeinput: 'select',
    typedata: 'list',
  },
  {
    id: 2,
    code: 'RadioControl',
    type: 'DATA_LIST',
    name: 'DATA_LIST',
    typeinput: 'radio',
    typedata: 'list',
  },
  {
    id: 3,
    code: 'CheckboxMultiControl',
    type: 'DATA_LIST',
    name: 'DATA_LIST',
    typeinput: 'checkboxMulti',
    typedata: 'list',
  },
  {
    id: 4,
    code: 'InputTextControl',
    type: 'DATA_TEXT',
    name: 'DATA_TEXT',
    typeinput: 'text',
    typedata: 'nvarchar',
  },
  {
    id: 5,
    code: 'InputEmailControl',
    type: 'DATA_TEXT',
    name: 'DATA_TEXT',
    typeinput: 'email',
    typedata: 'nvarchar',
  },
  {
    id: 6,
    code: 'InputCodeControl',
    type: 'DATA_TEXT',
    name: 'DATA_TEXT',
    typeinput: 'text',
    typedata: 'nvarchar',
  },
  {
    id: 7,
    code: 'InputURLControl',
    type: 'DATA_TEXT',
    name: 'DATA_TEXT',
    typeinput: 'text',
    typedata: 'nvarchar',
  },
  {
    id: 8,
    code: 'InputPasswordControl',
    type: 'DATA_TEXT',
    name: 'DATA_TEXT',
    typeinput: 'password',
    typedata: 'nvarchar',
  },
  {
    id: 9,
    code: 'InputColorControl',
    type: 'DATA_TEXT',
    name: 'DATA_TEXT',
    typeinput: 'color',
    typedata: 'nvarchar',
  },
  {
    id: 10,
    code: 'TextAreaControl',
    type: 'DATA_TEXT',
    name: 'DATA_TEXT',
    typeinput: 'textarea',
    typedata: 'nvarchar',
  },
  {
    id: 11,
    code: 'InputNumberControl',
    type: 'DATA_NUMBER',
    name: 'DATA_NUMBER',
    typeinput: 'number',
    typedata: 'int',
  },
  {
    id: 12,
    code: 'InputRangerControl',
    type: 'DATA_NUMBER',
    name: 'DATA_NUMBER',
    typeinput: 'range',
    typedata: 'nvarchar',
  },
  {
    id: 13,
    code: 'InputDateControl',
    type: 'DATA_DATE',
    name: 'DATA_DATE',
    typeinput: 'date',
    typedata: 'datetime',
  },
  {
    id: 14,
    code: 'InputTimeControl',
    type: 'DATA_DATE',
    name: 'DATA_DATE',
    typeinput: 'time',
    typedata: 'nvarchar',
  },
  {
    id: 15,
    code: 'InputMonthControl',
    type: 'DATA_DATE',
    name: 'DATA_DATE',
    typeinput: 'month',
    typedata: 'nvarchar',
  },
  {
    id: 16,
    code: 'CheckboxControl',
    type: 'DATA_LOGIC',
    name: 'DATA_LOGIC',
    typeinput: 'checkbox',
    typedata: 'bool',
  },
  {
    id: 17,
    code: 'ToggleControl',
    type: 'DATA_LOGIC',
    name: 'DATA_LOGIC',
    typeinput: 'toggle',
    typedata: 'bool',
  },
  {
    id: 18,
    code: 'UploadControl',
    type: 'DATA_DIFFERENT',
    name: 'DATA_DIFFERENT',
    typeinput: 'file',
    typedata: 'file',
  },
];
export const LIST_TYPE_SIGNATURE = [
  {
    id: 1,
    name: 'Mẫu con dấu',
  },
  {
    id: 2,
    name: 'Mẫu chữ ký tay',
  },
];

export const LIST_FILE_TYPE = {
  TRANSFER: 'TRANSFER',
  BACKLOG: 'BACKLOG',
  SIP: 'SIP',
  AIP: 'AIP',
  DIP: 'DIP',
};

export const TRANSFER_JOB_TYPE = {
  CREATE_TRANFER: 'CREATE_TRANFER',
  SCAN_VIRUSS: 'SCAN_VIRUSS',
  ENCRYPT: 'ENCRYPT',
  GENERATE_METADATA: 'GENERATE_METADATA',
  CHECK_FORMAT: 'CHECK_FORMAT',
  MOVE_TO_BACKLOG: 'MOVE_TO_BACKLOG',
  CHECK_BASIC_SIGNATURE: 'CHECK_BASIC_SIGNATURE',
  SIGN_BASIC: 'SIGN_BASIC',
  STORE_SIP: 'STORE_SIP'
};
export const SIGNATURE = {
  FILE_ICONS: [
    {
      type: 'default',
      icon: '/assets/img/file.svg',
    },
    {
      type: 'wordprocessingml.document',
      icon: '/assets/img/doc.svg',
    },
    {
      type: 'image/jpeg',
      icon: '/assets/img/jpg.svg',
    },
    {
      type: 'image/png',
      icon: '/assets/img/png.svg',
    },
    {
      type: 'application/pdf',
      icon: '/assets/img/pdf.svg',
    },
    {
      type: 'text/plain',
      icon: '/assets/img/txt.svg',
    },
    {
      type: 'presentationml.presentation',
      icon: '/assets/img/ppt.svg',
    },
    {
      type: 'application/vnd.ms-excel',
      icon: '/assets/img/csv.svg',
    },
    {
      type: 'spreadsheetml.sheet',
      icon: '/assets/img/xls.svg',
    },
    {
      type: 'application/msword',
      icon: '/assets/img/doc.svg',
    },
    {
      type: 'text/xml',
      icon: '/assets/img/xml.svg',
    },
  ],

  SELECTOR: {
    Containment: '#mainViewer',
    ListSignContainment: '#listSignViewer',
    ObjDragToViewer: '.field-icon-left',
    ContentViewer: '#pdf-viewer',
    ScrollViewer: '.pdfscroll',
    SignObjToViewer: '.noselect .sign-item',
  },
  SUFFIX_VIEW_ID: 'viewer_',
  PDF_SCALE: 2,
  SX_DEFAULT: 1,
  INTMARGIN: 20,
  NUMBER_PAGE: 1,
  WIDTH_ICON: 164,
  HEIGHT_ICON: 80,
  SIGN_NUM: 1,
  X: -1,
  Y: -1,
  MAXSCALE: 1.5,
  MINSCALE: 0.2,
  MINZOOM: 0.2,
  MAXZOOM: 1.3,
  RATIOZOOM: 0.1,
  THUMBNAIL_WIDTH: 150,
  THUMBNAIL_CANVAS_BORDER_WIDTH: 1,
};
export function GetExtensionImageBase64(char: string) {
  let result = '';
  switch (char) {
    case 'i':
      result = 'data:image/png;base64,';
      break;
    case '/':
      result = 'data:image/jpg;base64,';
      break;
    case 'R':
      result = 'data:image/gif;base64,';
      break;
    case 'U':
      result = 'data:image/webp;base64,';
      break;
  }
  return result;
}
export const LIST_GROUP_METADATA = ['METADATA_TECH'];
export const SCHEDULE_TIME = [
  {
    name: 'EVERY_DAY',
    value: 0,
  },
  {
    name: 'EVERY_WEEK',
    value: 1,
  },
  {
    name: 'EVERY_MONTH',
    value: 2,
  },
  {
    name: 'EVERY_YEAR',
    value: 3,
  },
];
export const DAY_OF_WEEK = [
  {
    name: 'SUNDAY',
    value: 0,
  },
  {
    name: 'MONDAY',
    value: 1,
  },
  {
    name: 'TUESDAY',
    value: 2,
  },
  {
    name: 'WEDNESDAY',
    value: 3,
  },
  {
    name: 'THURSDAY',
    value: 4,
  },
  {
    name: 'FRIDAY',
    value: 5,
  },
  {
    name: 'SATURDAY',
    value: 6,
  },
];
export const LIST_MONTH = [
  {
    name: 'JANUARY',
    value: 1,
  },
  {
    name: 'FEBRUARY',
    value: 2,
  },
  {
    name: 'MARCH',
    value: 3,
  },
  {
    name: 'APRIL',
    value: 4,
  },
  {
    name: 'MAY',
    value: 5,
  },
  {
    name: 'JUNE',
    value: 6,
  },
  {
    name: 'JULY',
    value: 7,
  },
  {
    name: 'AUGUST',
    value: 8,
  },
  {
    name: 'SEPTEMBER',
    value: 9,
  },
  {
    name: 'OCTOBER',
    value: 10,
  },
  {
    name: 'NOVEMBER',
    value: 11,
  },
  {
    name: 'DECEMBER',
    value: 12,
  },
];
export const LIST_BACKUP_STATUS = [
  { key: true, value: 'NOT_SCHEDULED', css: 'bg-danger', code: 'INACTIVE_BTN' },
  { key: true, value: 'SCHEDULED', css: 'bg-success', code: 'ACTIVE_BTN' },
  { key: true, value: 'SCHEDULED', css: 'bg-success', code: 'ACTIVE_BTN' },
];
export const LIST_REQUEST_CHANGE = [
  { name: 'DATA_FORMAT', value: 1 },
  { name: 'STORAGE_MEDIA', value: 2 },
  { name: 'SOFTWARE_PACK', value: 3 },
  { name: 'COMPUTING_PLAT', value: 4 },
  { name: 'DIFFERENT', value: 5 },
];

export const LIST_TIME_DELETE = [
  // { name: 'ONE_DAY', value: 1  },
  { name: 'ONE_WEEK', value: 7 },
  { name: 'TWO_WEEK', value: 14 },
  { name: 'ONE_MONTH', value: 30 },
  { name: 'THREE_MONTH', value: 90 },
  // { name: 'SIX_MONTH', value: 180 },
  // { name: 'NINE_MONTH', value: 270 },
  { name: 'ONE_YEAR', value: 365 },
  // { name: 'DELETE_ALL', value: 0 },
];

export const LIST_LICENSE_STATUS = [
  { key: true, value: 'LICENSE_EXPIRED', css: 'bg-danger' },
  {
    key: true,
    value: 'FREE_TRIAL',
    css: 'bg-warning',
  },
  {
    key: true,
    value: 'PERPETUAL_LICENSE',
    css: 'bg-success',
  },
];
export const LIST_SUPPORT_TYPE = [
  {
    name: 'ACCOUNT_SUPPORT',
    value: 0,
  },
  {
    name: 'BUSINESS_SUPPORT',
    value: 1,
  },
  {
    name: 'PURCHASE_ORDER',
    value: 2,
  },
];
export const LIST_LANGUAGE = [
  { Name: 'VIETNAMESE', Id: 0 },
  { Name: 'ENGLISH', Id: 1 },
];
export const LIST_METADATA = [
  {
    name: 'CONTENTS',
    value: true,
  },
  {
    name: 'TECHNIQUE',
    value: false,
  }
];
export const LIST_METADATA_ADD = [
  {
    name: 'CONTENTS',
    value: 0,
  },
  {
    name: 'TECHNIQUE',
    value: 1,
  }
];

export function integerValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;

      // Kiểm tra xem giá trị có phải là số và không có phần thập phân
      const isInteger = Number.isInteger(Number(value)) && !value.toString().includes('.');
      return isInteger ? null : { notInteger: true }; // Trả về lỗi nếu không phải số nguyên
  };
}
