/*******************************************************************************
 * Project：Kho45
 * Summary:
 * 　　Shared methods
 * History：
 *      ANBD 2022/07/11  Create
 ******************************************************************************//*
*/
import { Injectable, NgZone } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import PerfectScrollbar from 'perfect-scrollbar';
import { NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import * as fs from 'file-saver';
import { NotifierService } from 'angular-notifier';
import { NotifierType } from './consts/const';
@Injectable({
    providedIn: 'root'
})
export class Utility {
    sysDate: Date;
    constructor(
        private translate: TranslateService,
        private ngZone: NgZone,
        public router: Router,
        private notifier: NotifierService,

    ) {
    }
    DownloadFile(file: any){
        fs.saveAs(file, file.name);
    }
    ConvertFileToBase64(file: any) {
        const reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onload = (event: any) => {
            return this._arrayBufferToBase64(event.target.result);
        };
    }
    _arrayBufferToBase64(buffer: Iterable<number>) {
        let binary = '';
        const bytes = new Uint8Array(buffer);
        const len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
    }
    ConvertFileFromBase64(type: string, fileName: string, base64: any, isText = false) {
        if(isText){
            return new File([base64], fileName, { type: type });
        }
        const imageBlob = this.dataURItoBlob(base64, type);
        return new File([imageBlob], fileName, { type: type });
    }
    dataURItoBlob(dataURI: any, type: string) {
        const byteString = window.atob(dataURI);
        const arrayBuffer = new ArrayBuffer(byteString.length);
        const int8Array = new Uint8Array(arrayBuffer);
        for (let i = 0; i < byteString.length; i++) {
            int8Array[i] = byteString.charCodeAt(i);
        }
        const blob = new Blob([int8Array], { type: type });
        return blob;
    }
    SetMessErrorSignature(code: number) {
        if(this.isNullOrEmpty(code)){
          this.notifier.notify(
            NotifierType.Error,
            this.translate.instant('SIGNING_FAIL')
          );
        }
        switch (code) {
          case 500:
            this.notifier.notify(
              NotifierType.Error,
              this.translate.instant('Internal server error')
            );
            break;
          case 21001:
            this.notifier.notify(
              NotifierType.Error,
              this.translate.instant('Certificate_expired')
            );
            break;
          case 21002:
            this.notifier.notify(
              NotifierType.Error,
              this.translate.instant('Certificate_revoked')
            );
            break;
          case 21003:
            this.notifier.notify(
              NotifierType.Error,
              this.translate.instant('Certificate_failed_to_check_with_CRL')
            );
            break;
          case 21004:
            this.notifier.notify(
              NotifierType.Error,
              this.translate.instant('Certificate_failed_to_check_with_OCSP')
            );
            break;
          case 31001:
            this.notifier.notify(
              NotifierType.Error,
              this.translate.instant('Hash_data_is_required')
            );
            break;
          case 32001:
            this.notifier.notify(
              NotifierType.Error,
              this.translate.instant('Message_data_is_required')
            );
            break;
          case 32002:
            this.notifier.notify(
              NotifierType.Error,
              this.translate.instant('Failed_to_sign_message')
            );
            break;
          case 34001:
            this.notifier.notify(
              NotifierType.Error,
              this.translate.instant('Detect_string_not_found')
            );
            break;
          case 34002:
            this.notifier.notify(
              NotifierType.Error,
              this.translate.instant('Failed_to_read_file_to_sign')
            );
            break;
          case 34003:
            this.notifier.notify(
              NotifierType.Error,
              this.translate.instant('Failed_to_detect_string')
            );
            break;
          case 34004:
            this.notifier.notify(
              NotifierType.Error,
              this.translate.instant('Image_is_required')
            );
            break;
          case 34005:
            this.notifier.notify(
              NotifierType.Error,
              this.translate.instant('Detail_info_is_required')
            );
            break;
          case 34006:
            this.notifier.notify(
              NotifierType.Error,
              this.translate.instant('Signature_postions_invalid')
            );
            break;
          case 34007:
            this.notifier.notify(
              NotifierType.Error,
              this.translate.instant('Page_number_invalid')
            );
            break;
          case 34008:
            this.notifier.notify(
              NotifierType.Error,
              this.translate.instant('Failed_to_get_timestamp_token')
            );
            break;
        }
      }
    unicodeToChar(text: string) {
        return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        .replace(/[đĐ]/g, m => m === 'đ' ? 'd' : 'D')
    }
    numberOnly(event): boolean {
        const charCode = +event.key;
        if (event.key === 'Backspace' || event.key === 'Delete') {
            return true;
        }
        if (!isNaN(charCode)) {
            if (charCode >= 0 || charCode <= 9) {
                return true;
            }
        }
        return false;
    }
    RandomNumber(){
        return Math.floor(Math.random() * 10)
    }
    // add empty row
    rowEmpty(a: any, b: any) {
        if (this.isNullOrEmpty(b)) {
            b = 0;
        }
        if (a < b) {
            return new Array(0);
        } else {
            return new Array(a - b);
        }
    }
    // replaceHTML
    replaceHtml(str: string) {
        if ((str === null) || (str === '')) {
            return false;
        }
        else {
            str = str.toString();
        }
        return str.replace(/<[^>]*>/g, '');
    }
    // check is null or empty
    isNullOrEmpty(str: any): boolean {
        return str === '' || str === undefined || str === null || str === 'undefined' || str === 'null';
    }
    convertStrToInt(value) {
        if (!this.isNullOrEmpty(value)) {
            value = value.trim().replace(/,/g, '');
            return parseInt(value, 0);
        }
        return value;
    }
    // check is null
    isNull(str: any): boolean {
        return str === undefined || str === null || str === 'undefined' || str === 'null';
    }
    // check is null or empty
    isNullOrBlank(val: any): boolean {
        const str = this.isNullOrEmpty(val) ? '' : val.toString().trim();
        return this.isNullOrEmpty(str);
    }
    /**
     * (@param o ) : an object value = true or false
     * return: true if (JSON.stringify(o) === 'true'); false if other
     */
    objectToBoolean(o: any) {
        return (/true/i).test(JSON.stringify(o));
    }

    // Check input string is HighSurrogate pairs
    isHighSurrogate(inputString: string): boolean {
        const highSurrogate: RegExp = /[\uD800-\uDBFF]/g;
        return highSurrogate.test(inputString);
    }

    // Check input string is LowSurrogate pairs
    isLowSurrogate(inputString: string): boolean {
        const lowSurrogate: RegExp = /[\uDC00-\uDFFF]/g;
        return lowSurrogate.test(inputString);
    }

    // Check browser used is IE
    isIEBrowser(): boolean {
        const ua: string = window.navigator.userAgent;
        const trident: number = ua.indexOf('Trident/');
        if (trident > 0) {
            return true;
        } else {
            return false;
        }
    }

    // Check input string is number
    isNumber(inputString: string): boolean {
        const numberRegExp: RegExp = new RegExp('^[0-9]*$');
        return numberRegExp.test(inputString);
    }

    // Check input string is alphanumeric
    isAlphaNumeric(inputString: string): boolean {
        const alphaNumericRegExp: RegExp = new RegExp('^[0-9A-Za-z]*$');
        return alphaNumericRegExp.test(inputString);
    }

    toHalfWidth(inputString: string): string {
        return inputString.replace(/[Ａ-Ｚａ-ｚ０-９]/g, (s) => {
            return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
        });
    }

    toFullWidth(inputString: string): string {
        return inputString.replace(/[A-Za-z0-9]/g, (s) => {
            return String.fromCharCode(s.charCodeAt(0) + 0xFEE0);
        });
    }

    /**
     * parse sessionStorage.authorizationData
     */
    formatDate(date: any, format: string, isType = true) {
        if (this.isNullOrBlank(date)) {
            return '';
        }
        const d = new Date(date);
        let month = isType ? '' + (d.getMonth() + 1) : date.month;
        let day = isType ? '' + d.getDate() : date.day;
        const year = isType ? d.getFullYear() : date.year;
        if (Number(month) < 10) {
            month = '0' + month;
        }
        if (Number(day) < 10) {
            day = '0' + day;
        }
        return [year, month, day].join(format);
    }
    formatDateNoYear(date: any, format: string, isType = true) {
        const d = new Date(date);
        let month = isType ? '' + (d.getMonth() + 1) : date.month;
        let day = isType ? '' + d.getDate() : date.day;
        const year = isType ? d.getFullYear() : date.year;
        if (Number(month) < 10) {
            month = '0' + month;
        }
        if (Number(day) < 10) {
            day = '0' + day;
        }
        return [month, day].join(format);
    }
    daysdifference(firstDate: string, secondDate: string) {
        const firstDates = firstDate.slice(0, 4) + ' / ' + firstDate.slice(4, 6) + ' / ' + firstDate.slice(6);
        const day = Math.floor((Date.parse(secondDate) - Date.parse(firstDates)) / 86400000);
        return day;
    }
    formatDateTimeByString(pdate: string, format: string) {
        if(this.isNullOrEmpty(pdate)){
            return '';
        }
        const date = new Date(pdate);
        const year = date.getFullYear();
        let month = '' + (date.getMonth() + 1);
        let day = '' + date.getDate();
        let hours = '' + date.getHours();
        let minnutes = '' + date.getMinutes();
        let second = '' + date.getSeconds();

        let TIMEPMAM = '';

        if (Number(month) < 10) {
            month = '0' + month;
        }
        if (Number(day) < 10) {
            day = '0' + day;
        }
        if (Number(hours) < 10) {
            hours = '0' + hours;
        }
        if (Number(minnutes) < 10) {
            minnutes = '0' + minnutes;
        }
        if(Number(hours) < 12){
            TIMEPMAM = ' AM,'
        }else{
            TIMEPMAM = ' PM, '
        }
        return hours + ':' +  minnutes + ':' + second + TIMEPMAM  + [day,month,year].join(format);

    }
    formatDateTime(date: Date, format: string) {
        const year = date.getFullYear();
        let month = '' + (date.getMonth() + 1);
        let day = '' + date.getDate();
        let hours = '' + date.getHours();
        let minnutes = '' + date.getMinutes();
        if (Number(month) < 10) {
            month = '0' + month;
        }
        if (Number(day) < 10) {
            day = '0' + day;
        }
        if (Number(hours) < 10) {
            hours = '0' + hours;
        }
        if (Number(minnutes) < 10) {
            minnutes = '0' + minnutes;
        }
        return [year, month, day, hours, minnutes].join(format);
    }
    stringFormat(lstString: string[]): string {
        let theString = lstString[0];

        for (let i = 1; i < lstString.length; i++) {
            // "gm" = RegEx options for Global search (more than one instance)
            // and for Multiline search
            const regEx = new RegExp('\\{' + (i - 1) + '\\}', 'gm');
            theString = theString.replace(regEx, lstString[i]);
        }
        return theString;
    }
    stringDateToDate(value: string) {
        const date = new Date(value);
        let year = date.getFullYear();
        let month = (date.getMonth() + 1).toString();
        let day = date.getDate().toString();
        if (Number(month) < 10) {
            month = '0' + month;
        }
        if (Number(day) < 10) {
            day = '0' + day;
        }
        return day + '/' + month + '/' + year;
    }
    stringToDate(value: string) {
        const year = value.substr(0, 4);
        const month = value.substr(4, 2);
        const day = value.substr(6, 2);
        return new Date(Number(year), Number(month) - 1, Number(day));
    }
    stringToDateTime(value: string) {
        const year = value.substring(0, 4);
        const month = value.substring(4, 6);
        const day = value.substring(6, 8);
        const hours = value.substring(8, 10);
        const minutes = value.substring(10);
        return new Date(Number(year), Number(month) - 1, Number(day), Number(hours), Number(minutes));
    }
    fomatDateTime(value: any) {
        return value.slice(0, 4) + '/' + value.slice(4, 6) + '/' + value.slice(6, 8) + ' '
            + value.slice(8, 10) + ':' + value.slice(10, 12) + ':' + value.slice(12, 14);
    }
    activeSelected(arrDt: any[], idx: number) {
        arrDt.map(it => it.selected = false);
        arrDt[idx].selected = true;
    }
    private AgeCalculate(dom: Date, dob: any) {
        let age = dom.getFullYear() - dob.getFullYear();
        const m = dom.getMonth() - dob.getMonth();
        if (m < 0 || (m === 0 && dom.getDate() < dob.getDate())) {
            age--;
        }
        return age.toString();
    }
    private GetDateOfMeet(dob: Date, Age: any) {
        let dom = new Date();
        const dobYear = dob.getFullYear();
        const dobMonth = dob.getMonth();
        const dobDate = dob.getDate();
        // tslint:disable-next-line:radix
        const domYear = dobYear + parseInt(Age.trim());
        dom = new Date(domYear, dobMonth, dobDate);
        return dom;
    }
    TranslateCurrentLang() {
        let currency = '';
        const currentLang = this.translate.currentLang;
        switch (currentLang) {
            case 'en':
                currency = 'USD';
                break;
            case 'ja':
                currency = 'JPY';
                break;
            case 'vi':
                currency = 'VND';
                break;
            default:
                currency = 'JPY';
                break;
        }
        return currency;
    }
    getFullNameDay(dateStr) {
        const intWeekday = new Date(dateStr).getDay();
        let strWeekday;
        switch (intWeekday) {
            case 0:
                strWeekday = 'STR_SUNDAY_FULL';
                break;
            case 1:
                strWeekday = 'STR_MONDAY_FULL';
                break;
            case 2:
                strWeekday = 'STR_TUESDAY_FULL';
                break;
            case 3:
                strWeekday = 'STR_WEDNESDAY_FULL';
                break;
            case 4:
                strWeekday = 'STR_THURSDAY_FULL';
                break;
            case 5:
                strWeekday = 'STR_FRIDAY_FULL';
                break;
            case 6:
                strWeekday = 'STR_SATURDAY_FULL';
                break;
            default:
                strWeekday = null;
                break;
        }
        return strWeekday;
    }
    ShowError(pId: string) {
        const el = document.getElementById(pId);
        if (el) {
            el.classList.add('error-border');
            el.focus();
        }
    }
    RemoveError(pId: string) {
        const el = document.getElementById(pId);
        if (el) {
            el.classList.remove('error-border');
        }
    }
    addPerfectScrollBar() {
        this.ngZone.runOutsideAngular(() => {
            // tslint:disable-next-line:space-before-function-paren
            $('.scrollbar , .p-datatable-wrapper').each(function () {
                $('.ps__thumb-x , .ps__thumb-y').attr('tabindex', '-1');
                if (!$(this).hasClass('ps')) {
                    let ps = new PerfectScrollbar(this, { wheelSpeed: 0.25, wheelPropagation: false });
                    $(this).addClass('ps');
                    document?.querySelector('body')?.addEventListener('mouseover', () => {
                        if ($(this).hasClass('destroy')) {
                            $(this).removeClass('destroy');
                            $(this).addClass('destroyed');
                            ps.destroy();
                        } else if ($(this).hasClass('newPs')) {
                            $(this).removeClass('newPs');
                            ps = new PerfectScrollbar(this, { wheelSpeed: 0.25, wheelPropagation: false });
                        } else if (!$(this).hasClass('destroyed')) {
                            ps.update();
                        }
                    }, false);
                }
            });
        });
    }
    dateToString(date: Date) {
        if (date) {
            const year = date.getFullYear().toString();
            const month = date.getMonth() + 1;
            let strMonth = month.toString();
            if (month < 10) {
                strMonth = '0' + strMonth;
            }
            const day = date.getDate();
            let strDay = day.toString();
            if (day < 10) {
                strDay = '0' + strDay;
            }
            return year + strMonth + strDay;
        }
        return null;
    }
    dateToString2(date: Date) {
        if (date) {
            const year = date.getFullYear().toString();
            const month = date.getMonth() + 1;
            let strMonth = month.toString();
            if (month < 10) {
                strMonth = '0' + strMonth;
            }
            const day = date.getDate();
            let strDay = day.toString();
            if (day < 10) {
                strDay = '0' + strDay;
            }
            return year + '/' + strMonth + '/' + strDay;
        }
        return null;
    }
    dateToString3(date: any) {
        const year = date.year;
        const month = date.month;
        const day = date.day;
        if (month < 10) {
            if (day < 10) {
                return year + '0' + month + '0' + day;
            }
            else {
                return year + '0' + month + day;
            }
        }
        else {
            if (day < 10) {
                return year + month + '0' + day;
            }
            else {
                return '' + year + month + day;
            }
        }
    }
    formatCurrency(strCurrency: string) {
        let isNA = false;
        if (strCurrency.includes('-')) {
            isNA = true;
            strCurrency = strCurrency.slice(1);
        }
        strCurrency = strCurrency?.trim();
        let reCUrrency = '';
        if (strCurrency.length > 3) {
            const arrChar: string[] = [];
            let count = 1;
            for (let i = strCurrency.length - 1; i >= 0; i--) {
                arrChar.push(strCurrency[i]);
                if (count % 3 === 0) {
                    arrChar.push(',');
                }
                count++;
            }
            const reverAr = arrChar.reverse();
            reCUrrency = reverAr.join('');
        } else {
            reCUrrency = strCurrency;
        }
        const FstComma = reCUrrency.indexOf(',');
        if (FstComma === 0) {
            reCUrrency = reCUrrency.substring(1);
        }
        if (isNA) {
            return '-' + reCUrrency;
        }
        return reCUrrency;
    }
    fullWithCharacter(value: any) {
        let isFullWidth = false;
        if (!this.isNullOrEmpty(value)) {
            const strValue = value?.trim();
            const reg = new RegExp(/^[０-９Ａ-ｚぁ-んァ-ン一-龥]/);
            for (const char of strValue) {
                if (reg.test(char)) {
                    isFullWidth = true;
                    break;
                }
            }
        }
        return isFullWidth;
    }
    limitShowText(value: any, maxLength: number) {
        if (!this.isNullOrEmpty(value)) {
            const isFullWidth = this.fullWithCharacter(value);
            return isFullWidth ? value.substring(0, 30) : value.substring(0, maxLength);
        } else {
            return '';
        }
    }
    trimObj(obj: any) {
        if (obj === null && !Array.isArray(obj) && typeof obj !== 'object') { return obj; }
        try {
            return Object.keys(obj).reduce((acc, key) => {
                switch (typeof obj[key]) {
                    case 'string':
                        acc[key] = obj[key].trim();
                        break;
                    case 'object':
                        acc[key] = obj[key];
                        break;
                    default:
                        acc[key] = obj[key];
                        break;
                }
                return acc;
            }, Array.isArray(obj) ? [] : {});
        } catch (error) {
            console.log(error);
        }
    }
    formatDateString(value) {
        if (value == null || value === '' || value.trim() === '') { return ''; }
        if (value.length === 6) {
            return value.substring(0, 4) + '/' + value.substring(4);
        }
        if (value.length === 8) {
            return value.substring(0, 4) + '/' + value.substring(4, 6) + '/' + value.substring(6);
        }
        return '';
    }
    areAnyFullWidth(input: string) {
        const fullWidthRegex = /^[ァ-ン]|[０-９]|[[Ａ-ｚ]$/;
        for (let i = 0; i < input.length; i++) {
            const char = input.charAt(i);
            const isFullWidth = fullWidthRegex.test(char);
            if (isFullWidth) {
                return true;
            }
        }
        return false;
    }
    checkCkeditor5() {
        let ckedit = false;
        if ($('.ck-focused').length > 0) {
            ckedit = true;
        }
        return ckedit;
    }
    checkJPContry() {
        return (!this.isNullOrBlank(localStorage.Country) && localStorage.Country === 'JP');
    }
    compareTwoDate(d1: any, d2: any) {
        const strD1 = this.isNullOrBlank(d1) ? '' : this.dateToString(d1);
        const strD2 = this.isNullOrBlank(d2) ? '' : this.dateToString(d2);
        return (strD2 !== strD1);
    }
    setAreaNumber(pValue: string) {
        let phoneNum = '';
        if (this.isNullOrBlank(pValue)) {
            return phoneNum;
        }
        const value = pValue.trim();
        if (value.length === 11) {
            phoneNum = value.substring(0, 3) + ' ' + value.substring(3, 7) + ' ' + value.substring(7);
            return phoneNum;
        }
        const jaAreaNum = value.substring(0, 2);
        switch (jaAreaNum) {
            case '01':
                phoneNum = this.setCaseOne(value);
                break;
            case '02':
                phoneNum = this.setCaseTwo(value);
                break;
            case '03':
                phoneNum = value.substring(0, 2) + ' ' + value.substring(2, 6) + ' ' + value.substring(6);
                break;
            case '04':
                phoneNum = this.setCaseFour(value);
                break;
            case '05':
                phoneNum = this.setCaseFive(value);
                break;
            case '06':
                phoneNum = value.substring(0, 2) + ' ' + value.substring(2, 6) + ' ' + value.substring(6);
                break;
            case '07':
                phoneNum = this.setCaseSeven(value);
                break;
            case '08':
                phoneNum = this.setCaseEight(value);
                break;
            default:
                phoneNum = this.setCaseNine(value);
                break;
        }
        return phoneNum;
    }
    setCaseOne(value: string) {
        let arePhoneNum = '';
        const thirdNum = value.substring(2, 3);
        const fourNumChar = value.substring(0, 4);
        const fiveNumChar = value.substring(0, 5);
        if (thirdNum >= '1' && thirdNum <= '6') {
            switch (thirdNum) {
                case '2':
                    if (fiveNumChar === '01267') {
                        arePhoneNum = value.substring(0, 5) + ' ' + value.substring(6);
                    } else {
                        arePhoneNum = value.substring(0, 4) + ' ' + value.substring(4, 6) + ' ' + value.substring(6);
                    }
                    break;
                case '3':
                    if (fiveNumChar === '01372' || fiveNumChar === '01374' || fiveNumChar === '01377' || fiveNumChar === '01392'
                        || fiveNumChar === '01397' || fiveNumChar === '01398') {
                        arePhoneNum = value.substring(0, 5) + ' ' + value.substring(6);
                    } else {
                        arePhoneNum = value.substring(0, 4) + ' ' + value.substring(4, 6) + ' ' + value.substring(6);
                    }
                    break;
                case '4':
                    if (fiveNumChar === '01456' || fiveNumChar === '01457' || fiveNumChar === '01466') {
                        arePhoneNum = value.substring(0, 5) + ' ' + value.substring(6);
                    } else {
                        arePhoneNum = value.substring(0, 4) + ' ' + value.substring(4, 6) + ' ' + value.substring(6);
                    }
                    break;
                case '5':
                    if (fiveNumChar === '01547' || fiveNumChar === '01558' || fiveNumChar === '01564'
                        || fiveNumChar === '01586' || fiveNumChar === '01587') {
                        arePhoneNum = value.substring(0, 5) + ' ' + value.substring(6);
                    } else if (fiveNumChar === '01541' || fiveNumChar === '01548' || fiveNumChar === '01551' || fiveNumChar === '01557') {
                        arePhoneNum = value.substring(0, 3) + ' ' + value.substring(3, 6) + ' ' + value.substring(6);
                    } else {
                        arePhoneNum = value.substring(0, 4) + ' ' + value.substring(4, 6) + ' ' + value.substring(6);
                    }
                    break;
                case '6':
                    if (fiveNumChar === '01632' || fiveNumChar === '01634' || fiveNumChar === '01635'
                        || fiveNumChar === '01648' || fiveNumChar === '01654'
                        || fiveNumChar === '01655' || fiveNumChar === '01656' || fiveNumChar === '01658') {
                        arePhoneNum = value.substring(0, 5) + ' ' + value.substring(6);
                    } else {
                        arePhoneNum = value.substring(0, 4) + ' ' + value.substring(4, 6) + ' ' + value.substring(6);
                    }
                    break;
                default:
                    arePhoneNum = value.substring(0, 4) + ' ' + value.substring(4, 6) + ' ' + value.substring(6);
                    break;
            }
        } else if (thirdNum === '7') {
            if (fourNumChar === '0177') {
                arePhoneNum = value.substring(0, 3) + ' ' + value.substring(3, 6) + ' ' + value.substring(6);
            } else {
                arePhoneNum = value.substring(0, 4) + ' ' + value.substring(4, 6) + ' ' + value.substring(6);
            }
        } else if (thirdNum === '8') {
            if (fourNumChar === '0188') {
                arePhoneNum = value.substring(0, 3) + ' ' + value.substring(3, 6) + ' ' + value.substring(6);
            } else {
                arePhoneNum = value.substring(0, 4) + ' ' + value.substring(4, 6) + ' ' + value.substring(6);
            }
        } else if (thirdNum === '9') {
            if (fourNumChar === '0196') {
                arePhoneNum = value.substring(0, 3) + ' ' + value.substring(3, 6) + ' ' + value.substring(6);
            } else {
                arePhoneNum = value.substring(0, 4) + ' ' + value.substring(4, 6) + ' ' + value.substring(6);
            }
        }
        return arePhoneNum;
    }
    setCaseTwo(value: string) {
        let arePhoneNum = '';
        const thirdNum = value.substring(2, 3);
        const fourNumChar = value.substring(0, 4);
        const fiveNumChar = value.substring(0, 5);
        switch (thirdNum) {
            case '2':
            case '3':
            case '4':
                if (fourNumChar === '0222' || fourNumChar === '0227' || fourNumChar === '0236'
                    || fourNumChar === '0245' || fourNumChar === '0249'
                    || fiveNumChar === '02230' || fiveNumChar === '02234' || fiveNumChar === '02239') {
                    arePhoneNum = value.substring(0, 3) + ' ' + value.substring(3, 6) + ' ' + value.substring(6);
                } else {
                    arePhoneNum = value.substring(0, 4) + ' ' + value.substring(4, 6) + ' ' + value.substring(6);
                }
                break;
            case '5':
                if (fiveNumChar === '02550' || fiveNumChar === '02559' || fiveNumChar === '02555' || fiveNumChar === '02556'
                    || fiveNumChar === '02560' || fiveNumChar === '02551' || fiveNumChar === '02552' || fiveNumChar === '02553'
                    || fiveNumChar === '02554' || fiveNumChar === '02575' || fiveNumChar === '02576' || fiveNumChar === '02580'
                    || fiveNumChar === '02571' || fiveNumChar === '02577' || fiveNumChar === '02578'
                    || fiveNumChar === '02570' || fiveNumChar === '02579') {
                    arePhoneNum = value.substring(0, 3) + ' ' + value.substring(3, 6) + ' ' + value.substring(6);
                } else {
                    arePhoneNum = value.substring(0, 4) + ' ' + value.substring(4, 6) + ' ' + value.substring(6);
                }
                break;
            case '6':
                if (fourNumChar === '0262' || fiveNumChar === '02640' || (fiveNumChar >= '02646' && fiveNumChar <= '02649')) {
                    arePhoneNum = value.substring(0, 3) + ' ' + value.substring(3, 6) + ' ' + value.substring(6);
                } else {
                    arePhoneNum = value.substring(0, 4) + ' ' + value.substring(4, 6) + ' ' + value.substring(6);
                }
                break;
            case '7':
                if (fourNumChar === '0272' || fourNumChar === '0273'
                    || fiveNumChar === '02780' || fiveNumChar === '02788' || fiveNumChar === '02789') {
                    arePhoneNum = value.substring(0, 3) + ' ' + value.substring(3, 6) + ' ' + value.substring(6);
                } else {
                    arePhoneNum = value.substring(0, 4) + ' ' + value.substring(4, 6) + ' ' + value.substring(6);
                }
                break;
            case '8':
                if (fiveNumChar === '02830' || fiveNumChar === '02833' || fiveNumChar === '02834' || fourNumChar === '0286'
                    || (fiveNumChar >= '02890' && fiveNumChar <= '02895')) {
                    arePhoneNum = value.substring(0, 3) + ' ' + value.substring(3, 6) + ' ' + value.substring(6);
                } else {
                    arePhoneNum = value.substring(0, 4) + ' ' + value.substring(4, 6) + ' ' + value.substring(6);
                }
                break;
            case '9':
                if (fourNumChar === '0298') {
                    arePhoneNum = value.substring(0, 3) + ' ' + value.substring(3, 6) + ' ' + value.substring(6);
                } else {
                    arePhoneNum = value.substring(0, 4) + ' ' + value.substring(4, 6) + ' ' + value.substring(6);
                }
                break;
            default: // 8 - 9
                arePhoneNum = value.substring(0, 4) + ' ' + value.substring(4, 6) + ' ' + value.substring(6);
                break;
        }
        return arePhoneNum;
    }
    setCaseFour(value: string) {
        let arePhoneNum = '';
        const thirdNum = value.substring(2, 3);
        const fourNumChar = value.substring(0, 4);
        const fiveNumChar = value.substring(0, 5);
        switch (thirdNum) {
            case '2':
                if (fourNumChar === '0423' || fourNumChar === '0426' || fourNumChar === '0425' || fourNumChar === '0427'
                    || fiveNumChar === '04220' || fiveNumChar === '04240' || fiveNumChar === '04242' || fiveNumChar === '04249'
                    || fiveNumChar === '04280' || fiveNumChar === '04284' || fiveNumChar === '04281' || fiveNumChar === '04285'
                    || fiveNumChar === '04291' || fiveNumChar === '04297' || fiveNumChar === '04298') {
                    arePhoneNum = value.substring(0, 3) + ' ' + value.substring(3, 6) + ' ' + value.substring(6);
                } else if (fiveNumChar === '04200') {
                    arePhoneNum = value.substring(0, 2) + ' ' + value.substring(2, 6) + ' ' + value.substring(6);
                } else {
                    arePhoneNum = value.substring(0, 4) + ' ' + value.substring(4, 6) + ' ' + value.substring(6);
                }
                break;
            case '3':
                if (fourNumChar === '0432' || fourNumChar === '0434') {
                    arePhoneNum = value.substring(0, 3) + ' ' + value.substring(3, 6) + ' ' + value.substring(6);
                } else {
                    arePhoneNum = value.substring(0, 4) + ' ' + value.substring(4, 6) + ' ' + value.substring(6);
                }
                break;
            case '4':
            case '5':
                arePhoneNum = value.substring(0, 3) + ' ' + value.substring(3, 6) + ' ' + value.substring(6);
                break;
            case '6':
                if (fourNumChar === '0462' || fourNumChar === '0468' || fiveNumChar === '04640' || fiveNumChar === '04641') {
                    arePhoneNum = value.substring(0, 3) + ' ' + value.substring(3, 6) + ' ' + value.substring(6);
                } else {
                    arePhoneNum = value.substring(0, 4) + ' ' + value.substring(4, 6) + ' ' + value.substring(6);
                }
                break;
            case '7':
                if (fourNumChar === '0471' || fiveNumChar === '04700' || fiveNumChar === '04709') {
                    arePhoneNum = value.substring(0, 2) + ' ' + value.substring(2, 6) + ' ' + value.substring(6);
                } else if (fourNumChar === '0473' || fourNumChar === '0474' || (fiveNumChar >= '04770' && fiveNumChar >= '04772')
                    || (fiveNumChar >= '04775' && fiveNumChar >= '04777')) {
                    arePhoneNum = value.substring(0, 3) + ' ' + value.substring(3, 6) + ' ' + value.substring(6);
                } else {
                    arePhoneNum = value.substring(0, 4) + ' ' + value.substring(4, 6) + ' ' + value.substring(6);
                }
                break;
            case '8':
                if (fourNumChar === '0480') {
                    arePhoneNum = value.substring(0, 4) + ' ' + value.substring(4, 6) + ' ' + value.substring(6);
                } else {
                    arePhoneNum = value.substring(0, 3) + ' ' + value.substring(3, 6) + ' ' + value.substring(6);
                }
                break;
            case '9':
                if (fourNumChar === '0492') {
                    arePhoneNum = value.substring(0, 3) + ' ' + value.substring(3, 6) + ' ' + value.substring(6);
                } else {
                    arePhoneNum = value.substring(0, 4) + ' ' + value.substring(4, 6) + ' ' + value.substring(6);
                }
                break;
            default:
                arePhoneNum = value.substring(0, 3) + ' ' + value.substring(3, 6) + ' ' + value.substring(6);
                break;
        }
        return arePhoneNum;
    }
    setCaseFive(value: string) {
        let arePhoneNum = '';
        const thirdNum = value.substring(2, 3);
        const fourNumChar = value.substring(0, 4);
        const fiveNumChar = value.substring(0, 5);
        const sixNumChar = value.substring(0, 6);
        switch (thirdNum) {
            case '3':
                if (fourNumChar === '0531' || fourNumChar === '0532' || fourNumChar === '0533' || fourNumChar === '0536'
                    || fourNumChar === '0537' || fourNumChar === '0538' || sixNumChar === '053962' || sixNumChar === '053963'
                    || sixNumChar === '053974' || sixNumChar === '053977') {
                    arePhoneNum = value.substring(0, 4) + ' ' + value.substring(4, 6) + ' ' + value.substring(6);
                } else {
                    arePhoneNum = value.substring(0, 3) + ' ' + value.substring(3, 6) + ' ' + value.substring(6);
                }
                break;
            case '4':
                if (fourNumChar === '0544' || fourNumChar === '0545' || fourNumChar === '0547' || fourNumChar === '0548') {
                    arePhoneNum = value.substring(0, 4) + ' ' + value.substring(4, 6) + ' ' + value.substring(6);
                } else {
                    arePhoneNum = value.substring(0, 3) + ' ' + value.substring(3, 6) + ' ' + value.substring(6);
                }
                break;
            case '5':
                if (fourNumChar === '0552') {
                    arePhoneNum = value.substring(0, 3) + ' ' + value.substring(3, 6) + ' ' + value.substring(6);
                } else {
                    arePhoneNum = value.substring(0, 4) + ' ' + value.substring(4, 6) + ' ' + value.substring(6);
                }
                break;
            case '6':
                arePhoneNum = value.substring(0, 4) + ' ' + value.substring(4, 6) + ' ' + value.substring(6);
                break;
            case '7':
                if (fiveNumChar === '05769') {
                    arePhoneNum = value.substring(0, 5) + ' ' + value.substring(6);
                } else {
                    arePhoneNum = value.substring(0, 4) + ' ' + value.substring(4, 6) + ' ' + value.substring(6);
                }
                break;
            case '8':
                if (fourNumChar === '0582' || fourNumChar === '0583') {
                    arePhoneNum = value.substring(0, 3) + ' ' + value.substring(3, 6) + ' ' + value.substring(6);
                } else {
                    arePhoneNum = value.substring(0, 4) + ' ' + value.substring(4, 6) + ' ' + value.substring(6);
                }
                break;
            case '9':
                if ((sixNumChar >= '059792' && sixNumChar <= '059796') || sixNumChar === '059799') {
                    arePhoneNum = value.substring(0, 5) + ' ' + value.substring(6);
                } else {
                    arePhoneNum = value.substring(0, 4) + ' ' + value.substring(4, 6) + ' ' + value.substring(6);
                }
                break;
            default: // case 0 ,2
                arePhoneNum = value.substring(0, 3) + ' ' + value.substring(3, 6) + ' ' + value.substring(6);
                break;
        }
        return arePhoneNum;
    }
    setCaseSeven(value: string) {
        let arePhoneNum = '';
        const thirdNum = value.substring(2, 3);
        const fourNumChar = value.substring(0, 4);
        const fiveNumChar = value.substring(0, 5);
        switch (thirdNum) {
            case '2':
                if (fourNumChar === '0721' || fourNumChar === '0725') {
                    arePhoneNum = value.substring(0, 4) + ' ' + value.substring(4, 6) + ' ' + value.substring(6);
                } else {
                    arePhoneNum = value.substring(0, 3) + ' ' + value.substring(3, 6) + ' ' + value.substring(6);
                }
                break;
            case '3':
                if (fourNumChar === '0734') {
                    arePhoneNum = value.substring(0, 3) + ' ' + value.substring(3, 6) + ' ' + value.substring(6);
                } else {
                    arePhoneNum = value.substring(0, 4) + ' ' + value.substring(4, 6) + ' ' + value.substring(6);
                }
                break;
            case '4':
                if (fiveNumChar === '07468') {
                    arePhoneNum = value.substring(0, 5) + ' ' + value.substring(6);
                } else {
                    arePhoneNum = value.substring(0, 4) + ' ' + value.substring(4, 6) + ' ' + value.substring(6);
                }
                break;
            case '5':
                arePhoneNum = value.substring(0, 3) + ' ' + value.substring(3, 6) + ' ' + value.substring(6);
                break;
            case '6':
                if (fiveNumChar === '0762' || fiveNumChar === '0764') {
                    arePhoneNum = value.substring(0, 3) + ' ' + value.substring(3, 6) + ' ' + value.substring(6);
                } else {
                    arePhoneNum = value.substring(0, 4) + ' ' + value.substring(4, 6) + ' ' + value.substring(6);
                }
                break;
            case '7':
                arePhoneNum = value.substring(0, 4) + ' ' + value.substring(4, 6) + ' ' + value.substring(6);
                break;
            case '8':
                arePhoneNum = value.substring(0, 3) + ' ' + value.substring(3, 6) + ' ' + value.substring(6);
                break;
            case '9':
                if (fiveNumChar === '07949' || (fiveNumChar >= '07940' && fiveNumChar <= '07945') || fiveNumChar === '07950'
                    || fiveNumChar === '07955' || fiveNumChar === '07956' || fiveNumChar === '07959'
                    || fiveNumChar === '07960' || fiveNumChar === '07966' || fiveNumChar === '07967') {
                    arePhoneNum = value.substring(0, 3) + ' ' + value.substring(3, 6) + ' ' + value.substring(6);
                } else {
                    arePhoneNum = value.substring(0, 4) + ' ' + value.substring(4, 6) + ' ' + value.substring(6);
                }
                break;
            default:
                arePhoneNum = value.substring(0, 3) + ' ' + value.substring(3, 6) + ' ' + value.substring(6);
                break;
        }
        return arePhoneNum;
    }
    setCaseEight(value: string) {
        let arePhoneNum = '';
        const thirdNum = value.substring(2, 3);
        const fourNumChar = value.substring(0, 4);
        const fiveNumChar = value.substring(0, 5);
        const sixNumChar = value.substring(0, 6);
        switch (thirdNum) {
            case '2':
                if (fourNumChar === '0823' || fourNumChar === '0824' || fourNumChar === '0826' || fourNumChar === '0827'
                    || sixNumChar === '082920' || fourNumChar === '08293' || sixNumChar === '082940' || sixNumChar === '082944'
                    || sixNumChar === '082945' || fiveNumChar === '08295' || fiveNumChar === '08297' || fiveNumChar === '08298') {
                    arePhoneNum = value.substring(0, 4) + ' ' + value.substring(4, 6) + ' ' + value.substring(6);
                } else {
                    arePhoneNum = value.substring(0, 3) + ' ' + value.substring(3, 6) + ' ' + value.substring(6);
                }
                break;
            case '3':
                if (fiveNumChar === '08387' || fiveNumChar === '08388' || sixNumChar === '083962'
                    || sixNumChar === '083965' || sixNumChar === '083968') {
                    arePhoneNum = value.substring(0, 5) + ' ' + value.substring(6);
                } else if (fourNumChar === '0833' || fourNumChar === '0834' || fourNumChar === '0835'
                    || (fiveNumChar >= '08362' && fiveNumChar <= '08369') || (fiveNumChar >= '08372' && fiveNumChar <= '08374')
                    || fiveNumChar === '08375' || (sixNumChar >= '083760' && sixNumChar <= '083765') || sixNumChar === '083769') {
                    arePhoneNum = value.substring(0, 4) + ' ' + value.substring(4, 6) + ' ' + value.substring(6);
                } else {
                    arePhoneNum = value.substring(0, 3) + ' ' + value.substring(3, 6) + ' ' + value.substring(6);
                }
                break;
            case '4':
                if (fiveNumChar === '08477') {
                    arePhoneNum = value.substring(0, 5) + ' ' + value.substring(6);
                } else if (fourNumChar === '0849') {
                    arePhoneNum = value.substring(0, 3) + ' ' + value.substring(3, 6) + ' ' + value.substring(6);
                } else {
                    arePhoneNum = value.substring(0, 4) + ' ' + value.substring(4, 6) + ' ' + value.substring(6);
                }
                break;
            case '5':
                if (fiveNumChar === '08512' || fiveNumChar === '08514') {
                    arePhoneNum = value.substring(0, 5) + ' ' + value.substring(6);
                } else {
                    arePhoneNum = value.substring(0, 4) + ' ' + value.substring(4, 6) + ' ' + value.substring(6);
                }
                break;
            case '6':
                if (fourNumChar === '0862' || fourNumChar === '0864' || fiveNumChar === '08636' || fiveNumChar === '08652'
                    || (sixNumChar >= '086722' && sixNumChar <= '086724') || sixNumChar === '086552' || sixNumChar === '086553'
                    || sixNumChar === '086726' || sixNumChar === '086728' || sixNumChar === '086952' || sixNumChar === '086953'
                    || fiveNumChar === '08680' || fiveNumChar === '08689' || fiveNumChar === '08690' || fiveNumChar === '08694'
                    || fiveNumChar === '08660' || fiveNumChar === '08699' || (sixNumChar >= '086953' && sixNumChar <= '086959')) {
                    arePhoneNum = value.substring(0, 3) + ' ' + value.substring(3, 6) + ' ' + value.substring(6);
                } else {
                    arePhoneNum = value.substring(0, 4) + ' ' + value.substring(4, 6) + ' ' + value.substring(6);
                }
                break;
            case '7':
                if (fourNumChar === '0878') {
                    arePhoneNum = value.substring(0, 3) + ' ' + value.substring(3, 6) + ' ' + value.substring(6);
                } else {
                    arePhoneNum = value.substring(0, 4) + ' ' + value.substring(4, 6) + ' ' + value.substring(6);
                }
                break;
            case '8':
                if (fourNumChar === '0888') {
                    arePhoneNum = value.substring(0, 3) + ' ' + value.substring(3, 6) + ' ' + value.substring(6);
                } else {
                    arePhoneNum = value.substring(0, 4) + ' ' + value.substring(4, 6) + ' ' + value.substring(6);
                }
                break;
            case '9':
                if (fourNumChar === '0899') {
                    arePhoneNum = value.substring(0, 3) + ' ' + value.substring(3, 6) + ' ' + value.substring(6);
                } else {
                    arePhoneNum = value.substring(0, 4) + ' ' + value.substring(4, 6) + ' ' + value.substring(6);
                }
                break;
            default:
                arePhoneNum = value.substring(0, 3) + ' ' + value.substring(3, 6) + ' ' + value.substring(6);
                break;
        }
        return arePhoneNum;
    }
    setCaseNine(value: string) {
        let arePhoneNum = '';
        const thirdNum = value.substring(2, 3);
        const fourNumChar = value.substring(0, 4);
        const fiveNumChar = value.substring(0, 5);
        switch (thirdNum) {
            case '1':
                arePhoneNum = value.substring(0, 4) + ' ' + value.substring(4, 6) + ' ' + value.substring(6);
                break;
            case '2':
            case '3':
                if (fourNumChar === '0920' || fourNumChar === '0930') {
                    arePhoneNum = value.substring(0, 4) + ' ' + value.substring(4, 6) + ' ' + value.substring(6);
                } else {
                    arePhoneNum = value.substring(0, 3) + ' ' + value.substring(3, 6) + ' ' + value.substring(6);
                }
                break;
            case '4':
                if (fiveNumChar === '09496') {
                    arePhoneNum = value.substring(0, 5) + ' ' + value.substring(6);
                } else {
                    arePhoneNum = value.substring(0, 4) + ' ' + value.substring(4, 6) + ' ' + value.substring(6);
                }
                break;
            case '5':
            case '6':
                if (fourNumChar === '0958' || fourNumChar === '0962' || fourNumChar === '0963' || fourNumChar === '0975') {
                    arePhoneNum = value.substring(0, 3) + ' ' + value.substring(3, 6) + ' ' + value.substring(6);
                } else {
                    arePhoneNum = value.substring(0, 4) + ' ' + value.substring(4, 6) + ' ' + value.substring(6);
                }
                break;
            case '8':
                if (fourNumChar === '0988' || fourNumChar === '0989') {
                    arePhoneNum = value.substring(0, 3) + ' ' + value.substring(3, 6) + ' ' + value.substring(6);
                } else if (fiveNumChar === '09802') {
                    arePhoneNum = value.substring(0, 5) + ' ' + value.substring(6);
                } else {
                    arePhoneNum = value.substring(0, 4) + ' ' + value.substring(4, 6) + ' ' + value.substring(6);
                }
                break;
            case '9':
                if (fiveNumChar === '09912' || fiveNumChar === '09913' || fiveNumChar === '09969') {
                    arePhoneNum = value.substring(0, 5) + ' ' + value.substring(6);
                } else if (fourNumChar === '0992' || fourNumChar === '0998' || fiveNumChar === '0940' || fiveNumChar === '0947'
                    || fiveNumChar === '0948') {
                    arePhoneNum = value.substring(0, 3) + ' ' + value.substring(3, 6) + ' ' + value.substring(6);
                } else {
                    arePhoneNum = value.substring(0, 4) + ' ' + value.substring(4, 6) + ' ' + value.substring(6);
                }
                break;
            default:
                arePhoneNum = value.substring(0, 3) + ' ' + value.substring(3, 6) + ' ' + value.substring(6);
                break;
        }
        return arePhoneNum;
    }
    IsNullOrEmptyWithTrim(e: any) {
        return e === null || e === undefined || e.trim() === '';
    }
    mathCeli(value: string, decimal: number) {
        const numVal = parseFloat(value);
        const powDeci = Math.pow(10, decimal);
        const nNum = Math.ceil(numVal * powDeci) / powDeci;
        return nNum.toString();
    }
    /**
     * @param pYYYYmm : yyyyMM or yyyy/MM
     * @returns Date of last day in month
     */
    LastDayInMonth(pYYYYmm: string) {
        if (pYYYYmm.length < 6) { return null; }
        let y: number;
        let m: number;
        if (pYYYYmm.indexOf('/') > -1) {
            const lstYm = pYYYYmm.split('/');
            y = Number(lstYm[0]);
            m = Number(lstYm[1]) - 1;
        } else {
            y = Number(pYYYYmm.substr(0, 4));
            m = Number(pYYYYmm.substr(4, 2)) - 1;
        }
        const d = moment().year(y).month(m).daysInMonth();
        return new Date(y, m, d, 12, 1, 1, 1);
    }
    checkTimeLifeApi(d1: Date) {
        const curDate = new Date();
        const time1 = d1.getTime();
        const time2 = curDate.getTime();
        const sec = (time2 - time1) / 1000;
        return sec;
    }
    FormatAmount(pValue: string) {
        if (pValue !== null && pValue !== '' && pValue.trim() !== '') {
            pValue = pValue.trim();
            if (pValue.startsWith('-')) {
                pValue = pValue.replace('-', '');
                return '-' + pValue.replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,');
            } else {
                return pValue.replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,');
            }
        }
        return ' ';
    }
    focusFirstItem(): void {
        let lstInput;
        let idx = 0;
        if ($('ngb-modal-window').length > 0) {
            if ($('ngb-modal-window').length === 1) {
                lstInput = $('ngb-modal-window input, ngb-modal-window select, ngb-modal-window textarea, ngb-modal-window div[class="textarea-custom"],  ngb-modal-window .tab-button-focus');
            } else if ($('.popup-0702').length > 0) {
                lstInput = $('#JLAC10Code, #DisplayNamea');
            }
        }
        else if ($('modal-container').length > 0) {
            lstInput = $('modal-container input, modal-container select, modal-container textarea, modal-container div[class="textarea-custom"],  modal-container .tab-button-focus');
        }
        else {
            lstInput = $('input, select, textarea, div[class="textarea-custom"], .tab-button-focus');
        }
        const lstInputNotDisabled: any = [];
        lstInput.each((idx, item) => {
            if (item.getAttribute('disabled') === null &&
                item.getAttribute('readonly') === null &&
                !item.classList.contains('inp-filter')) {
                lstInputNotDisabled.push(item);
            }
            if (item.classList.contains('inp-select-focus') && item.getAttribute('disabled') === null) {
                lstInputNotDisabled.push(item);
            }
        });
        lstInputNotDisabled[0].focus();
    }
}
export function isNullOrWhitespace(obj: any): boolean {
    if (!obj) {
        return true;
    }
    if (typeof obj === 'string') {
        return !(obj.trim());
    } else {
        return false;
    }
}
