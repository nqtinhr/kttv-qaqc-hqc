import { CustomValidator } from '~/app/utils/helpers/custom-validator';

import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { ViewModalComponent } from '../..';
import { UserService } from '~/app/services/system/user.service';
import { NotifierType } from '~/app/utils/consts/const';
import { ResponseEnum } from '~/app/utils/enums/ResponseEnum';
import { TranslateService } from '@ngx-translate/core';
import * as $ from 'jquery';
import { LoadingService } from '~/app/services/loading/loading.service';
import { from, Subscription } from 'rxjs';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  @Input() isCurrentUser: boolean = false;
  @Input() isAdmin: boolean = false;
  @Output() onSaveModal: EventEmitter<any> = new EventEmitter();
  @ViewChild('modal') public modal: ViewModalComponent;
  userId: number;
  form: FormGroup;
  subscription: Subscription;
  isShowingPassword = {
    PasswordOld: false,
    PasswordNew: false,
    PasswordConfirm: false,
  };
  constructor(
    private customValidator: CustomValidator,
    private formBulder: FormBuilder,
    private notifier: NotifierService,
    private userService: UserService,
    public translate: TranslateService,
    private loadingSrv: LoadingService
  ) {}

  ngOnInit(): void {
    this.ininForm();
    //this.setValidator();
  }

  ininForm(): void {
    this.form = this.formBulder.group(
      {
        PasswordOld: [
          null,
          Validators.compose([Validators.required, Validators.maxLength(12)]),
        ],
        PasswordNew: [
          null,
          Validators.compose([
            Validators.required,
            Validators.pattern(
              '[^ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽếềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳýỵỷỹ ]+'
            ),
            Validators.minLength(6),
            Validators.maxLength(12),
          ]),
        ],
        PasswordConfirm: [null, Validators.compose([Validators.required])],
      },
      {
        validator: Validators.compose([
          this.customValidator.MatchValidator('PasswordOld', 'PasswordNew'),
          this.customValidator.MisMatchValidator(
            'PasswordNew',
            'PasswordConfirm'
          ),
        ]),
      }
    );
  }

  setValidator(): void {
    this.subscription = this.form.controls.PasswordNew.valueChanges.subscribe(
      (value) => {
        if (this.form.get('PasswordOld')?.value == value) {
          this.form.get('PasswordNew')?.setErrors({ matchOldValue: true });
        }
      }
    );

    const subscription =
      this.form.controls.PasswordConfirm.valueChanges.subscribe((value) => {
        if (this.form.get('PasswordNew')?.value != value) {
          this.form.get('PasswordConfirm')?.setErrors({ valueNotMatch: true });
        }
      });
    this.subscription.add(subscription);
  }

  resetForm(): void {
    this.form.reset();
    this.isShowingPassword = {
      PasswordOld: false,
      PasswordNew: false,
      PasswordConfirm: false,
    };
  }

  save(event: any): void {
    if (!this.isCurrentUser) {
      this.form.controls.PasswordOld.clearValidators();
      this.form.controls.PasswordOld.updateValueAndValidity();
    }
    this.form.markAsDirty();
    this.form.markAllAsTouched();
    if (this.form.invalid) return;

    let model = {
      UserId: this.userId,
      ...this.form.value,
    };
    this.loadingSrv.setDisplay(true);
    if (this.isCurrentUser) {
      this.userService.changeCurrentUserPassword(model).subscribe(
        (res) => {
          this.loadingSrv.setDisplay(false);
          if (res && res.Status === ResponseEnum.SUCCESS_CODE) {
            this.notifier.notify(
              NotifierType.Success,
              this.translate.instant('CHANGE_PASSWORD_SUSSCESS')
            );
            if (res.Data && res.Data.isCurrentUser) {
              this.close(true);
              window.localStorage.clear();
              location.href = '/';
            } else {
              this.close(true);
            }

            this.onSaveModal.emit(true);
          } else {
            if (res.Data && res.Data.isCorrectOldPassword == 2) {
              this.notifier.notify(
                NotifierType.Error,
                this.translate.instant('OLD_PASSWORD_IS_INCORRECT')
              );
            } else this.notifier.notify(NotifierType.Success, res.Message);
          }
        },
        (err) => {
          this.loadingSrv.setDisplay(false);
        }
      );
    } else {
      this.userService.changePassword(model).subscribe(
        (res) => {
          this.loadingSrv.setDisplay(false);
          if (res && res.Status === ResponseEnum.SUCCESS_CODE) {
            this.notifier.notify(
              NotifierType.Success,
              this.translate.instant('CHANGE_PASSWORD_SUSSCESS')
            );
            if (res.Data && res.Data.isCurrentUser) {
              this.close(true);
              window.localStorage.clear();
              location.href = '/';
            } else {
              this.close(true);
            }

            this.onSaveModal.emit(true);
          } else {
            if (res.Data && res.Data.isCorrectOldPassword == 2) {
              this.notifier.notify(
                NotifierType.Error,
                this.translate.instant('OLD_PASSWORD_IS_INCORRECT')
              );
            } else this.notifier.notify(NotifierType.Success, res.Message);
          }
        },
        (err) => {
          this.loadingSrv.setDisplay(false);
        }
      );
    }
  }

  openDialog(userId: number): void {
    this.userId = userId;
    var modalTitle = this.translate.instant('CHANGEPASWORD');
    this.modal.openDialog(modalTitle);
    setTimeout(() => {
      $('bs-modal-backdrop').remove();
    }, 200);
  }

  close(event: any): void {
    this.resetForm();
    this.modal.largeModal.hide();
  }
  showPassword(isShowingPassword, formControl) {
    isShowingPassword[formControl] = !isShowingPassword[formControl];
  }
  passwordOld = 'password';
  passwordNew = 'password';
  passwordConfirm = 'password';

  show = false;

  onClick() {
    if (this.passwordOld === 'password') {
      this.passwordOld = 'text';
      this.show = true;
    } else {
      this.passwordOld = 'password';
      this.show = false;
    }
  }
  onClickNew() {
    if (this.passwordNew === 'password') {
      this.passwordNew = 'text';
      this.show = true;
    } else {
      this.passwordNew = 'password';
      this.show = false;
    }
  }
  onClickConfirm() {
    if (this.passwordConfirm === 'password') {
      this.passwordConfirm = 'text';
      this.show = true;
    } else {
      this.passwordConfirm = 'password';
      this.show = false;
    }
  }
}
