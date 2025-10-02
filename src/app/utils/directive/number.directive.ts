/********************************************************************
 * Project: kho45（2022）
 * Class: NumberOnlyDirective
 * ----------------------------------------
 * <summary>
 * Number Only Directive
 * </summary>
 * <history>
 *      ANBD     2022/09/15      Create
 * </history>
 ********************************************************************/
import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
    selector: '[numberOnly]',
})
export class NumberOnlyDirective {
    // Allow decimal numbers and negative values
    private regex: RegExp = new RegExp(/^-?[0-9]+(\.[0-9]*){0,1}$/g);
    regHaftWidth = /[^0-9]/g;
    @Output() ngModelChange = new EventEmitter();

    constructor(private el: ElementRef) {
    }
    @HostListener('paste', ['$event']) blockPaste(e) {
        const clipboardData = e.clipboardData;
        if (clipboardData) {
            const pastedText = clipboardData.getData('text/plain');
            const valid: boolean = (new RegExp(this.regex)).test(pastedText);
            if (!valid) {
                e.preventDefault();
            }
        }
    }
    @HostListener('keyup', ['$event'])
    onKeyUp(e) {
        const isModifierkeyPressed = (e.metaKey || e.ctrlKey || e.shiftKey);
        const isCursorMoveOrDeleteAction = ([46, 8, 37, 38, 39, 40].indexOf(e.keyCode) !== -1);
        const isNumKeyPressed = (+e.key >= 0 && +e.key <= 9);
        const vKey = 86;
        const cKey = 67;
        const aKey = 65;
        switch (true) {
            case isCursorMoveOrDeleteAction:
            case isModifierkeyPressed === false && isNumKeyPressed:
            case (e.metaKey || e.ctrlKey) && ([vKey, cKey, aKey].indexOf(e.keyCode) !== -1):
                this.ngModelChange.emit(e.target.value);
                break;
            default:
                e.preventDefault();
        }
    }

    @HostListener('input', ['$event']) onInputChange(event) {
        const initalValue = this.el.nativeElement.value;
        this.el.nativeElement.value = initalValue.replace(this.regHaftWidth, '');
        if (initalValue !== this.el.nativeElement.value) {
            this.ngModelChange.emit(this.el.nativeElement.value);
            event.preventDefault();
        }
    }
}
