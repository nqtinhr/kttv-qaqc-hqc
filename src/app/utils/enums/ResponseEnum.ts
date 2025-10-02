export class ResponseEnum {
  public static readonly ExperiedToken = -1;
  public static readonly UserNotFound = -2;
  public static readonly UserLocked = -3;
  public static readonly UserNotEnable = -4;
  public static readonly UserNoRole = -5;
  public static readonly SUCCESS_CODE = 1;
  public static readonly NOTDEL_CASE_1_CODE = 1002;
  public static readonly NOTDEL_CASE_2_CODE = 1003;
  public static readonly DUPPLICATE_CODE = 1006;
  public static readonly DUPPLICATE_NAME = 1007;
  public static readonly DUPPLICATE_CERT_CODE = 1014;
  public static readonly DUPPLICATE_NAME_IN_GROUP = 1015;
  public static readonly DUPPLICATE_CODE_IN_GROUP = 1016;
  public static readonly DUPPLICATE_VALUE = 1017;
  public static readonly DUPPLICATE_VERSION = 1018;
  public static readonly DUPPLICATE_PRONOM_ID = 1019;

}

export enum StatusRecord {
  ACTIVE = 1,
  INACTIVE = 0,
  DELETED = -1,
}
