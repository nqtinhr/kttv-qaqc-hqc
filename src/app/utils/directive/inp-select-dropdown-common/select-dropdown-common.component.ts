/*******************************************************************************
 * Project：
 * Summary:
 *　　 IconComponent
 * Remarks:
 *     inspec common component
 * History：
 *      AnBD            2021/07/26    Create
 ******************************************************************************/
import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges, HostListener, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { Utility } from '~/app/utils/utility';
import * as _ from 'lodash';
import { TranslateService } from '@ngx-translate/core';
import * as $ from 'jquery';
import { AnimationStyleMetadata } from '@angular/animations';

@Component({
  selector: 'app-select-dropdown-commom',
  templateUrl: './select-dropdown-common.component.html',
  styleUrls: ['./select-dropdown-common.scss'],
})
export class SelectDropdownCommonComponent implements OnInit {
  @Input() ID: number;
  @Input() class: string;
  @Input() data: any;
  @Input() catalogID: any;
  @Input() nameInput: string;
  @Input() Height: string;

  @Output() eventSelectValue = new EventEmitter();
  lstChange: any;
  showDropDown = false;
  disableBtn = false;
  code: any;
  type: any;
  itemText: string;
  sltWithKey: any = [];
  lstItem: any;
  OldlstItem: any;
  dataSelect: any;
  id: number;
  constructor(private util: Utility, private el: ElementRef,
    public translate: TranslateService) {
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (!this.util.isNullOrBlank(changes?.data) && !this.util.isNullOrBlank(changes.data.currentValue)) {
      this.lstItem = changes.data.currentValue;
      if(this.lstItem.length > 0){
        this.OldlstItem = JSON.stringify(this.lstItem);
        this.lstItem.map(m => m.active = false);
        this.lstItem.map(m => m.focus = false);
        const idxActive = this.lstItem.findIndex(e => e.Id == this.id);
        if(idxActive > -1){
          this.lstItem[idxActive].active = true;
          this.itemText = this.lstItem[idxActive].Name ? this.lstItem[idxActive].Name : '';
           this.eventSelectValue.emit(this.lstItem[idxActive]);
        }
      }
    }
    if (!this.util.isNullOrBlank(changes?.ID) && !this.util.isNullOrBlank(changes.ID.currentValue)) {
      this.id = changes.ID.currentValue;
    }
    if (!this.util.isNullOrBlank(changes?.catalogID) && !this.util.isNullOrBlank(changes.catalogID.currentValue)) {
      this.catalogID = changes.catalogID.currentValue;
    }
  }
  ngOnInit(): void {
    if(!this.util.isNullOrEmpty(this.data)){
      this.lstItem = this.data;
    }
  }
  selected(it: any) {
    this.dataSelect = it;
    this.lstItem.map(m => m.active = false);
    it.active = true;
    this.itemText = it.Name;
    this.outSelectValue(event);
  }
  outSelectValue(event) {
    this.showDropDown = false;
    this.eventSelectValue.emit(this.dataSelect);
    if (event.type === 'focusout' || event.type === 'mouseleave') {
      event.preventDefault();
    }
  }
  onKeyDownEvent(event: any) {
    this.sltWithKey = [];
    if (this.showDropDown === true) {   
      const focusKey = event.target.value;
      const lstdata = JSON.parse(this.OldlstItem);
      this.sltWithKey = _.filter(lstdata, function (it) {
        return it.Name.includes(focusKey);
      });
    }
    if (event.which === 32) {
      this.showDropDown = !this.showDropDown;
    }
    if (this.sltWithKey.length > 0) {
      this.showDropDown = true;
      this.sltWithKey.map(m => m.focus = false);
      this.lstItem = this.sltWithKey;
      this.lstItem[0].focus = true;
    }
    if (event.which === 9 || event.which === 13) {
      event.preventDefault();
    }
    if(event.which === 38 || event.which === 40){
      setTimeout(() => {
        $('.drop-show.active button.focus').focus();
      }, 200);
    }
  }
  onActionEvent(event: any, it: any) {
    if (event.which === 38 || event.which === 40) {
      const index = this.lstItem.findIndex(x => x.focus);
      const max = this.lstItem.length - 1;
      this.lstItem[index].focus = false;
      if (event.which === 38) {
        if (index === 0) {
          this.lstItem[max].focus = true;
        } else {
          this.lstItem[index - 1].focus = true;
        }
      }
      if (event.which === 40) {
        if (index === max) {
          this.lstItem[0].focus = true;
        } else {
          this.lstItem[index + 1].focus = true;
        }
      }
      setTimeout(() => {
        $('.drop-show.active button.focus').focus();
      }, 200);
    }
    const focusKey = event.key.toUpperCase();
    this.sltWithKey = _.filter(this.lstItem, function (it) {
      return it.value.startsWith(focusKey);
    });
    if (this.sltWithKey.length > 0) {
      this.lstItem.map(m => m.focus = false);
      const ind = this.lstItem.findIndex(x => x.value === this.sltWithKey[0].value);
      this.lstItem[ind].focus = true;
      setTimeout(() => {
        $('.drop-show.active button.focus').focus();
      }, 200);
    }
    if (event.which === 9) {
      this.lstItem.map(m => m.focus = false);
      it.focus = true;
      this.outSelectValue(event);
    }
    if (event.which === 32 || event.which === 13) {
      this.lstItem.map(m => m.active = false);
      it.active = true;
      this.itemText = it.code;

      if (event.which === 32) {
        $('.inp-select-focus.focused').focus();
        this.outSelectValue(event);
        setTimeout(() => {
          $('.inp-select-focus').removeClass('focused');
        }, 50);
      } else {
        this.outSelectValue(event);
      }
    }
  }
}
