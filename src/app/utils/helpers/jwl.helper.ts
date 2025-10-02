export class JwtHelper {
  constructor() { }

  public static decodeToken(token: string = '') {
    const decoded = this.b64DecodeUnicode(token);
    return JSON.parse(decoded);
  }

  public static b64DecodeUnicode(str: any) {
    // Going backwards: from bytestream, to percent-encoding, to original string.
    return decodeURIComponent(atob(str).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  }
}
