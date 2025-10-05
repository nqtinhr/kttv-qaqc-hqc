import { Injectable } from "@angular/core";
import { AppConfigs } from "~/app/app.config";
import { JwtHelper } from "~/app/utils/helpers/jwl.helper";

@Injectable({
  providedIn: "root",
})
export class AuthorizeService {
  permissions: Array<any>;
  constructor() {}

  hasPermission(roleCode: string, rightCode: string): boolean {
    if (this.permissions && this.permissions.length > 0) {
      const permissions = this.permissions.find((o) => o.RoleCode === roleCode);
      if (!permissions) return false;
      if (permissions.RightCodes.includes(rightCode)) return true;
    }
    return false;
  }

  initializePermissions(): void {
    const token = window.localStorage.getItem(AppConfigs.InfoToken);
    if (token && token.length > 0) {
      const decode = JwtHelper.decodeToken(token);
      if (decode && decode.Permissions && decode.Permissions.length > 0) {
        this.permissions = decode.Permissions;
      }
    }
  }
}
