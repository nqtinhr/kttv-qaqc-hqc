export enum authenRouter {
  login = '/authen/login',
  loginJWT = '/authen/login-jwt',
  logOut = '/authen/logout',
}

export enum userRouter {
  getAll = '/user/getAll',
  getFilter = '/user/getFilter',
  getById = '/user/getById',
  create = '/user/create',
  update = '/user/update',
  delete = '/user/delete?id=',
  deleteMany = '/user/deleteMany',
  changePassword = '/user/changePassword',
  changeCurrentUserPassword = '/user/changeCurrentUserPassword',
  getByApplication = '/user/getByApplication',
  updateInfoUser = '/user/UpdateInfoUser',
}

export enum notificationRouter {
  getAll = '/Notification/GetAll',
  getByRoleId = '/Notification/GetByRoleId',
  getAllNotView = '/notification/GetAllNotView',
  getFilter = '/notification/GetFilter',
  delete = '/notification/Delete',
  deleteMany = '/notification/DeleteMany',
  create = '/notification/Create',
  update = '/notification/Update',
  updateAll = '/notification/UpdateAll',
}

export enum notificationConfigRouter {
  getAll = '/NotificationConfig/GetAll',
  getByRoleId = '/NotificationConfig/GetByRoleId',
  getFilter = '/notificationConfig/GetFilter',
  delete = '/notificationConfig/Delete',
  deleteMany = '/notificationConfig/DeleteMany',
  create = '/NotificationConfig/Create',
  update = '/NotificationConfig/Update',
}

export enum comboboxRouter {
  getListApplication = '/combobox/getListApplication',
  getListOrganization = '/combobox/getListOrganization',
  getListGroupRole = '/combobox/getListGroupRole',
  getListGroupRoleByType = '/combobox/getListGroupRoleByType',
  getListRoles = '/combobox/GetListRoles',
}

export enum organizationRouter {
  getFilter = '/Organization/GetFilter',
  getByApplication = '/Organization/GetByApplication',
  getAll = '/Organization/GetAll',
  getTreeOrg = '/Organization/TreeAll',
  delete = '/Organization/Delete',
  deleteMany = '/Organization/DeleteMany',
  create = '/Organization/Create',
  update = '/Organization/Update',
  getByUser = '/Organization/GetByUser?userId=',
}
export enum backupRestoreRouter {
  backup = '/BackupRestore/Backup',
  getAllBackupFile = '/BackupRestore/GetAllBackupFile',
  getAllBackups = '/BackupRestore/GetAllBackups',
  getBackupById = '/BackupRestore/GetBackupById',
  restore = '/BackupRestore/Restore',
  updateBackup = '/BackupRestore/UpdateBackup',
}
export enum licenseRouter {
  getFilter = '/License/GetFilter',
  getById = '/License/GetById',
  update = '/License/Update',
}
export enum roleRouter {
  getAllRights = '/Role/getAllRights',
  getFilter = '/Role/GetFilter',
  getById = '/Role/GetById?id=',
  delete = '/Role/Delete',
  deleteMany = '/Role/DeleteMany',
  createOrUpdate = '/Role/CreateOrUpdate',
}

