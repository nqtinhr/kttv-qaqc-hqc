import { Component, Input, OnInit } from "@angular/core";
import {
  LIST_STATUS_CERT,
  LIST_STATUS_BOOLEAN,
  LIST_STATUS_ROLE,
} from "~/app/utils/consts/const";
import { TranslateService } from "@ngx-translate/core";

export const StatusType = {
  Status: 1,
  StatusRole: 2,
  StatusCert: 3
};

@Component({
  selector: "app-status-label",
  templateUrl: "./status-label.component.html",
})
export class StatusLabelComponent implements OnInit {
  @Input() status: any;
  @Input() type: number;
  listStatus: any;
  constructor(
     public translate: TranslateService,
    ) {}

  ngOnInit(): void {
    if (this.type === StatusType.Status) {
      this.listStatus = LIST_STATUS_BOOLEAN;
    } else if (this.type === StatusType.StatusRole) {
      this.listStatus = LIST_STATUS_ROLE;
    } else if (this.type === StatusType.StatusCert) {
      this.listStatus = LIST_STATUS_CERT;
    }
  }
}
