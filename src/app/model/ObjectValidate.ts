export interface ObjectValidate {
  FieldName: string; //Tên trường check - dùng để map với file json đọc store tương ứng
  TableName: string; //Tên bảng check - dùng để map với file json đọc store tương ứng
  CustomData: any; //Dữ liệu truyền vào để check
}