export enum navigationRouter {
  getFilter = '/Navigation/GetFilter',
  searchByName = '/Navigation/SearchByName',
  getByApplication = '/Navigation/GetByApplication',
  delete = '/Navigation/Delete',
  deleteMany = '/Navigation/DeleteMany',
  createOrUpdate = '/Navigation/CreateOrUpdate',
  getNavByUser = '/Navigation/GetNavByUserID',
  GetByCurrentUser = '/Navigation/GetByCurrentUser',
  getTreeNavigation = '/Navigation/TreeAll',
  GetAllnavigation = '/Navigation/GetAllnavigation',
}
export enum catalogRouter {
  getALL = '/Catalog/GetAll',
  getCatalogByStatus = '/Catalog/GetByStatus?status=',
  getCataloDetailgByCatalogid = '/CatalogDetail/GetByCatalogId?id=',
  CreateCatalog = '/Catalog/Create',
  DeleteCatalog = '/Catalog/Delete?id=',
  UpdateCatalog = '/Catalog/Update',
  checkCatalogCodeExist = '/Catalog/CheckCodeExist?code=',
  checkCatalogDetailValueExist = '/CatalogDetail/CheckValueExist?value=',
  checkCatalogDetailKeyExist = '/CatalogDetail/CheckKeyExist?key=',
  DeleteManyCatalog = '/Catalog/DeleteMany',
  GetCatalogDetailById = '/CatalogDetail/GetById?id=',
  CreateCatalogDetail = '/CatalogDetail/Create',
  DeleteCatalogDetail = '/CatalogDetail/Delete?id=',
  UpdateCatalogDetail = '/CatalogDetail/Update',
  DeleteManyCatalogDetail = '/CatalogDetail/DeleteMany?id=',
  GetCatalogDetailByFiter = '/CatalogDetail/GetFilter',
}

export enum systemLogRouter {
  getFilter = '/SystemLog/GetFilter',
  delete = '/SystemLog/Delete',
  deleteMany = '/SystemLog/DeleteByIds',
  create = '/SystemLog/CreateLog'
}

export enum systemParameterRouter {
  getFilter = '/systemParameter/GetFilter',
  createOrUpdate = '/systemParameter/CreateOrUpdate',
  delete = '/systemParameter/Delete',
  deleteMany = '/systemParameter/DeleteMany',
  GetByStatus = '/systemParameter/GetByStatus?status=',
}

export enum countryRouter {
  getAll = '/country/GetAll',
  getFilter = '/country/GetFilter',
  delete = '/country/Delete',
  deleteMany = '/country/DeleteMany',
  create = '/country/Create',
  update = '/country/Update',
}

export enum wfstatesRouter {
  getAll = '/wfstates/GetAll',
  getFilter = '/wfstates/GetFilter',
  delete = '/wfstates/Delete',
  deleteMany = '/wfstates/DeleteMany',
  create = '/wfstates/Create',
  update = '/wfstates/Update',
}

export enum wfcommandsRouter {
  getAll = '/wfcommands/GetAll',
  getFilter = '/wfcommands/GetFilter',
  delete = '/wfcommands/Delete',
  deleteMany = '/wfcommands/DeleteMany',
  create = '/wfcommands/Create',
  update = '/wfcommands/Update',
}

export enum provinceRouter {
  getAll = '/province/GetAll',
  getFilter = '/province/GetFilter',
  delete = '/province/Delete',
  deleteMany = '/province/DeleteMany',
  create = '/province/Create',
  update = '/province/Update',
  getByCountry = '/province/GetByCountry?countryId='
}

export enum districtRouter {
  getAll = '/district/GetAll',
  getFilter = '/district/GetFilter',
  delete = '/district/Delete',
  deleteMany = '/district/DeleteMany',
  create = '/district/Create',
  update = '/district/Update',
  getByProvince = '/district/GetByProvince?provinceId='
}

export enum warehouseRouter {
  getAll = '/warehouse/GetAll',
  getFilter = '/warehouse/GetFilter',
  delete = '/warehouse/Delete',
  deleteMany = '/warehouse/DeleteMany',
  create = '/warehouse/Create',
  update = '/warehouse/Update',
}

export enum warehouseRegisterRouter {
  getAll = '/warehouseRegister/GetAll',
  getFilter = '/WarehouseRegister/GetFilter',
  delete = '/warehouseRegister/Delete',
  deleteMany = '/warehouseRegister/DeleteMany',
  create = '/warehouseRegister/Create',
  update = '/warehouseRegister/Update',
}

export enum feedbackRouter {
  getAll = '/Feedback/GetAll',
  getFilter = '/Feedback/GetFilter',
  delete = '/Feedback/Delete',
  deleteMany = '/Feedback/DeleteMany',
  create = '/Feedback/Create',
  update = '/Feedback/Update',
}

