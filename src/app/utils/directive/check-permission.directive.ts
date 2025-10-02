import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { AuthorizeService } from '~/app/services/common/authorize.service';

@Directive({
  selector: '[CheckPermission]',
})
export class CheckPermissionDirective implements OnInit {
  @Input('role') roleCode: string;
  @Input('right') rightCode: string;
  constructor(
    private el: ElementRef,
    private authorizeService: AuthorizeService
  ) {}
  ngOnInit(): void {
    if (!this.authorizeService.hasPermission(this.roleCode, this.rightCode))
      this.el.nativeElement.style.display = 'none';
  }
}
