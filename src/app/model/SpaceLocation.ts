export class SpaceLocationModel {
  Id: number;
  Uuid: string;
  SpaceId: number;
  SpaceName: string;
  PipelineName: string
  Name: string;
  RelativePath: string;
  LocationtypeId: number;
  ShareTypeId: number;
  SharePipelineIds: string;
  Used: boolean;
  Enabled: number;
  Order?: number;
  SpacePath: string;
}
export class SpaceLocationFilter {
  TextSearch: string;
  PageSize: number;
  PageNumber: number;
  ColumnOrderBy?: string;
  TypeOrderBy?: string;
  IsGetCache?: boolean;
  SpaceId: number;
  PipelineId: number;

  constructor(
    textSearch: string, pageSize: number, pageNumber: number = 0,
    columnOrderBy?: string, typeOrderBy?: string, isGetCache?: boolean, spaceSearchId: number = 0, pipelineSearchId : number = 0,) {

    this.TextSearch = textSearch;
    this.PageSize = pageSize;
    this.PageNumber = pageNumber;
    this.ColumnOrderBy = columnOrderBy;
    this.TypeOrderBy = typeOrderBy;
    this.IsGetCache = isGetCache;
    this.SpaceId = spaceSearchId;
    this.PipelineId = pipelineSearchId;
  }
}