export enum requestRouter {
  getAll = '/Request/GetAll',
  getFilter = '/Request/GetFilter',
  delete = '/Request/Delete',
  deleteMany = '/Request/DeleteMany',
  create = '/Request/Create',
  update = '/Request/Update',
  updateBrowse = '/Request/UpdateBrowse',
  updateRefuseBrowse = '/Request/UpdateRefuseBrowse',
}
export enum AIPFileErrorJobRouter {
  getFilter = '/AIPFileErrorJob/GetFilter',
  Create = '/AIPFileErrorJob/Create',
  Update = '/AIPFileErrorJob/Update',
  GetHistory = '/AIPFileErrorHistory/GetById?id=',
}

export enum wardRouter {
  getAll = '/ward/GetAll',
  getFilter = '/ward/GetFilter',
  delete = '/ward/Delete',
  deleteMany = '/ward/DeleteMany',
  create = '/ward/Create',
  update = '/ward/Update',
  getByDistrict = '/ward/GetByDistrict?districtId='
}

export enum ethnicRouter {
  getAll = '/ethnic/GetAll',
  getFilter = '/ethnic/GetFilter',
  delete = '/ethnic/Delete',
  deleteMany = '/ethnic/DeleteMany',
  create = '/ethnic/Create',
  update = '/ethnic/Update',
}

export enum pipeLineRouter {
  getFilter = '/PipeLine/GetFilter',
  setDefault = '/PipeLine/setDefault?id=',
  getById = '/PipeLine/GetById?id=',
  getByOrganization = '/PipeLine/GetByOrganization',
  getPipeLineJobs = '/PipeLine/GetPipeLineJobs?pipelineId=',
  delete = '/PipeLine/Delete',
  deleteMany = '/PipeLine/DeleteMany',
  createOrUpdate = '/PipeLine/CreateOrUpdate',
  updatePipeLineJob = '/PipeLine/UpdatePipeLineJob',
  changeStatus = '/PipeLine/ChangeStatus',
  auto = '/PipeLine/AutoPipeLines'
}

export enum spaceRouter {
  getAll = '/Space/GetAll',
  getFilter = '/Space/GetFilter',
  getById = '/Space/GetById?id=',
  delete = '/Space/Delete',
  deleteMany = '/Space/DeleteMany',
  createOrUpdate = '/Space/CreateOrUpdate',
  getPaths = '/Space/GetPaths?path=',
}

