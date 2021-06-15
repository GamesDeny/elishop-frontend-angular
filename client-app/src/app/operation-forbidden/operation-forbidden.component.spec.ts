import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationForbiddenComponent } from './operation-forbidden.component';

describe('OperationForbiddenComponent', () => {
  let component: OperationForbiddenComponent;
  let fixture: ComponentFixture<OperationForbiddenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperationForbiddenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationForbiddenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
