import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSellStatsComponent } from './admin-sell-stats.component';

describe('AdminSellStatsComponent', () => {
  let component: AdminSellStatsComponent;
  let fixture: ComponentFixture<AdminSellStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminSellStatsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSellStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