export enum spaceLocationRouter {
  getAll = '/SpaceLocation/GetAll',
  getFilter = '/SpaceLocation/GetFilter',
  getByStatusAndType = '/SpaceLocation/GetByStatusAndType',
  getLocalFiles = '/SpaceLocation/GetLocalFiles',
  getById = '/SpaceLocation/GetById?id=',
  delete = '/SpaceLocation/Delete',
  deleteMany = '/SpaceLocation/DeleteMany',
  createOrUpdate = '/SpaceLocation/CreateOrUpdate',
}
export enum locationTypeRouter {
  getById = '/LocationType/GetById?id=',
  getByCode = '/LocationType/GetByCode?code=',
  delete = '/LocationType/Delete',
  getall = '/LocationType/GetAll',
}
export enum GroupFormatRouter {
  create = '/FormatGroup/Create',
  Update = '/FormatGroup/Update',
  filter = '/FormatGroup/GetFilter',
  delete = '/FormatGroup/Delete',
  deleteMany = '/FormatGroup/DeleteMany',
}
export enum FormatRouter {
  create = '/Format/Create',
  filter = '/Format/GetFilter',
  filterByGroupID = '/Format/FilterByGroupID',
  delete = '/Format/Delete',
  deleteMany = '/Format/DeleteMany',
  update = '/Format/Update',
  GetAll = '/FormatGroup/GetALL',
  GetFomatAll = '/Format/GetALL',
}
export enum FormatSpecificVersionRouter {
  create = '/FormatSpecificVersion/Create',
  FilterByFomatID = '/FormatSpecificVersion/FilterByFomatID',
  update = '/FormatSpecificVersion/Update',
  updateObj = '/FormatSpecificVersion/UpdateObj',
}
export enum PurposesRouter {
  create = '/Purposes/Create',
  Update = '/Purposes/Update',
  filter = '/Purposes/GetFilter',
  GetALL = '/Purposes/GetALL',
}
export enum ToolsRouter {
  create = '/Tool/Create',
  Update = '/Tool/Update',
  filter = '/Tool/GetFilter',
  GetALL = '/Tool/GetALL',
}
export enum ScriptTypeRouter {
  create = '/ScriptType/Create',
  Update = '/ScriptType/Update',
  filter = '/ScriptType/GetFilter',
  delete = '/ScriptType/Delete',
  deleteMany = '/ScriptType/DeleteMany',
  GetALL = '/ScriptType/GetALL',
}
export enum ModeRouter {
  create = '/Mode/Create',
  Update = '/Mode/Update',
  filter = '/Mode/GetFilter',
  delete = '/Mode/Delete',
  deleteMany = '/Mode/DeleteMany',
  GetALL = '/Mode/GetALL',
  checkNameExist = '/Mode/CheckNameExist?name=',
}
export enum CommandRouter {
  create = '/Command/Add',
  filter = '/Command/Filter',
  filterByGroupID = '/Command/FilterByGroupID',
  delete = '/Command/Delete',
  deleteMany = '/Command/DeleteMany',
  update = '/Command/Update',
  GetAll = '/Command/GetALL',
  updateStatus = '/Command/UpdateStatus',
  GetByToolId = '/Command/GetByToolId',
}
export enum rulesRouter {
  create = '/Rules/Add',
  Update = '/Rules/Update',
  filter = '/Rules/Filter',
  GetALL = '/Rules/GetALL',
  UpdateStatus = '/Rules/UpdateStatus',
}
export enum AIPFileError {
  filter = '/AIPFileError/GetFilter',
  delete = '/AIPFileError/Delete',
  deleteMany = '/AIPFileError/DeleteMany',
  restoreFile = '/AIPFileError/RestoreFile',
  signatureReNewal = '/AIPFileError/SignatureReNewal',
}
export enum AIPDashBoard {
  GetDashboard = '/Dashboard/GetDashboard',
  GetStatisticsNumberpackets = '/Dashboard/GetStatisticsNumberpackets?period=',
  GetStatisticsNumberpacketsError = '/Dashboard/GetStatisticsNumberpacketsError?period=',
}
export enum transferRouter {
  getAll = '/Transfer/GetAll',
  getByStatus = '/Transfer/GetByStatus',
  getFilter = '/Transfer/GetFilter',
  getById = '/Transfer/GetById?id=',
  delete = '/Transfer/Delete',
  deleteMany = '/Transfer/DeleteMany',
  create = '/Transfer/Create',
  update = '/Transfer/Update',
  updateMany = '/Transfer/UpdateMany',
  updateDeleteFile = '/Transfer/UpdateDeleteFile',
  downloadFile = '/Transfer/DownLoadFile?transperId=',
  checkExist = '/Transfer/CheckExist',
}

export enum transferFileRouter {
  create = '/TransferFile/Create',
  downloadVerify = '/TransferFile/DownloadTransferVerify?id=',
}

export enum transferMetaDataRouter {
  getFilter = '/TransferMetaData/GetFilter',
  downloadTransferMetadata = '/TransferMetaData/DownloadTransferMetadata?transferid=',
  delete = '/TransferMetaData/Delete',
  update = '/TransferMetaData/Update',
  create = '/TransferMetaData/Create',
  addMetadataByTransfer = '/TransferMetaData/AddMetadataByTransfer',
}

export enum sipRouter {
  getAll = '/Sip/GetAll',
  getByStatus = '/Sip/GetByStatus',
  getFilter = '/Sip/GetFilter',
  getById = '/Sip/GetById?id=',
  delete = '/Sip/Delete',
  deleteMany = '/Sip/DeleteMany',
  update = '/Sip/Update',
  create = '/Sip/Create',
  downloadFileSip = '/Sip/DownLoadFile?sipId=',
  updateDeleteFile = '/Sip/UpdateDeleteFile',
}

