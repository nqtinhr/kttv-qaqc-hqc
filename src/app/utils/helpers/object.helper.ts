export class ObjectHelper {
  constructor() { }

  public static isEmpty(obj) {
    if(!obj) return true
    return Object.keys(obj).length === 0;
  }
}
