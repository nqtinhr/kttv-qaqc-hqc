export class Response<T>{
    Data:T;
    PageSize:number=10;
    PageNumber:number=1;
    Status:number;
    Message:string;
    TotalCount:number;
    DataCount:number;
    TotalPage:number;
}