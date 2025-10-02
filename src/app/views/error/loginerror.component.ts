import { ResponseEnum } from './../../utils/enums/ResponseEnum';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenService } from 'src/app/services/common/authen.service';

@Component({
  templateUrl: 'loginerror.component.html',
})
export class LoginErrorComponent {
  public loginUrl = '/authenticate';
  public errorMes = '';

  constructor(private route: ActivatedRoute, private authenService: AuthenService) {
    this.route.queryParams.subscribe((params) => {
      if (params.id == ResponseEnum.ExperiedToken) {
        this.errorMes = 'Phiên đăng nhập của bạn đã hết hạn.';
      }
      if (params.id == ResponseEnum.UserNotFound) {
        this.errorMes = 'Không tìm thấy thông tin của bạn trong hệ thống.';
      }
      if (params.id == ResponseEnum.UserLocked) {
        this.errorMes = 'Tài khoản đang bị khóa.';
      }
      if (params.id == ResponseEnum.UserNotEnable) {
        this.errorMes =
          'Tài khoản không hoạt động.Vui lòng liên hệ quản trị viên để được xử lý';
      }
      if (params.id == ResponseEnum.UserNoRole) {
        this.errorMes = 'Bạn chưa được cấp quyền trên hệ thống.';
      }
    });
  }

  public relogin(){
    this.authenService.doLogout();
  }
}
