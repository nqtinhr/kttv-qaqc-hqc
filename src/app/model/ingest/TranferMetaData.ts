export class TransferMetaDataModel {
  Id: number;
  TranferId: number;
  FieldId: string;
  Value: string;
}
export class TransferMetaDataFilter {
  TextSearch: string;
  PageSize: number;
  PageNumber: number;
  ColumnOrderBy?: string;
  TypeOrderBy?: string;
  FileId?: number;
  GroupCode?: string;
  IsMetaContent?: boolean;

  constructor(
    textSearch: string, pageSize: number, pageNumber: number,
    columnOrderBy?: string, typeOrderBy?: string, fileId?: number, groupCode?: string, isMetadataContent?: boolean) {

    this.TextSearch = textSearch;
    this.PageSize = pageSize;
    this.PageNumber = pageNumber;
    this.ColumnOrderBy = columnOrderBy;
    this.TypeOrderBy = typeOrderBy;
    this.FileId = fileId;
    this.GroupCode = groupCode;
    this.IsMetaContent = isMetadataContent;
  }
}