export enum sipFileRouter {
  create = '/SipFile/Create',
  downloadVerify = '/SipFile/DownloadSipVerify?id=',
  downloadFileSip = 'downloadFileSip',
}

export enum sipMetaDataRouter {
  getFilter = '/SipMetaData/GetFilter',
  downloadSipMetadata = '/SipMetaData/DownloadSipMetadata?sipid=',
  delete = '/SipMetaData/Delete',
  update = '/SipMetaData/Update',
  create = '/SipMetaData/Create',
}

export enum backlogRouter {
  getAll = '/Backlog/GetAll',
  getByStatus = '/Backlog/GetByStatus',
  getFilter = '/Backlog/GetFilter',
  getById = '/Backlog/GetById?id=',
  delete = '/Backlog/Delete',
  deleteMany = '/Backlog/DeleteMany',
  createOrUpdate = '/Backlog/CreateOrUpdate',
  storeSip = '/Backlog/StoreSip',
  downloadFile = '/Backlog/DownloadFile',
  deleteBySipId = '/Backlog/DeleteBySipId'
}

export enum JobRouter {
  getAll = '/Job/GetAll',
  getFilter = '/Job/GetFilter',
  getById = '/Job/GetById?id=',
  getByFile = '/Job/GetByFile',
  getByUuid = '/Job/GetByUuid',
  downloadJobFile = '/Job/DownloadJobFile',
}

export enum JobTypeRouter {
  getAll = '/JobType/GetAll',
}

export enum fieldRouter {
  getAll = '/Field/GetAll',
  getFilter = '/Field/GetFilter',
  checkExistCode = '/Field/CheckCodeExits?code=',
  getById = '/Field/GetById?id=',
  delete = '/Field/Delete?id=',
  deletemany = '/Field/DeleteMany',
  create = '/Field/Create',
  update = '/Field/Update',
  checkExistName = '/Field/CheckNameExist?name=',
}
export enum certificateRouter {
  GetFilter = '/Certificate/GetFilter',
  GetAll = '/Certificate/GetAll',
  Create = '/Certificate/Create',
  Update = '/Certificate/Update',
  Delete = '/Certificate/Delete',
  DeleteMany = '/Certificate/DeleteMany',
  GetCerBytoken = '/api/v1/certs?certStatus=all',
  GetCerBytokenById = '/api/v1/cert/',
  VerifyCerBase64 = '/verification/api/certificate/base64',
}
export enum fieldGroupRouter {
  getAll = '/FieldGroup/GetAll',
  getFilter = '/FieldGroup/GetFilter',
  checkExits = '/FieldGroup/CheckCodeExits?code=',
  getDetail = '/FieldGroup/GetDetail',
  getById = '/FieldGroup/GetById?id=',
  getByCode = '/FieldGroup/GetByCode?code=',
  delete = '/FieldGroup/Delete',
  deletemany = '/FieldGroup/DeleteMany',
  create = '/FieldGroup/Create',
  update = '/FieldGroup/Update',
  getAllDetail = '/FieldGroup/GetAllDetail?',
  updateLockedOut = '/FieldGroup/UpdateLockedOut'
}
export enum SignatureTempalte {
  filter = '/SignatureTemplate/GetFilter',
  getAll = '/SignatureTemplate/GetAll',
  create = '/SignatureTemplate/Create',
  update = '/SignatureTemplate/Update',
  delete = '/SignatureTemplate/Delete',
  deleteMany = '/SignatureTemplate/DeleteMany',
  restoreFile = '/SignatureTemplate/RestoreFile',
  signatureReNewal = '/SignatureTemplate/SignatureReNewal',
}
export enum ConfigSignatureRouter {
  getConfig = '/ConfigurationSignature/GetConfigurationSignature',
  Create = '/ConfigurationSignature/Create',
  Update = '/ConfigurationSignature/Update',
  delete = '/ConfigurationSignature/Delete',
  GetCoordinates = '/ConfigurationSignature/GetCoordinates',

}
export enum VerifySignatureRouter {
  verifyPDF = '/VerifyDocument/VerifyPDF',
  verifyXML = '/VerifyDocument/VerifyXML',
  verifyCER = '/VerifyDocument/VerifyCertificateFile',
  veryfyBinary = '/VerifyDocument/VerifyBinary',
}
export enum VerifySignatureADSSRouter {
  verifyPDF = '/VerifyADSS/VerifyPDF',
  verifyXML = '/VerifyADSS/VerifyXML',
  veryfyCMS = '/VerifyADSS/VerifyCMS',
  verifyOffice = '/VerifyADSS/VerifyOffice',
  verifyHash = '/VerifyADSS/VerifyHash',
  VerifyHashByPath = '/VerifyADSS/VerifyHashByPath',
}
export enum signingDocumentRouter {
  sigPdfUSB = '/api/v1/sign/pdf/usb',
  sigXMLUSB = '/api/v1/sign/xml/usb',
  sigBinaryUSB = '/api/v1/sign/binary/usb',
  sigOfficeUSB = '/api/v1/sign/office/usb',
  sigHSM = '/SigningDocument/SignHSMPDF',
  sigPdfRemoteSigning = '/SigADSS/SignDisplay',
}
export enum signingDocumentADSSRouter {
  sigPdf = '/SigADSS/SignPDF',
  sigXML = '/SigADSS/SignXML',
  sigCMS = '/SigADSS/SignCMS',
  sigOffice = '/SigADSS/SignOffice',
  sigHash = '/SigADSS/SignHash',
  sigHashByPath = '/SigADSS/SignHashByPath',
}

