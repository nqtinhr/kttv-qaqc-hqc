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
  selector: 'app-select-commom',
  templateUrl: './select-common.component.html',
  styleUrls: ['./select-common.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class SelectCommonComponent implements OnInit {
  @Input() item: string;
  @Input() class: string;
  @Input() isDisabled: boolean;
  @Input() itemCode: any;
  @Input() data: any;
  @Input() catalogID: any;
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
  id: AnimationStyleMetadata;
  constructor(private util: Utility, private el: ElementRef,
    public translate: TranslateService) {
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (!this.util.isNullOrBlank(changes?.data) && !this.util.isNullOrBlank(changes.data.currentValue)) {
      this.lstItem = JSON.parse(changes.data.currentValue);
      this.OldlstItem = JSON.stringify(this.lstItem);
    }
    if (!this.util.isNullOrBlank(changes?.itemCode) && !this.util.isNullOrBlank(changes.itemCode.currentValue)) {
      this.id = JSON.parse(changes.itemCode.currentValue);
    }
    if (!this.util.isNullOrBlank(changes?.catalogID) && !this.util.isNullOrBlank(changes.catalogID.currentValue)) {
      this.catalogID = changes.catalogID.currentValue;
    }
    if (this.lstItem?.length > 0) {
      let i = 0;
      let index = -1;
      const idxActive = this.lstItem.findIndex(e => e.Id === this.id);
      if(idxActive === -1){
        for(const item of this.lstItem){
          index  = item.ChildCatalog.findIndex(e => e.Id === this.id);
          if(index > -1){          
            break;
          }
          i++;
        }
      }
      if (idxActive > -1) {
        this.lstItem.map(m => { m.active = false; return m; });
        this.lstItem.forEach(element => {
          element.ChildCatalog.map(m => { m.active = false; return m; });
        });
        this.lstItem[idxActive].active = true;
        this.itemText = this.lstItem[idxActive].Name ? this.lstItem[idxActive].Name : '';
        this.eventSelectValue.emit(this.lstItem[idxActive]);
      } else if(index > -1){
        this.lstItem.map(m => { m.active = false; return m; });
        this.lstItem.forEach(element => {
          element.ChildCatalog.map(m => { m.active = false; return m; });
        });
        this.lstItem[i].ChildCatalog[index].active = true;
        this.itemText = this.lstItem[i].ChildCatalog[index].Name ? this.lstItem[i].ChildCatalog[index].Name : '';
        this.eventSelectValue.emit(this.lstItem[i].ChildCatalog[index]);
      }
      else {
        this.itemText = '';
        this.code = null;
        this.lstItem.map(m => { m.active = false; return m; });
      }
    }
  }
  ngOnInit(): void {
    this.itemText = this.itemCode?.trim();
    if(!this.util.isNullOrEmpty(this.data)){
      this.lstItem = JSON.parse(this.data);
    }
  }
  selected(it: any) {
    this.dataSelect = it;
    this.lstItem.map(m => m.active = false);
    this.lstItem.forEach(element => {
      element.ChildCatalog.map(m => m.active = false);
    });
    it.active = true;
    this.item = this.itemText = it.Name;
    this.item = it.code;
    this.outSelectValue(event);
  }
  outSelectValue(event) {
    this.showDropDown = false;
    const obj = { value: this.item, code: this.code };
    this.eventSelectValue.emit(this.dataSelect);
    if (event.type === 'focusout' || event.type === 'mouseleave') {
      event.preventDefault();
    }
  }
  onKeyDownEvent(event: any) {
    this.sltWithKey = [];
    if (this.showDropDown === true) {   
      const focusKey = event.target.value;
      const lstIcon = JSON.parse(this.OldlstItem);
      this.sltWithKey = _.filter(lstIcon, function (it) {
        return it.code.includes(focusKey);
      });
    }
    if (event.which === 32) {
      this.showDropDown = !this.showDropDown;
    }
    if (event.which === 38 || event.which === 40) {
      let index;
      this.showDropDown = true;
      if (!this.util.isNullOrEmpty(this.item)) {
        index = this.lstItem.findIndex(x => x.focus);
        this.lstItem[index].focus = true;
      } else {
        this.lstItem[0].focus = true;
      }
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
