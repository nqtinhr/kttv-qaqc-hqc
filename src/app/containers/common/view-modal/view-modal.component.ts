import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { freeSet } from '@coreui/icons/js/free';
import { TranslateService } from '@ngx-translate/core';
import { ScrollXConfig, ScrollYConfig } from '~/app/utils/consts/const';

@Component({
  selector: 'app-view-modal',
  templateUrl: './view-modal.component.html',
  styleUrls: ['./view-modal.component.scss'],
})
export class ViewModalComponent implements OnInit {
  config = {
    keyboard: false,
    backdrop: 'static',
  };
  icon = freeSet;
  scrollXConfig = ScrollXConfig;
  scrollYConfig = ScrollYConfig;
  @ViewChild('largeModal') public largeModal: ModalDirective;
  @Input() widthDialog: string = 'modal-xl';
  @Input() disabledSave: boolean = false;
  @Input() hidedSave: boolean = false;
  @Input() saveContinue: boolean = false;

  // Tên modal;
  modalTitle: string;
  @Output() saveOpenDialog: EventEmitter<any> = new EventEmitter();
  @Output() saveContinueDialog: EventEmitter<any> = new EventEmitter();
  @Output() closeDialog: EventEmitter<boolean> = new EventEmitter();
  // Tên nút đồng ý- "để sau xử lý đưa hết vào file để dùng ng-translate để đọc"
  @Input() submitButton: string = 'Lưu';

  // Tên nút từ chối | đóng - "để sau xử lý đưa hết vào file để dùng ng-translate để đọc"
  @Input() closeButton: string = 'Đóng';
  constructor(public translate: TranslateService) {}

  ngOnInit(): void {}

  saveModal(): void {
    const isSaveSuccess = true;
    // this.largeModal.hide();
    this.saveOpenDialog.emit(isSaveSuccess);
  }

  saveModalContinue(): void {
    const isSaveSuccess = true;
    // this.largeModal.hide();
    this.saveContinueDialog.emit(isSaveSuccess);
  }

  openDialog(titleModal: string): void {
    this.modalTitle = titleModal;
    this.largeModal.show();
  }

  handleCloseDialog() {
    const isClose = true;
    this.closeDialog.emit(isClose);
    this.largeModal.hide();
  }
}