export enum aipRouter {
  getAll = '/Aip/GetAll',
  getByStatus = '/Aip/GetByStatus',
  getFilter = '/Aip/GetFilter',
  getById = '/Aip/GetById?id=',
  getInaccessibleAip = '/Aip/getInaccessibleAip',
  delete = '/Aip/Delete',
  deleteMany = '/Aip/DeleteMany',
  update = '/Aip/Update',
  create = '/Aip/Create',
  changeStatus = '/Aip/ChangeStatus',
  downloadFileAip = '/Aip/DownLoadFile?aipId=',
  updateDeleteFile = '/Aip/UpdateDeleteFile',
}

export enum aipFileRouter {
  downLoadFile = '/AipFile/DownLoadFile',
  downloadVerify = '/AipFile/DownloadAipVerify?id=',
}

export enum aipMetaDataRouter {
  getFilter = '/AipMetaData/GetFilter',
  delete = '/AipMetaData/Delete',
  update = '/AipMetaData/Update',
  create = '/AipMetaData/Create',
  downloadAipMetadata = '/AipMetaData/DownloadAipMetadata?aipid=',
}

export enum dipRouter {
  getAll = '/Dip/GetAll',
  getByStatus = '/Dip/GetByStatus',
  getFilter = '/Dip/GetFilter',
  GetFilterES = '/Dip/GetFilterES',
  getById = '/Dip/GetById?id=',
  delete = '/Dip/Delete',
  deleteMany = '/Dip/DeleteMany',
  update = '/Dip/Update',
  create = '/Dip/Create',
  downloadFileDip = '/Dip/DownLoadFile?dipId=',
  updateDeleteFile = '/Dip/UpdateDeleteFile',
}

export enum dipFileRouter {
  downLoadFile = '/DipFile/DownLoadFile',
  downloadVerify = '/DipFile/DownloadDipVerify?id=',
}

export enum dipMetaDataRouter {
  getFilter = '/DipMetaData/GetFilter',
  delete = '/DipMetaData/Delete',
  update = '/DipMetaData/Update',
  create = '/DipMetaData/Create',
  downloadDipMetadata = '/DipMetaData/DownloadDipMetadata?dipid=',
}

