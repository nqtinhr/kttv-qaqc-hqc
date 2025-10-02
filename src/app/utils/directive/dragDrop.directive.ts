/********************************************************************
 * Project: kho45（2022）
 * Class: DragDirective
 * ----------------------------------------
 * <summary>
 * DragDirective
 * </summary>
 * <history>
 *      ANBD     2022/10/31      Create
 * </history>
 ********************************************************************/
import {
    Directive,
    HostBinding,
    HostListener,
    Output,
    EventEmitter
} from "@angular/core";
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

export interface FileHandle {
    file: File,
    url: SafeUrl
}

@Directive({
    selector: "[appDrag]"
})
export class DragDirective {
    @Output() files: EventEmitter<{}> = new EventEmitter();
    @HostBinding("style.background") private background = "white";

    constructor(private sanitizer: DomSanitizer) { }

    @HostListener("dragover", ["$event"]) public onDragOver(evt: DragEvent) {
        evt.preventDefault();
        evt.stopPropagation();
        this.background = "#eee";
    }

    @HostListener("dragleave", ["$event"]) public onDragLeave(evt: DragEvent) {
        evt.preventDefault();
        evt.stopPropagation();
        this.background = "white";
    }

    @HostListener('drop', ['$event']) public onDrop(evt: DragEvent) {
        evt.preventDefault();
        evt.stopPropagation();
        this.files.emit(evt.dataTransfer?.files);
        this.background = "#d1d4d8";
    }
}
