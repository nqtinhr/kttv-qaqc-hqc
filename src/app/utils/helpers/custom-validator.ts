import { Utility } from './../utility';
import { Injectable } from "@angular/core";
import {
  AbstractControl,
  AsyncValidatorFn,
  FormControl,
  ValidationErrors,
  ValidatorFn,
} from "@angular/forms";
import { Observable, timer } from "rxjs";
import { map, switchMap } from "rxjs/operators";
// import { HttpService } from "~/app/services/common/http.service";
import { Const } from "~/app/utils/consts/const";
import { environment } from "~/environments/environment";
import { ObjectValidate } from "~/app/model/ObjectValidate";
@Injectable({
  providedIn: "root",
})
export class CustomValidator {
  constructor() {}

  /**
   * Trim khoảng trắng đầu cuối
   * @param control
   * @returns
   */
  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || "").trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { required: true };
  }

  /**
   * Kiểm tra duplicate dữ liệu
   * @param model
   * @returns
   */
  public duplicate(model: ObjectValidate): AsyncValidatorFn | null {
    return (control: AbstractControl): any => {
      var obj = {
        ...model,
        CustomData: { ...model.CustomData, Data: control.value },
      };
      // return timer(500).pipe(
      //   switchMap(() =>
      //     this.httpSV
      //       .DoPost(
      //         environment.APP_API_URL + `/Base/DuplicateFieldValidate`,
      //         obj
      //       )
      //       .pipe(
      //         map((result: any) =>
      //           result && result.Status === Const.SUCCESS_CODE && result.Data
      //             ? { duplicated: true }
      //             : { duplicated: false}
      //         )
      //       )
      //   )
      // );
    };
  }
  dateLessThan(dateField1: string, dateField2: string, validatorField: { [key: string]: boolean }): ValidatorFn {
    return (c: AbstractControl): { [key: string]: boolean } | null => {
        const date1 = c.get(dateField1)?.value;
        const date2 = c.get(dateField2)?.value;
        if ((date1 !== null && date2 !== null) && date1 >= date2) {
            return validatorField;
        }
        return null;
    };
}

  MisMatchValidator(source: string, target: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const sourceCtrl = control.get(source);
    const targetCtrl = control.get(target);
    if (sourceCtrl && targetCtrl && sourceCtrl.value != targetCtrl.value) {
        return { mismatch: true }
      }
    return null;
  };
}
isNullOrEmpty(str: any): boolean {
  return str === '' || str === undefined || str === null || str === 'undefined' || str === 'null';
}
MatchValidator(source: string, target: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const sourceCtrl = control.get(source);
    const targetCtrl = control.get(target);
    if (sourceCtrl?.value == targetCtrl?.value && !this.isNullOrEmpty(sourceCtrl?.value) && !this.isNullOrEmpty(targetCtrl?.value)) {
        return { match: true }
      }
    return null;
  };
}
}