export enum fileRouter {
  downLoad = '/File/Download',
  upload = '/File/Upload',
}
export enum OCRRouter {
  OCRFullText = '/ProcessOCR/OCRFullText',
  OCRPDFPages = '/ProcessOCR/OCRPDFPages',
  GetFilterOCRFile = '/ProcessOCR/GetFilterOCRFile',
  OCRFromBase64 = '/ProcessOCR/OCRFromBase64',
  DownloadFileByPath = '/ProcessOCR/DownloadFileByPath',
  Delete = '/ProcessOCR/Delete',
  DeleteMany = '/ProcessOCR/DeleteMany',
  CreateFile = '/ProcessOCR/CreateFile',
  SaveData = '/ProcessOCR/SaveData',
}
export enum TemplateOCRRouter {
  getAll = '/TemplateOCR/GetAll',
  getAllTemplateFile = '/TemplateOCR/GetAllTemplateFile',
  getFilter = '/TemplateOCR/getFilter',
  getById = '/TemplateOCR/getById',
  create = '/TemplateOCR/create',
  update = '/TemplateOCR/update',
  delete = '/TemplateOCR/delete?id=',
  deleteMany = '/TemplateOCR/deleteMany',
}
export enum versionRouter {
  getByFile = '/Version/GetByFile',
}
export enum preIngestRouter {
  getAll = '/preIngest/GetAll',
  getFilter = '/preIngest/GetFilter',
  delete = '/preIngest/Delete',
  deleteMany = '/preIngest/DeleteMany',
  create = '/preIngest/Create',
  update = '/preIngest/Update',
}
export enum armRecordRouter {
  controller = 'ArmRecord',
  getAll = '/ArmRecord/GetAll',
  getFilter = '/ArmRecord/Filter',
  createRecord = '/CreateRecord',
  deleteRecord = '/DeleteRecord?RecordId=',
  getById = '/GetById?id=',
  getArmRecordByFormat = '/ArmRecord/GetArmRecordByFormat'
}
export enum armDocumentRouter {
  getByRecordId = '/ArmDocument/GetByRecordId?recordId=',
  controller = 'ArmDocument',
  DeleteDoc = '/DeleteDocInRecord?DocId=',
  DeleteManyDoc = '/DeleteManyDoc',
  GetDetailDoc = '/GetDetailDoc?Id=',
  GetDocsInRecord = '/GetAllByRecordId?recordId=',
  Create = '/CreateDocumnent'
}

export enum systemLogConfigRouter {
  getFilter = '/SystemLogConfig/GetFilter',
  update = '/SystemLogConfig/Update',
}

export enum fondRouter {
  controller = 'Fond',
  getAll = '/Fond/GetAll',
  getFilter = '/Fond/Filter',
  createRecord = '/CreateRecord',
  deleteRecord = '/DeleteRecord?RecordId=',
  getById = '/Fond/GetById?id=',
}
export enum recordCollectionRouter {
  controller = '/RecordCollection',
  getAll = '/Fond/GetAll',
  getFilter = '/Fond/Filter',
  getRecordCollectionByFond = '/GetRecordCollectionByFond?fondId=',
  getById = '/GetById?id=',
}

export enum imporRecordtDataRouter {
  getFilter = '/ImportData/FilterReCord',
  delete = '/ImportData/DeleteRecord',
  deleteMany = '/ImportData/DeleteManyRecords',
  createRecordByTemporaryRecord = '/ImportData/CreateRecordByTemporaryRecord',
  saveAllRecord = '/ImportData/SaveAllRecord',
}

export enum imporDocumentDataRouter {
  getFilter = '/ImportData/FilterDoc',
  delete = '/ImportData/DeleteDocument',
  deleteMany = '/ImportData/DeleteManyDocuments',
  createRecordByTemporaryDocument = '/ImportData/CreateRecordByTemporaryDoc',
  saveAllDocument = '/ImportData/SaveAllDocument',
}

