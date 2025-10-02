import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadcrumbRouterComponent } from './breadcrumb-router.component';

describe('BreadcrumbRouterComponent', () => {
  let component: BreadcrumbRouterComponent;
  let fixture: ComponentFixture<BreadcrumbRouterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BreadcrumbRouterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BreadcrumbRouterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
